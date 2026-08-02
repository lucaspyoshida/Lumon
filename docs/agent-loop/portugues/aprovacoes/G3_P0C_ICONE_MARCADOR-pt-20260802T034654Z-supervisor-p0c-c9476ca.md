# Supervisão do Gate G3 — retrabalho P0C-04 v2

## Identificação

- **Agente:** supervisor
- **Skill:** `lumon-supervisao-final`
- **run_id:** `pt-20260802T034654Z-supervisor-p0c-c9476ca`
- **Chave de idempotência:** `G3_P0C_ICONE_MARCADOR:supervisor:c9476caa77a3a926e66a0bd6eab09a2684fdd69a`
- **Gate:** `G3_P0C_ICONE_MARCADOR`
- **Commit canônico de entrada/handoff:** `c9476caa77a3a926e66a0bd6eab09a2684fdd69a`
- **Commit dos artefatos v2:** `2ef45ad58ea850a67250638ef7651e28bc2e04f5`
- **Claim remoto:** `70bcd121f2d08d8a5afece5f71ccd71bac4bb5e5`
- **Relatório anterior:** `fafd404d62ca8a19a2736e2fea3b83b22422a5f6`, veredito `REPROVADO`
- **Handoff supervisor anterior:** `c5a813c03feb9e64d756e0707887ecb9e28ff9f7`
- **Implementação:** não autorizada

## Escopo da decisão

Esta revisão decide exclusivamente se o retrabalho P0C-04 v2 resolve os problemas P1 e P2 publicados no relatório anterior e preserva P0C-01/P0C-02/P0C-03.

Não aprova nem executa substituição dos ícones ou favicon ativos, integração em `StageNode`, HTML, CSS, JavaScript, manifesto, service worker, cache, instalação, shell, build, teste infantil, Gate G4 ou implementação. Ausência dessas provas permanece `NAO TESTADO`; não foi convertida em conformidade.

## Fontes consultadas

Foram lidos integralmente:

- skill `lumon-supervisao-final`;
- `_reversa_sdd/norte-modulo-portugues.md`;
- `_reversa_sdd/plano-evolucao-lumon.md`;
- `docs/agent-loop/portugues/STATUS.yaml`;
- `docs/agent-loop/portugues/ESPECIFICACAO_ARTE_CAPIVARA.md`;
- relatório e handoff supervisor P0c v1;
- handoff artista P0c v2;
- todo o lote `docs/agent-loop/portugues/evidencias/p0c-v2/`;
- lote P0c v1 pertinente, incluindo manifesto e trechos de matte/provas do pipeline;
- aprovação e handoff P0a v2;
- aprovação e handoff P0b v1.

Também foram lidas as partes pertinentes de `PLANO_FRONTEND_INFANTIL.md`: responsividade, função do `StageNode`, acessibilidade, briefing e tickets P0c, transparência, redução e budgets.

## Procedência, concorrência e integridade

- Raiz confirmada em `/Users/yoshida/Documents/Codex/2026-07-16/quai/Lumon`.
- Branch confirmada: `feature/evolucao-pedagogica`.
- Worktree limpa antes da escrita.
- `HEAD`, referência local do upstream e remoto ao vivo coincidiam em `70bcd121f2d08d8a5afece5f71ccd71bac4bb5e5`.
- Lock atômico `.git/lumon-portugues-orchestrator.lock/owner.yaml` contém o mesmo `run_id`, papel `supervisor`, repositório e branch; não foi alterado.
- `STATUS.yaml` contém mesmo gate, agente, `run_id`, idempotência e commit canônico; não foi alterado.
- Não existia relatório, handoff ou commit anterior deste `run_id`/chave.
- Ancestralidade confirmada: artefatos `2ef45ad` e handoff `c9476ca` são ancestrais do claim `70bcd12`.
- O commit `2ef45ad` adiciona somente `docs/agent-loop/portugues/evidencias/p0c-v2/`.
- P0C-01/P0C-02/P0C-03, P0a v2, P0b, lote P0c v1 histórico e produto permaneceram inalterados.

