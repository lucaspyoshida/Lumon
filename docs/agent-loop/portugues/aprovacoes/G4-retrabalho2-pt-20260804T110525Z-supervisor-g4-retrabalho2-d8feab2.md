# Supervisão do segundo retrabalho Gate G4 — exclusão allowlisted

## Identificação

- **Agente:** supervisor
- **Skill:** `lumon-supervisao-final`
- **run_id:** `pt-20260804T110525Z-supervisor-g4-retrabalho2-d8feab2`
- **Chave de idempotência:** `G4_IMPLEMENTACAO_FATIA_VERTICAL_1:supervisor-retrabalho2:d8feab2aa39986740f07bcaf18c768f54ab004c2`
- **Gate:** `G4_IMPLEMENTACAO_FATIA_VERTICAL_1`
- **Commit revisado:** `d8feab2aa39986740f07bcaf18c768f54ab004c2`
- **Claim remoto:** `699edcf49235a3fd302f74b3255896b4687a183e`
- **Relatório anterior:** `docs/agent-loop/portugues/aprovacoes/G4-retrabalho-pt-20260804T105004Z-supervisor-g4-retrabalho-0d391df.md`
- **Handoff revisado:** `docs/agent-loop/portugues/handoffs/pt-20260804T105951Z-programador-g4-retrabalho2-df556a0.md`
- **Evidência revisada:** `docs/agent-loop/portugues/evidencias/g4-retrabalho2/IMPLEMENTACAO_G4_RETRABALHO2.md`
- **Revisão executada:** `2026-08-04T11:05:25Z` a `2026-08-04T11:16:27Z`

## Escopo da decisão

Revisão independente limitada ao fechamento de `P1_EXCLUSAO_COMPLETA_RETEM_HISTORICO`, com regressão proporcional de release content-addressed, Matemática, offline e Português fail-closed. Host final e Gate G5 continuam separados.

## Procedência e concorrência

- Raiz confirmada: `/Users/yoshida/Documents/Codex/2026-07-16/quai/Lumon`.
- Branch confirmada: `feature/evolucao-pedagogica`.
- `HEAD` local e remoto ao vivo confirmados em `699edcf49235a3fd302f74b3255896b4687a183e`.
- Commit `d8feab2aa39986740f07bcaf18c768f54ab004c2` é ancestral do claim remoto.
- Worktree estava limpa antes deste relatório.
- `STATUS.yaml` registra `EM_REVISAO`, `max_concurrency=1`, agente supervisor, mesmo gate, commit canônico, `run_id`, idempotência, heartbeat e lease válida até `2026-08-04T13:05:25Z`.
- Norte, plano, relatório anterior, handoff e evidência foram lidos integralmente.
- Produto, assets, `STATUS.yaml`, lock, handoffs, Issue e memória não foram alterados.

## Fechamento do P1 de exclusão

Auditoria estática de todo acesso runtime a `localStorage`, IndexedDB e Cache Storage identificou quatro chaves históricas de progresso/dados antigos no armazenamento chave-valor:

1. `lumon-state-v1`;
2. `lumon-corrupt-backup`;
3. `lumon-legacy-backup`;
4. `lumon-last-settings`.

As quatro compõem `LUMON_PROGRESS_STORAGE_KEYS`, sem duplicata, e a mesma allowlist é usada por `clearLumonData()` e `eraseAllLumonProgress()`. O purge V2 também elimina `migrationJournal/v1-backup`, substitui `v1-v2` por tombstone `source-erased` e grava estado V2 zerado. Não há remoção aberta por prefixo, portanto chave externa não é afetada.

Busca runtime também encontrou:

- `lumon-local-v2`: banco ativo, deliberadamente preservado com estado zerado;
- `lumon-shell-*`: cache content-addressed de código estático, sem progresso;
- `lumon-backup.json`: nome de download explícito sob controle do usuário, não armazenamento interno;
- `lumon-v1-to-v2`: identificador de migração, não cópia autônoma de dados.

Reprodução independente em Google Chrome semeou histórico real em V1, marcadores únicos nas três chaves legadas e `preferencia-externa`. Após confirmação adulta de **Apagar todo o progresso**, e novamente após reload:

```json
{
  "lumon-state-v1": null,
  "lumon-corrupt-backup": null,
  "lumon-legacy-backup": null,
  "lumon-last-settings": null,
  "preferencia-externa": "preservar",
  "v1-backup": null,
  "v2.completedSessions": [],
  "v2.manualUnlocked": [],
  "v2.migration.sourceKey": null,
  "v2.migration.sourceSha256": null,
  "journal.sourceKey": null,
  "journal.sourceSha256": null,
  "status": "source-erased"
}
```

O cenário E2E dedicado passou três vezes consecutivas. Não houve recriação de chave, remigração ou retenção histórica após reload. Critério objetivo do P1 foi satisfeito.

## Regressão proporcional

### TESTADO

- Raiz, branch, HEAD, remoto, ancestralidade, claim, idempotência, worktree e lease.
- `npm run check`: lint de 33 arquivos, 33/33 testes e build aprovados.
- Build: cinco etapas, 37 habilidades e shell gzip estimado em `158836/500000` bytes.
- Chromium final: 12/12 cenários aprovados em `1,1 minuto`.
- Exclusão dedicada repetida: 3/3 aprovada.
- Teclado isolado repetido após uma ocorrência transitória: 3/3 aprovado.
- Matemática: cinco etapas, domínio, revisão, persistência, retomada, teclado e abandono.
- Offline: cache auditado, sessão preservada e chave de cache externa preservada.
- Português: `blocked-content`, zero sessão improvisada, zero mídia e zero origem externa.
- Release: 31 arquivos recomputados, zero divergência; ID declarado, derivado e `EXPECTED_RELEASE_ID` iguais a `59c683101a944d656d0904897ea573c85651c7ef740cf9282c1a162f76c70ca3`.
- Busca estática: nenhum acesso runtime de armazenamento fora dos repositórios/cache descritos.

### FALHOU

- Primeira execução integral do Chromium teve uma ocorrência em teste de teclado: `#feedback` permaneceu vazio após `Enter`.
- A ocorrência não se repetiu em 3/3 execuções isoladas nem na repetição integral 12/12; não toca o diff de exclusão e não produziu crítica local reproduzível.
- Nenhum cenário de exclusão, release, Matemática, offline ou Português fail-closed falhou.

### NAO TESTADO

- Crash/quota entre remoção do localStorage e conclusão da transação IndexedDB.
- Conflito entre abas, downgrade e recuperação por falha física do dispositivo.
- `transferSize`, `Content-Encoding`, cabeçalhos, implantação atômica e troca de release no host final.
- Instalação física, Android modesto, Safari/iOS, Firefox, leitor de tela e teste infantil.
- Microcorpus, áudio editorial pt-BR, imagens pedagógicas e fatia vertical real de Português.

### INFERIDO

- A allowlist explícita tende a permanecer segura enquanto toda nova chave histórica for adicionada ao contrato e aos testes.
- O release content-addressed tende a impedir shell híbrido no host final; implantação real ainda precisa comprovar.

Nenhuma inferência foi usada para aprovar exclusão, host final ou Gate G5.

## Problemas P0–P3

Nenhum problema P1/P2/P3 acionável permaneceu no escopo local deste retrabalho.

### P0 de gate — conteúdo pedagógico continua ausente

- **Reprodução:** selecionar Português.
- **Evidência:** módulo permanece `blocked-content`; microcorpus, áudio pt-BR e imagens pedagógicas aprovados não existem.
- **Critério objetivo de aceite:** pacote editorial aprovado e fatia completa testada conforme Norte.
- **Efeito:** bloqueia Gate G5, separado do P1 técnico agora fechado; não reprova este retrabalho de exclusão.

## Veredito

**OBJETIVO ALCANCADO — APROVADO**

`P1_EXCLUSAO_COMPLETA_RETEM_HISTORICO` foi fechado com auditoria estática, reprodução direta pós-purge/pós-reload e suíte automatizada. Não restou crítica acionável local no escopo autorizado.

## Recomendação ao orquestrador

- remover `P1_EXCLUSAO_COMPLETA_RETEM_HISTORICO` das ressalvas ativas;
- preservar release content-addressed como aprovado no escopo local;
- manter host final como `NAO TESTADO`, não como falha;
- manter Gate G5 em `BLOQUEADO` exclusivamente pela ausência do pacote editorial e da fatia pedagógica real de Português;
- não ampliar escopo para backend, Firebase, analytics, TTS, rede ou assets.

Supervisor não criou handoff e não alterou produto, assets, `STATUS.yaml`, lock, Issue ou memória.
