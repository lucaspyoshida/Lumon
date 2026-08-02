# Supervisão do Gate G3 — lote visual P0c v1

## Identificação

- **Agente:** supervisor
- **Skill:** `lumon-supervisao-final`
- **run_id:** `pt-20260726T044409Z-supervisor-p0c-fa87c84`
- **Chave de idempotência:** `G3_P0C_ICONE_MARCADOR:supervisor:fa87c8476b93c0653382947b2d6d01c9b1451819`
- **Gate:** `G3_P0C_ICONE_MARCADOR`
- **Commit canônico de entrada/handoff:** `fa87c8476b93c0653382947b2d6d01c9b1451819`
- **Commit dos artefatos P0c:** `8b71bfa44a63ede9bc4b2af13b6ee048553f5b4b`
- **Claim/heartbeat remoto retomado:** `41e9e09bee6f19e9fdfb783377ac6b18145bfad6`
- **Referência aprovada:** `capivara-model-v1`, P0a v2
- **Implementação:** não autorizada

## Escopo da decisão

Esta revisão decide exclusivamente se o lote visual P0c v1 publicado atende ao Norte, à especificação visual, ao plano frontend pertinente e à referência P0a v2 aprovada.

Não aprova nem executa substituição de ícone/favicons ativos, manifesto, service worker, cache, instalação, shell, integração HTML/CSS/JS, teste infantil, Gate G4 ou implementação. Ausência dessas provas permanece `NAO TESTADO`; não foi convertida em conformidade.

## Fontes consultadas

Foram lidos integralmente:

- skill `lumon-supervisao-final`;
- `_reversa_sdd/norte-modulo-portugues.md`;
- `_reversa_sdd/plano-evolucao-lumon.md`;
- `docs/agent-loop/portugues/STATUS.yaml`;
- `docs/agent-loop/portugues/ESPECIFICACAO_ARTE_CAPIVARA.md`;
- handoff P0c `pt-20260726T035942Z-artista-p0c-c5eef27.md`;
- todo o lote `docs/agent-loop/portugues/evidencias/p0c/`;
- aprovação e handoff P0a v2;
- aprovação e handoff P0b v1.

Também foram lidas as partes pertinentes de `PLANO_FRONTEND_INFANTIL.md`: identidade global, `TrailMap`/`StageNode`, acessibilidade, responsividade, tickets P0c, budgets, shell e matriz futura.

