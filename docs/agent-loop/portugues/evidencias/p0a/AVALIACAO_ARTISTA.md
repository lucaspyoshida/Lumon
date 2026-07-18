# Avaliação do artista — lote P0a

## Resultado do lote

`CANDIDATO EM REVISÃO`, sem autoaprovação. A segunda geração corrige as mãos humanas e a marca semelhante a cauda da primeira. O lote visual é coerente com a especificação, mas há falha objetiva de formato: os três exports são JPEG, não WebP. Cabe ao supervisor decidir `APROVADO` ou `RETRABALHO`.

## Seleção de candidato

- Rejeitado: `260a6a94...a13070b`. Havia mãos/dedos humanos nos gestos de alcance, boas-vindas e nova tentativa, além de marca semelhante a cauda na vista traseira.
- Selecionado: `7cd643f6...b69de45`. Edição dirigida manteve identidade, paleta e layout; removeu mãos humanas e cauda visível.
- Fonte selecionada não commitada por peso (`1.789.258 bytes`). Caminho e hash completos constam no `MANIFEST.yaml`.

## Inspeção visual

| Critério | Resultado | Evidência |
|---|---|---|
| espécie e silhueta baixa/arredondada | CONFORME | 12 poses permanecem reconhecíveis como capivara |
| focinho claro e largo | CONFORME | estável nas vistas frontal, 3/4, lateral e expressivas |
| olhos pequenos e calmos | CONFORME | sem olhos gigantes ou expressão ameaçadora |
| orelhas pequenas e arredondadas | CONFORME | estáveis nas vistas onde visíveis |
| patas curtas, sem mãos humanas | CONFORME após correção | candidata selecionada não apresenta palmas, polegares ou dedos abertos |
| cauda visível | CONFORME após correção | vista traseira sem marca de cauda |
| lenço verde-petróleo | CONFORME | acessório constante; sem estampa |
| medalhão circular dourado | CONFORME | subordinado ao rosto, sem símbolo interno |
| consistência de identidade | CONFORME | focinho, olhos, orelhas, pelo, lenço e medalhão recorrentes |
| emoções seguras e não punitivas | CONFORME | acolhimento, escuta, fala, sucesso contido, incentivo e conclusão |
| texto, marca, resposta ou pista | CONFORME | nenhuma palavra, número, logo, objeto pedagógico ou pista visível |
| margem e corpo inteiro | CONFORME | poses contidas; âncoras sem corte de cabeça, patas ou acessórios |
| sem imitação declarada | CONFORME ao prompt | nenhum artista, estúdio, app, mascote ou franquia foi referenciado |
| correspondência exata dos HEX | NÃO AVALIÁVEL | geração raster não garante igualdade colorimétrica pixel a pixel |
| originalidade jurídica exaustiva | NÃO TESTADO | exige revisão humana/jurídica fora do escopo técnico |

## Inspeção técnica

| Arquivo | Dimensão | Formato | Bytes | Teto | Resultado |
|---|---:|---|---:|---:|---|
| `p0a-model-sheet-v1-review-1536.jpg` | 1536×1536 | JPEG/sRGB | 146.959 | 150.000 | PASSOU por 3.041 bytes |
| `p0a-anchor-front-v1-512.jpg` | 512×512 | JPEG/sRGB | 38.232 | 90.000 | PASSOU |
| `p0a-anchor-3q-v1-512.jpg` | 512×512 | JPEG/sRGB | 43.506 | 90.000 | PASSOU |

- `TESTADO`: `file`, `wc -c`, `shasum -a 256` e `sips` confirmaram MIME efetivo, dimensões, sRGB e ausência de alfa.
- `TESTADO`: âncoras reamostradas localmente para 256, 192, 96 e 48 px. Silhueta, focinho, olhos, orelhas, lenço e medalhão permaneceram reconhecíveis em inspeção visual até 48 px.
- `TESTADO`: busca de strings/metadados não encontrou autor, GPS, coordenadas, caminho local ou identificador pessoal. O JPEG contém apenas perfil sRGB e marcador técnico `Photoshop 3.0` observado pelo inspetor.
- `FALHOU`: WebP não foi produzido. `sips` não codifica WebP neste ambiente; a tentativa de canvas Chromium foi barrada pela política de sandbox. Não houve contorno dessa restrição.
- `RESSALVA`: a folha foi gerada nativamente em 1254×1254 e ampliada deterministicamente para o export de revisão em 1536×1536.
- `RESSALVA`: o export da folha ficou apenas 3.041 bytes abaixo do teto; qualquer regravação exige nova checagem bloqueante.

## Evidência por classe

- `TESTADO`: presença/ausência visual, dimensões, formato real, bytes, hashes, perfil de cor, alfa, downscales e inspeção básica de metadados.
- `INFERIDO`: adequação provável para referência editorial infantil, com base em expressão, legibilidade e aderência documental.
- `NÃO TESTADO`: avaliação com crianças, integração no produto, impressão, leitores de tela, validação jurídica, termos/retensão da ferramenta e comparação exaustiva contra identidades protegidas.
- `FALHOU`: formato WebP solicitado não entregue.

## Limites e recomendação

Não houve implementação do app, asset P0b/P0c, ícone, conteúdo pedagógico, CSS ou PWA. O artista não libera o gate. Recomendo revisão do supervisor com foco em: desvio JPEG/WebP, consistência anatômica das 12 poses, artefatos de recorte/padding das âncoras, originalidade visual e estreita margem do budget da folha.
