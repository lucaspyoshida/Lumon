# Supervisão do Gate G3 — lote visual P0a

## Identificação

- **Agente:** supervisor
- **Skill:** `lumon-supervisao-final`
- **run_id:** `pt-20260721T173616Z-supervisor-ee4da94`
- **Chave de idempotência:** `G3_P0A_MODEL_SHEET:supervisor:ee4da946b1b489ae7ea69615feffb6b7bcc15ca2`
- **Gate:** `G3_P0A_MODEL_SHEET`
- **Claim remoto de entrada:** `4816e59f8ff8d68dd390a30e64744132292b73b1`
- **Handoff canônico revisado:** `ee4da946b1b489ae7ea69615feffb6b7bcc15ca2`
- **Commit dos artefatos P0a:** `1aea0afae2ccf44d37d003a0aaa68806f7586d18`
- **Implementação:** não autorizada

## Escopo da decisão

Esta revisão decide exclusivamente se a folha de modelo e as duas âncoras P0a podem se tornar a fonte visual aprovada para P0b. Não aprova P0b, P0c, ícone, shell, protótipo, teste infantil, conteúdo pedagógico, código, CSS, PWA, implementação ou Gate G4.

Foram lidos integralmente o Norte, o plano de evolução, a skill `lumon-supervisao-final`, `STATUS.yaml`, a especificação de arte, o handoff P0a, o prompt, manifesto, avaliação do artista e as aprovações G3 relevantes. Os três JPEGs foram inspecionados visualmente em resolução original; as duas âncoras também foram verificadas a 48 px.

## Procedência, concorrência e integridade

- Raiz confirmada em `/Users/yoshida/Documents/Codex/2026-07-16/quai/Lumon`.
- Branch confirmada: `feature/evolucao-pedagogica`.
- Worktree estava limpa antes da escrita.
- `HEAD`, upstream local e remoto ao vivo estavam no claim `4816e59f8ff8d68dd390a30e64744132292b73b1`.
- O commit dos artefatos `1aea0af` é ancestral do handoff `ee4da94`, que é ancestral do claim.
- `STATUS.yaml` contém o mesmo gate, agente, `run_id` e chave de idempotência.
- Lock global pertence ao mesmo `run_id` e foi preservado sem edição.
- Nenhum relatório anterior deste `run_id` existia.

## Avaliação independente

### Anatomia e consistência das 12 poses

As 12 células mostram uma única Capivara reconhecível. Silhueta baixa, focinho claro, olhos e orelhas pequenos, pelagem, lenço verde-petróleo e medalhão dourado permanecem visualmente coerentes. Não há cauda visível, mãos humanas abertas, texto, número, logotipo, marca-d'água, objeto pedagógico, pista de resposta ou emoção punitiva aparente.

Frontal, 3/4, lateral, posterior e sentada são legíveis. Porém a célula 6, especificada como alcance curto de pata, mostra as patas apoiadas e não comunica alcance de modo inequívoco. Isso deixa incompleta uma pose anatômica obrigatória do P0a. A célula de acolhimento usa pata compacta junto ao corpo e não apresenta palma ou dedos humanos abertos.

### Âncoras, recorte, padding e redução

As âncoras frontal e 3/4 mostram corpo inteiro, orelhas, focinho, patas, lenço e medalhão sem corte. Há espaço neutro em todas as bordas e nenhuma sobreposição. A 48 px, espécie, silhueta, focinho, olhos, lenço e medalhão continuam reconhecíveis. Os JPEGs têm fundo opaco; isso não é falha de transparência neste P0a, porque o prompt registrou que transparência não era necessária. P0b continua obrigado a provar alpha/halo conforme seus próprios tickets.

### Formato, dimensões, hashes e budgets

| Arquivo | Resultado observado | Teto | Decisão |
|---|---|---:|---|
| `p0a-model-sheet-v1-review-1536.jpg` | JPEG/sRGB, 1536×1536, 146.959 bytes, SHA-256 `08dea06c86465cf773a05c43dba0fc93bdbc83a87912be7020239ac9c9366b90` | 150.000 | passa por 3.041 bytes |
| `p0a-anchor-front-v1-512.jpg` | JPEG/sRGB, 512×512, 38.232 bytes, SHA-256 `89476d450a4d650676ba3f3153519f14d56f58a682c7a835cde6ff3a63b9fe16` | 90.000 | passa |
| `p0a-anchor-3q-v1-512.jpg` | JPEG/sRGB, 512×512, 43.506 bytes, SHA-256 `787fd31ce78b38b2bedf26792674a2bce9320318a74c4d13efbaf696b4ecb3bf` | 90.000 | passa |

