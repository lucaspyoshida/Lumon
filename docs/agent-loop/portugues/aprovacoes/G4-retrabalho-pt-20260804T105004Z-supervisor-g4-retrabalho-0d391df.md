# Supervisão do retrabalho Gate G4 — exclusão e release local

## Identificação

- **Agente:** supervisor
- **Skill:** `lumon-supervisao-final`
- **run_id:** `pt-20260804T105004Z-supervisor-g4-retrabalho-0d391df`
- **Chave de idempotência:** `G4_IMPLEMENTACAO_FATIA_VERTICAL_1:supervisor-retrabalho:0d391df9d7e81e1c3aaf4d5e866e97fbc0f3d908`
- **Gate:** `G4_IMPLEMENTACAO_FATIA_VERTICAL_1`
- **Commit de retrabalho revisado:** `0d391df9d7e81e1c3aaf4d5e866e97fbc0f3d908`
- **Claim remoto:** `f703f857bf5b9a762eb19ac695c94d8d53c0bc60`
- **Relatório anterior:** `docs/agent-loop/portugues/aprovacoes/G4-pt-20260804T102715Z-supervisor-g4-05f3576.md`
- **Handoff revisado:** `docs/agent-loop/portugues/handoffs/pt-20260804T103728Z-programador-g4-retrabalho-bc14d32.md`
- **Evidência revisada:** `docs/agent-loop/portugues/evidencias/g4-retrabalho/IMPLEMENTACAO_G4_RETRABALHO.md`
- **Revisão executada:** `2026-08-04T10:50:04Z` a `2026-08-04T10:57:23Z`

## Escopo da decisão

Revisão limitada aos dois P1 do relatório anterior:

1. exclusão completa de progresso e cópias históricas do Lumon;
2. coerência local do shell por identidade derivada dos bytes, rejeição de mistura e cache auditável.

Regressão de Matemática, offline e Português `blocked-content` foi repetida. Host final, transferência fria real, conteúdo pedagógico e Gate G5 permanecem fora deste retrabalho.

## Procedência e concorrência

- Raiz confirmada: `/Users/yoshida/Documents/Codex/2026-07-16/quai/Lumon`.
- Branch confirmada: `feature/evolucao-pedagogica`.
- `HEAD` local e remoto ao vivo confirmados em `f703f857bf5b9a762eb19ac695c94d8d53c0bc60`.
- Commit `0d391df9d7e81e1c3aaf4d5e866e97fbc0f3d908` é ancestral do claim remoto.
- Worktree limpa antes deste relatório.
- `STATUS.yaml` e lock contêm mesmo gate, papel, `run_id`, idempotência, repositório e branch.
- Norte e plano não mudaram desde leitura integral da supervisão anterior; fontes do ciclo atual foram lidas integralmente.
- Produto, assets, `STATUS.yaml`, lock, handoff, Issue e memória não foram alterados.

## Avaliação dos P1

### Release local content-addressed — resolvido

Manifesto lista 31 respostas normativas ordenadas e seus SHA-256. ID `f48d90822631ef1398cabc872048464603775646f09973626749b67d41788eba` deriva do payload canônico `path + NUL + sha256 + LF`. Recomputação independente encontrou zero divergência e confirmou mesmo ID e mesmo `EXPECTED_RELEASE_ID` no service worker.

Build recalcula manifesto e ID. Cópia limpa com um byte normativo alterado falhou com `Error: Manifesto de release obsoleto; execute npm run release:sync`. Teste unitário trocando bytes de `app.js` rejeitou com `Shell híbrido detectado`. Service worker baixa sem reutilizar cache HTTP, valida cada resposta antes de gravar e apaga cache do novo ID em falha; cache anterior de ID diferente permanece fora desse alvo.

Chromium auditou nome do cache e 31 respostas byte a byte. Shell manteve sessão offline, estado IndexedDB e cache externo. Evidência local fecha P1 de identidade/coerência do release.

`transferSize`, `Content-Encoding`, publicação atômica e host final continuam `NAO TESTADO`. Ausência dessas medições não é falha do retrabalho local.

### Exclusão completa — parcialmente corrigida, P1 permanece

Fluxo corrigido zera V2, remove `lumon-state-v1`, elimina `migrationJournal/v1-backup`, grava tombstone sem SHA/origem, não remigra após reload e preserva chave externa. Cenário E2E oficial confirmou esse caminho.

Porém, repositório V1 também mantém cópias históricas sob `lumon-corrupt-backup` e `lumon-legacy-backup`. `eraseAllLumonProgress()` remove somente `lumon-state-v1`. `lumon-corrupt-backup` pode conter payload V1 completo rejeitado por schema, incluindo sessões e progresso da criança.

Reprodução independente em Chromium semeou `lumon-corrupt-backup` com `completedSessions`, migrou V1 e confirmou exclusão. Resultado após conclusão assíncrona:

```json
{
  "lumon-state-v1": null,
  "lumon-corrupt-backup": "historico-corrupto-preservado",
  "lumon-legacy-backup": "historico-legado-preservado",
  "lumon-last-settings": "config-legada-preservada",
  "preferencia-externa": "preservar"
}
```

Assim, ação rotulada **Apagar todo o progresso** ainda pode reter progresso histórico do Lumon. Critério anterior de apagar ou anonimizar todas as cópias permitidas não foi satisfeito.

