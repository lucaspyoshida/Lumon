# Supervisão do Gate G2 — contrato técnico de Português

## Identificação

- **Agente:** supervisor
- **Skill:** `lumon-supervisao-final`
- **run_id:** `pt-20260718T145025Z-supervisor-a1becef`
- **Chave de idempotência:** `G2_CONTRATO_TECNICO:supervisor:a1becef200ca56cc982829e38bd2b0a7a4565cd0`
- **Gate:** `G2_CONTRATO_TECNICO`
- **Commit de entrada publicado:** `824cf531b25b54cad9f1befc529d87df0fd5a12f`
- **Contrato revisado:** `docs/agent-loop/portugues/CONTRATO_TECNICO.md`, publicado em `5eaec922d3c1175cf9a36d7249b09fb3c67365ca`
- **Handoff revisado:** `docs/agent-loop/portugues/handoffs/pt-20260718T142849Z-arquiteto-29d5db3.md`, publicado em `a1becef200ca56cc982829e38bd2b0a7a4565cd0`
- **Implementação:** não autorizada

## Escopo da decisão

Esta revisão decide somente se o contrato documental satisfaz o Gate G2 contra o Norte, o plano geral e o contrato pedagógico G1 aprovado. Não aprova implementação, migração executável, conteúdo editorial, pacote, áudio, imagem, UI, persistência V2, PWA futura, Firebase, backend, rede ou comportamento em navegador.

Foram lidos integralmente:

- `_reversa_sdd/norte-modulo-portugues.md`;
- `_reversa_sdd/plano-evolucao-lumon.md`;
- `docs/agent-loop/portugues/CONTRATO_PEDAGOGICO.md`;
- `docs/agent-loop/portugues/aprovacoes/G1-pt-20260718T141249Z-supervisor-302b853.md`;
- handoffs do pedagogo, supervisor G1 e arquiteto G2;
- `docs/agent-loop/portugues/CONTRATO_TECNICO.md`;
- `docs/agent-loop/portugues/OBJETIVO.md`;
- `docs/agent-loop/portugues/STATUS.yaml`;
- `docs/agent-loop/portugues/skills.md`;
- `AGENTS.md` e a skill `lumon-supervisao-final`.

Código, configuração, service worker e testes atuais foram inspecionados somente em leitura para confirmar fatos alegados. Nenhum arquivo do produto foi alterado.

## Evidência de procedência e integridade

- Raiz confirmada: `/Users/yoshida/Documents/Codex/2026-07-16/quai/Lumon`.
- Branch confirmada: `feature/evolucao-pedagogica`.
- Worktree de entrada: limpa.
- HEAD de entrada: `824cf531b25b54cad9f1befc529d87df0fd5a12f`.
- Remoto `origin/feature/evolucao-pedagogica` confirmado ao vivo no mesmo SHA antes da escrita.
- O contrato atual é idêntico ao artefato publicado em `5eaec922d3c1175cf9a36d7249b09fb3c67365ca`.
- O handoff atual é idêntico ao artefato publicado em `a1becef200ca56cc982829e38bd2b0a7a4565cd0`.
- Ambos os commits são ancestrais do commit de entrada.
- `STATUS.yaml` contém o mesmo `run_id`, chave de idempotência, agente supervisor e Gate G2 em revisão.
- Lock global pertence ao mesmo `run_id` e foi preservado.
- Nenhum relatório ou handoff anterior deste `run_id` existia.

## Avaliação do contrato

### Núcleo, módulos e preservação de Matemática

O contrato separa composição, núcleo comum, módulos de matéria, adaptadores locais e apresentação. Regras de acento, ortografia, cálculo, decodificação, avaliação, domínio e revisão permanecem nos módulos responsáveis. Nenhuma regra pedagógica depende de DOM, `localStorage`, IndexedDB, Cache Storage, Firebase ou fornecedor. Matemática e Português não se importam mutuamente; composição é a única camada que conhece os módulos.

