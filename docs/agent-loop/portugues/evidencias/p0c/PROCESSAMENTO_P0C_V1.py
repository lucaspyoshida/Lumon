#!/usr/bin/env python3
import argparse
import math
import struct
import zlib
from collections import Counter
from pathlib import Path


def read_tga(path):
    data = Path(path).read_bytes()
    ident, cmap, kind = data[0], data[1], data[2]
    width, height = struct.unpack_from("<HH", data, 12)
    depth, desc = data[16], data[17]
    if cmap != 0 or kind not in (2, 10) or depth not in (24, 32):
        raise ValueError(f"unsupported TGA: kind={kind} cmap={cmap} depth={depth}")
    bpp = depth // 8
    pos = 18 + ident
    raw = []
    total = width * height
    if kind == 2:
        raw = [data[pos + i * bpp:pos + (i + 1) * bpp] for i in range(total)]
    else:
        while len(raw) < total:
            header = data[pos]
            pos += 1
            count = (header & 0x7F) + 1
            if header & 0x80:
                px = data[pos:pos + bpp]
                pos += bpp
                raw.extend([px] * count)
            else:
                for _ in range(count):
                    raw.append(data[pos:pos + bpp])
                    pos += bpp
    pixels = []
    for px in raw[:total]:
        b, g, r = px[:3]
        a = px[3] if bpp == 4 else 255
        pixels.append((r, g, b, a))
    top = bool(desc & 0x20)
    right = bool(desc & 0x10)
    rows = [pixels[y * width:(y + 1) * width] for y in range(height)]
    if not top:
        rows.reverse()
    if right:
        rows = [list(reversed(row)) for row in rows]
    return width, height, [p for row in rows for p in row]


def chroma_magenta(pixels):
    out = []
    key = (255, 0, 255)
    for r, g, b, _ in pixels:
        d = max(abs(r - key[0]), abs(g - key[1]), abs(b - key[2]))
        if d <= 12:
            out.append((0, 0, 0, 0))
            continue
        if d >= 220:
            out.append((r, g, b, 255))
            continue
        t = (d - 12) / (220 - 12)
        t = t * t * (3 - 2 * t)
        a = max(1, min(254, round(255 * t)))
        af = a / 255.0
        # Undo compositing over magenta, then clamp. Removes magenta fringe.
        rr = round((r - (1 - af) * 255) / af)
        gg = round(g / af)
        bb = round((b - (1 - af) * 255) / af)
        out.append((max(0, min(255, rr)), max(0, min(255, gg)),
                    max(0, min(255, bb)), a))
    side = round(math.sqrt(len(out)))
    if side * side == len(out):
        fixed = list(out)
        for i, (r, g, b, a) in enumerate(out):
            if not 0 < a < 255:
                continue
            x, y = i % side, i // side
            donor = None
            for radius in (1, 2, 3):
                for yy in range(max(0, y - radius), min(side, y + radius + 1)):
                    for xx in range(max(0, x - radius), min(side, x + radius + 1)):
                        candidate = out[yy * side + xx]
                        if candidate[3] == 255:
                            donor = candidate
                            break
                    if donor:
                        break
                if donor:
                    break
            if donor:
                fixed[i] = (donor[0], donor[1], donor[2], a)
        out = fixed
    return out


def chunk(tag, payload):
    return struct.pack(">I", len(payload)) + tag + payload + struct.pack(
        ">I", zlib.crc32(tag + payload) & 0xffffffff
    )


def paeth(a, b, c):
    p = a + b - c
    pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
    return a if pa <= pb and pa <= pc else (b if pb <= pc else c)


def filtered_rows(rows, bpp):
    prior = bytes(len(rows[0]))
    out = bytearray()
    for row in rows:
        candidates = []
        vals = list(row)
        for kind in range(5):
            f = bytearray(len(vals))
            score = 0
            for i, value in enumerate(vals):
                left = vals[i - bpp] if i >= bpp else 0
                up = prior[i]
                upper_left = prior[i - bpp] if i >= bpp else 0
                if kind == 0:
                    pred = 0
                elif kind == 1:
                    pred = left
                elif kind == 2:
                    pred = up
                elif kind == 3:
                    pred = (left + up) // 2
                else:
                    pred = paeth(left, up, upper_left)
                q = (value - pred) & 255
                f[i] = q
                score += min(q, 256 - q)
            candidates.append((score, kind, f))
        _, kind, best = min(candidates, key=lambda x: x[0])
        out.append(kind)
        out.extend(best)
        prior = bytes(row)
    return bytes(out)