## P1 — matte, resíduos, acabamento e budget

O export canônico `P0C-04-marker-256-v2.png` foi inspecionado em resolução original. As provas de quatro fundos, interior e reduções `64/48` também foram abertas em resolução original e confrontadas com o master transparente v2.

| Critério | Medição independente | Resultado |
|---|---:|---|
| Dimensão | `256×256` | PASSOU |
| Bytes | `15.560/25.000` | PASSOU |
| Bbox `alpha>8` | `x=60..203`, `y=48..193` | PASSOU |
| Margens | `60/48/52/62 px`; mínima `18,75%` | PASSOU |
| Interior erodido 3 px | `11.607/11.607` pixels com `alpha=255` | PASSOU |
| `RGB(0,255,0)` não transparente | `0` | PASSOU |
| `RGB(255,0,255)` não transparente | `0` | PASSOU |
| Resíduo magenta conservador | `0` | PASSOU |
| Alpha parcial | `668` pixels, restritos à borda antialiasada | PASSOU |
| Quatro fundos | creme, branco, Matemática e Português sem halo perceptível | PASSOU |
| Escala real | `256`, `64` e `48 px` sem macrobloco/pixelização perceptível | PASSOU |

O marcador continua quadrúpede, neutro, acolhedor e decorativo, com `alt=""`. Não comunica concluído, bloqueado, atual, revisão, acerto ou erro. Focinho, olhos, orelhas, lenço e medalhão permanecem reconhecíveis nos três tamanhos.

`file` e `sips` confirmaram PNG `256×256`, 8-bit indexado com alpha. A decodificação do pipeline confirmou chunks `IHDR`, `gAMA`, `sRGB`, `PLTE`, `tRNS`, `IDAT`, `IEND` e SHA-256 `5281e51df7dcdfc0e1f531a520cd7dc905ee6bf83cb0ad7949a514904ae79613`.

## P2 — prova canônica e reprodução limpa

A auditoria de `PROCESSAMENTO_P0C_V2.py` confirmou:

- `make_proofs()` chama `parse_png(export_path)` e usa diretamente RGBA/`tRNS` do export canônico;
- a prova de quatro fundos não chama chroma-key nem recalcula alpha;
- reduções `64/48` partem do mesmo export canônico;
- resampling declarado e executado é Lanczos3 separável em RGBA premultiplicado;
- master, export, provas e métricas são gerados pelo mesmo pipeline versionado.

O comando canônico `verify` passou. Uma build limpa independente em `/private/tmp/lumon-p0c-v2-supervisor.BsZidQ` reproduziu master, export, cinco provas e métricas: `8/8` SHA-256 idênticos byte a byte, zero divergência.

## Preservação e budgets consolidados

Os hashes recalculados dos candidatos preservados coincidem com o manifesto:

| Saída preservada | SHA-256 | Bytes |
|---|---|---:|
| P0C-01 512 | `c7ba4443b5985f8b598cad6b4741b94c18d6ffea943b8d4f69d2545371ffb93a` | `37.370` |
| P0C-02 192 | `0137c76297efbbd7914d692da43948bda8a975344ea468b71a8bf463cab3d1d6` | `6.441` |
| P0C-03A 48 | `474b80acd536522000689d6d9009bb4434ea997af157e378711668c9583566d0` | `713` |
| P0C-03A 32 | `1b1c08a060326def410331ac1baa3e6ed0fbf0fd51de071fe5fd01baf40b20f4` | `416` |
| P0C-03A 16 | `5ce9b9d92cdaf28f3d71bda97a5d56544751077d35ef1d92f7bb6ba22faecada` | `247` |
| P0C-03B 96 | `f709042154992481a89dad53da08ef8a3d3392027d48aaa48268029c7f4a9359` | `1.625` |

P0c com o novo P0C-04 soma `61.709/140.000` bytes nos tickets, ou `62.372/140.000` incluindo favicon `32/16`. A reserva visual candidata composta por P0c completo e P0B-01 soma `83.444/210.000` bytes.

