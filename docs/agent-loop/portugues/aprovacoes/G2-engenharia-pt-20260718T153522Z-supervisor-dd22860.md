# Supervisão do Gate G2 — engenharia leve de Português

## Identificação

- **Agente:** supervisor
- **Skill:** `lumon-supervisao-final`
- **run_id:** `pt-20260718T153522Z-supervisor-dd22860`
- **Chave de idempotência:** `G2_ENGENHARIA_LEVE:supervisor:dd22860a8bb0c65cec6014e6a17a9028a6ea53e2`
- **Gate:** `G2_ENGENHARIA_LEVE`
- **Commit de entrada publicado:** `39f477ab548062585ae7520e77f331c746d00f06`
- **Plano revisado:** `docs/agent-loop/portugues/PLANO_ENGENHARIA_LEVE.md`, publicado em `b4aea440231da206ad7995b12c00485429eb7c83`
- **Handoff revisado:** `docs/agent-loop/portugues/handoffs/pt-20260718T150534Z-engenheiro-214f180.md`, publicado em `dd22860a8bb0c65cec6014e6a17a9028a6ea53e2`
- **Implementação:** não autorizada

## Escopo da decisão

Esta revisão decide somente se o plano de engenharia torna tecnologia, áudio offline, armazenamento, pacotes, cache, quota, PWA, desempenho e testes suficientemente definidos para orientar o próximo planejamento especializado. Não aprova implementação, migração executável, pacote, corpus, áudio, imagem, frontend, PWA futura ou comportamento de Português em navegador.

Foram lidos integralmente o Norte, o plano geral, o contrato e a aprovação G1, o contrato e a aprovação arquitetural G2, seus handoffs, o plano/handoff de engenharia, `OBJETIVO.md`, `STATUS.yaml`, `skills.md`, `AGENTS.md` e a skill de supervisão. App, configuração, armazenamento, service worker, scripts e testes atuais foram inspecionados somente em leitura.

## Procedência, concorrência e integridade

- Raiz confirmada: `/Users/yoshida/Documents/Codex/2026-07-16/quai/Lumon`.
- Branch confirmada: `feature/evolucao-pedagogica`.
- Worktree de entrada e após testes: limpa.
- HEAD local, upstream local e remoto ao vivo confirmados em `39f477ab548062585ae7520e77f331c746d00f06` antes da escrita.
- Plano e handoff são idênticos aos artefatos de seus commits e ambos são ancestrais da entrada.
- `STATUS.yaml` contém o mesmo agente, gate, `run_id` e chave de idempotência.
- Lock global pertence ao mesmo `run_id`; não foi removido nem alterado.
- Nenhum relatório ou handoff anterior deste `run_id` existia.

## Avaliação técnica

### MP3, proveniência e revisão

Pipeline proposto parte de WAV/FLAC lossless, faz um único encode MP3 mono/24 kHz/32 kbps, aceita 40 kbps somente por evidência auditiva e volta ao master em qualquer correção. Proveniência separa integridade, autoria/licença, método de produção, encoder, roteiro e revisão humana. Pronúncia inadequada bloqueia publicação e exige gravação humana. Mediana e p95 têm cálculo objetivo. O contrato é coerente; nenhum arquivo real foi produzido ou validado.

### Reprodução por toque

`AudioController` único, cancelamento por token, `pause()`/troca controlada, repetição determinística, fila limitada ao atual/próximo e estados acessíveis cobrem ausência de autoplay, sobreposição e eventos atrasados. URL same-origin versionada e Cache Storage evitam base64 no estado. `Range` 200/206 deve ser provado por engine e sem violar heap. Todo comportamento permanece futuro.

### RFC 8785 e SHA-256

RFC 8785 em UTF-8, fixtures iguais em Node/browser e SHA-256 dos bytes normativos evitam dialeto ad hoc. `manifestSha256` é calculado removendo somente a propriedade top-level homônima; campo aninhado permanece. Isto resolve autorreferência sem enfraquecer itens/assets. Integridade não é confundida com autoria, licença ou aprovação.