def write_rgba_png(path, width, height, pixels):
    rows = []
    for y in range(height):
        row = bytearray()
        for p in pixels[y * width:(y + 1) * width]:
            row.extend(p)
        rows.append(bytes(row))
    ihdr = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    payload = filtered_rows(rows, 4)
    png = b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr)
    png += chunk(b"gAMA", struct.pack(">I", 45455)) + chunk(b"sRGB", b"\x00")
    png += chunk(b"IDAT", zlib.compress(payload, 9)) + chunk(b"IEND", b"")
    Path(path).write_bytes(png)


def prebucket(pixel, alpha):
    r, g, b, a = pixel
    r = round(r / 8) * 8
    g = round(g / 8) * 8
    b = round(b / 8) * 8
    a = round(a / 16) * 16 if alpha else 255
    return min(r, 255), min(g, 255), min(b, 255), min(a, 255)


def median_palette(pixels, limit, alpha):
    hist = Counter(prebucket(p, alpha) for p in pixels)
    entries = [(c, n) for c, n in hist.items()]
    boxes = [entries]
    channels = 4 if alpha else 3
    while len(boxes) < limit:
        best_i, best_score = None, -1
        for i, box in enumerate(boxes):
            if len(box) < 2:
                continue
            ranges = [max(c[k] for c, _ in box) - min(c[k] for c, _ in box)
                      for k in range(channels)]
            score = max(ranges) * sum(n for _, n in box)
            if score > best_score:
                best_i, best_score = i, score
        if best_i is None:
            break
        box = boxes.pop(best_i)
        ranges = [max(c[k] for c, _ in box) - min(c[k] for c, _ in box)
                  for k in range(channels)]
        axis = max(range(channels), key=lambda k: ranges[k])
        box.sort(key=lambda item: item[0][axis])
        total = sum(n for _, n in box)
        acc, split = 0, 1
        for j, (_, n) in enumerate(box):
            acc += n
            if acc >= total / 2:
                split = min(len(box) - 1, j + 1)
                break
        boxes.extend([box[:split], box[split:]])
    palette = []
    for box in boxes:
        total = sum(n for _, n in box)
        palette.append(tuple(round(sum(c[k] * n for c, n in box) / total)
                             for k in range(4)))
    return palette


def write_indexed_png(path, width, height, pixels, colors, alpha):
    palette = median_palette(pixels, colors, alpha)
    cache = {}
    indices = []
    for pixel in pixels:
        key = prebucket(pixel, alpha)
        if key not in cache:
            cache[key] = min(
                range(len(palette)),
                key=lambda i: sum((key[k] - palette[i][k]) ** 2
                                  * (2 if k == 3 else 1)
                                  for k in range(4 if alpha else 3))
            )
        indices.append(cache[key])
    rows = [bytes(indices[y * width:(y + 1) * width]) for y in range(height)]
    ihdr = struct.pack(">IIBBBBB", width, height, 8, 3, 0, 0, 0)
    plte = bytes(v for p in palette for v in p[:3])
    png = b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr)
    png += chunk(b"gAMA", struct.pack(">I", 45455)) + chunk(b"sRGB", b"\x00")
    png += chunk(b"PLTE", plte)
    if alpha:
        png += chunk(b"tRNS", bytes(p[3] for p in palette))
    png += chunk(b"IDAT", zlib.compress(filtered_rows(rows, 1), 9))
    png += chunk(b"IEND", b"")
    Path(path).write_bytes(png)