Essas somas aprovam somente os arquivos candidatos e seus envelopes documentais. Ícone ativo atual, manifesto, service worker, instalação, respostas normativas e transferência fria não foram alterados ou medidos; shell visual/frio e release coerente não estão aprovados.

## Matriz de evidências

### TESTADO

- Raiz, branch, worktree, lock, claim, remoto ao vivo, estado, idempotência e ancestralidade.
- Leitura das fontes obrigatórias, relatório/handoff anteriores, P0a v2, P0b e lotes P0c v1/v2 pertinentes.
- Inspeção original de master, export e cinco provas v2.
- Identidade, neutralidade, função decorativa, proibições e `alt=""`.
- Alpha, erosão 3 px, resíduos, bbox, margens, quatro fundos e escala real `256/64/48`.
- Hashes, MIME, dimensões, canais, chunks, bytes e budgets.
- Provas lendo o export canônico e reduções diretas com resampling declarado.
- `verify` e reprodução limpa `8/8` byte a byte.
- Preservação por hash de P0C-01/P0C-02/P0C-03 e escopo exclusivo do commit de artefatos v2.

### FALHOU

- Nenhum critério objetivo P1/P2 do retrabalho P0C-04 v2 falhou.

### NAO TESTADO

- Ícones, favicon e marcador ativos no produto.
- Manifesto, service worker, cache, offline, atualização e coerência de release PWA.
- Instalação e captura real em Android, desktop e iOS/Safari.
- Shell visual/frio, `transferSize`, `Content-Encoding`, respostas normativas e zero shell híbrido.
- Integração `StageNode`, HTML, CSS, JavaScript, leitor de tela, teclado, toque, foco, zoom e safe-area insets.
- Teste com crianças/responsáveis e atratividade medida.
- Persistência, migração, áudio, determinismo do app, ausência de execução dinâmica, desempenho, privacidade runtime e regressão de Matemática.
- Parecer jurídico, busca reversa ampla, exclusividade, opt-out concreto, retenção específica e repetição generativa pixel a pixel.

### INFERIDO

- A direção visual tende a continuar adequada ao público infantil; teste infantil deve comprovar.
- A neutralidade tende a não competir com o estado acessível do `StageNode`; integração deve comprovar.
- Os envelopes candidatos tendem a caber no shell visual; build e transferência fria devem comprovar.

Nenhuma inferência aprova shell, PWA, integração, experiência infantil, licença absoluta ou implementação.

## Problemas P0–P3

Nenhum problema acionável P0, P1, P2 ou P3 foi encontrado no escopo do retrabalho P0C-04 v2.

Os problemas P1/P2 do relatório anterior foram resolvidos pelos critérios objetivos publicados. Itens `NAO TESTADO` continuam obrigatórios nos gates próprios e não foram tratados como conformidade.

## Veredito

**OBJETIVO ALCANCADO — APROVADO**

P0C-04 v2 resolve matte, interior opaco, resíduos chroma, acabamento e prova canônica. P0C-01/P0C-02/P0C-03 permanecem preservados por hash. O lote visual P0c candidato atende budgets, identidade, neutralidade, redução e integridade exigidos neste subgate.

## Decisão recomendada ao orquestrador

- marcar o subgate `G3_P0C_ICONE_MARCADOR` como `APROVADO`;
- registrar handoff supervisor e transição somente após este relatório estar publicado e confirmado no remoto;
- encerrar a sequência visual autorizada P0a/P0b/P0c sem integrar candidatos no produto;
- manter manifesto ativo, service worker, instalação, shell frio, integração e teste infantil como `NAO TESTADO`;
- manter bloqueados app, código, CSS, PWA, programador e Gate G4;
- usar `AGUARDA_USUARIO` se o próximo avanço depender da autorização explícita de implementação, sem interpretar esta aprovação visual como tal autorização.

Supervisor não criou handoff, não alterou `STATUS.yaml`, Issue, lock, assets, evidências, pipeline ou produto.
