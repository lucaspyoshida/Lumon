# Handoff — Supervisão do lote visual P0a

## Identificação

- **Agente executor:** supervisor
- **Skill utilizada:** `lumon-supervisao-final`
- **run_id:** `pt-20260721T173616Z-supervisor-ee4da94`
- **Chave de idempotência:** `G3_P0A_MODEL_SHEET:supervisor:ee4da946b1b489ae7ea69615feffb6b7bcc15ca2`
- **Gate:** `G3_P0A_MODEL_SHEET`
- **Claim remoto de entrada:** `4816e59f8ff8d68dd390a30e64744132292b73b1`
- **Handoff P0a revisado:** `ee4da946b1b489ae7ea69615feffb6b7bcc15ca2`
- **Commit de saída publicado (relatório):** `365f25fae95de5c7825a0cd126b14c4c2b70937d`
- **Veredito:** `REPROVADO`
- **Decisão de fluxo:** `RETRABALHO` P0a; P0b bloqueado
- **Implementação:** não autorizada

## Entradas consultadas

- Skill `lumon-supervisao-final`, Norte e plano de evolução, lidos integralmente.
- `docs/agent-loop/portugues/STATUS.yaml` no claim publicado.
- `docs/agent-loop/portugues/handoffs/pt-20260718T172438Z-artista-p0a-dfaa87d.md`.
- `docs/agent-loop/portugues/ESPECIFICACAO_ARTE_CAPIVARA.md`.
- Prompt, manifesto, avaliação e três JPEGs do lote P0a.
- Aprovações G3 relevantes e histórico de commits do ciclo.

## Procedência, concorrência e publicação

- Raiz, branch, worktree, claim, remoto ao vivo, ancestralidade, lock e idempotência foram validados.
- Um único supervisor trabalhou no claim.
- Lock global do mesmo `run_id` foi preservado.
- Relatório publicado e confirmado no remoto em `365f25fae95de5c7825a0cd126b14c4c2b70937d`.
- Supervisor não alterou `STATUS.yaml`, handoffs anteriores, produto ou assets.

## Trabalho executado

- Inspecionadas visualmente folha e âncoras em resolução original; âncoras também verificadas a `48 px`.
- Avaliadas anatomia, consistência, emoções, recortes, padding, redução, formato, dimensões, hashes, budgets, alfa e metadados.
- Auditadas originalidade aparente, licença, termos, proveniência, master lossless e separação de escopo.
- Separadas evidências em `TESTADO`, `FALHOU`, `NAO TESTADO` e `INFERIDO`.
- Classificados problemas P0–P2 com reprodução, evidência, aceite e efeito no fluxo.
- Emitido veredito `REPROVADO` e retorno ao mesmo papel artista IA.

## Artefato

- `docs/agent-loop/portugues/aprovacoes/G3-P0a-pt-20260721T173616Z-supervisor-ee4da94.md`.

## Evidências e decisão

### Testado

- Identidade geral consistente nas 12 células; sem mãos humanas abertas, cauda visível, texto, logo, pista ou emoção punitiva.
- Âncoras com corpo inteiro, padding seguro e marcadores reconhecíveis a `48 px`.
- JPEGs, dimensões, bytes, SHA-256, sRGB e metadados correspondem ao manifesto.
- Folha e âncoras passam budgets publicados.
- Commits P0a respeitam separação de escopo.

### Falhou

- **P0:** licença/permissão comercial e termos/retenção da ferramenta não comprovados.
- **P1:** master lossless existe somente em caminho local; não é canônico nem durável.
- **P1:** célula 6 não demonstra alcance curto inequívoco.
- **P2:** modelo, versão, seed e parâmetros técnicos não sustentam proveniência reproduzível.
- **P2:** WebP solicitado foi substituído por JPEG sem comparação formal aprovada.

### Não testado

- Revisão jurídica exaustiva, busca reversa e termos do fornecedor.
- Correspondência colorimétrica pixel a pixel.
- Integração, responsividade no app, P0b/P0c e validação com crianças.

### Inferido

- Direção visual provavelmente adequada ao público e consistente como referência editorial, mas inferência não permite aprovação.

## Critérios objetivos do retrabalho P0a

1. Publicar evidência durável dos termos aplicáveis, permissão comercial e tratamento de prompts/referências; se impossível, usar ferramenta autorizada que permita prova.
2. Publicar master lossless em armazenamento canônico/durável com ID imutável e hash, ou regenerar master permitido.
3. Corrigir célula 6: forepata curta alcançando espaço vazio, ainda quadrupedal, sem palma, polegar, dedos abertos ou postura humana.
4. Registrar ferramenta, modelo, versão e parâmetros disponíveis; documentar limitações reais sem omitir campos exigidos.
5. Entregar WebP conforme ticket e budget, ou publicar comparação objetiva que aprove outro formato; recalcular bytes e hashes.
6. Preservar identidade, anatomia, recortes, legibilidade e budgets já conformes.

## Pendências e riscos

- P0b e P0c permanecem bloqueados.
- Caminho local do master antigo não pode ser entrada canônica do próximo agente.
- Nova geração ou regravação invalida hashes e exige nova medição completa.
- Ressalvas anteriores de ícone e shell frio permanecem ativas e fora deste retrabalho.
- Programador, implementação, código, CSS, PWA, Gate G4, backend, Firebase, rede e transmissão de dados seguem bloqueados.

## Próximo agente recomendado

- **Agente:** artista IA.
- **Skill:** `lumon-arte-capivara`, com `imagegen` apenas se necessário para corrigir P0a.
- **Objetivo:** retrabalhar somente lote P0a contra P0/P1/P2 publicados.
- **Entrada canônica:** este handoff depois de publicado e confirmado no remoto.
- **Próximo gate:** nova supervisão independente P0a depois dos artefatos e handoff publicados.