Os hashes, bytes, dimensões, MIME, sRGB e ausência de alfa correspondem ao manifesto. O export solicitado foi WebP, mas os três arquivos publicados são JPEG. O desvio foi declarado, porém não houve comparação WebP/JPEG de qualidade, compatibilidade e peso como exige a especificação. Qualquer regravação da folha invalida sua margem estreita e exige nova medição e novos hashes.

### Originalidade aparente, licença e proveniência

Não há semelhança visual óbvia com personagem, franquia, estúdio ou marca identificável na inspeção limitada, e o prompt não cita artista nem identidade protegida. Isso sustenta somente originalidade aparente; não substitui revisão jurídica ou busca exaustiva.

O manifesto registra geração nova pela ferramenta integrada e ausência de dados infantis. Entretanto, `termos_de_uso_e_retencao` estão `nao_expostos_pela_ferramenta`, `verificacao_juridica` está `nao_realizada` e não há prova de licença/permissão comercial compatível. Modelo, versão, seed e parâmetros determinísticos também não foram expostos. A especificação classifica licença/proveniência incompletas como bloqueantes e exige esses campos no gate futuro P0a.

A fonte lossless selecionada possui hash confirmado, mas existe somente em `/Users/yoshida/.codex/generated_images/.../exec-69425295-21ab-4664-89d8-4031f8b95efb.png`, fora do Git/remoto. O próprio handoff declara que ela não é entrada canônica. Como o pipeline exige voltar ao master para reedição, esse arquivo local não pode sustentar retrabalho ou derivação canônica futura.

### Metadados e separação de escopo

Os JPEGs contêm perfil sRGB, EXIF técnico mínimo e marcador `Photoshop 3.0`. Busca básica não encontrou autor, GPS, coordenadas, caminho local ou identificador pessoal. Os commits P0a alteraram somente evidências, manifesto, prompt, avaliação e handoff. P0b, P0c, ícone, conteúdo, código, CSS, PWA e `STATUS.yaml` ficaram fora do lote.

## Matriz de evidências

### TESTADO

- Raiz, branch, worktree, claim, remoto ao vivo, ancestralidade, lock, estado e idempotência.
- Inspeção visual original dos três JPEGs e redução das âncoras a 48 px.
- Presença das 12 células, identidade geral, anatomia aparente, emoções, texto/marca/pista, recortes e padding.
- MIME, dimensões, bytes, SHA-256, sRGB, alfa e metadados básicos dos três exports.
- Existência, dimensões, bytes e SHA-256 da fonte PNG local declarada.
- Escopo dos commits `1aea0af` e `ee4da94`.

### FALHOU

- Licença/permissão comercial e termos/retenção da ferramenta não foram comprovados.
- Fonte lossless não foi publicada em armazenamento canônico e durável; só há caminho local.
- Pose obrigatória de alcance curto não é visualmente inequívoca na célula 6.
- WebP solicitado não foi entregue nem comparado objetivamente ao JPEG publicado.
- Modelo, versão, seed e parâmetros determinísticos exigidos pela especificação não estão disponíveis.

### NAO TESTADO

- Revisão jurídica exaustiva, busca reversa e comparação ampla contra identidades protegidas.
- Termos do fornecedor, permissão comercial, retenção e uso de inputs.
- Correspondência colorimétrica pixel a pixel com os HEX documentados.
- Impressão, leitores de tela, integração, viewports do produto, P0b/P0c e transparência de assets de runtime.
- Atratividade, compreensão e validação com crianças.

### INFERIDO

- A direção é provavelmente adequada como ilustração editorial infantil.
- O prompt sem nomes de artista e a ausência de semelhança óbvia reduzem risco de derivação, mas não provam originalidade ou licença.
- A consistência geral tende a funcionar como referência, mas não compensa os bloqueios de procedência e pose.

Nenhuma inferência foi usada para aprovar o lote.

## Problemas P0–P3

### P0 — licença e termos de uso não comprovados