def nearest_resize(sw, sh, pixels, dw, dh):
    return [pixels[min(sh - 1, y * sh // dh) * sw + min(sw - 1, x * sw // dw)]
            for y in range(dh) for x in range(dw)]


def alpha_over(src, bg):
    r, g, b, a = src
    t = a / 255.0
    return (round(r * t + bg[0] * (1 - t)),
            round(g * t + bg[1] * (1 - t)),
            round(b * t + bg[2] * (1 - t)), 255)


def masks_proof(icon_path, out):
    w, h, pix = read_tga(icon_path)
    panel = 300
    canvas_w = canvas_h = panel * 2
    canvas = [(43, 33, 29, 255)] * (canvas_w * canvas_h)
    fills = [(255, 249, 241), (255, 255, 255), (23, 107, 135), (138, 61, 120)]
    for idx in range(4):
        scaled = nearest_resize(w, h, pix, panel, panel)
        ox, oy = (idx % 2) * panel, (idx // 2) * panel
        for y in range(panel):
            for x in range(panel):
                nx = (x + .5 - panel / 2) / (panel / 2)
                ny = (y + .5 - panel / 2) / (panel / 2)
                if idx == 0:
                    inside = nx * nx + ny * ny <= 0.96 ** 2
                elif idx == 1:
                    inside = abs(nx) ** 4 + abs(ny) ** 4 <= 0.96 ** 4
                elif idx == 2:
                    rx, ry = abs(nx), abs(ny)
                    inside = max(rx, ry) <= .96 and not (
                        rx > .72 and ry > .72 and (rx - .72) ** 2 + (ry - .72) ** 2 > .24 ** 2
                    )
                else:
                    inside = nx * nx + ny * ny <= 0.80 ** 2
                p = scaled[y * panel + x] if inside else (*fills[idx], 255)
                canvas[(oy + y) * canvas_w + ox + x] = p
    write_rgba_png(out, canvas_w, canvas_h, canvas)


def backgrounds_proof(marker_path, out):
    w, h, raw = read_tga(marker_path)
    pix = chroma_magenta(raw)
    panel = 320
    scaled = nearest_resize(w, h, pix, panel, panel)
    bgs = [(255, 249, 241), (255, 255, 255), (23, 107, 135), (138, 61, 120)]
    canvas = []
    for y in range(panel * 2):
        for x in range(panel * 2):
            idx = (y // panel) * 2 + (x // panel)
            p = scaled[(y % panel) * panel + (x % panel)]
            canvas.append(alpha_over(p, bgs[idx]))
    write_rgba_png(out, panel * 2, panel * 2, canvas)


def reductions_proof(paths, out):
    imgs = [read_tga(p) for p in paths]
    sizes = [512, 192, 96, 48, 32, 16]
    width, height = 1040, 560
    canvas = [(255, 249, 241, 255)] * (width * height)
    x = 16
    for (w, h, pix), size in zip(imgs, sizes):
        y = (height - size) // 2
        for yy in range(size):
            for xx in range(size):
                canvas[(y + yy) * width + x + xx] = pix[yy * w + xx]
        x += size + 24
    write_rgba_png(out, width, height, canvas)


def marker_reductions_proof(paths, out):
    imgs = [read_tga(p) for p in paths]
    sizes = [256, 64, 48]
    width, height = 500, 300
    canvas = [(255, 249, 241, 255)] * (width * height)
    x = 16
    for (w, h, raw), size in zip(imgs, sizes):
        pix = chroma_magenta(raw)
        y = (height - size) // 2
        for yy in range(size):
            for xx in range(size):
                canvas[(y + yy) * width + x + xx] = alpha_over(
                    pix[yy * w + xx], (255, 249, 241)
                )
        x += size + 42
    write_rgba_png(out, width, height, canvas)


def pad_quantize(src, out, canvas_size, colors):
    w, h, pix = read_tga(src)
    bg = (248, 240, 231, 255)
    canvas = [bg] * (canvas_size * canvas_size)
    ox, oy = (canvas_size - w) // 2, (canvas_size - h) // 2
    for y in range(h):
        for x in range(w):
            canvas[(oy + y) * canvas_size + ox + x] = pix[y * w + x]
    write_indexed_png(out, canvas_size, canvas_size, canvas, colors, False)


def main():
    p = argparse.ArgumentParser()
    sub = p.add_subparsers(dest="cmd", required=True)
    q = sub.add_parser("quantize")
    q.add_argument("src"); q.add_argument("out"); q.add_argument("--colors", type=int, required=True)
    q.add_argument("--chroma", action="store_true")
    r = sub.add_parser("rgba")
    r.add_argument("src"); r.add_argument("out"); r.add_argument("--chroma", action="store_true")
    m = sub.add_parser("masks")
    m.add_argument("src"); m.add_argument("out")
    b = sub.add_parser("backgrounds")
    b.add_argument("src"); b.add_argument("out")
    d = sub.add_parser("reductions")
    d.add_argument("out"); d.add_argument("srcs", nargs=6)
    c = sub.add_parser("pad")
    c.add_argument("src"); c.add_argument("out")
    c.add_argument("--canvas", type=int, required=True)
    c.add_argument("--colors", type=int, required=True)
    mr = sub.add_parser("marker-reductions")
    mr.add_argument("out"); mr.add_argument("srcs", nargs=3)
    args = p.parse_args()
    if args.cmd == "quantize":
        w, h, pix = read_tga(args.src)
        if args.chroma: pix = chroma_magenta(pix)
        write_indexed_png(args.out, w, h, pix, args.colors, args.chroma)
    elif args.cmd == "rgba":
        w, h, pix = read_tga(args.src)
        if args.chroma: pix = chroma_magenta(pix)
        write_rgba_png(args.out, w, h, pix)
    elif args.cmd == "masks":
        masks_proof(args.src, args.out)
    elif args.cmd == "backgrounds":
        backgrounds_proof(args.src, args.out)
    elif args.cmd == "reductions":
        reductions_proof(args.srcs, args.out)
    elif args.cmd == "pad":
        pad_quantize(args.src, args.out, args.canvas, args.colors)
    else:
        marker_reductions_proof(args.srcs, args.out)


if __name__ == "__main__":
    main()
