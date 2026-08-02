# Pipeline e comandos reproduzíveis — P0C-04 v2

## Escopo

Correção técnica do master chroma P0C-04 v1. Nenhuma geração de imagem foi feita. O pipeline usa somente Python `3.14.6`/stdlib, não instala dependência e não toca app, PWA ou lote v1.

## Entradas imutáveis

- `../p0c/masters/P0C-04-marker-chroma-master-v1.png`: `ee75524401f3f4b8c4fddf855c6f69b94824fb1a80ac301c1971273b2f8fe930`.
- `../p0a-v2/p0a-model-sheet-v2-master-1254.png`: `43a42dc4dcb413ea27c1df6a798e2de59039c1646b87d3ffd4ed154f6cd7c2e4`.
- `../p0a-v2/p0a-anchor-front-v2-512.webp`: `7b210ece4e69cce646cd3a64830ccf5f32d8d27d15257a9e1cc77c597a7e99fc`.
- `../p0a-v2/p0a-anchor-3q-v2-512.webp`: `ada5e022a7185c075d41b59c954007d0abd8e333b311ea5c15a3c42c8f96a1ff`.

O script aborta se qualquer hash divergir.

## Comandos canônicos

Executar na raiz do repositório:

```bash
python3 docs/agent-loop/portugues/evidencias/p0c-v2/PROCESSAMENTO_P0C_V2.py build \
  --evidence-root docs/agent-loop/portugues/evidencias \
  --output docs/agent-loop/portugues/evidencias/p0c-v2

python3 docs/agent-loop/portugues/evidencias/p0c-v2/PROCESSAMENTO_P0C_V2.py verify \
  --evidence-root docs/agent-loop/portugues/evidencias \
  --output docs/agent-loop/portugues/evidencias/p0c-v2
```

Reprodução independente usada nesta execução:

```bash
python3 docs/agent-loop/portugues/evidencias/p0c-v2/PROCESSAMENTO_P0C_V2.py build \
  --evidence-root docs/agent-loop/portugues/evidencias \
  --output /private/tmp/lumon-p0c-v2-repro-pt-20260802T032346Z
```

Resultado: 8/8 arquivos gerados comparados byte a byte, zero divergência.

## Método técnico versionado

1. Decodificar o PNG RGB 1254² sem biblioteca externa.
2. Localizar o maior componente conectado da personagem contra `#FF00FF`, limiar de distância 28.
3. Erodir 1 px em alta resolução; deixar master com alpha binário `0/255` e remover cores residuais magenta por doador opaco próximo.
4. Redimensionar master para 256² com Lanczos3 separável em RGBA premultiplicado.
5. Zerar alpha `<=8`, promover alpha `>=247` para `255` e forçar a região erodida em 3 px da máscara `alpha>8` a `alpha=255`.
6. Quantizar sem `prebucket`: 224 cores opacas + 31 cores de borda, com `tRNS`, `gAMA=0,45455`, `sRGB` e zlib nível 9.
7. Gerar quatro fundos lendo diretamente o RGBA/`tRNS` do export canônico, sem chroma-key.
8. Derivar 64/48 diretamente do export canônico com o mesmo Lanczos3 premultiplicado, sem nova extração.

Predicado conservador de resíduo magenta: pixel não transparente com `r>=80`, `b>=45` e `min(r,b)-g>=25`. O aceite exige contagem zero, além de zero `RGB(255,0,255)` e zero `RGB(0,255,0)`.

## Saídas

- `masters/P0C-04-marker-transparent-master-v2.png`.
- `exports/P0C-04-marker-256-v2.png`.
- `reviews/P0C-04-alpha-backgrounds-v2.png`.
- `reviews/P0C-04-marker-64-proof-v2.png`.
- `reviews/P0C-04-marker-48-proof-v2.png`.
- `reviews/P0C-04-marker-reduction-proof-v2.png`.
- `reviews/P0C-04-alpha-interior-proof-v2.png`.
- `METRICAS_P0C_V2.json`.

`P0C-04-alpha-interior-proof-v2.png` usa branco para borda visível e verde somente para interior erodido/opaco; é prova, não arte distribuível.