- **Reprodução:** abrir `docs/agent-loop/portugues/evidencias/p0a/MANIFEST.yaml` e consultar `proveniencia_e_licenca`.
- **Evidência:** `termos_de_uso_e_retencao: nao_expostos_pela_ferramenta` e `verificacao_juridica: nao_realizada`; não existe snapshot ou referência pública versionada que prove uso comercial e tratamento compatíveis.
- **Critério objetivo de aceite:** publicar evidência durável dos termos aplicáveis na data da geração, permissão comercial, retenção/uso de prompts e referências, e decisão de licença compatível; se a ferramenta não permitir essa prova, regenerar com ferramenta autorizada que permita.
- **Efeito:** bloqueia a aprovação das âncoras e P0b.

### P1 — master lossless não é canônico nem durável

- **Reprodução:** verificar `geracao.candidato_selecionado.caminho_externo` e `commitado: false` no manifesto; confirmar que o commit P0a contém somente os JPEGs derivados.
- **Evidência:** fonte PNG de 1.789.258 bytes e SHA-256 `7cd643f61181d2ce8969b20059055e4315fbfd8cf7053b520b6c983d8b69de45` existe apenas em caminho local de geração.
- **Critério objetivo de aceite:** publicar o master lossless em armazenamento canônico/durável referenciado por ID imutável e hash, ou regenerar/publicar um master permitido; nenhum próximo agente pode depender do caminho local.
- **Efeito:** bloqueia retrabalho reproduzível e derivação canônica.

### P1 — pose anatômica de alcance curto não está demonstrada

- **Reprodução:** abrir a folha e inspecionar a célula 6, segunda linha, segunda coluna.
- **Evidência:** as patas aparecem apoiadas; não há alcance curto inequívoco, embora `P0A-02-U` e o prompt exijam gesto de alcance compacto ainda quadrupedal.
- **Critério objetivo de aceite:** nova versão mostra uma forepata curta e compacta alcançando espaço vazio, próxima ao corpo, sem palma, polegar, dedos abertos, alongamento humano ou postura bípede; demais marcadores permanecem estáveis.
- **Efeito:** mantém P0a incompleto.

### P2 — proveniência técnica não reproduzível

- **Reprodução:** consultar `geracao.modelo`, `versao_modelo`, `seed` e `parametros_deterministicos` no manifesto.
- **Evidência:** todos estão `nao_exposto(s)` e `reproducibilidade_pixel_a_pixel: false`.
- **Critério objetivo de aceite:** registrar ferramenta, modelo, versão e parâmetros disponíveis; quando seed não existir, documentar limitação aceita sem omitir os demais campos obrigatórios. Para este gate, usar pipeline que cumpra a matriz de proveniência aprovada.
- **Efeito:** reforça bloqueio de proveniência do P0a.

### P2 — substituição WebP por JPEG sem comparação aprovada

- **Reprodução:** comparar `formato_solicitado: WebP` com `formato_entregue: JPEG` e executar `file` nos três exports.
- **Evidência:** os arquivos são JPEG opacos; não há candidato WebP nem comparação de qualidade/compatibilidade/bytes.
- **Critério objetivo de aceite:** entregar WebP conforme ticket e budget, ou publicar comparação objetiva que aprove formalmente outro formato sem perder qualidade, bordas, metadados e orçamento. Recalcular bytes e hashes.
- **Efeito:** exige correção técnica no retrabalho P0a; ausência de alfa isoladamente não reprova este lote editorial.

Nenhum problema P3 adicional foi encontrado. As ressalvas P1 anteriores de ícone 512 e shell frio permanecem fora do escopo e ativas.

## Veredito

**REPROVADO**

O lote P0a não pode se tornar a fonte visual aprovada. A direção visual, consistência geral, recortes, legibilidade e budgets são promissores, mas licença/proveniência incompletas constituem bloqueio P0; o master não publicado, a pose 6 incompleta e o desvio técnico exigem correção verificável. Aprovação por aparência seria inferência proibida pelo Norte e pela skill.

## Decisão de fluxo

- **Decisão:** `RETRABALHO` do mesmo papel artista IA no lote P0a.
- **P0b:** não liberado.
- **Escopo do retrabalho:** corrigir somente P0a, mantendo identidade aprovada documentalmente e resolvendo integralmente P0/P1/P2 acima.
- **Nova revisão:** supervisor independente após artefatos, evidências e handoff publicados e confirmados no remoto.
- **Continuam bloqueados:** P0b, P0c, programador, implementação, código, CSS, PWA, Gate G4, Firebase, backend, rede e transmissão de dados.

Somente o orquestrador altera `STATUS.yaml`, cria handoff do supervisor, comenta a Issue e aciona o retrabalho após confirmar este relatório no remoto.
