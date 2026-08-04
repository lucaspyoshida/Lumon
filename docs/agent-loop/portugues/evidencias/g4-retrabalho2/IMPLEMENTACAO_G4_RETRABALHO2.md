# Evidência do segundo retrabalho — Gate G4

- `run_id`: `pt-20260804T105951Z-programador-g4-retrabalho2-df556a0`
- chave de idempotência: `G4_IMPLEMENTACAO_FATIA_VERTICAL_1:programador-retrabalho2:df556a08833d86a9decbe1ed523624e2970defbc`
- base canônica: `26bac5ebcf5d710ded4a37afdbc700c65c8960ac`
- executado em: `2026-08-04T11:04:13Z`
- escopo: somente `P1_EXCLUSAO_COMPLETA_RETEM_HISTORICO`

## Inventário allowlisted

Busca no código de armazenamento encontrou quatro chaves históricas de progresso ou dados antigos:

| constante | chave |
|---|---|
| `STORAGE_KEY` | `lumon-state-v1` |
| `CORRUPT_BACKUP_KEY` | `lumon-corrupt-backup` |
| `LEGACY_BACKUP_KEY` | `lumon-legacy-backup` |
| `LEGACY_KEY` | `lumon-last-settings` |

`lumon-local-v2` é o banco IndexedDB ativo e já participa do purge: mantém somente V2 zerado, remove `migrationJournal/v1-backup` e substitui `v1-v2` por tombstone sem origem/SHA. `lumon-shell-*` contém código estático, não progresso. `lumon-backup.json` é somente o nome de um download explícito sob controle do usuário, não armazenamento interno.

## Correção

- `LUMON_PROGRESS_STORAGE_KEYS` centraliza a allowlist explícita.
- `eraseAllLumonProgress()` remove as quatro chaves após preparar V2 zerado, remoção do backup IDB e tombstone anonimizado na mesma operação adulta.
- `clearLumonData()` usa a mesma allowlist e não remove por prefixo aberto.
- chaves externas permanecem fora da allowlist.
- o manifesto content-addressed foi apenas ressincronizado porque dois arquivos normativos mudaram; nenhuma regra de release foi reaberta.

## TESTADO

- `npm run check`: lint, 33/33 testes e build aprovados.
- unidade: as quatro chaves allowlisted são removidas; chave externa é preservada.
- E2E dedicado Chromium:
  - marcador exclusivo comprovado antes da exclusão em cada uma das quatro chaves;
  - todas as quatro chaves ausentes depois da confirmação;
  - `preferencia-externa` preservada;
  - `migrationJournal/v1-backup` ausente;
  - journal `v1-v2` e V2 com `source-erased`, sem origem/SHA;
  - progresso V2 e desbloqueios manuais zerados;
  - reload não recriou nem remigrou nenhuma chave allowlisted.
- `npm run test:e2e:chromium`: 12/12 aprovados em `1.1m`.
- Português permaneceu `blocked-content`; regressão de Matemática, offline e cache continuou verde.
- release content-addressed sincronizado em `59c683101a944d656d0904897ea573c85651c7ef740cf9282c1a162f76c70ca3`.
- shell gzip estático estimado: `158836/500000` bytes.

## FALHOU

- nenhum teste falhou na execução final deste retrabalho.
- nenhum defeito funcional residual foi observado no escopo allowlisted.

## NAO TESTADO

- crash/quota entre localStorage e commit IndexedDB, conflito entre abas e downgrade;
- `transferSize`, `Content-Encoding` e deploy atômico no host final;
- dispositivos físicos, Safari/iOS, Firefox, leitor de tela e teste infantil;
- microcorpus, áudio editorial pt-BR, imagens pedagógicas e fatia vertical real de Português.

## Limites preservados

Não foram alterados conteúdo, UI, assets, arquitetura de release, backend, rede, Firebase, TTS ou analytics. Host final permanece `NAO TESTADO`; Português permanece `blocked-content`.