### Estado, pacotes e atomicidade

IndexedDB para estado V2, journal, manifestos, itens, catálogo e ponteiro; Cache Storage para shell/mídia é escolha nativa e leve. Estado e ponteiro usam transações/revisão; cache imutável fica invisível até a troca transacional do ponteiro. Fonte V1 original continua em `localStorage`; blobs, MP3, imagens e base64 ficam fora do estado. Crash, duas abas, corrupção, downgrade e migração ainda exigem prova real.

### Quota, recuperação e shell

Máquina de estados, margem inicial `max(1 MiB, 20%)`, captura de `QuotaExceededError`, limpeza allowlisted e preservação de progresso/sessão/backup/ativo são coerentes. Shell futuro elimina revalidação isolada do cache ativo e instala release integral. Para provar coerência independentemente de implantação do host, `releaseHash` deve ficar vinculado aos bytes esperados por manifesto/hash ou URLs content-addressed; teste `PWA-01` deve falhar diante de qualquer mistura.

### Desempenho, ferramentas e fatia vertical

Tetos do Norte foram mantidos. Amostra mínima de 30 observações, p95 nearest-rank, Android físico modesto, perfil de rede reproduzível, HAR, marcas de desempenho e limitação explícita de heap/decoder tornam medições auditáveis. Ferramentas existentes, Web Crypto, Playwright e ffmpeg editorial evitam dependência de runtime. Matriz futura cobre áudio, pacote, PWA, migração, privacidade, segurança, desempenho, acessibilidade e regressão de Matemática. Sequência da fatia vertical liga migração, pacote, áudio por toque, seleção, digitação, revisão, retomada offline, atualização fixada, corrupção, quota, privacidade e orçamento sem escolher conteúdo/UI/asset final.

## Decisão sobre as 15 `PROPOSTA ENG-G2`

| Nº | Proposta | Decisão | Limite obrigatório |
|---:|---|---|---|
| 1 | Pipeline lossless, encode único e parâmetros MP3 | Aceita | 40 kbps exige comparação auditiva registrada; toda correção volta ao master. |
| 2 | Proveniência e revisão humana bloqueantes | Aceita | SHA não substitui licença, autoria nem revisão de pronúncia. |
| 3 | `AudioController` único, fila limitada e cancelamento | Aceita | Um elemento real, zero sobreposição/evento tardio e erro acessível precisam de E2E. |
| 4 | RFC 8785 e SHA-256 sem autorreferência | Aceita | Remover somente `manifestSha256` top-level; fixtures Node/browser são bloqueantes. |
| 5 | IndexedDB para estado/conteúdo/ponteiro e Cache Storage para shell/mídia | Aceita | Fonte V1 permanece recuperável; nenhuma mídia entra no estado ou `localStorage`. |
| 6 | Mídia same-origin versionada e `Range` | Aceita | Validar 200/206, corrupção, offline e memória por engine; sem fallback externo. |
| 7 | Cache imutável invisível + ponteiro transacional | Aceita | Ponteiro só muda após releitura e validação integral; ativo anterior permanece em falha. |
| 8 | Estados, quota e recuperação sem perda | Aceita | Nunca remover progresso, sessão ativa, backup/journal, ativo necessário ou cache externo. |
| 9 | Shell imutável por release | Aceita com ressalva | Release precisa vincular lista a bytes exatos e provar ausência de shell híbrido; SWR atual não satisfaz isso. |
| 10 | Margem `max(1 MiB, 20%)` | Aceita como configuração inicial | Calibrar com `estimate()`, overhead e falha real em cada write; estimativa não garante espaço. |
| 11 | Método de medição, rede e p95 | Aceita | Medição estática atual é aproximação; `transferSize` do host final e aparelho físico continuam obrigatórios. |
| 12 | Ferramentas existentes, Web Crypto e ffmpeg editorial | Aceita | Sem nova dependência runtime; qualquer dependência de desenvolvimento exige justificativa/licença. |
| 13 | Matriz e evidência da fatia vertical | Aceita | Mock não basta para IndexedDB, Cache Storage, SW, áudio, quota, migração ou offline. |
| 14 | Shell estreito e ícone acima do teto como P1 | Aceita como diagnóstico, com ressalva | Falhas não bloqueiam este plano; bloqueiam declarar shell/asset futuro conforme até correção e prova. |
| 15 | Critérios bloqueantes antes da implementação | Aceita | G4 explícito continua obrigatório; nenhum critério pode ser aprovado por inferência. |

