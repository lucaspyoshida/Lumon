# Handoff — Gate G3 — lote visual P0a

## Identificação

- **Agente executor:** artista IA
- **Skills utilizadas:** `lumon-arte-capivara` e `imagegen`
- **run_id:** `pt-20260718T172438Z-artista-p0a-dfaa87d`
- **Chave de idempotência:** `G3_P0A_MODEL_SHEET:artista_ia:dfaa87dfc4cc64fecb14d224aa1a9417020743f7`
- **Gate:** `G3_P0A_MODEL_SHEET`
- **Commit de entrada publicado:** `20ab1d6de815a14095d96f713414b49d180433c2`
- **Commit de saída publicado:** `1aea0afae2ccf44d37d003a0aaa68806f7586d18`
- **Recomendação do executor:** revisão independente; não constitui aprovação
- **Implementação:** não autorizada

## Entradas consultadas

- `_reversa_sdd/norte-modulo-portugues.md`.
- `_reversa_sdd/plano-evolucao-lumon.md`, nas seções relevantes.
- `docs/agent-loop/portugues/ESPECIFICACAO_ARTE_CAPIVARA.md`.
- `docs/agent-loop/portugues/PLANO_FRONTEND_INFANTIL.md`.
- `docs/agent-loop/portugues/aprovacoes/G3-arte-pt-20260718T165435Z-supervisor-84785f4.md`.
- `docs/agent-loop/portugues/STATUS.yaml` no claim publicado.
- Skill `lumon-arte-capivara` e procedimento técnico `imagegen`.

## Procedência, concorrência e publicação

- Raiz validada: `/Users/yoshida/Documents/Codex/2026-07-16/quai/Lumon`.
- Branch validada: `feature/evolucao-pedagogica`.
- Claim canônico conferido com mesmo gate, agente, `run_id` e chave de idempotência.
- Reinício encontrou o commit local idempotente `1aea0af`; lote não foi regenerado.
- Lease antigo estava expirado e ausência de processo ativo do mesmo `run_id` foi confirmada antes da recuperação.
- Lock atômico global adquirido pelo orquestrador antes da publicação e do handoff.
- `1aea0af` foi publicado e confirmado em `origin/feature/evolucao-pedagogica` antes deste handoff.
- Nenhum segundo artista foi acionado.

## Trabalho executado

- Gerado candidato inicial de model sheet; rejeitado por mãos humanoides e marca semelhante a cauda.
- Gerada edição corretiva preservando identidade, paleta e composição.
- Selecionado candidato corretivo sem autoaprovação.
- Exportada folha de revisão em `1536×1536` e duas âncoras em `512×512`.
- Registrados prompt, ferramenta, dimensões, bytes, SHA-256, pós-processamento, proveniência e limitações.
- Inspecionadas anatomia, identidade, expressões, texto indevido, recortes, downscales, perfil de cor e metadados básicos.
- Mantidos P0b, P0c, ícone, CSS, PWA, conteúdo pedagógico e código do aplicativo fora do escopo.

## Artefatos publicados

- `docs/agent-loop/portugues/evidencias/p0a/PROMPT_P0A_V1.md`.
- `docs/agent-loop/portugues/evidencias/p0a/MANIFEST.yaml`.
- `docs/agent-loop/portugues/evidencias/p0a/AVALIACAO_ARTISTA.md`.
- `docs/agent-loop/portugues/evidencias/p0a/p0a-model-sheet-v1-review-1536.jpg`.
- `docs/agent-loop/portugues/evidencias/p0a/p0a-anchor-front-v1-512.jpg`.
- `docs/agent-loop/portugues/evidencias/p0a/p0a-anchor-3q-v1-512.jpg`.

## Decisões aprovadas respeitadas

- Capivara única, sem nome próprio, com direção infantil própria.
- Silhueta baixa e arredondada, focinho claro, olhos e orelhas pequenos, patas curtas, lenço verde-petróleo e medalhão dourado.
- Sem mãos humanas, cauda visível, texto, pseudoalfabeto, número, logotipo, marca-d'água, resposta ou pista pedagógica.
- Emoções acolhedoras, sem tristeza punitiva, vergonha ou reprovação.
- P0a isolado; P0b e P0c dependem do veredito supervisor.
- Nenhum código, CSS, PWA ou asset de produto final alterado.

## Evidências e testes

### Testado

- SHA-256 dos três JPEGs corresponde ao `MANIFEST.yaml`.
- Folha: `1536×1536`, `146.959` bytes, abaixo do teto de `150.000` bytes.
- Âncora frontal: `512×512`, `38.232` bytes, abaixo de `90.000` bytes.
- Âncora 3/4: `512×512`, `43.506` bytes, abaixo de `90.000` bytes.
- `file`, `wc -c`, `shasum -a 256` e `sips` confirmaram MIME, dimensões, sRGB e ausência de alfa.
- Downscales até `48 px` mantiveram silhueta e marcadores principais reconhecíveis em inspeção visual.
- Busca básica de metadados não encontrou autor, GPS, coordenadas, caminho local ou identificador pessoal.
- Candidato corretivo não mostrou mãos humanas nem cauda visível na inspeção do artista.

### Falhou

- Formato solicitado WebP não foi entregue. Ambiente não disponibilizou encoder WebP; exports são JPEG.

### Não testado

- Avaliação com crianças.
- Integração no produto, responsividade real, leitores de tela e impressão.
- Originalidade jurídica exaustiva e termos/retenção da ferramenta.
- Correspondência colorimétrica pixel a pixel com os HEX documentados.
- Transparência, pois exports JPEG não possuem alfa.

### Inferido

- Adequação provável como referência editorial infantil, sujeita à revisão independente.

## Pendências e riscos

- Supervisor deve decidir se JPEG no lugar de WebP bloqueia P0a ou pode virar ressalva com conversão posterior.
- Folha ficou apenas `3.041` bytes abaixo do teto; qualquer regravação exige nova medição.
- Fonte PNG selecionada não foi commitada por peso; caminho e hash permanecem no manifesto, mas não são entrada canônica do próximo agente.
- Artefatos são candidatos de revisão, não assets aprovados para integração.
- P0b e P0c continuam bloqueados até veredito publicado.

## Critérios para revisão

- Comparar anatomia e consistência das 12 poses contra Norte e especificação.
- Verificar recortes, padding e legibilidade das duas âncoras.
- Classificar desvio JPEG/WebP e ausência de transparência.
- Confirmar budgets, hashes e separação de escopo.
- Separar `TESTADO`, `FALHOU`, `NÃO TESTADO` e `INFERIDO`.
- Emitir somente veredito permitido pela skill `lumon-supervisao-final`.

## Próximo agente recomendado

- **Agente:** supervisor.
- **Skill:** `lumon-supervisao-final`.
- **Objetivo:** revisar exclusivamente lote P0a e decidir avanço para P0b ou retrabalho P0a.
- **Proibições:** não implementar produto, não editar assets candidatos e não liberar P0b/P0c sem veredito publicado.
