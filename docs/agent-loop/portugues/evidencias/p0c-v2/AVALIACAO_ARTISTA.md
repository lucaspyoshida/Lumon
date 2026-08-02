# Avaliação do artista — retrabalho P0C-04 v2

## Resultado

`CANDIDATO EM REVISÃO`, sem autoaprovação. Correção técnica do master P0C-04 v1 resolveu P1/P2 publicados sem nova geração. P0C-01/P0C-02/P0C-03 permanecem referenciados pelos hashes canônicos v1; nenhum foi copiado, alterado ou regenerado.

## Decisão técnica

`imagegen` não foi usada. Master chroma v1 continha pose neutra, anatomia e detalhe suficientes; falha estava no matte/alpha e na quantização do pós-processamento. Pipeline v2 preserva fonte, cria master transparente opaco, redimensiona em RGBA premultiplicado e quantiza sem `prebucket`.

## Aceite P1

| Critério | Evidência v2 | Resultado |
|---|---|---|
| derivação/identidade | master chroma v1 derivado diretamente de P0a; hashes P0a revalidados | PASSOU |
| pose/função/alt | pose quadrúpede neutra, global, decorativa, `alt=""` | PASSOU |
| margem | bbox `60,48–203,193`; margens `60/48/52/62`; mínimo `18,75%` | PASSOU |
| budget | `15.560/25.000` bytes; margem `9.440` | PASSOU |
| interior opaco | erosão 3 px de `alpha>8`: `11.607/11.607`, `100% alpha=255` | PASSOU |
| resíduos | zero `RGB(0,255,0)`, zero `RGB(255,0,255)`, zero predicado magenta conservador | PASSOU |
| borda/fundos | export canônico composto em `#FFF9F1`, branco, `#176B87`, `#8A3D78`; sem halo perceptível | PASSOU |
| acabamento | inspeção em escala real 256/64/48; contorno e textura contínuos, sem macrobloco perceptível | PASSOU |
| metadados | PNG 256² indexado RGBA/`tRNS`; `gAMA`, `sRGB`, `PLTE`, `tRNS`; hashes/bytes recalculados | PASSOU |

## Aceite P2

- `P0C-04-alpha-backgrounds-v2.png` decodifica diretamente RGBA/`tRNS` de `exports/P0C-04-marker-256-v2.png`; não chama chroma-key nem refaz alpha.
- Provas 64/48 partem diretamente do mesmo export canônico, usando `Lanczos3_separável RGBA premultiplicado` declarado.
- Pipeline e comandos estão versionados. Hashes das quatro entradas, master, export e cinco provas estão no manifesto e em `METRICAS_P0C_V2.json`.
- Build limpa em `/private/tmp/lumon-p0c-v2-repro-pt-20260802T032346Z` reproduziu 8/8 arquivos byte a byte, zero divergência.

## Comparação visual v1/v2

- v1: rosto, pelagem, patas, medalhão e borda exibiam blocos; pixels internos eram semitransparentes; borda tinha resíduos verde/magenta.
- v2: rosto e silhueta preservam leitura; textura não vira blocos; interior permanece opaco; antialias fica restrito à borda; quatro fundos não exibem halo perceptível.
- Em 64/48, intenção neutra e identidade permanecem legíveis. Detalhe fino reduz naturalmente, sem depender dele para função ou estado.

## Evidência por classe

### TESTADO

- raiz, branch, worktree inicial, lock, STATUS, claim remoto, run/idempotência e entradas canônicas;
- hashes P0a, master chroma v1 e P0C-01/02/03 preservados;
- inspeção original de master, export e cinco provas v2;
- identidade, anatomia, neutralidade, proibições e `alt=""`;
- matte, erosão 3 px, alpha, resíduos, bbox, margens e quatro fundos;
- 256/64/48 em escala real;
- MIME, dimensões, canais, chunks, bytes, hashes e budget;
- prova direta do alpha canônico e reduções diretas;
- reprodução byte a byte em build limpa;
- escopo limitado à pasta nova `p0c-v2/`.

### FALHOU

- Baseline v1 reproduzido: matte interno semitransparente, resíduos chroma, macroblocos e provas que recalculavam alpha.
- Nenhum critério objetivo P1/P2 falhou no candidato v2.

### NAO TESTADO

- integração no `StageNode`, HTML, CSS ou JavaScript;
- leitores de tela, teclado, toque, foco, zoom e safe-area insets;
- manifesto, service worker, cache, offline, atualização e instalação PWA;
- shell visual/frio, `transferSize`, `Content-Encoding` e zero shell híbrido;
- teste com crianças/responsáveis e atratividade medida;
- regressão de Matemática, persistência, áudio, desempenho runtime e privacidade runtime.

### INFERIDO

- direção visual continua provavelmente adequada ao público infantil; teste com crianças precisa comprovar;
- neutralidade tende a não competir com estado de `StageNode`; integração futura precisa comprovar.

## Limitações e riscos

- Prova visual é candidata documental, não asset ativo nem validação de plataforma.
- Quantização indexada usa 256 entradas e cumpre qualidade/budget neste arquivo; qualquer reedição deve voltar ao master e repetir pipeline, nunca editar export.
- O master v2 usa borda binária em alta resolução por decisão técnica; antialias canônico nasce somente na redução premultiplicada.
- Limitações jurídicas e generativas do lote v1 permanecem documentadas; não houve novo envio a fornecedor nem novo risco de geração.
- Shell, instalação e integração continuam bloqueados. Gate G4/programador não são liberados.

## Recomendação

**ENCAMINHAR PARA NOVA SUPERVISÃO INDEPENDENTE P0c** com `lumon-supervisao-final`. Supervisor deve reexecutar `verify`, inspecionar export/provas em escala real e decidir P1/P2. Artista não cria handoff nem altera fluxo.