Nenhuma proposta exige retrabalho do engenheiro. Ressalvas 9, 11 e 14 tornam condições futuras explícitas e não autorizam código.

## Matriz de evidências

### TESTADO

- Raiz, branch, HEAD, remoto, worktree, lock, claim, idempotência, ancestralidade e integridade dos artefatos.
- `npm run check`: lint de 20 arquivos, 21/21 testes de unidade/integração e build com cinco etapas/37 habilidades aprovados.
- `npm run test:e2e:chromium`: 10/10 aprovados em 46,4 s após repetir fora da restrição de bind do sandbox.
- Baseline atual de Matemática: fluxo, retomada, uma sessão por etapa, 37 habilidades, domínio, teclado, foco mobile, limpeza restrita, atualização, offline e cinco viewports conforme cobertura E2E existente.
- Busca no produto atual: sem `eval()`, `new Function()`, Firebase, analytics, síntese/reconhecimento de fala ou APIs explícitas de transmissão. URLs de registry aparecem somente no lockfile da dependência de desenvolvimento Playwright.
- Código atual usa `lumon-state-v1`, `schemaVersion: 1`, `local-child`, sessão materializada, PRNG depois da seed e somente cache shell com `stale-while-revalidate`.
- Medição reproduzível: soma de `gzip -c` para cada entrada de `SHELL_ASSETS`, contando `./` e `./index.htm` separadamente, resultou em `487.673` bytes; margem estática `12.327` bytes (`97,5346%` do teto).
- `images/icon-512x512.png`: PNG RGBA 512×512, `385.793` bytes, SHA-256 `502d0e8eba0d4d197aa4e0ceb4541f9419be219ae03f79c6cbddf863335eb086`.
- Cobertura documental das 15 propostas, orçamentos, estados de falha, matriz futura e primeira fatia vertical.

### FALHOU

- Asset visual atual: `385.793 > 150.000` bytes. Excesso de `235.793` bytes; arquivo possui `257,2%` do teto.
- Primeira tentativa E2E não iniciou servidor por `PermissionError: [Errno 1] Operation not permitted`; falha ambiental foi isolada e repetição autorizada passou 10/10.
- Nenhum teste funcional executado do produto atual falhou.

### NAO TESTADO

- Áudio real: master, encode, proveniência, licença, revisão humana, pronúncia, peso, p95, heap, toque, sobreposição, `Range` e offline.
- Manifesto/item/pacote real: RFC 8785, SHA, schema, staging, ponteiro, corrupção, ausência, bloqueio, atualização e rollback.
- IndexedDB V2, migração V1–V2, backup, journal, equivalência de Matemática, crash, quota, conflito entre abas, downgrade e import/export.
- Cache de mídia, shell futuro coerente, retenção de release, `transferSize` frio real e compressão/cabeçalhos do host final.
- Pacote total de Português, pacote por etapa, assets futuros, latência, heap, resposta ao toque e desempenho em Android físico modesto.
- Privacidade observada do build futuro, ausência de transmissão inesperada e fluxo infantil sem host externo após preparo.
- Primeira fatia vertical real, acessibilidade, VoiceOver/TalkBack, responsividade futura, Safari/iOS e engines além de Chromium.
- Corpus, conteúdo, áudio/imagens aprovados, transferência pedagógica real e testes com pelo menos cinco crianças.

