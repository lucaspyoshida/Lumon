# Handoff — Supervisão do primeiro retrabalho G4

## Identificação

- **Agente executor:** supervisor
- **Skill utilizada:** `lumon-supervisao-final`
- **run_id:** `pt-20260804T105004Z-supervisor-g4-retrabalho-0d391df`
- **Chave de idempotência:** `G4_IMPLEMENTACAO_FATIA_VERTICAL_1:supervisor-retrabalho:0d391df9d7e81e1c3aaf4d5e866e97fbc0f3d908`
- **Gate:** `G4_IMPLEMENTACAO_FATIA_VERTICAL_1`
- **Commit revisado:** `0d391df9d7e81e1c3aaf4d5e866e97fbc0f3d908`
- **Claim remoto:** `f703f857bf5b9a762eb19ac695c94d8d53c0bc60`
- **Relatório publicado:** `df556a08833d86a9decbe1ed523624e2970defbc`
- **Veredito:** `REPROVADO`
- **Decisão de fluxo:** `RETRABALHO` restrito ao mesmo programador

## Relatório

- `docs/agent-loop/portugues/aprovacoes/G4-retrabalho-pt-20260804T105004Z-supervisor-g4-retrabalho-0d391df.md`.

## Resultado aceito

- Release content-addressed fechou o P1 local: 31 hashes/ID/service worker coerentes.
- Build stale-fail, rejeição de shell híbrido, cache byte a byte, offline, Matemática e Português fail-closed passaram.
- Esse componente não deve ser reaberto no próximo retrabalho.

## P1 restante — exclusão mantém backups legados

- **Reprodução:** semear `lumon-corrupt-backup`, `lumon-legacy-backup` e `lumon-last-settings`, migrar V1 e confirmar **Apagar todo o progresso**.
- **Evidência:** V1 e backup IndexedDB foram removidos e V2 zerou, mas as três chaves legadas permaneceram; `lumon-corrupt-backup` pode conter `progress.completedSessions`.
- **Aceite:** remover ou anonimizar todas as chaves históricas Lumon allowlisted capazes de conter progresso/dados antigos, sem tocar chaves externas. E2E deve semear marcador único em cada chave, provar ausência, tombstone sem origem/SHA, V2 zero e reload sem recriação.

## Não testado

- Crash/quota, duas abas e downgrade.
- `transferSize`, `Content-Encoding` e deploy atômico no host final.
- Dispositivos físicos, outras engines, leitores de tela e teste infantil.
- Pacote editorial e fatia pedagógica de Português.

## Próximo agente autorizado

- **Papel:** o mesmo programador
- **Skill:** `lumon-programador-pwa`
- **Escopo:** corrigir somente a limpeza allowlisted das chaves históricas Lumon e o E2E dedicado; preservar release content-addressed e todo restante.
