# Evidência de retrabalho — Gate G4

- `run_id`: `pt-20260804T103728Z-programador-g4-retrabalho-bc14d32`
- chave de idempotência: `G4_IMPLEMENTACAO_FATIA_VERTICAL_1:programador-retrabalho:bc14d32f247b88f0bf6c9ee58eba43895ccc5d78`
- base canônica: `6676a52ef502177226a64c8cb5f568844581f330`
- executado em: `2026-08-04T10:47:15Z`
- escopo: somente `P1_EXCLUSAO_COMPLETA_RETEM_HISTORICO` e aceite local de `P1_SHELL_SEM_PROVA_FRIA`

## Resultado

### Exclusão adulta completa

A ação **Apagar todo o progresso** agora executa uma operação dedicada:

1. valida o estado V2 já migrado e sua revisão;
2. grava estado V2 zerado;
3. elimina `migrationJournal/v1-backup`;
4. substitui o journal por tombstone `source-erased`, sem chave de origem nem SHA histórico;
5. remove `lumon-state-v1`;
6. preserva chaves de outros aplicativos.

O V2 zerado, o tombstone e a ausência da fonte impedem remigração do histórico apagado.

### Release content-addressed e anti-mistura

O release possui manifesto com SHA-256 de cada resposta normativa. A identidade
`f48d90822631ef1398cabc872048464603775646f09973626749b67d41788eba` deriva do payload canônico desses hashes.

- `npm run release:sync` gera o manifesto e sincroniza a identidade esperada do service worker.
- o build recalcula os hashes e falha se manifesto ou identidade estiverem obsoletos;
- a instalação busca cada asset sem reutilizar cache HTTP, valida seu SHA-256 e só então grava o cache content-addressed;
- qualquer divergência apaga o cache parcial e falha a instalação, mantendo o worker anterior;
- release atual e anterior continuam sendo os únicos caches Lumon retidos.

## TESTADO

- `npm run check`: lint, 33/33 testes e build aprovados.
- teste unitário com bytes coerentes: instalação aceita.
- teste unitário com `app.js` de outro release: instalação rejeita com `Shell híbrido detectado`.
- build bloqueante: manifesto e `EXPECTED_RELEASE_ID` conferidos contra bytes atuais.
- shell gzip estático completo, incluindo service worker e manifesto: `158823 bytes`, abaixo de `500000`.
- cenário Chromium dedicado de exclusão:
  - V1 histórico existia antes da confirmação;
  - backup bruto existia antes da confirmação;
  - depois da ação, V1 ausente, backup ausente, journal anonimizado e V2 zerado;
  - reload preservou V2 zerado e não recriou V1/backup;
  - chave externa permaneceu intacta.
- auditoria Chromium do cache instalado: nome igual ao release ID e todos os bytes iguais aos hashes do manifesto.
- `npm run test:e2e:chromium`: 12/12 aprovados na execução final em `1.1m`.

## FALHOU

- primeira suíte Chromium completa do retrabalho: 11/12. O fixture Playwright reinseria artificialmente `lumon-state-v1` em cada navegação. O fixture foi corrigido para semear uma única vez por aba; o cenário dedicado passou depois da correção.
- nenhum defeito funcional permaneceu comprovado após a correção do fixture.

## NAO TESTADO

- transferência fria, `Content-Encoding`, `transferSize` e deploy atômico no host final, pois publicação externa não foi autorizada;
- crash/quota entre localStorage e commit IndexedDB, duas abas e downgrade;
- instalação física, Safari/iOS, Firefox, leitor de tela e teste infantil;
- conteúdo, microcorpus, áudio e imagens pedagógicas de Português, que continuam ausentes e `blocked-content`.

## Limites preservados

Não foram adicionados backend, rede de produto, Firebase, TTS, analytics, microcorpus, áudio ou imagens pedagógicas. Matemática, offline, budgets e fail-closed de Português permanecem no mesmo escopo aprovado.
