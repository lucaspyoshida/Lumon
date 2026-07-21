# Prompts e seleção — lote P0b v1

## Estratégia comum

Cada imagem foi gerada em uma chamada independente do `image_gen` integrado, sempre com três referências canônicas P0a v2: o model sheet completo, a âncora frontal e a âncora em três quartos. Nenhuma saída P0b alimentou outra saída P0b.

Base comum dos prompts selecionados:

> Crie um único asset isolado da Capivara do Lumon, preservando estritamente a identidade das referências: capivara quadrúpede de corpo baixo, pesado e arredondado; focinho largo e claro; olhos pequenos; orelhas pequenas; pelo marrom quente; lenço verde-petróleo; medalhão circular dourado sem símbolo. Mantenha anatomia animal, patas curtas, compactas e arredondadas. Proibido mão humana, palma, polegar, dedos abertos, braço humano, bipedalismo, cauda visível, texto, letras, números, logo, marca-d'água, botão, ícone de interface, pista da resposta, culpa, vergonha ou emoção punitiva. Ilustração 2D infantil limpa, contorno suave e textura discreta compatível com o model sheet. Fundo sólido chroma magenta `#ff00ff`, uniforme, sem sombra, sem cenário e sem objetos. Preserve folga em todos os lados. Não redesenhe o personagem.

## P0B-01 — boas-vindas

Complemento selecionado:

> Canvas quadrado. Capivara sentada em três quartos, expressão acolhedora e serena, sorriso pequeno, uma pata dianteira compacta levemente erguida junto ao corpo como cumprimento; gesto curto, sem aceno humano. Corpo inteiro e centrado, com aproximadamente 18% de folga externa.

- saída selecionada: `exec-0b7706c2-ea90-4f53-9283-58a3a9b8a042`
- seleção: olhos pequenos, identidade preservada, gesto compacto e leitura clara em redução.

## P0B-02 — ouvir

Complemento selecionado:

> Canvas quadrado. Capivara quadrúpede no lado direito do quadro, voltada para a área vazia à esquerda. Uma única pata dianteira curta e arredondada faz alcance baixo e curto para essa área; três patas sustentam o corpo. Reservar pelo menos 35% do canvas vazio à esquerda para o controle Ouvir. Nenhum botão ou símbolo dentro da imagem.

- saída selecionada: `exec-4f830e48-80ed-4867-baf6-6741fad8bd3a`
- seleção: 198 px de margem esquerda no export 512 px (38,7%), alcance animal compacto e três patas de apoio.

## P0B-03 — acerto

Complemento selecionado:

> Canvas quadrado. Retrato de meio corpo frontal. Expressão feliz, calma e segura, olhos pequenos fechados em arco suave, sorriso discreto; duas patas compactas próximas ao peito, sem gesto humano. Leitura inequívoca de celebração leve, sem euforia exagerada.

- saída selecionada: `exec-12f12acc-00d9-47a3-9bfd-049576154030`
- seleção: emoção positiva segura, silhueta frontal estável e mãos humanas ausentes.

## P0B-04 — tentar de novo

Complemento selecionado:

> Canvas quadrado. Retrato de meio corpo em três quartos. Expressão gentil, encorajadora e neutra-positiva; sorriso discreto, olhos pequenos e atentos; uma pata dianteira compacta junto ao peito em convite curto para nova tentativa. Proibido tristeza, reprovação, preocupação intensa ou dedo apontado.

- saída selecionada: `exec-c31d8181-0a66-4555-a0a6-128e95c4474e`
- seleção: incentivo sem punição, anatomia compacta e identidade consistente.

## P0B-05 — conclusão

Complemento selecionado:

> Canvas 4:3 horizontal. Capivara quadrúpede inteira, centralizada no miolo de 60% da composição, em três quartos, com sorriso sereno e uma pata dianteira compacta próxima ao medalhão. Reservar mais de 20% de margem transparente em cada lado; nenhuma pose humana, confete, troféu, texto ou cenário. Composição segura para recortes responsivos retrato e paisagem.

- saída selecionada: `exec-127f5cfc-ce66-4a10-85dd-293aa166eab7`
- seleção: personagem inteiro no centro, margens superiores a 20% e gesto contido.

## Primeira passagem rejeitada

As primeiras saídas foram descartadas antes da canonização. IDs: `exec-b6eebd80-...`, `exec-fabc95fd-...`, `exec-b4ebb3e0-...`, `exec-e3958e85-...` e `exec-efbafe7e-...`. Problemas observados: olhos ampliados e deriva de identidade; em P0B-02 e P0B-05, membros longos ou leitura de mão aberta; boas-vindas pouco inequívoca. Os prompts corretivos reforçaram âncoras P0a, olhos pequenos, patas curtas/compactas, três apoios em P0B-02 e gesto junto ao corpo.

## Referências canônicas

| Referência | SHA-256 |
|---|---|
| `../p0a-v2/p0a-model-sheet-v2-master-1254.png` | `43a42dc4dcb413ea27c1df6a798e2de59039c1646b87d3ffd4ed154f6cd7c2e4` |
| `../p0a-v2/p0a-anchor-front-v2-512.webp` | `7b210ece4e69cce646cd3a64830ccf5f32d8d27d15257a9e1cc77c597a7e99fc` |
| `../p0a-v2/p0a-anchor-3q-v2-512.webp` | `ada5e022a7185c075d41b59c954007d0abd8e333b311ea5c15a3c42c8f96a1ff` |

## Reprodutibilidade

O built-in não expôs modelo, versão, seed, sampler, steps ou guidance. Os registros acima preservam intenção, referências, outputs e critérios, mas não prometem repetição pixel a pixel.