## Matriz de evidências

### TESTADO

- Raiz, branch, HEAD, remoto, ancestralidade, worktree, lock, claim e idempotência.
- `npm run check`: lint de 33 arquivos, 33/33 testes e build aprovados.
- `npm run test:e2e:chromium`: 12/12 aprovados em 1,1 minuto.
- Matemática: cinco etapas, 37 habilidades, domínio, revisão, persistência, retomada e offline.
- Português: seletor, `blocked-content`, zero sessão/mídia/erro infantil e zero origem externa.
- Exclusão oficial: V1 removido; backup IDB removido; journal/V2 sem SHA/origem; V2 zerado; reload sem remigração; chave externa preservada.
- Exclusão ampliada: backup corrupto contendo progresso e demais chaves legadas permanecem após a ação.
- Release: 31 hashes recalculados, ID derivado confirmado e `EXPECTED_RELEASE_ID` coerente.
- Build stale-fail reproduzido em cópia limpa com byte de `src/app.js` alterado.
- Mistura de `app.js` rejeitada; cache Chromium auditado byte a byte; sessão offline preservada.
- Shell gzip estático completo estimado em `158823/500000` bytes.
- Busca estática: zero `eval()`, `new Function()`, Firebase, analytics, TTS ou reconhecimento de fala em runtime.

### FALHOU

- Exclusão completa diante de `lumon-corrupt-backup` com histórico: cópia de progresso permaneceu intacta.
- Nenhum teste de Matemática, offline, fail-closed ou release local falhou.

### NAO TESTADO

- Crash/quota entre remoção localStorage e commit IndexedDB, conflito entre abas e downgrade.
- `transferSize`, `Content-Encoding`, cabeçalhos, implantação atômica e troca de release no host final.
- Instalação física, Android modesto, Safari/iOS, Firefox e outras engines.
- Áudio real, pacote editorial, corrupção/quota de mídia, leitor de tela e teste infantil.
- Microcorpus, áudio editorial pt-BR, imagens pedagógicas e fatia vertical real de Português.

### INFERIDO

- Hash por resposta e ID content-addressed tendem a impedir shell híbrido fora do host final; implantação real precisa comprovar.
- Remover todas as chaves legadas allowlisted do Lumon tende a fechar exclusão; novo E2E precisa comprovar.

Nenhuma inferência foi usada para aprovar exclusão, host final ou Gate G5.

## Problemas P0–P3

### P1 — backup corrupto ainda retém progresso após exclusão

- **Reprodução:** preencher `lumon-corrupt-backup` com JSON contendo `progress.completedSessions`, manter V1 válido, iniciar app, confirmar **Apagar todo o progresso** e ler localStorage após fechamento dos diálogos.
- **Evidência:** `lumon-state-v1` ficou ausente e V2 zerou, mas `lumon-corrupt-backup` continuou contendo `historico-corrupto`; `lumon-legacy-backup` e `lumon-last-settings` também permaneceram. Chave externa foi corretamente preservada.
- **Critério objetivo de aceite:** ação adulta remove ou anonimiza todas as chaves históricas conhecidas do Lumon que possam conter progresso ou dados antigos, incluindo `lumon-corrupt-backup`, sem tocar chaves externas; E2E deve semear cada chave allowlisted com marcador único, confirmar ausência pós-exclusão, tombstone sem origem/SHA, V2 zerado e reload sem recriação.
- **Efeito:** mantém aberto `P1_EXCLUSAO_COMPLETA_RETEM_HISTORICO`; bloqueia conformidade de exclusão/privacidade. Não reabre P1 de release, Matemática, offline ou fail-closed.

### P0 de gate — conteúdo pedagógico continua ausente

- **Reprodução:** selecionar Português.
- **Evidência:** módulo permanece `blocked-content`; microcorpus, áudio pt-BR e imagens pedagógicas aprovados não existem.
- **Critério objetivo de aceite:** pacote editorial aprovado e fatia completa testada conforme Norte.
- **Efeito:** bloqueia Gate G5, separado deste retrabalho técnico; não altera veredito sobre release local.

Nenhum P2/P3 adicional foi comprovado.

## Veredito

**REPROVADO**

P1 de coerência local do release foi resolvido. P1 de exclusão não foi fechado: cópia histórica capaz de conter progresso permanece em `lumon-corrupt-backup`. Como objetivo explícito deste retrabalho era encerrar ambos os P1, aprovação plena ou com ressalvas repetiria defeito acionável já reproduzido.

## Recomendação ao orquestrador

- retornar somente `P1_EXCLUSAO_COMPLETA_RETEM_HISTORICO` ao mesmo programador;
- preservar solução content-addressed como aprovada no escopo local, sem novo retrabalho;
- exigir limpeza/anonimização allowlisted de todas as chaves históricas Lumon e E2E dedicado;
- manter host final como `NAO TESTADO`, não como falha;
- manter Gate G5 em `BLOQUEADO` por conteúdo, sem misturar esse bloqueio ao retrabalho técnico;
- não ampliar escopo para backend, Firebase, analytics, TTS, rede ou assets.

Supervisor não criou handoff e não alterou produto, assets, `STATUS.yaml`, lock, Issue ou memória.
