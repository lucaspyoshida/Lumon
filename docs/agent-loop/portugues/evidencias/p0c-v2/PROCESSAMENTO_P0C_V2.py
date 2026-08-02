#!/usr/bin/env python3
"""Pipeline deterministico P0C-04 v2, somente Python stdlib.

Corrige tecnicamente o master chroma P0C-04 v1. Nao gera imagem nova.
As provas de fundos e reducoes leem o PNG exportado canonico.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import math
import struct
import zlib
from array import array
from collections import Counter
from pathlib import Path


PNG_SIGNATURE = b"\x89PNG\r\n\x1a\n"
KEY = (255, 0, 255)
EXPECTED_INPUTS = {
    "p0c/masters/P0C-04-marker-chroma-master-v1.png":
        "ee75524401f3f4b8c4fddf855c6f69b94824fb1a80ac301c1971273b2f8fe930",
    "p0a-v2/p0a-model-sheet-v2-master-1254.png":
        "43a42dc4dcb413ea27c1df6a798e2de59039c1646b87d3ffd4ed154f6cd7c2e4",
    "p0a-v2/p0a-anchor-front-v2-512.webp":
        "7b210ece4e69cce646cd3a64830ccf5f32d8d27d15257a9e1cc77c597a7e99fc",
    "p0a-v2/p0a-anchor-3q-v2-512.webp":
        "ada5e022a7185c075d41b59c954007d0abd8e333b311ea5c15a3c42c8f96a1ff",
}


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def png_chunk(tag: bytes, payload: bytes) -> bytes:
    return (
        struct.pack(">I", len(payload)) + tag + payload
        + struct.pack(">I", zlib.crc32(tag + payload) & 0xFFFFFFFF)
    )


def paeth(a: int, b: int, c: int) -> int:
    p = a + b - c
    pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
    return a if pa <= pb and pa <= pc else (b if pb <= pc else c)


def filter_rows(rows: list[bytes], bpp: int) -> bytes:
    prior = bytes(len(rows[0]))
    out = bytearray()
    for row in rows:
        candidates = []
        for kind in range(5):
            filtered = bytearray(len(row))
            score = 0
            for i, value in enumerate(row):
                left = row[i - bpp] if i >= bpp else 0
                up = prior[i]
                upper_left = prior[i - bpp] if i >= bpp else 0
                if kind == 0:
                    prediction = 0
                elif kind == 1:
                    prediction = left
                elif kind == 2:
                    prediction = up
                elif kind == 3:
                    prediction = (left + up) // 2
                else:
                    prediction = paeth(left, up, upper_left)
                delta = (value - prediction) & 255
                filtered[i] = delta
                score += min(delta, 256 - delta)
            candidates.append((score, kind, filtered))
        _, kind, best = min(candidates, key=lambda item: item[0])
        out.append(kind)
        out.extend(best)
        prior = row
    return bytes(out)


def parse_png(path: Path):
    data = path.read_bytes()
    if not data.startswith(PNG_SIGNATURE):
        raise ValueError(f"nao e PNG: {path}")
    pos = 8
    chunks = []
    idat = bytearray()
    palette = None
    transparency = None
    width = height = depth = color_type = None
    while pos < len(data):
        length = struct.unpack_from(">I", data, pos)[0]
        tag = data[pos + 4:pos + 8]
        payload = data[pos + 8:pos + 8 + length]
        chunks.append(tag.decode("ascii"))
        pos += 12 + length
        if tag == b"IHDR":
            width, height, depth, color_type, compression, filtering, interlace = struct.unpack(
                ">IIBBBBB", payload
            )
            if depth != 8 or compression or filtering or interlace:
                raise ValueError("PNG precisa ser 8-bit, nao entrelacado")
        elif tag == b"PLTE":
            palette = [tuple(payload[i:i + 3]) for i in range(0, len(payload), 3)]
        elif tag == b"tRNS":
            transparency = list(payload)
        elif tag == b"IDAT":
            idat.extend(payload)
        elif tag == b"IEND":
            break
    channels = {2: 3, 3: 1, 6: 4}.get(color_type)
    if not channels:
        raise ValueError(f"color type nao suportado: {color_type}")
    stride = width * channels
    raw = zlib.decompress(bytes(idat))
    rows = []
    offset = 0
    prior = bytearray(stride)
    for _ in range(height):
        kind = raw[offset]
        encoded = raw[offset + 1:offset + 1 + stride]
        offset += stride + 1
        row = bytearray(stride)
        for i, value in enumerate(encoded):
            left = row[i - channels] if i >= channels else 0
            up = prior[i]
            upper_left = prior[i - channels] if i >= channels else 0
            if kind == 0:
                prediction = 0
            elif kind == 1:
                prediction = left
            elif kind == 2:
                prediction = up
            elif kind == 3:
                prediction = (left + up) // 2
            elif kind == 4:
                prediction = paeth(left, up, upper_left)
            else:
                raise ValueError(f"filtro PNG invalido: {kind}")
            row[i] = (value + prediction) & 255
        rows.append(row)
        prior = row
    pixels = []
    for row in rows:
        if color_type == 2:
            pixels.extend((row[i], row[i + 1], row[i + 2], 255)
                          for i in range(0, len(row), 3))
        elif color_type == 6:
            pixels.extend(tuple(row[i:i + 4]) for i in range(0, len(row), 4))
        else:
            if palette is None:
                raise ValueError("PNG indexado sem PLTE")
            for index in row:
                r, g, b = palette[index]
                alpha = transparency[index] if transparency and index < len(transparency) else 255
                pixels.append((r, g, b, alpha))
    metadata = {
        "width": width,
        "height": height,
        "depth": depth,
        "color_type": color_type,
        "chunks": chunks,
    }
    return width, height, pixels, metadata


def rgba_png_bytes(width: int, height: int, pixels) -> bytes:
    rows = []
    for y in range(height):
        row = bytearray()
        for pixel in pixels[y * width:(y + 1) * width]:
            row.extend(pixel)
        rows.append(bytes(row))
    ihdr = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    return (
        PNG_SIGNATURE + png_chunk(b"IHDR", ihdr)
        + png_chunk(b"gAMA", struct.pack(">I", 45455))
        + png_chunk(b"sRGB", b"\x00")
        + png_chunk(b"IDAT", zlib.compress(filter_rows(rows, 4), 9))
        + png_chunk(b"IEND", b"")
    )


def write_rgba_png(path: Path, width: int, height: int, pixels) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(rgba_png_bytes(width, height, pixels))


def key_distance(pixel) -> int:
    r, g, b, _ = pixel
    return max(abs(r - KEY[0]), abs(g - KEY[1]), abs(b - KEY[2]))


def foreground_component(width: int, height: int, pixels, threshold: int = 28):
    candidate = bytearray(key_distance(pixel) >= threshold for pixel in pixels)
    center_x = range(width // 5, width * 4 // 5)
    center_y = range(height // 5, height * 4 // 5)
    seed = max(
        (y * width + x for y in center_y for x in center_x),
        key=lambda index: key_distance(pixels[index]),
    )
    if not candidate[seed]:
        raise ValueError("nao foi possivel localizar personagem")
    mask = bytearray(width * height)
    mask[seed] = 1
    stack = array("I", [seed])
    while stack:
        index = stack.pop()
        x, y = index % width, index // width
        for yy in range(max(0, y - 1), min(height, y + 2)):
            base = yy * width
            for xx in range(max(0, x - 1), min(width, x + 2)):
                neighbor = base + xx
                if candidate[neighbor] and not mask[neighbor]:
                    mask[neighbor] = 1
                    stack.append(neighbor)
    return mask


def erode(mask: bytearray, width: int, height: int, iterations: int) -> bytearray:
    current = mask
    for _ in range(iterations):
        nxt = bytearray(width * height)
        for y in range(1, height - 1):
            base = y * width
            for x in range(1, width - 1):
                index = base + x
                if not current[index]:
                    continue
                keep = True
                for yy in (y - 1, y, y + 1):
                    start = yy * width + x - 1
                    if not all(current[start:start + 3]):
                        keep = False
                        break
                if keep:
                    nxt[index] = 1
        current = nxt
    return current


def is_magenta_residual(rgb) -> bool:
    r, g, b = rgb
    # A personagem nao possui rosa/roxo. O predicado amplo remove tambem
    # contaminacao cromatica escura na borda, nao somente #FF00FF exato.
    return r >= 80 and b >= 45 and min(r, b) - g >= 25


def clean_master(width: int, height: int, pixels):
    component = foreground_component(width, height, pixels)
    mask = erode(component, width, height, 1)
    cleaned = [(0, 0, 0, 0)] * (width * height)
    for index, present in enumerate(mask):
        if not present:
            continue
        r, g, b, _ = pixels[index]
        if is_magenta_residual((r, g, b)):
            x, y = index % width, index // width
            donor = None
            for radius in range(1, 9):
                for yy in range(max(0, y - radius), min(height, y + radius + 1)):
                    for xx in range(max(0, x - radius), min(width, x + radius + 1)):
                        candidate = pixels[yy * width + xx]
                        if mask[yy * width + xx] and not is_magenta_residual(candidate[:3]):
                            donor = candidate[:3]
                            break
                    if donor:
                        break
                if donor:
                    break
            if donor is None:
                raise ValueError("residuo magenta sem cor doadora")
            r, g, b = donor
        cleaned[index] = (r, g, b, 255)
    return cleaned


def lanczos(value: float, radius: int = 3) -> float:
    value = abs(value)
    if value == 0:
        return 1.0
    if value >= radius:
        return 0.0
    return (
        math.sin(math.pi * value) / (math.pi * value)
        * math.sin(math.pi * value / radius) / (math.pi * value / radius)
    )


def contributions(source: int, target: int):
    scale = target / source
    support = 3 / scale if scale < 1 else 3
    result = []
    for destination in range(target):
        center = (destination + 0.5) / scale - 0.5
        left = max(0, math.ceil(center - support))
        right = min(source - 1, math.floor(center + support))
        weights = []
        for position in range(left, right + 1):
            distance = center - position
            weight = lanczos(distance * scale if scale < 1 else distance)
            weights.append((position, weight))
        total = sum(weight for _, weight in weights)
        result.append([(position, weight / total) for position, weight in weights])
    return result


def resize_premultiplied(sw: int, sh: int, pixels, dw: int, dh: int):
    horizontal_weights = contributions(sw, dw)
    vertical_weights = contributions(sh, dh)
    intermediate = array("f", [0.0]) * (sh * dw * 4)
    for y in range(sh):
        source_base = y * sw
        target_base = y * dw * 4
        for x, weights in enumerate(horizontal_weights):
            red = green = blue = alpha = 0.0
            for source_x, weight in weights:
                r, g, b, a = pixels[source_base + source_x]
                factor = a / 255.0
                red += r * factor * weight
                green += g * factor * weight
                blue += b * factor * weight
                alpha += a * weight
            offset = target_base + x * 4
            intermediate[offset:offset + 4] = array("f", [red, green, blue, alpha])
    output = []
    for y, weights in enumerate(vertical_weights):
        for x in range(dw):
            red = green = blue = alpha = 0.0
            for source_y, weight in weights:
                offset = (source_y * dw + x) * 4
                red += intermediate[offset] * weight
                green += intermediate[offset + 1] * weight
                blue += intermediate[offset + 2] * weight
                alpha += intermediate[offset + 3] * weight
            alpha = max(0.0, min(255.0, alpha))
            if alpha <= 8:
                output.append((0, 0, 0, 0))
                continue
            if alpha >= 247:
                alpha = 255.0
            factor = 255.0 / alpha
            output.append((
                max(0, min(255, round(red * factor))),
                max(0, min(255, round(green * factor))),
                max(0, min(255, round(blue * factor))),
                round(alpha),
            ))
    visible = bytearray(pixel[3] > 8 for pixel in output)
    interior = erode(visible, dw, dh, 3)
    for index, present in enumerate(interior):
        if present and output[index][3] != 255:
            r, g, b, _ = output[index]
            output[index] = (r, g, b, 255)
    return output


def median_palette(histogram: Counter, limit: int, channels: int):
    entries = list(histogram.items())
    if not entries:
        return []
    boxes = [entries]
    while len(boxes) < limit:
        selected = None
        selected_score = -1
        for index, box in enumerate(boxes):
            if len(box) < 2:
                continue
            ranges = [
                max(color[channel] for color, _ in box)
                - min(color[channel] for color, _ in box)
                for channel in range(channels)
            ]
            score = max(ranges) * sum(count for _, count in box)
            if score > selected_score:
                selected = index
                selected_score = score
        if selected is None:
            break
        box = boxes.pop(selected)
        ranges = [
            max(color[channel] for color, _ in box)
            - min(color[channel] for color, _ in box)
            for channel in range(channels)
        ]
        axis = max(range(channels), key=lambda channel: ranges[channel])
        box.sort(key=lambda item: item[0][axis])
        total = sum(count for _, count in box)
        accumulated = 0
        split = 1
        for offset, (_, count) in enumerate(box):
            accumulated += count
            if accumulated >= total / 2:
                split = min(len(box) - 1, offset + 1)
                break
        boxes.extend((box[:split], box[split:]))
    palette = []
    for box in boxes:
        total = sum(count for _, count in box)
        palette.append(tuple(
            round(sum(color[channel] * count for color, count in box) / total)
            for channel in range(channels)
        ))
    return palette


def indexed_png_bytes(width: int, height: int, pixels, opaque_limit: int, edge_limit: int):
    opaque_histogram = Counter(pixel[:3] for pixel in pixels if pixel[3] == 255)
    edge_histogram = Counter(pixel for pixel in pixels if 0 < pixel[3] < 255)
    opaque = [(*color, 255) for color in median_palette(opaque_histogram, opaque_limit, 3)]
    edge = median_palette(edge_histogram, edge_limit, 4)
    palette = [(0, 0, 0, 0)] + opaque + edge
    if len(palette) > 256:
        raise ValueError("paleta excede 256 entradas")
    opaque_indices = range(1, 1 + len(opaque))
    edge_indices = range(1 + len(opaque), len(palette))
    cache = {}
    indices = []
    for pixel in pixels:
        if pixel[3] == 0:
            indices.append(0)
            continue
        if pixel not in cache:
            candidates = opaque_indices if pixel[3] == 255 else edge_indices
            candidates = list(candidates)
            if not candidates:
                candidates = list(opaque_indices)
            cache[pixel] = min(
                candidates,
                key=lambda index: (
                    sum((pixel[channel] - palette[index][channel]) ** 2 for channel in range(3))
                    + 4 * (pixel[3] - palette[index][3]) ** 2
                ),
            )
        indices.append(cache[pixel])
    rows = [bytes(indices[y * width:(y + 1) * width]) for y in range(height)]
    ihdr = struct.pack(">IIBBBBB", width, height, 8, 3, 0, 0, 0)
    plte = bytes(value for color in palette for value in color[:3])
    trns = bytes(color[3] for color in palette)
    return (
        PNG_SIGNATURE + png_chunk(b"IHDR", ihdr)
        + png_chunk(b"gAMA", struct.pack(">I", 45455))
        + png_chunk(b"sRGB", b"\x00") + png_chunk(b"PLTE", plte)
        + png_chunk(b"tRNS", trns)
        + png_chunk(b"IDAT", zlib.compress(filter_rows(rows, 1), 9))
        + png_chunk(b"IEND", b"")
    ), palette


def write_budgeted_export(path: Path, width: int, height: int, pixels):
    candidates = [(224, 31), (208, 31), (192, 31), (176, 23), (160, 23), (144, 15)]
    for opaque, edge in candidates:
        data, palette = indexed_png_bytes(width, height, pixels, opaque, edge)
        if len(data) <= 25_000:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(data)
            return {"opaque_palette": opaque, "edge_palette": edge,
                    "palette_entries": len(palette)}
    raise ValueError(f"export excede budget: {len(data)} bytes")


def alpha_over(pixel, background):
    r, g, b, a = pixel
    factor = a / 255.0
    return (
        round(r * factor + background[0] * (1 - factor)),
        round(g * factor + background[1] * (1 - factor)),
        round(b * factor + background[2] * (1 - factor)),
        255,
    )


def paste(canvas, canvas_width, image, image_width, image_height, ox, oy, background=None):
    for y in range(image_height):
        for x in range(image_width):
            pixel = image[y * image_width + x]
            if background is not None:
                pixel = alpha_over(pixel, background)
            canvas[(oy + y) * canvas_width + ox + x] = pixel


def make_proofs(export_path: Path, reviews: Path):
    width, height, export, _ = parse_png(export_path)
    backgrounds = [(255, 249, 241), (255, 255, 255), (23, 107, 135), (138, 61, 120)]
    panel = 320
    canvas = [(0, 0, 0, 255)] * (panel * 2 * panel * 2)
    for index, background in enumerate(backgrounds):
        ox = (index % 2) * panel + (panel - width) // 2
        oy = (index // 2) * panel + (panel - height) // 2
        for y in range(panel):
            for x in range(panel):
                canvas[((index // 2) * panel + y) * panel * 2 + (index % 2) * panel + x] = (*background, 255)
        paste(canvas, panel * 2, export, width, height, ox, oy, background)
    write_rgba_png(reviews / "P0C-04-alpha-backgrounds-v2.png", panel * 2, panel * 2, canvas)

    reductions = {}
    for size in (64, 48):
        reduced = resize_premultiplied(width, height, export, size, size)
        reductions[size] = reduced
        write_rgba_png(reviews / f"P0C-04-marker-{size}-proof-v2.png", size, size, reduced)
    proof_width, proof_height = 500, 300
    cream = (255, 249, 241)
    proof = [(*cream, 255)] * (proof_width * proof_height)
    x = 16
    for size, image in ((256, export), (64, reductions[64]), (48, reductions[48])):
        y = (proof_height - size) // 2
        paste(proof, proof_width, image, size, size, x, y, cream)
        x += size + 42
    write_rgba_png(reviews / "P0C-04-marker-reduction-proof-v2.png",
                   proof_width, proof_height, proof)

    visible = bytearray(pixel[3] > 8 for pixel in export)
    interior = erode(visible, width, height, 3)
    matte = []
    for pixel, inside in zip(export, interior):
        alpha = pixel[3]
        matte.append((alpha, alpha, alpha, 255) if not inside else (35, 122, 75, 255))
    write_rgba_png(reviews / "P0C-04-alpha-interior-proof-v2.png", width, height, matte)


def bbox_and_margins(width: int, height: int, pixels):
    coordinates = [(index % width, index // width)
                   for index, pixel in enumerate(pixels) if pixel[3] > 8]
    if not coordinates:
        raise ValueError("export vazio")
    xs = [x for x, _ in coordinates]
    ys = [y for _, y in coordinates]
    bbox = [min(xs), min(ys), max(xs), max(ys)]
    margins = [bbox[0], bbox[1], width - 1 - bbox[2], height - 1 - bbox[3]]
    return bbox, margins


def inspect_export(path: Path):
    width, height, pixels, metadata = parse_png(path)
    visible = bytearray(pixel[3] > 8 for pixel in pixels)
    interior = erode(visible, width, height, 3)
    interior_count = sum(interior)
    opaque_interior = sum(1 for pixel, inside in zip(pixels, interior)
                          if inside and pixel[3] == 255)
    exact_green = sum(1 for r, g, b, a in pixels if a > 0 and (r, g, b) == (0, 255, 0))
    exact_magenta = sum(1 for r, g, b, a in pixels if a > 0 and (r, g, b) == KEY)
    magenta_residual = sum(1 for r, g, b, a in pixels
                           if a > 0 and is_magenta_residual((r, g, b)))
    bbox, margins = bbox_and_margins(width, height, pixels)
    return {
        "mime": "image/png",
        "dimensoes_px": [width, height],
        "bytes": path.stat().st_size,
        "sha256": sha256(path),
        "canais": "indexed_RGBA_8bit_tRNS" if metadata["color_type"] == 3 else "RGBA_8bit",
        "chunks": metadata["chunks"],
        "alpha_gt_8_pixels": sum(visible),
        "alpha_partial_pixels": sum(1 for pixel in pixels if 0 < pixel[3] < 255),
        "interior_erosao_3px_pixels": interior_count,
        "interior_alpha_255_pixels": opaque_interior,
        "interior_alpha_255_percent": round(100 * opaque_interior / interior_count, 6),
        "rgb_0_255_0_nao_transparente": exact_green,
        "rgb_255_0_255_nao_transparente": exact_magenta,
        "magenta_residual_predicado": magenta_residual,
        "alpha_bbox_gt_8": bbox,
        "margens_px": margins,
        "margem_minima_percentual": round(100 * min(margins) / width, 3),
        "budget_bytes": 25000,
        "budget_resultado": "PASSOU" if path.stat().st_size <= 25000 else "FALHOU",
    }


def validate_inputs(evidence_root: Path):
    result = {}
    for relative, expected in EXPECTED_INPUTS.items():
        path = evidence_root / relative
        actual = sha256(path)
        if actual != expected:
            raise ValueError(f"hash de entrada diverge: {relative}: {actual}")
        result[relative] = actual
    return result


def build(evidence_root: Path, output: Path):
    inputs = validate_inputs(evidence_root)
    source = evidence_root / "p0c/masters/P0C-04-marker-chroma-master-v1.png"
    width, height, pixels, _ = parse_png(source)
    master = clean_master(width, height, pixels)
    master_path = output / "masters/P0C-04-marker-transparent-master-v2.png"
    write_rgba_png(master_path, width, height, master)
    export_pixels = resize_premultiplied(width, height, master, 256, 256)
    export_path = output / "exports/P0C-04-marker-256-v2.png"
    palette = write_budgeted_export(export_path, 256, 256, export_pixels)
    reviews = output / "reviews"
    make_proofs(export_path, reviews)
    metrics = {
        "schema_version": 1,
        "pipeline": "PROCESSAMENTO_P0C_V2.py",
        "resampling": "Lanczos3_separavel_RGBA_premultiplicado",
        "entrada": inputs,
        "master_v2": {
            "arquivo": "masters/P0C-04-marker-transparent-master-v2.png",
            "bytes": master_path.stat().st_size,
            "sha256": sha256(master_path),
            "dimensoes_px": [width, height],
            "canais": "RGBA_8bit",
        },
        "export_v2": inspect_export(export_path),
        "quantizacao": palette,
        "provas": {},
    }
    for path in sorted(reviews.glob("*.png")):
        pw, ph, _, metadata = parse_png(path)
        metrics["provas"][f"reviews/{path.name}"] = {
            "sha256": sha256(path), "bytes": path.stat().st_size,
            "dimensoes_px": [pw, ph], "chunks": metadata["chunks"],
        }
    metrics_path = output / "METRICAS_P0C_V2.json"
    metrics_path.write_text(json.dumps(metrics, ensure_ascii=False, indent=2, sort_keys=True) + "\n")
    return metrics


def verify(output: Path):
    export = output / "exports/P0C-04-marker-256-v2.png"
    result = inspect_export(export)
    failures = []
    if result["dimensoes_px"] != [256, 256]:
        failures.append("dimensao")
    if result["bytes"] > 25000:
        failures.append("budget")
    if result["margem_minima_percentual"] < 12:
        failures.append("margem")
    if result["interior_alpha_255_percent"] != 100.0:
        failures.append("interior_alpha")
    if result["rgb_0_255_0_nao_transparente"]:
        failures.append("verde_exato")
    if result["rgb_255_0_255_nao_transparente"] or result["magenta_residual_predicado"]:
        failures.append("magenta")
    required = {
        "reviews/P0C-04-alpha-backgrounds-v2.png",
        "reviews/P0C-04-marker-64-proof-v2.png",
        "reviews/P0C-04-marker-48-proof-v2.png",
        "reviews/P0C-04-marker-reduction-proof-v2.png",
        "reviews/P0C-04-alpha-interior-proof-v2.png",
    }
    missing = [relative for relative in required if not (output / relative).exists()]
    failures.extend(f"ausente:{relative}" for relative in missing)
    if failures:
        raise SystemExit("FALHOU: " + ", ".join(failures))
    print(json.dumps({"resultado": "PASSOU", "export": result}, ensure_ascii=False, indent=2))


def main():
    parser = argparse.ArgumentParser()
    subparsers = parser.add_subparsers(dest="command", required=True)
    for name in ("build", "verify"):
        command = subparsers.add_parser(name)
        command.add_argument("--evidence-root", type=Path, required=True)
        command.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    if args.command == "build":
        result = build(args.evidence_root.resolve(), args.output.resolve())
        print(json.dumps(result, ensure_ascii=False, indent=2, sort_keys=True))
    else:
        validate_inputs(args.evidence_root.resolve())
        verify(args.output.resolve())


if __name__ == "__main__":
    main()