IDs matemáticos atuais permanecem byte a byte dentro do namespace da matéria. Progresso, domínio, revisão, retenção e sessão ativa passam a ser separados por matéria. O contrato exige equivalência matemática antes da ativação, preservando perguntas materializadas, seeds, respostas, índices, timestamps, desbloqueios, recomendações e abandonos.

### Schema, persistência e migração

O envelope V2 preserva o perfil único `local-child`, mantém preferências globais e isola os payloads das matérias. Versões de envelope, progresso, contrato, conteúdo, gerador, normalizador, domínio, pacote e asset evoluem separadamente. `revision` e gravação com revisão esperada tornam conflito entre abas explícito.

A migração V1–V2 é fail-closed: fonte V1 e backup bruto imutável permanecem recuperáveis; candidato e canônico são validados e relidos; journal e hashes sustentam retomada idempotente; falha, crash, quota, versão desconhecida ou backup divergente não ativam candidato. Rollback não apaga V2 nem afirma que V1 contém prática criada depois da migração.

### Item, sessão, avaliação, domínio e revisão

Contratos lógicos cobrem módulo, item, prompt/resposta, avaliação, sessão, domínio e revisão. Pacotes carregam somente dados; avaliadores, normalizadores, geradores e renderizadores vêm de registros fechados e versionados do build. Resposta textual usa regra por habilidade, sem remoção universal de acentos.

Tentativas preservam ordem, número, apoio, avaliação e elegibilidade; item inválido ou inconclusivo não vira erro da criança. Para implementação futura, `AttemptRecord` e `ContentItemSnapshot` devem materializar os campos normativos já distribuídos nas interfaces: matéria, item/origem/versões, resposta bruta e normalizada quando aplicável, apoio, status, dimensões, classe de erro, elegibilidade para domínio/revisão e ordem da tentativa. Esta é interpretação necessária do contrato aprovado, não autorização de código.

Domínio filtra somente evidência aprovada do corpus Lumon, respeita três sessões, percentuais, amostra, erro recorrente e transferência do G1. Autoavaliação oral, desbloqueio adulto e qualquer volume temático não concedem domínio. Revisão fica isolada por matéria e registra degraus aproximados de 1, 3 e 7 dias.

### Conteúdo, mídia e fronteiras futuras

Fonte editorial `lumon` e fonte futura `tematico` obedecem à mesma porta de conteúdo. A fonte temática permanece ausente do bundle, registro, configuração e UI da V1, usa `practice-only`, exige confirmação adulta e nunca libera domínio isoladamente.

Manifestos e assets usam ID, versão, SHA-256, tamanho, função pedagógica, licença e aprovação. Para evitar hash autorreferente, `manifestSha256` deve ser calculado sobre serialização canônica definida que exclui o próprio campo de hash; a regra exata e fixtures pertencem ao engenheiro e precisam ser testadas antes de ativar pacote. Bytes de áudio/imagem ficam fora do estado e de `localStorage`.

Firebase é somente fronteira documental. O contrato proíbe na V1 SDK, dependência, arquivo de configuração, credencial, autenticação, endpoint, chamada de rede, campo de conta, múltiplos perfis e adapter morto.

### PWA, offline, quota e determinismo

Shell, conteúdo, mídia e estado possuem ciclos de vida separados. Pacote passa por staging, validação integral e ativação atômica; sessão fixa versões; falha preserva ativo anterior. Recuperação de quota nunca apaga estado da criança, sessão ativa, backup de migração ou único pacote necessário.

Chave determinística inclui matéria, habilidade, versões, seed e requisição canônica. Em sessões com mais de uma habilidade, a lista ordenada completa integra `sessionRequest`; o `skillId` singular da fórmula não pode omitir nenhuma habilidade. Timestamps, latência e ordem de gravação ficam fora da geração. `eval()`, `new Function()`, código editorial, import remoto e regra recebida por rede são proibidos.

Orçamentos de shell, pacote, MP3, latência, heap e asset visual foram preservados como limites a provar futuramente. Shell inicial não baixa áudio; Etapa 1 é preparada no fluxo adulto e biblioteca completa não é baixada de uma vez.

### Primeira fatia vertical