A soma gzip de `487.673` bytes é aproximação estática, não prova de transferência real: depende do `gzip` local, conta duas URLs equivalentes, aplica gzip inclusive a PNG, não mede cabeçalhos/cache do host e não inclui `service-worker.js` na lista (`1.009` bytes no mesmo ensaio gzip). Nenhuma conclusão de conformidade futura usa essa aproximação.

### INFERIDO

- IndexedDB transacional tende a sustentar revisão e ponteiro atômicos; concorrência/crash reais precisam provar.
- Cache imutável e referência fixada tendem a impedir mistura de pacote; runtime precisa provar.
- RFC 8785 tende a eliminar divergência de serialização; fixtures cruzadas precisam provar.
- Um elemento, token e fila limitada tendem a evitar sobreposição/vazamento; áudio real precisa provar.
- Plano técnico tende a suportar a fatia vertical e preservar Matemática; implementação/migração precisam provar.

Nenhuma inferência foi usada como aceite de runtime.

## Problemas P0–P3

### P1 — ícone 512 atual excede orçamento visual

- **Reprodução:** `wc -c images/icon-512x512.png` e `shasum -a 256 images/icon-512x512.png`.
- **Evidência:** `385.793` bytes contra máximo `150.000`; SHA-256 registrado acima.
- **Critério objetivo de aceite:** asset distribuído final correspondente possui no máximo `150.000` bytes, dimensões/recortes/legibilidade aprovados e `budget:check` bloqueia regressão.
- **Efeito:** não reprova planejamento de engenharia; bloqueia aprovar o asset/shell visual atual como conforme e deve ser tratado por frontend/design e artista antes do gate visual/implementação aplicável.

### P1 — shell atual tem margem estática estreita e transferência real não comprovada

- **Reprodução:** extrair `SHELL_ASSETS`, mapear `./` para `index.htm`, executar `gzip -c` por entrada e somar; depois medir build frio no host final por `PerformanceResourceTiming`/HAR.
- **Evidência:** aproximação `487.673/500.000` bytes, margem `12.327`; `service-worker.js` fica fora da lista; host final e futuro shell Português não existem.
- **Critério objetivo de aceite:** build final, sem áudio, mede no máximo `500.000` bytes transferidos comprimidos em carga fria reproduzível, inclui todas as requisições do release conforme regra publicada, registra `Content-Encoding` e falha CI/gate ao exceder.
- **Efeito:** não reprova o plano; bloqueia afirmar conformidade de shell futuro por estimativa ou acrescentar frontend/assets sem orçamento.

Nenhum P0 foi encontrado. Os P1 estão corretamente destinados a gates futuros e não podem ser rebaixados por média, desktop ou inferência.

## Veredito

**APROVADO COM RESSALVAS**

Plano de engenharia atende o subgate documental e não volta ao engenheiro. Ressalvas P1 não bloqueiam o próximo planejamento frontend/design; bloqueiam somente aprovação futura de shell/asset/build que ainda exceda orçamento ou não possua medição real e coerência de release comprovadas.

### Próximo agente recomendado

- **Agente:** frontend/design
- **Skill:** `lumon-frontend-infantil`
- **Escopo:** experiência infantil, fluxos, wireframes, responsividade, acessibilidade, estados e briefing visual; incorporar orçamento de shell/assets e não produzir código nem asset final.
- **Entrada canônica:** Norte, G1 aprovado, arquitetura G2 aprovada, plano de engenharia, este relatório e handoff supervisor após publicação remota.
- **Bloqueio mantido:** implementação, migração executável, conteúdo, áudio/imagem final, Firebase, backend, rede e transmissão de dados continuam proibidos até autorização explícita e Gate G4.

Somente o orquestrador publica transição em `STATUS.yaml`, comenta Issue e aciona o próximo agente depois de confirmar o handoff no remoto.
