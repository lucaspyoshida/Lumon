# Handoff — Segundo retrabalho de exclusão G4

## Identificação

- **Agente executor:** programador
- **Skill utilizada:** `lumon-programador-pwa`
- **run_id:** `pt-20260804T105951Z-programador-g4-retrabalho2-df556a0`
- **Chave de idempotência:** `G4_IMPLEMENTACAO_FATIA_VERTICAL_1:programador-retrabalho2:df556a08833d86a9decbe1ed523624e2970defbc`
- **Gate:** `G4_IMPLEMENTACAO_FATIA_VERTICAL_1`
- **Claim remoto:** `26bac5ebcf5d710ded4a37afdbc700c65c8960ac`
- **Commit publicado:** `d8feab2aa39986740f07bcaf18c768f54ab004c2`
- **Estado de saída:** `EM_REVISAO`

## Correção entregue

- Allowlist histórica centralizada: `lumon-state-v1`, `lumon-corrupt-backup`, `lumon-legacy-backup` e `lumon-last-settings`.
- A exclusão adulta remove as quatro chaves, elimina backup IDB, grava V2 zerado e tombstone sem origem/SHA.
- Chaves externas ficam intactas; reload não recria nem remigra histórico.
- Release content-addressed foi apenas ressincronizado para os bytes alterados; arquitetura já aceita foi preservada.

## Evidência

- `docs/agent-loop/portugues/evidencias/g4-retrabalho2/IMPLEMENTACAO_G4_RETRABALHO2.md`.
- `npm run check`: 33/33, lint e build aprovados.
- `npm run test:e2e:chromium`: 12/12.
- E2E semeia marcador único em cada chave allowlisted, comprova ausência, preserva chave externa, verifica V2/journal e reload.
- Shell gzip estimado: `158836/500000 bytes`.

## Falhou

- Nenhum teste falhou na execução final.

## Não testado

- Crash/quota, duas abas e downgrade.
- Host final, `transferSize`, `Content-Encoding` e deploy atômico.
- Dispositivos físicos, outras engines, leitor de tela e teste infantil.
- Conteúdo e fatia pedagógica de Português.

## Próximo agente autorizado

- **Papel:** supervisor independente
- **Skill:** `lumon-supervisao-final`
- **Objetivo:** reproduzir a limpeza das quatro chaves e regressão, fechar ou reabrir o P1 e decidir a infraestrutura G4 sem promover itens não testados nem o Gate G5.
