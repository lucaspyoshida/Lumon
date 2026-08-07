#!/usr/bin/env python3
"""Gera o pacote de conteúdo da Etapa 1 de Português (palavra, imagem e som).

Produz os três itens que bloqueavam a etapa:
  - áudio pt-BR sintetizado (voz Kokoro pf_dora);
  - imagens pedagógicas (Noto Emoji, Apache 2.0);
  - o microcorpus em si, com os itens já no contrato do módulo.

O modelo Kokoro (~350 MB) não é versionado. Baixe uma vez:

    mkdir -p .models && cd .models
    curl -LO https://github.com/k2-fsa/sherpa-onnx/releases/download/tts-models/kokoro-multi-lang-v1_0.tar.bz2
    tar xjf kokoro-multi-lang-v1_0.tar.bz2

Uso: python3 scripts/build-portuguese-content.py [--force]
"""
import argparse
import hashlib
import json
import os
import shutil
import subprocess
import sys
import urllib.request
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
AUDIO = RAIZ / "audio" / "pt"
IMAGENS = RAIZ / "images" / "pt"
PACOTE = RAIZ / "content" / "portugues" / "etapa-1" / "package.json"
KOKORO = Path(os.environ.get("KOKORO_DIR", RAIZ / ".models" / "kokoro-multi-lang-v1_0"))
SID = 43
NOTO = "https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/128/emoji_u{cp}.png"

PACKAGE_ID = "portugues-etapa-1"
PACKAGE_VERSION = "1.0.0"
CONTENT_VERSION = "pt-e1-v1"

# Palavras do universo infantil, concretas e representáveis por imagem.
# `transfer` marca os itens que contam como transferência para o domínio:
# a criança precisa acertar pelo menos cinco deles, e eles nunca aparecem
# nas primeiras sessões, para que domínio não seja memorização de ordem.
PALAVRAS = [
    ("bola", "26bd", False), ("pato", "1f986", False), ("gato", "1f431", False),
    ("sapo", "1f438", False), ("vaca", "1f404", False), ("luva", "1f9e4", False),
    ("fada", "1f9da", False), ("foca", "1f9ad", False), ("dado", "1f3b2", False),
    ("mala", "1f9f3", False), ("cama", "1f6cf", False), ("casa", "1f3e0", False),
    ("coco", "1f965", False), ("copo", "1f964", False), ("rato", "1f42d", False),
    ("rosa", "1f339", False),
    ("chave", "1f511", True), ("lua", "1f319", True), ("bota", "1f462", True),
    ("sino", "1f514", True), ("uva", "1f347", True), ("pipa", "1fa81", True),
    ("bolo", "1f382", True), ("peixe", "1f41f", True),
]

FALAS = [
    ("ui/instrucao", "Escute a palavra e toque na figura certa.", 0.92),
    ("ui/repetir", "Ouça de novo.", 0.92),
    ("ui/celebrate-1", "Muito bem!", 0.95),
    ("ui/celebrate-2", "Isso mesmo!", 0.95),
    ("ui/celebrate-3", "Você conseguiu!", 0.95),
    ("ui/retry-1", "Quase! Escute mais uma vez.", 0.95),
    ("ui/retry-2", "Tudo bem, vamos ouvir de novo.", 0.95),
    ("ui/hint", "Olhe com calma. Qual figura combina com o som?", 0.95),
    ("ui/fim", "Acabou! Você praticou bastante.", 0.95),
]


def exige(binario):
    if shutil.which(binario) is None:
        sys.exit(f"erro: '{binario}' não encontrado no PATH.")


def sha256(caminho):
    return hashlib.sha256(Path(caminho).read_bytes()).hexdigest()


def motor_kokoro():
    try:
        import sherpa_onnx as so
    except ImportError:
        sys.exit("erro: falta sherpa-onnx. Rode: pip install sherpa-onnx soundfile")
    if not (KOKORO / "model.onnx").exists():
        sys.exit(f"erro: modelo Kokoro não encontrado em {KOKORO}.\n{__doc__}")
    d = str(KOKORO)
    cfg = so.OfflineTtsConfig(
        model=so.OfflineTtsModelConfig(
            kokoro=so.OfflineTtsKokoroModelConfig(
                model=f"{d}/model.onnx", voices=f"{d}/voices.bin", tokens=f"{d}/tokens.txt",
                data_dir=f"{d}/espeak-ng-data", dict_dir=f"{d}/dict",
                lexicon=f"{d}/lexicon-us-en.txt,{d}/lexicon-zh.txt"),
            num_threads=os.cpu_count() or 4),
        max_num_sentences=1)
    return so.OfflineTts(cfg)


