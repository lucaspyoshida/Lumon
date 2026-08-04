# Handoff — Retrabalho técnico do Gate G4

## Identificação

- **Agente executor:** programador
- **Skill utilizada:** `lumon-programador-pwa`
- **run_id:** `pt-20260804T103728Z-programador-g4-retrabalho-bc14d32`
- **Chave de idempotência:** `G4_IMPLEMENTACAO_FATIA_VERTICAL_1:programador-retrabalho:bc14d32f247b88f0bf6c9ee58eba43895ccc5d78`
- **Gate:** `G4_IMPLEMENTACAO_FATIA_VERTICAL_1`
- **Claim remoto:** `6676a52ef502177226a64c8cb5f568844581f330`
- **Commit de retrabalho publicado:** `0d391df9d7e81e1c3aaf4d5e866e97fbc0f3d908`
- **Estado de saída:** `EM_REVISAO`

## Correções entregues

### Exclusão adulta completa

- Grava estado V2 zerado.
- Apaga `lumon-state-v1` e `migrationJournal/v1-backup`.
- Substitui o journal por tombstone `source-erased`, sem SHA ou origem histórica.
- Preserva chaves externas e impede remigração após reload.

### Release content-addressed

- `release-manifest.json` contém SHA-256 de cada resposta normativa.
- Release ID deriva do payload canônico dos hashes.
- Build falha se manifesto ou ID do service worker estiverem obsoletos.
- Service worker valida bytes antes de gravar cache; divergência remove cache parcial e mantém worker anterior.
- Teste injeta `app.js` de outro release e exige rejeição por shell híbrido.

## Evidência

- `docs/agent-loop/portugues/evidencias/g4-retrabalho/IMPLEMENTACAO_G4_RETRABALHO.md`.
- `npm run check`: aprovado, 33/33 testes.
- `npm run test:e2e:chromium`: aprovado, 12/12 cenários.
- Shell gzip completo: `158823 bytes`, abaixo de `500000`.
- Cache instalado auditado byte a byte contra o manifesto.

## Falhou durante desenvolvimento

- A primeira suíte completa obteve 11/12 porque o fixture reintroduzia V1 artificialmente em cada navegação.
- Semeadura foi limitada a uma vez por aba; cenário dedicado e suíte completa passaram.
- Nenhum defeito funcional permaneceu comprovado na execução final do programador.

## Não testado

- `transferSize`, `Content-Encoding` e deploy atômico no host final.
- Crash/quota, duas abas, downgrade, dispositivos físicos, outras engines, leitor de tela e teste infantil.
- Conteúdo, microcorpus, áudio e imagens pedagógicas de Português.

## Limites preservados

- Português continua `blocked-content`.
- Nenhum backend, rede de produto, Firebase, TTS, analytics ou conteúdo editorial foi adicionado.
- Matemática, offline e budgets permanecem no escopo testado.

## Próximo agente autorizado

- **Papel:** supervisor independente
- **Skill:** `lumon-supervisao-final`
- **Objetivo:** reproduzir os aceites dos dois P1, confirmar regressão e decidir se a infraestrutura G4 alcançou aprovação plena ou exige novo retrabalho, mantendo Gate G5 separado e bloqueado.