A arquitetura cobre palavra, imagem e som; áudio por toque; seleção; digitação; feedback semântico da Capivara; nova tentativa, pista, exemplo e item análogo; revisão; persistência por matéria; retomada; pacote fixo e offline. Nenhuma palavra, UI, asset ou código final foi escolhido. Uma sessão não concede domínio.

## Decisão sobre cada `PROPOSTA G2`

| Nº | Proposta | Decisão do supervisor | Fundamento e limite normativo |
|---:|---|---|---|
| 1 | Registro de módulos, núcleo neutro e ausência de import cruzado | Aceita | Preserva separação por matéria; somente composição conhece implementações. |
| 2 | Envelope V2 com `subjects.matematica` e `subjects.portugues` sob `local-child` | Aceita | Mantém perfil único e separa progresso, domínio, revisão, retenção e sessão. |
| 3 | IDs compostos sem renomear IDs históricos | Aceita | Namespace envolve o ID legado; payload e IDs históricos de Matemática não podem ser reescritos. |
| 4 | Versões independentes | Aceita | Evita reinterpretar sessão ou evidência antiga quando regra, conteúdo ou pacote muda. |
| 5 | Payload V1 aninhado e sessão ativa materializada preservada | Aceita | Ativação exige equivalência, retomada no mesmo ponto e preservação integral dos campos matemáticos. |
| 6 | Interfaces de módulo, item, prompt/resposta, avaliação, sessão, domínio e revisão | Aceita | Contratos mantêm semântica pedagógica fora de DOM/storage; snapshots e tentativas futuras devem materializar todos os campos normativos descritos. |
| 7 | Fontes `lumon` e `tematico` pelo mesmo contrato | Aceita | Extensibilidade sem provider V1; tema continua `practice-only`, adulto e incapaz de liberar domínio. |
| 8 | Manifestos SHA-256, aprovação e ativação atômica | Aceita | Hash do manifesto exclui seu próprio campo na serialização canônica; pacote parcial nunca fica ativo. |
| 9 | Repositórios separados para estado, pacote e mídia | Aceita | Impede blobs no estado e desacopla domínio de tecnologia física. |
| 10 | Revisão otimista por `revision` | Aceita | Gravação deve falhar explicitamente em revisão divergente; `PER-02` comprova ausência de perda silenciosa. |
| 11 | Fronteira Firebase somente documental | Aceita | Nenhum código, SDK, configuração, credencial, conta, rede ou adapter vazio entra na V1. |
| 12 | Chave determinística com matéria, habilidade, versões, seed e requisição | Aceita | Requisição canônica inclui todas as habilidades ordenadas; relógio e `Math.random()` ficam fora do gerador. |
| 13 | Caches separados, staging, pacote fixado e recuperação de quota | Aceita | Estado nunca participa da limpeza de cache; ativo anterior e sessão em curso permanecem íntegros. |
| 14 | Migração V1–V2 com backup, candidato, canônico, journal e rollback | Aceita | Backup divergente, falha de equivalência, crash ou quota bloqueiam ativação; reexecução é idempotente. |
| 15 | Arquitetura da primeira fatia vertical | Aceita | Cobre fluxo aprovado sem escolher UI, palavra, asset ou implementação. |
| 16 | Matriz objetiva de testes e bloqueio se Matemática divergir | Aceita | Baseline atual é apenas referência; todos os testes futuros aplicáveis são obrigatórios antes de aprovar implementação. |

As 16 propostas são coerentes com o Norte e G1. Limites acima resolvem interpretação normativa sem ampliar produto, dados, rede ou autorização. Nenhuma proposta demanda retrabalho documental.

## Matriz de evidências

### TESTADO