As fontes oficiais de termos, uso de conteúdo e retenção foram reabertas ao vivo em `2026-08-02`: [Terms of Use](https://openai.com/policies/terms-of-use/), [How your data is used to improve model performance](https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance), [Chat and File Retention Policies](https://help.openai.com/en/articles/8983778-chat-and-file-retention-policies-in-chatgpt) e [Service Terms](https://openai.com/policies/service-terms/).

## Procedência, concorrência e integridade

- Raiz confirmada em `/Users/yoshida/Documents/Codex/2026-07-16/quai/Lumon`.
- Branch confirmada: `feature/evolucao-pedagogica`.
- Worktree limpa antes da escrita.
- `HEAD`, upstream e remoto ao vivo coincidiam em `41e9e09bee6f19e9fdfb783377ac6b18145bfad6`.
- Lock global pertence ao mesmo `run_id`, papel `supervisor`, repositório e branch; não foi alterado.
- `STATUS.yaml` contém mesmo gate, agente, `run_id`, idempotência e commit canônico; não foi alterado.
- Não existia relatório ou commit anterior deste `run_id`/chave.
- Ancestralidade confirmada: artefatos `8b71bfa` e handoff `fa87c84` são ancestrais do claim retomado `41e9e09`.
- O commit `8b71bfa` toca somente `docs/agent-loop/portugues/evidencias/p0c/`.
- P0a v2, P0b, app, ícones ativos, favicon ativo, manifesto, service worker e produto permaneceram inalterados.

## Derivação, identidade e função

O manifesto registra master, âncora frontal e âncora 3/4 de `capivara-model-v1`, com hashes coincidentes com P0a v2. Ícone e marcador vieram de duas chamadas independentes; nenhum P0b ou P0c foi referência generativa de outro P0c. Modelo, versão, seed e parâmetros determinísticos não são expostos; repetição generativa pixel a pixel permanece `NAO TESTADO`, sem invalidar os masters versionados como fonte do pós-processamento.

### Ícone e derivações P0C-01/P0C-02/P0C-03

- P0C-01 preserva focinho largo claro, olhos escuros, orelhas pequenas, pelagem marrom, lenço verde-petróleo e medalhão dourado sem símbolo.
- Não foram observados texto, pseudoalfabeto, número, logo, marca-d'água, segunda mascote, cauda, mão humana, troféu, ranking, estado pedagógico ou emoção punitiva.
- Máscaras sintéticas circular, squircle, rounded square e Android maskable preservam rosto, focinho, orelhas, lenço e medalhão.
- Inspeção real em `512`, `192`, `96`, `48`, `32` e `16 px` preserva silhueta e acentos de identidade. Em `16 px`, detalhe fino é mínimo, mas não foi encontrada falha separada bloqueante no ícone candidato.
- Ícones são opacos sobre fundo creme coerente. Alpha/halo não se aplica a essas saídas.

### Marcador P0C-04

- Pose é quadrúpede, neutra e acolhedora; não comunica concluído, bloqueado, atual, revisão, acerto ou erro.
- `alt=""` é correto para uso decorativo em `StageNode`; nome/estado continuam responsabilidade do componente.
- Bbox recalculada em `alpha > 8`: `x=60..202`, `y=49..193`; margens `60/49/53/62 px`, mínimo `19,1%`, acima dos `12%` exigidos.
- Anatomia e identidade são reconhecíveis em `256`, `64` e `48 px`.
- O export canônico, porém, falha qualidade de alpha, borda e quantização. Esse problema bloqueia o lote.

## Integridade técnica e budgets

Hashes SHA-256 dos 19 arquivos do lote foram recalculados. Todos os hashes declarados para masters, exports, provas, prompts, licença e pipeline coincidem. MIME, dimensões, bytes, canais e alpha foram rechecados com `file`, `sips` e decodificação independente de PNG.

| Ticket | Dimensão/canal | Bytes | Teto | Resultado de budget |
|---|---|---:|---:|---|
| `P0C-01` | `512×512`, PNG indexado RGB | `37.370` | `80.000` | PASSOU |
| `P0C-02` | `192×192`, PNG indexado RGB | `6.441` | `25.000` | PASSOU |
| `P0C-03A` | `48×48`, PNG indexado RGB | `713` | `7.000` | PASSOU |
| `P0C-03B` | `96×96`, PNG indexado RGB | `1.625` | `3.000` | PASSOU |
| `P0C-04` | `256×256`, PNG indexado RGBA/`tRNS` | `11.089` | `25.000` | PASSOU |
| **Tickets** | — | **`57.238`** | **`140.000`** | **PASSOU** |
| **Com 32/16** | — | **`57.901`** | **`140.000`** | **PASSOU** |

Todos os distribuíveis estão abaixo de `150.000` bytes. O lote ocupa `57.901/140.000` bytes. Isso aprova somente bytes dos candidatos; não prova shell visual `<=210.000`, shell frio `<=500.000`, manifesto coerente ou instalação.

Exports declaram `gAMA=0,45455` e chunk `sRGB`; ausência de ICC nos ícones opacos é coerente com o registro. Marcador e master transparente são lidos como RGBA/sRGB. Masters editoriais não estão aprovados para bundle.

## Falha de alpha e qualidade do marcador

O pipeline `chroma_magenta()` calcula alpha pela distância máxima de cada cor a `#FF00FF` (`PROCESSAMENTO_P0C_V1.py`, linhas 51–71). Cores legítimas da Capivara com distância abaixo de `220` recebem alpha parcial. Assim, o algoritmo não limita semitransparência à borda antialiasada: modula também pixels internos marrons, dourados e de textura.

Decodificação independente produziu:

| Arquivo | Pixels `alpha>0` | Pixels `0<alpha<255` | Proporção sem opacidade plena | Verde vivo semitransparente |
|---|---:|---:|---:|---:|
| master transparente `1254×1254` | `333.435` | `293.359` | `88,0%` | `892` |
| export P0C-04 `256×256` | `13.922` | `1.863` | `13,4%` | `21` |

O master contém pixels semitransparentes `RGB(0,255,0)` inclusive em cantos e no topo, fora da região do lenço. O export contém pixels equivalentes, por exemplo `RGB(0,255,0), alpha=16`, no topo da silhueta. Esses resíduos vêm da divisão do canal verde pelo alpha e do clamp nas linhas 67–71; não pertencem à paleta aprovada.

Em inspeção original, `P0C-04-marker-256-v1.png`, `P0C-alpha-backgrounds-v1.png` e `P0C-marker-reduction-proof-v1.png` exibem blocos/pixelização visíveis no rosto, pelagem, patas e borda. A combinação de prebucket, paleta indexada sem dithering e alpha incorreto degrada o acabamento infantil. Budget baixo não compensa artefato visual.

As provas também não exercitam diretamente o alpha armazenado no export final:

- `backgrounds_proof()` chama novamente `chroma_magenta()` antes de compor os quatro fundos (linhas 274–286);
- `marker_reductions_proof()` chama novamente `chroma_magenta()` para `256/64/48` (linhas 304–319).

Logo, essas provas reconstroem outro matte a partir de RGB/chroma e não demonstram que `P0C-04-marker-256-v1.png` mantém o próprio alpha limpo nos quatro fundos e reduções.

## Proveniência, licença e privacidade

- Prompts referenciam somente arte P0a v2 própria e publicada do Lumon.
- Nenhum dado infantil/pessoal foi usado.
- Não há pedido de imitação de artista, estúdio, personagem ou marca.
- Termos consultados atribuem output ao usuário entre as partes e nos limites legais, mantendo responsabilidade, possível similaridade e ausência de garantia de não infração.
- Serviços individuais, incluindo Codex, podem usar conteúdo para treino conforme controles; configuração concreta do ambiente não foi inspecionada.
- Parecer jurídico, busca reversa ampla, exclusividade, opt-out concreto e retenção específica do output built-in permanecem `NAO TESTADO`.

Evidência é operacionalmente suficiente para manter o candidato em retrabalho; não é parecer jurídico nem aprovação final de originalidade.

## Matriz de evidências

### TESTADO

- Raiz, branch, worktree, lock, claim/heartbeat, remoto ao vivo, estado, idempotência e ancestralidade.
- Leitura completa das fontes obrigatórias, handoffs, aprovações P0a/P0b e todo lote P0c.
- Inspeção em resolução original dos masters, sete exports e quatro provas.
- Comparação visual contra master/âncoras P0a v2.
- Identidade, anatomia, neutralidade, elementos proibidos, máscaras e tamanhos `512/192/96/48/32/16`.
- Marcador em `256/64/48`, bbox, margens, alpha, pixels residuais e quatro fundos.
- Hashes, MIME, dimensões, bytes, canais, chunks de cor, alpha e budgets.
- Semântica decorativa e `alt=""` do marcador.
- Escopo do commit e ausência de alteração no produto.
- Fontes oficiais de termos, uso de conteúdo e retenção reabertas ao vivo.

### FALHOU

- P0C-04 possui matte incorreto: semitransparência invade interior da personagem.
- P0C-04 e master transparente contêm pixels verdes de chroma/despill fora da paleta aprovada.
- P0C-04 apresenta pixelização/quantização visível em `256`, `64` e `48 px`.
- Provas de quatro fundos/redução não validam diretamente o alpha do export canônico.

### NAO TESTADO

- Manifesto, service worker e favicon ativos apontando para o lote.
- Cache, offline, atualização e coerência de release PWA.
- Instalação real Android, desktop, iOS/Safari e captura instalada.
- Shell visual/frio, `transferSize`, `Content-Encoding` e zero shell híbrido.
- Integração HTML/CSS/JS, `StageNode`, leitor de tela, teclado, toque, foco, zoom e safe-area insets.
- Teste com crianças/responsáveis e atratividade medida.
- Parecer jurídico, busca reversa ampla, exclusividade, opt-out concreto e retenção específica.
- Repetição generativa pixel a pixel e parâmetros não expostos.
- Persistência, migração, áudio, determinismo, ausência de execução dinâmica, desempenho runtime, privacidade runtime e regressão de Matemática.

### INFERIDO

- Ícone opaco tende a permanecer reconhecível em launchers reais; instalação deve comprovar.
- Direção visual tende a ser adequada ao público infantil; teste com crianças deve comprovar.
- Safe area sintética tende a sobreviver a máscaras reais; captura instalada deve comprovar.

Nenhuma inferência aprova PWA, shell, integração, experiência infantil ou licença absoluta.

## Problemas P0–P3

### P1 — Matte e quantização do marcador degradam o asset final

**Reprodução**

1. Abrir em escala real `masters/P0C-04-marker-transparent-master-v1.png` e `exports/P0C-04-marker-256-v1.png`.
2. Compor o export final, usando seu alpha armazenado, sobre `#FFF9F1`, `#FFFFFF`, `#176B87` e `#8A3D78`.
3. Inspecionar o export em `256 px` e reduções reais em `64/48 px`.
4. Decodificar alpha: contar `0<alpha<255` e pixels verdes vivos semitransparentes.
5. Confrontar `chroma_magenta()` nas linhas 51–92 e a quantização nas linhas 205–229 do pipeline.

**Evidência**

- `293.359/333.435` pixels não transparentes do master não são plenamente opacos.
- `1.863/13.922` pixels não transparentes do export não são plenamente opacos.
- Há `892` resíduos verdes semitransparentes no master e `21` no export; aparecem fora do lenço.
- Pixelização é visível no rosto, contorno, patas, pelagem e medalhão em arquivo/provas publicados.
- Contrato rejeita halo, recorte sujo, serrilhado e degradação que apague leitura.

**Aceite objetivo**

- publicar nova versão de P0C-04 derivada diretamente de P0a, preservando neutralidade, margem `>=12%`, `alt=""` e teto `<=25.000` bytes;
- matte com interior opaco: após erodir em 3 px a máscara `alpha>8`, 100% dos pixels restantes têm `alpha=255`;
- sem pixels não transparentes `RGB(0,255,0)` ou magenta residual;
- borda antialiasada limpa, sem halo nos quatro fundos, verificada a partir do export final;
- acabamento sem macroblocos/pixelização perceptível em `256`, `64` e `48 px` a escala real;
- hashes, MIME, dimensões, canais, chunks de cor, bytes e budget recalculados.

### P2 — Provas do marcador não usam o alpha canônico final

**Reprodução**

1. Ler `backgrounds_proof()` nas linhas 274–286.
2. Ler `marker_reductions_proof()` nas linhas 304–319.
3. Observar que ambas chamam `chroma_magenta()` e recalculam alpha antes de compor.
4. Comparar com `exports/P0C-04-marker-256-v1.png`, cujo `tRNS` deveria ser a fonte da prova.

**Evidência**

- Provas publicadas não demonstram o alpha armazenado no arquivo candidato.
- Falha do export pode ser mascarada por nova extração, nova quantização ou nearest-neighbor da prova.

**Aceite objetivo**

- gerar prova dos quatro fundos lendo diretamente RGBA/`tRNS` do export canônico, sem chroma-key ou recomputação de alpha;
- gerar `64/48 px` a partir do export canônico com resampling declarado, sem nova extração;
- versionar comando/pipeline, hashes das entradas e hashes das provas;
- inspeção independente deve reproduzir as mesmas composições a partir do SHA publicado.

Nenhum problema P0, P3 ou adicional foi encontrado. P1 bloqueia aprovação do lote.

## Veredito

**REPROVADO**

Ícones opacos, máscaras sintéticas, identidade geral, neutralidade, hashes, MIME, dimensões e budgets passam. O lote completo não pode ser aprovado porque P0C-04 falha alpha limpo, acabamento visual e prova canônica. Aprovação parcial não libera substituição no app nem encerra P0c.

## Decisão recomendada ao orquestrador

- mover o mesmo papel artista/P0c para `RETRABALHO` com novo `run_id` e chave idempotente;
- preservar P0C-01/P0C-02/P0C-03 se hashes e aparência permanecerem idênticos;
- refazer somente P0C-04 e suas provas conforme P1/P2;
- publicar novo handoff e retornar ao supervisor independente;
- manter ativas as ressalvas de shell visual/frio e instalação;
- manter bloqueados integração, código, CSS, app, ícones ativos, favicon ativo, manifesto, service worker, PWA, programador e Gate G4.

Supervisor não criou handoff, não alterou `STATUS.yaml`, Issue, lock, assets, prompts, manifestos de evidência ou produto.