def sintetizar(tts, texto, vel, destino):
    import soundfile
    tmp = destino.parent / ".tmp.wav"
    destino.parent.mkdir(parents=True, exist_ok=True)
    a = tts.generate(texto, sid=SID, speed=vel)
    soundfile.write(str(tmp), a.samples, a.sample_rate)
    filtros = (
        "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,"
        "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,"
        "loudnorm=I=-16:TP=-1.5:LRA=11"
    )
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(tmp), "-af", filtros,
                    "-ac", "1", "-c:a", "aac", "-b:a", "48k", str(destino)], check=True)
    tmp.unlink(missing_ok=True)


def baixar_imagem(codepoint, destino):
    destino.parent.mkdir(parents=True, exist_ok=True)
    url = NOTO.format(cp=codepoint)
    req = urllib.request.Request(url, headers={"User-Agent": "lumon-build"})
    with urllib.request.urlopen(req, timeout=60) as r:
        dados = r.read()
    if len(dados) > 150_000:
        sys.exit(f"erro: imagem {codepoint} passa de 150.000 bytes")
    destino.write_bytes(dados)


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--force", action="store_true")
    args = p.parse_args()
    exige("ffmpeg")

    tts = motor_kokoro()
    AUDIO.mkdir(parents=True, exist_ok=True)
    IMAGENS.mkdir(parents=True, exist_ok=True)

    print("imagens…")
    for palavra, cp, _ in PALAVRAS:
        destino = IMAGENS / f"{palavra}.png"
        if args.force or not destino.exists():
            baixar_imagem(cp, destino)
    print(f"  {len(PALAVRAS)} imagens")

    print("áudio das palavras…")
    for palavra, _, _ in PALAVRAS:
        destino = AUDIO / "palavra" / f"{palavra}.m4a"
        if args.force or not destino.exists():
            sintetizar(tts, palavra, 0.85, destino)

    print("áudio da interface…")
    for ident, texto, vel in FALAS:
        destino = AUDIO / f"{ident}.m4a"
        if args.force or not destino.exists():
            sintetizar(tts, texto, vel, destino)

    # --- microcorpus ---------------------------------------------------------
    # Distratores fixos e revisados: conteúdo aprovado não pode variar a cada
    # execução, senão a aprovação não significa nada. São escolhidos entre
    # palavras de sonoridade distante, para que o erro indique falha de
    # compreensão e não ambiguidade do exercício.
    nomes = [p for p, _, _ in PALAVRAS]
    itens = []
    for indice, (palavra, _, transfer) in enumerate(PALAVRAS):
        distratores = [nomes[(indice + salto) % len(nomes)] for salto in (5, 11)]
        opcoes = sorted({palavra, *distratores})
        itens.append({
            "id": f"P1-oral-{palavra}",
            "skillId": "P1.oral-vocabulary",
            "approvalState": "approved",
            "transferRole": "transfer-candidate" if transfer else "core",
            "word": palavra,
            "prompt": {"type": "audio", "audioId": f"palavra/{palavra}"},
            "response": {
                "type": "choice",
                "options": [{"id": o, "image": f"images/pt/{o}.png", "label": o} for o in opcoes],
            },
            "answer": palavra,
        })

    pacote = {
        "packageId": PACKAGE_ID,
        "packageVersion": PACKAGE_VERSION,
        "contentVersion": CONTENT_VERSION,
        "stageId": "palavra-imagem-som",
        "audioBasePath": "audio/pt",
        "voice": {"engine": "kokoro-v1.0", "voice": "pf_dora", "language": "pt-BR",
                  "origin": "sintetizado", "license": "Apache-2.0"},
        "images": {"source": "Noto Emoji", "license": "Apache-2.0",
                   "url": "https://github.com/googlefonts/noto-emoji"},
        "ui": {ident.split("/")[1]: f"{ident}" for ident, _, _ in FALAS},
        "items": itens,
    }
    PACOTE.parent.mkdir(parents=True, exist_ok=True)
    PACOTE.write_text(json.dumps(pacote, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    total_audio = sum(f.stat().st_size for f in AUDIO.rglob("*.m4a"))
    total_img = sum(f.stat().st_size for f in IMAGENS.glob("*.png"))
    print(f"\n{len(itens)} itens | áudio {total_audio/1024:.0f} KB | imagens {total_img/1024:.0f} KB")
    print(f"pacote: {PACOTE.relative_to(RAIZ)}")


if __name__ == "__main__":
    main()
