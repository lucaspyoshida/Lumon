#!/usr/bin/env python3
"""Gera o banco de áudio do Lumon a partir de content/pt/corpus.json.

Uso:
    python3 scripts/build_audio.py [--force] [--motor kokoro|espeak]

O modelo Kokoro (~350 MB) não é versionado. Baixe uma vez:

    mkdir -p .models && cd .models
    curl -LO https://github.com/k2-fsa/sherpa-onnx/releases/download/tts-models/kokoro-multi-lang-v1_0.tar.bz2
    tar xjf kokoro-multi-lang-v1_0.tar.bz2

Ou aponte outro caminho com a variável de ambiente KOKORO_DIR.

O script é idempotente: só regera o que mudou, comparando o hash do texto
registrado no manifesto. Itens marcados com "humano": true nunca são
sobrescritos — é assim que as gravações da mãe convivem com o sintético.
"""
import argparse
import hashlib
import json
import os
import shutil
import subprocess
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
CORPUS = RAIZ / "content" / "pt" / "corpus.json"
SAIDA = RAIZ / "audio"
MANIFESTO = SAIDA / "manifest.json"
KOKORO_DIR = Path(os.environ.get("KOKORO_DIR", RAIZ / ".models" / "kokoro-multi-lang-v1_0"))
BITRATE = "48k"


def sha(texto: str, vel: float, motor: str) -> str:
    return hashlib.sha256(f"{motor}|{vel}|{texto}".encode("utf-8")).hexdigest()[:16]


def exige(binario: str) -> None:
    if shutil.which(binario) is None:
        sys.exit(f"erro: '{binario}' não encontrado no PATH.")


class MotorKokoro:
    nome = "kokoro"

    def __init__(self, sid: int):
        try:
            import sherpa_onnx  # noqa: F401
        except ImportError:
            sys.exit("erro: falta sherpa-onnx. Rode: pip install sherpa-onnx soundfile")
        if not (KOKORO_DIR / "model.onnx").exists():
            sys.exit(f"erro: modelo Kokoro não encontrado em {KOKORO_DIR}.\n{__doc__}")
        import sherpa_onnx as so

        d = str(KOKORO_DIR)
        cfg = so.OfflineTtsConfig(
            model=so.OfflineTtsModelConfig(
                kokoro=so.OfflineTtsKokoroModelConfig(
                    model=f"{d}/model.onnx",
                    voices=f"{d}/voices.bin",
                    tokens=f"{d}/tokens.txt",
                    data_dir=f"{d}/espeak-ng-data",
                    dict_dir=f"{d}/dict",
                    lexicon=f"{d}/lexicon-us-en.txt,{d}/lexicon-zh.txt",
                ),
                num_threads=os.cpu_count() or 4,
            ),
            max_num_sentences=1,
        )
        self.tts = so.OfflineTts(cfg)
        self.sid = sid

    def sintetizar(self, texto: str, vel: float, destino: Path) -> None:
        import soundfile

        a = self.tts.generate(texto, sid=self.sid, speed=vel)
        soundfile.write(str(destino), a.samples, a.sample_rate)


class MotorEspeak:
    """Fallback sem download de modelo. Voz robótica — só para emergência."""

    nome = "espeak"

    def __init__(self, sid: int):
        exige("espeak-ng")

    def sintetizar(self, texto: str, vel: float, destino: Path) -> None:
        subprocess.run(
            ["espeak-ng", "-v", "pt-br+f3", "-s", str(int(150 * vel)), "-w", str(destino), texto],
            check=True,
            capture_output=True,
        )


def encodar(wav: Path, m4a: Path) -> float:
    """Apara o silêncio das pontas, normaliza e encoda. Devolve a duração."""
    m4a.parent.mkdir(parents=True, exist_ok=True)
    filtros = (
        "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,"
        "areverse,"
        "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,"
        "areverse,"
        "loudnorm=I=-16:TP=-1.5:LRA=11"
    )
    subprocess.run(
        ["ffmpeg", "-y", "-v", "error", "-i", str(wav), "-af", filtros,
         "-ac", "1", "-c:a", "aac", "-b:a", BITRATE, str(m4a)],
        check=True,
    )
    dur = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(m4a)],
        check=True, capture_output=True, text=True,
    ).stdout.strip()
    return round(float(dur), 3)


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--force", action="store_true", help="regera tudo, ignorando o hash")
    p.add_argument("--motor", default="kokoro", choices=["kokoro", "espeak"])
    args = p.parse_args()

    exige("ffmpeg")
    exige("ffprobe")

    corpus = json.loads(CORPUS.read_text(encoding="utf-8"))
    itens = corpus["itens"]
    ids = [i["id"] for i in itens]
    if len(ids) != len(set(ids)):
        dup = sorted({i for i in ids if ids.count(i) > 1})
        sys.exit(f"erro: ids duplicados no corpus: {dup}")

    anterior = {}
    if MANIFESTO.exists():
        anterior = json.loads(MANIFESTO.read_text(encoding="utf-8")).get("clipes", {})

    motor = {"kokoro": MotorKokoro, "espeak": MotorEspeak}[args.motor](corpus["voz"]["sid"])
    tmp = SAIDA / ".tmp"
    tmp.mkdir(parents=True, exist_ok=True)

    manifesto, gerados, mantidos, humanos = {}, 0, 0, 0
    for item in itens:
        ident, texto = item["id"], item["texto"]
        vel = float(item.get("vel", 0.9))
        arquivo = f"{ident}.m4a"
        h = sha(texto, vel, motor.nome)
        velho = anterior.get(ident)

        if velho and velho.get("origem") == "humano":
            manifesto[ident] = velho
            humanos += 1
            continue
        if not args.force and velho and velho.get("sha") == h and (SAIDA / arquivo).exists():
            manifesto[ident] = velho
            mantidos += 1
            continue

        wav = tmp / "s.wav"
        motor.sintetizar(texto, vel, wav)
        dur = encodar(wav, SAIDA / arquivo)
        manifesto[ident] = {"arquivo": arquivo, "duracao": dur, "sha": h,
                            "origem": "tts", "texto": texto}
        gerados += 1
        print(f"  gerado  {ident:24s} {dur:5.2f}s")

    shutil.rmtree(tmp, ignore_errors=True)

    orfaos = [f for f in SAIDA.rglob("*.m4a")
              if str(f.relative_to(SAIDA)) not in {c["arquivo"] for c in manifesto.values()}]
    for f in orfaos:
        f.unlink()

    MANIFESTO.write_text(
        json.dumps({"versao": 1, "voz": corpus["voz"], "clipes": manifesto},
                   ensure_ascii=False, indent=1) + "\n",
        encoding="utf-8",
    )
    total = sum((SAIDA / c["arquivo"]).stat().st_size for c in manifesto.values())
    print(f"\n{len(manifesto)} clipes | {gerados} gerados, {mantidos} reaproveitados, "
          f"{humanos} humanos preservados, {len(orfaos)} órfãos removidos")
    print(f"total: {total/1024:.0f} KB")


if __name__ == "__main__":
    main()
