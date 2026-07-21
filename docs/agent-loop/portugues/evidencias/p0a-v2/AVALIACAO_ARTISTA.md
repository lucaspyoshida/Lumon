# Avaliação do artista — lote P0a v2

## Resultado

`CANDIDATO EM REVISÃO`, sem autoaprovação. O lote v2 corrige a pose 6, publica master lossless no repositório, entrega WebP dentro dos tetos e registra termos/proveniência disponíveis. P0b e P0c não foram iniciados.

## Correções contra o relatório supervisor

| Problema anterior | Evidência v2 | Estado do artista |
|---|---|---|
| P0 — licença e termos ausentes | `LICENCA_E_TERMOS_OPENAI_2026-07-21.md` registra fontes oficiais, propriedade do output, uso de conteúdo, retenção e limitações | ENDEREÇADO; decisão jurídica final não alegada |
| P1 — master lossless fora do Git | `p0a-model-sheet-v2-master-1254.png`, ID por SHA-256, sem dependência do master v1 externo | ENDEREÇADO quando commit remoto for confirmado |
| P1 — pose 6 ambígua | folha v2 e `p0a-pose-reach-v2-512.webp` mostram pata dianteira curta em espaço vazio, com três patas de apoio | ENDEREÇADO visualmente |
| P2 — proveniência técnica incompleta | ferramenta, modo, input, output ID, hashes, datas e pós-processamento registrados; campos não expostos permanecem explícitos | ENDEREÇADO no limite real da interface; não reproduzível pixel a pixel |
| P2 — JPEG sem comparação/WebP | folha e três recortes entregues em WebP real, com ICC sRGB, dimensões, bytes e hashes | ENDEREÇADO |

## Inspeção visual

| Critério | Resultado | Evidência |
|---|---|---|
| pose 6 de alcance curto | CONFORME | uma forepata arredondada avança para espaço vazio; membro permanece curto; três patas apoiam o corpo |
| quadrupedal e sem mãos humanas | CONFORME | sem palma, polegar, dedos abertos, braço humano ou postura bípede |
| espécie e silhueta | CONFORME | doze células preservam corpo baixo/arredondado e leitura de capivara |
| focinho, olhos e orelhas | CONFORME | focinho largo claro, olhos pequenos e orelhas pequenas recorrentes |
| lenço e medalhão | CONFORME | lenço verde-petróleo e medalhão circular dourado estáveis, sem símbolo interno |
| cauda visível | CONFORME | vista posterior mantém silhueta sem cauda |
| emoções seguras | CONFORME | nenhuma culpa, tristeza punitiva, vergonha ou reprovação |
| texto, número, logo, marca-d'água ou pista | CONFORME | nenhum elemento proibido observado |
| corpo inteiro e padding | CONFORME | folha e recortes preservam orelhas, focinho, patas, lenço e medalhão |
| leitura reduzida | CONFORME na inspeção do artista | âncoras e recorte da pose foram reduzidos a 48 px; identidade permanece reconhecível |

## Inspeção técnica

| Arquivo | Formato | Dimensão | Bytes | Teto | Resultado |
|---|---|---:|---:|---:|---|
| `p0a-model-sheet-v2-master-1254.png` | PNG lossless/RGB | 1254×1254 | 1.498.937 | fonte editorial, não distribuída | CANÔNICO POR ID/HASH |
| `p0a-model-sheet-v2-review-1536.webp` | WebP/RGB/sRGB | 1536×1536 | 144.584 | 150.000 | PASSOU por 5.416 bytes |
| `p0a-anchor-front-v2-512.webp` | WebP/RGB/sRGB | 512×512 | 11.806 | 90.000 | PASSOU |
| `p0a-anchor-3q-v2-512.webp` | WebP/RGB/sRGB | 512×512 | 13.286 | 90.000 | PASSOU |
| `p0a-pose-reach-v2-512.webp` | WebP/RGB/sRGB | 512×512 | 12.470 | 90.000 | PASSOU |

- O master PNG é a fonte lossless selecionada e não integra o bundle do app.
- Os WebP foram derivados uma única vez do master com Sharp `0.34.4`, libvips `8.17.2` e libwebp `1.6.0`.
- A folha usa qualidade `88`; os três recortes usam qualidade `90`.
- Os WebP possuem perfil ICC sRGB e não possuem alfa; transparência não é necessária neste P0a.
- Busca por strings não encontrou autor, GPS, coordenadas, caminho local ou identificador pessoal.
- Todos os hashes, operações de recorte e parâmetros disponíveis constam no `MANIFEST.yaml`.

## Evidência por classe

### TESTADO

- master e quatro WebP inspecionados em resolução original;
- presença das 12 células, identidade geral, anatomia, pose 6, emoções, texto/marca/pista, recortes e padding;
- forepata de alcance curta, compacta e separada do chão, com três patas de apoio;
- redução das âncoras e da pose de alcance para 48 px;
- MIME, dimensões, bytes, SHA-256, canais, alfa, sRGB e ICC;
- budgets da folha e dos três recortes;
- ausência básica de metadados privados;
- referência de entrada veio somente do Git; master v1 externo não foi usado;
- P0b, P0c, app, código, CSS, PWA e conteúdo ficaram fora do lote.

### FALHOU

- Nenhuma falha objetiva encontrada pelo artista nos critérios do retrabalho P0a v2.

### NÃO TESTADO

- validação com crianças;
- integração, responsividade, leitores de tela, impressão, app e PWA;
- busca reversa ampla, exclusividade e revisão jurídica;
- correspondência colorimétrica pixel a pixel com os HEX documentados;
- configuração de opt-out/treinamento da conta Codex;
- retenção específica do output transitório do `image_gen` built-in;
- repetição pixel a pixel, pois modelo, versão, seed e parâmetros determinísticos não foram expostos;
- P0b e P0c.

### INFERIDO

- adequação provável como referência editorial infantil;
- originalidade aparente, sem garantia jurídica;
- estabilidade provável das âncoras para derivação futura, sujeita à supervisão independente.

## Licença e proveniência

Os Terms of Use oficiais efetivos em `2026-01-01` atribuem ao usuário, entre as partes e nos limites da lei, a propriedade do output. Isso sustenta uso do asset no projeto e eventual uso comercial, sujeito à responsabilidade do usuário, direitos de terceiros, políticas e revisão humana. As mesmas fontes alertam que outputs podem não ser únicos e não oferecem garantia de não infração.

Para serviços individuais, OpenAI informa que conteúdo pode ser usado para melhoria do modelo salvo opt-out; Codex tem controles próprios. Esta execução não inspecionou a configuração da conta. O risco é reduzido porque o prompt não contém dado infantil/pessoal e a única referência é arte própria do Lumon.

## Limites e recomendação

O artista não aprova gate. Recomendo nova supervisão independente exclusivamente do P0a v2, com foco em anatomia da pose 6, consistência das âncoras, suficiência dos termos/licença, master remoto, proveniência disponível e budgets WebP. P0b permanece bloqueado até veredito publicado.
