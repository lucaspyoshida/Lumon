# Avaliação do artista — lote P0b v1

## Resultado

`CANDIDATO EM REVISÃO`, sem autoaprovação. Cinco assets globais foram derivados diretamente de `capivara-model-v1`, recortados com alfa e exportados em WebP. Soma distribuída: **135.056 bytes**, abaixo do teto agregado de **300.000 bytes**.

## Inspeção visual e funcional

| Asset | Critério principal | Evidência | Resultado do artista |
|---|---|---|---|
| P0B-01 boas-vindas | acolhimento sem gesto humano | sentada, sorriso leve, pata compacta junto ao corpo | CONFORME |
| P0B-02 ouvir | área negativa e alcance animal | margem esquerda 198/512 px = 38,7%; três apoios; pata curta | CONFORME |
| P0B-03 acerto | celebração segura | olhos em arco, sorriso discreto, patas compactas | CONFORME |
| P0B-04 tentar de novo | incentivo sem punição | expressão neutra-positiva; sem tristeza, culpa ou reprovação | CONFORME |
| P0B-05 conclusão | composição responsiva | bbox 469×456 px no canvas 1024×768; margens 267/159/288/153 px | CONFORME |

Identidade preservada nos cinco: pelo marrom quente, focinho largo claro, olhos pequenos, orelhas pequenas, lenço verde-petróleo, medalhão dourado circular sem símbolo e silhueta de capivara. Não foram observados texto, números, logos, marcas-d'água, cauda, pista pedagógica, mãos humanas ou dedos abertos.

## Inspeção técnica

| Asset | Dimensão | Bytes | Teto individual | Margem | Resultado |
|---|---:|---:|---:|---:|---|
| P0B-01 | 512×512 | 21.072 | 70.000 | 48.928 | PASSOU |
| P0B-02 | 512×512 | 22.710 | 50.000 | 27.290 | PASSOU |
| P0B-03 | 512×512 | 23.530 | 45.000 | 21.470 | PASSOU |
| P0B-04 | 512×512 | 26.488 | 45.000 | 18.512 | PASSOU |
| P0B-05 | 1024×768 | 41.256 | 90.000 | 48.744 | PASSOU |
| **Soma** | — | **135.056** | **300.000** | **164.944** | **PASSOU** |

- masters de geração: PNG lossless RGB com chroma magenta;
- masters canônicos recortados: PNG lossless RGBA;
- transparência: helper oficial da skill, `auto-key border`, `soft-matte`, thresholds `12/220`, `despill` e única correção `edge-contract 1`;
- distribuição: WebP RGBA, qualidade `90`, alpha quality `100`, `smartSubsample`, effort `6`, perfil ICC sRGB;
- cantos: transparentes; todos os exports possuem alfa;
- chroma residual semelhante a magenta: 0, 1, 0, 2 e 7 pixels respectivamente em centenas de milhares de pixels; nenhuma borda rosa perceptível nas quatro cores de prova;
- nenhum asset supera 150.000 bytes.

## Acessibilidade proposta

| Asset | Papel | Texto alternativo/canal equivalente recomendado |
|---|---|---|
| P0B-01 | decorativo | `alt=""` |
| P0B-02 | funcional quando aponta o controle | `Capivara aponta para o botão Ouvir` |
| P0B-03 | decorativo; o feedback textual/sonoro informa acerto | `alt=""` |
| P0B-04 | funcional somente se o gesto carregar a ação | `Capivara convida a tentar de novo` |
| P0B-05 | decorativo; conclusão deve existir em texto/áudio | `alt=""` |

O canal equivalente deve ser o rótulo acessível do controle ou a mensagem textual/sonora do estado, nunca a interpretação da ilustração como única fonte.

## Evidência por classe

### TESTADO

- inspeção visual individual em resolução original;
- alfa sobre `#fff9f1`, branco, `#176b87` e `#8a3d78` em `reviews/P0B-alpha-backgrounds-v1.png`;
- leitura em 256, 192, 96 e 48 px em `reviews/P0B-reduced-proof-v1.png`;
- P0B-05 contido em equivalentes proporcionais de 360×640, 390×844, 768×1024, 1280×720 e 844×390 em `reviews/P0B-05-responsive-proof-v1.png`;
- anatomia, identidade, emoções, ausência de texto/pista/marca e áreas negativas;
- MIME, dimensões, bytes, hashes, canais, alfa, sRGB, ICC e budgets;
- nenhum dado pessoal no prompt; termos/proveniência registrados;
- cada candidato selecionado derivado diretamente das três referências P0a v2.

### FALHOU

- primeira passagem de geração: deriva de olhos/identidade e membros excessivamente humanos em candidatos rejeitados;
- primeira extração alpha: halo fino de chroma; corrigido na única repetição autorizada com `edge-contract 1`;
- nenhuma falha objetiva remanescente encontrada pelo artista no lote canonizado.

### NÃO TESTADO

- integração real, CSS, leitores de tela e PWA;
- testes com crianças e responsáveis;
- navegação real por teclado/toque;
- recorte `cover` imposto por implementação futura; a prova usa composição `contain` segura;
- busca reversa ampla e revisão jurídica;
- configuração de opt-out e retenção específica do built-in;
- P0c.

### INFERIDO

- adequação provável dos assets ao produto infantil, sujeita à supervisão;
- originalidade aparente, sem garantia jurídica;
- P0B-02 comunica escuta quando adjacente ao controle Ouvir; isoladamente é um gesto de alcance;
- P0B-04 comunica nova tentativa quando acompanhado da mensagem/ação equivalente.

## Recomendação

O artista não aprova o gate. Recomendo supervisão independente do P0b, com foco em identidade contra `capivara-model-v1`, anatomia de P0B-02, neutralidade de P0B-04, área segura de P0B-05, alfa, budgets, acessibilidade e suficiência da proveniência. P0c permanece fora de escopo.
