# Avaliação do artista — lote P0c v1

## Resultado

`CANDIDATO EM REVISÃO`, sem autoaprovação. Lote entrega ícone PWA 512, derivadas 192/96/48/32/16 e marcador transparente 256. Nenhum asset atual do app foi substituído.

Referência exclusiva: `capivara-model-v1` P0a v2. Ícone e marcador vieram de chamadas built-in independentes; nenhum P0b ou P0c serviu de referência generativa.

## Inspeção visual

| Critério | Evidência | Resultado do artista |
|---|---|---|
| identidade P0a | focinho largo claro, olho pequeno, orelhas pequenas, pelo marrom, lenço verde-petróleo e medalhão dourado sem símbolo | CONFORME |
| ícone neutro | pose 3/4 acolhedora, sem prêmio, estado, resposta ou emoção punitiva | CONFORME |
| centro seguro | master do ícone reduzido para 400 e centralizado em 512; quatro máscaras preservam rosto, orelhas, focinho, lenço e medalhão | CONFORME |
| leitura reduzida | prova nativa em 512, 192, 96, 48, 32 e 16; silhueta/rosto permanecem reconhecíveis | CONFORME |
| marcador neutro | quadrúpede em pé, patas curtas, nenhuma indicação de concluído/bloqueado/revisão | CONFORME |
| margem do marcador | bbox alpha `60,49–202,193` em 256; menor margem `49 px = 19,1%`, acima de 12% | CONFORME |
| alpha/fundos | prova em `#FFF9F1`, branco, Matemática e Português; sem halo magenta ou pixels isolados perceptíveis | CONFORME |
| proibições | sem texto, pseudoalfabeto, número, logo, marca-d'água, cauda, mão humana, dedos, bipedalismo, segunda mascote ou pista | CONFORME |

O recorte inferior do corpo no ícone é decorativo e próprio de medalhão/portrait; elementos essenciais ficam preservados nas quatro máscaras. Marcador possui `alt=""`; estado acessível continua responsabilidade de `StageNode`.

## Inspeção técnica e budgets

| Ticket | Arquivo | Dimensão | Bytes | Teto | Resultado |
|---|---|---:|---:|---:|---|
| P0C-01 | `P0C-01-icon-512-v1.png` | 512×512 | 37.370 | 80.000 | PASSOU por 42.630 |
| P0C-02 | `P0C-02-icon-192-v1.png` | 192×192 | 6.441 | 25.000 | PASSOU por 18.559 |
| P0C-03A | `P0C-03A-favicon-48-v1.png` | 48×48 | 713 | 7.000 | PASSOU por 6.287 |
| P0C-03B | `P0C-03B-shortcut-96-v1.png` | 96×96 | 1.625 | 3.000 | PASSOU por 1.375 |
| P0C-04 | `P0C-04-marker-256-v1.png` | 256×256 | 11.089 | 25.000 | PASSOU por 13.911 |
| **Tickets P0c** | — | — | **57.238** | **140.000** | **PASSOU por 82.762** |
| **Com 32/16** | — | — | **57.901** | **140.000** | **PASSOU por 82.099** |

- cada asset distribuível fica abaixo de `150.000` bytes;
- ícones são PNG indexados RGB 8-bit, opacos, com `gAMA` e `sRGB`;
- marcador é PNG indexado com `tRNS`, alpha real, `gAMA` e `sRGB`;
- master transparente é PNG RGBA 8-bit lossless;
- masters editoriais não entram automaticamente no app;
- pipeline: `sips-316`, Python `3.14.6`, somente stdlib, script versionado `PROCESSAMENTO_P0C_V1.py`;
- nenhuma dependência do app foi instalada ou alterada.

## Evidência por classe

### TESTADO

- raiz, branch, claim, heartbeat do mesmo run, lock, worktree e reinício idempotente;
- remoto ao vivo antes da geração e hashes das três referências P0a v2;
- master P0a e âncoras frontal/3/4 inspecionados;
- duas gerações built-in independentes reutilizadas após interrupção, sem duplicação;
- identidade, anatomia, emoção neutra, proibições e ausência de estado pedagógico;
- máscaras circular, squircle, rounded square e Android maskable;
- leitura do ícone em 512/192/96/48/32/16;
- alpha do marcador em quatro fundos e leitura em 256/64/48;
- MIME, dimensões, bytes, SHA-256, canais, alpha, sRGB e budgets;
- zero alteração fora de `docs/agent-loop/portugues/evidencias/p0c/`.

### FALHOU

- tentativa inicial de usar Pillow no ambiente temporário falhou por rede e foi rejeitada na escalada; nenhuma instalação ou alteração de repositório ocorreu;
- nenhum critério objetivo do lote canônico falhou após uso do pipeline nativo/stdlib;
- primeira extração local de alpha exibiu borda verde e foi rejeitada antes da canonização; algoritmo final usa cor de doador opaco até 3 px e prova sem halo perceptível.

### NAO TESTADO

- manifesto, service worker, HTML, CSS, JS e cache apontando para estes candidatos;
- instalação real em Android, desktop, iOS/Safari e captura do ícone instalado;
- cache offline, atualização PWA, coerência de release e `transferSize` frio;
- shell visual/frio real, porque o app não pode ser alterado neste gate;
- leitor de tela, teclado, toque, foco, zoom 200%, safe-area insets e contraste do componente;
- teste com crianças/responsáveis e atratividade medida;
- busca reversa ampla, parecer jurídico, exclusividade, opt-out concreto e retenção específica do built-in;
- repetição generativa pixel a pixel; modelo, versão, seed e parâmetros não são expostos.

### INFERIDO

- direção visual provavelmente adequada ao público infantil;
- identidade tende a permanecer reconhecível em launchers reais;
- safe area comprovada nas máscaras sintéticas tende a sobreviver às máscaras de plataformas, mas instalação real ainda é obrigatória.

Nenhuma inferência aprova integração, PWA, shell, experiência infantil ou licença absoluta.

## Pendências e recomendação

- supervisor deve revisar identidade contra P0a v2, máscaras, redução, alpha, neutralidade, hashes, budgets e limitações;
- integração futura deve usar estes arquivos somente após aprovação e autorização de implementação;
- ícone atual, favicon atual, manifesto e service worker permanecem intactos;
- shell frio e instalação continuam bloqueantes no gate de build.

**Recomendação:** supervisão independente P0c com `lumon-supervisao-final`. Artista não autoaprova.