- Raiz, branch, HEAD, worktree, lock, claim, idempotência, procedência e integridade dos commits/artefatos.
- `npm run check` no commit de entrada: aprovado.
- Lint: 20 arquivos JavaScript válidos e sem execução dinâmica.
- Unidade/integração: 21 de 21 testes aprovados.
- Build: cinco etapas, 37 habilidades e manifesto PWA atual aprovados.
- Busca no código executável atual: nenhuma ocorrência de `eval()` ou `new Function()`.
- Busca no produto atual: nenhuma referência a Firebase, analytics, `XMLHttpRequest`, `WebSocket`, `EventSource` ou `sendBeacon`.
- Leitura confirmou PWA estática, módulos ES, `lumon-state-v1`, `schemaVersion: 1`, `local-child`, progresso global, sessão ativa materializada, PRNG injetado após criação da seed, avaliação numérica, limite de 250 sessões e cache shell `lumon-shell-*`.
- Cobertura documental das 16 propostas, limites núcleo/módulos, schema por matéria, contratos, migração, conteúdo, mídia, offline, determinismo, privacidade arquitetural e primeira fatia vertical.
- Ausência documental de SDK, credencial, backend, provider temático, rede crítica e código morto futuro proposto para a V1.

### FALHOU

- Nenhum critério documental do Gate G2 falhou.
- Nenhum problema P0, P1, P2 ou P3 acionável foi encontrado no escopo revisado.

### NAO TESTADO

- Migração V1–V2 real: backup, checksum, candidato, journal, idempotência, falha em cada write, crash e rollback.
- Persistência real separada por matéria, conflito entre abas, import/export V2 e limpeza por escopo.
- Schema, módulo, avaliadores, normalizadores, domínio e revisão de Português implementados.
- Corpus final, autoria/licença item a item, ambiguidades, rubricas, conteúdo e manifesto reais.
- Pacotes/cache reais: staging, hashes, ativação atômica, atualização, retenção, corrupção, ausência e quota.
- Áudio e imagem reais: pronúncia, revisão humana, nomeação, licença, peso, hash, latência, memória e funcionamento offline.
- Primeira fatia vertical executável, E2E de Português, feedback infantil e retomada offline.
- Privacidade observada por interceptação de rede em build futuro e ausência de transmissão inesperada.
- Orçamentos de shell, pacote, mídia, latência, heap e robustez em aparelhos-alvo.
- Acessibilidade, responsividade, teclado virtual/físico, leitor de tela, contraste, redução de movimento e viewports exigidas.
- Regressão E2E futura de Matemática, snapshots das 37 habilidades e equivalência antes/depois da migração.
- Engines diferentes de Chromium.
- Testes moderados com pelo menos cinco crianças, incluindo pré-leitoras, meta de 80% de autonomia e zero bloqueios críticos.

Estes itens pertencem à implementação e aos gates futuros. Nenhum foi aprovado por inferência.

### INFERIDO

- Registro de módulos tende a reduzir regressão comparado a inserir Português nos arrays matemáticos; implementação ainda precisa provar isso.
- Separação de versões tende a impedir reinterpretação silenciosa; fixtures e sessões antigas precisam comprovar o efeito.
- Backup imutável, journal e candidato tendem a permitir recuperação segura; falhas reais ainda não foram simuladas.
- Staging, hashes e pacote fixado tendem a impedir mistura de versões; Cache Storage e quota reais ainda não foram exercitados.
- Revisão otimista tende a evitar última escrita silenciosa; comportamento em duas abas depende do adapter futuro.
- Portas de conteúdo e persistência permitem Firebase/tema futuros sem acoplar domínio; nenhuma integração futura foi implementada ou validada.

Nenhuma inferência acima substitui evidência exigida pelos gates futuros.

## Problemas P0–P3

Nenhum problema acionável encontrado. Portanto, não há reprodução, evidência de falha ou critério corretivo a registrar neste Gate G2. Riscos futuros permanecem em `NAO TESTADO` e na matriz objetiva do contrato.

## Veredito

**OBJETIVO ALCANCADO — APROVADO**

O contrato atende o Gate G2 como arquitetura documental, versionada e testável. A aprovação libera somente o próximo planejamento especializado: engenheiro com `lumon-engenharia-leve`, após transição canônica e confirmação remota pelo orquestrador.

Implementação, migração, código, conteúdo executável, corpus final, áudio, imagens, Firebase, backend, rede e assets continuam bloqueados até autorização explícita do usuário e Gate G4.
