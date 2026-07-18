# Supervisão do Gate G3 — plano de frontend infantil

## Identificação

- **Agente:** supervisor
- **Skill:** `lumon-supervisao-final`
- **run_id:** `pt-20260718T162644Z-supervisor-aa15669`
- **Chave de idempotência:** `G3_EXPERIENCIA_PILOTO_VISUAL:supervisor:aa15669be3aacf85cdb7a13300a7ee0d491bddc7`
- **Gate:** `G3_EXPERIENCIA_PILOTO_VISUAL`
- **Commit de entrada publicado:** `2d251d9a69fa312fa8ee47f74c86d463641faee1`
- **Plano revisado:** `docs/agent-loop/portugues/PLANO_FRONTEND_INFANTIL.md`, publicado em `411d241559155d0c25f8357045aaabfba5f8b196`
- **Handoff revisado:** `docs/agent-loop/portugues/handoffs/pt-20260718T155615Z-frontend-09621e7.md`, publicado em `aa15669be3aacf85cdb7a13300a7ee0d491bddc7`
- **Implementação e geração de assets finais:** não autorizadas

## Escopo da decisão

Esta revisão decide somente se o plano documental de frontend/design está estável o bastante para orientar a próxima especificação visual. Não aprova o Gate G3 completo, porque ainda não existem model sheet, piloto visual, assets, protótipo executável nem teste com crianças. Não aprova HTML, CSS, JavaScript, PWA futura, conteúdo, áudio, imagem, migração, pacote ou comportamento de runtime.

Foram lidos integralmente:

- `_reversa_sdd/norte-modulo-portugues.md`;
- `_reversa_sdd/plano-evolucao-lumon.md`;
- contrato pedagógico G1 e sua aprovação;
- contrato técnico G2 e sua aprovação;
- plano de engenharia leve e sua aprovação com ressalvas;
- plano de frontend infantil e seu handoff;
- `STATUS.yaml`, `AGENTS.md` e a skill `lumon-supervisao-final`.

Produto, configuração e testes atuais foram usados somente para baseline read-only. Nenhum arquivo do aplicativo foi alterado.

## Procedência, concorrência e integridade

- Raiz confirmada: `/Users/yoshida/Documents/Codex/2026-07-16/quai/Lumon`.
- Branch confirmada: `feature/evolucao-pedagogica`.
- Worktree de entrada e após baseline: limpa.
- `HEAD`, upstream local e remoto ao vivo confirmados em `2d251d9a69fa312fa8ee47f74c86d463641faee1` antes da escrita.
- Plano e handoff são idênticos aos artefatos publicados em seus commits e ambos são ancestrais da entrada.
- `STATUS.yaml` contém o mesmo gate, agente, `run_id` e chave de idempotência.
- Lock global pertence ao mesmo `run_id` e foi preservado sem edição.
- Nenhum relatório ou handoff anterior deste `run_id` existia.

## Avaliação independente

### Autonomia pré-leitora e fluxo global

O plano troca catálogo administrativo por próxima missão dominante, demonstração falada/visual, uma tarefa por tela e trilha de cinco marcos. Matemática e Português compartilham estrutura, Capivara, controles, estados e retorno, mas preservam contexto e progresso independentes. Texto, som, cor, gesto e movimento nunca são o único canal operacional. Swipe e arraste permanecem atalhos com botão equivalente.

Erro segue nova tentativa, pista, exemplo e item análogo sem revelar a resposta no primeiro erro. Saída exige decisão explícita; retomada preserva contexto; conclusão volta ao caminho sem ranking ou pressão. Leitura oral mantém `Li sozinho` e `Quero praticar` como autoavaliação, não como prova de domínio.

Esta cobertura é documental. Crianças ainda não comprovaram compreensão, autonomia, conforto ou atratividade.

### Área do Responsável

O acesso por pressão contínua de 3 segundos possui cancelamento em `pointerup`, saída da área, perda de visibilidade e teclado sem aceleração por repetição. O gate é corretamente descrito como barreira contra entrada acidental, não segurança forte. Exclusão, importação, desbloqueio e gestão de pacote permanecem na área adulta; ações críticas exigem confirmação separada.

Interação real por touch, teclado e leitor de tela continua `NAO TESTADO`. Nenhuma ação destrutiva foi implementada ou exercida.

### Áudio, acessibilidade e responsividade

`AudioButton` mantém gesto explícito, repetição, quatro formas de entrada e estados acessíveis sem depender de autoplay. A confirmação visual de toque tem orçamento próprio de 100 ms e não espera o evento `playing`. Estado essencial indisponível invalida item; apoio só usa fallback pedagógico permitido.

Alvos, foco, WCAG AA, zoom 200%, redução de movimento, safe areas, teclado virtual e cinco viewports possuem critérios verificáveis. A matriz cobre 360×640, 390×844, 768×1024, 1280×720 e 844×390. Contraste, leitor de tela, recortes, teclado virtual e aparelhos reais não foram testados.

### Primeira fatia vertical

A fatia liga preparo adulto, versão fixa, demonstração, áudio por toque, seleção, forma escrita, digitação, erro, pista, item análogo/transferência, persistência, conclusão e retomada offline. Placeholders impedem escolha prematura de palavra, áudio ou imagem. Uma sessão não concede domínio, assistência não vira evidência e asset inválido não vira erro infantil.

O documento especifica operação; não prova persistência, pacote, áudio, offline, migração, transferência ou regressão de Matemática.

### Tickets P0a/P0b/P0c e consistência visual

Tickets declaram função, emoção, matéria, dimensões, safe area, recorte, texto alternativo e teto de bytes. P0a cria âncoras; P0b deriva momentos essenciais; P0c deriva ícone e marcador sem redesenhar anatomia. Corpo, focinho, olhos, orelhas, pelagem, lenço e medalhão permanecem constantes. Contexto de matéria não duplica mascote nem revela resposta.

Os tickets são especificações, não assets. Enquanto a proibição atual permanecer, o artista pode somente refinar model sheet documental, prompts, referências, critérios e lote não-final. Não pode gerar imagem final, substituir ícone ou produzir arquivo embarcável.

### Orçamentos e ressalvas P1

O plano incorpora o teto individual de 150.000 bytes, propõe P0c 512 em até 80 KB e reserva no máximo 210 KB de visuais no shell. O envelope P0b da fatia é cumulativo: a soma real dos cinco momentos essenciais deve ficar em até 300 KB, ainda que os tetos individuais dos tickets somem 370 KB. Tetos individuais não autorizam ultrapassar o agregado.

O envelope 210/290 KB e a fatia visual de até 750 KB são limites de planejamento. Não comprovam transferência fria, compressão do host, coerência de release ou encaixe do pacote com áudio/conteúdo. Os dois P1 da engenharia permanecem ativos.

### Protocolo infantil

O protocolo cobre pelo menos cinco crianças, ao menos duas pré-leitoras, consentimento, IDs anônimos, ausência de voz/analytics/transmissão, parada acolhedora e registro por tarefa. Com cinco participantes, 80% equivale a pelo menos quatro. Zero bloqueio crítico vale para toda criança.

A frase “média global não compensa falha de pré-leitoras” é condição normativa: resultados das duas pré-leitoras devem ser reportados separadamente; falha delas na sequência operacional central exige retrabalho mesmo se a média global atingir 80%. A amostra detecta bloqueios iniciais, não valida estatisticamente critérios de domínio.

## Decisão sobre as 17 propostas G3

| Nº | Proposta | Decisão | Limite obrigatório |
|---:|---|---|---|
| 1 | Identidade `Lumon — pequenas descobertas` | Aceita como direção | Não renomeia o produto nem exige texto operacional; atratividade depende de teste infantil. |
| 2 | Paleta, medalhão-luz e fontes de sistema | Aceita como configuração inicial | Toda combinação real exige WCAG AA; medalhão/cor nunca são estado único. |
| 3 | `ChildHome`, `NextMission` e `SubjectSwitcher` | Aceita | Sessão ativa domina; troca não abandona nem mistura progresso. |
| 4 | Trilha com cinco marcos | Aceita | Habilidades internas ficam na área adulta; bloqueio não usa linguagem de fracasso. |
| 5 | Fluxo completo de atividade e retorno | Aceita | Primeiro erro não revela resposta; assistência não conta para domínio. |
| 6 | `AudioButton` preferencial de 64 px | Aceita | Mínimo 48 px, gesto explícito, repetição e estados acessíveis precisam de prova real. |
| 7 | Leitura oral autoavaliada | Aceita | Swipe é atalho; confiança nunca comprova precisão ou domínio. |
| 8 | Gate adulto de 3 segundos | Aceita | Pressão contínua, cancelamento e confirmação crítica separada são bloqueantes. |
| 9 | Matriz universal de estados | Aceita | Erro técnico nunca é atribuído à criança; ação impossível não é oferecida. |
| 10 | Componentes e eventos semânticos locais | Aceita | Eventos não são analytics, não trafegam rede e não decidem avaliação/domínio. |
| 11 | Acessibilidade, latência e redução de movimento | Aceita | WCAG, leitor, foco, canais e p95 precisam de medição; não há aprovação por especificação. |
| 12 | Matriz responsiva e teclado virtual | Aceita | Cinco viewports, zoom, safe areas e aparelhos reais permanecem testes bloqueantes. |
| 13 | Fatia vertical visual/operacional | Aceita como especificação | Não aprova palavra, asset, pacote, código, runtime, domínio ou offline real. |
| 14 | Tickets P0a/P0b/P0c | Aceita como contrato documental | Sequência P0a → P0b → P0c; sem geração final enquanto proibição atual permanecer. |
| 15 | Envelopes de shell e fatia | Aceita com ressalvas | P0b agregado ≤300 KB; shell final ≤500.000 bytes frios, zero híbrido e asset ≤150.000 bytes. |
| 16 | Teste infantil mínimo | Aceita como protocolo inicial | Duas pré-leitoras reportadas separadamente; zero bloqueio crítico e retrabalho quando meta falhar. |
| 17 | Artista bloqueado até supervisão | Aceita | Próximo papel só recebe escopo de especificação não-final; programador continua bloqueado. |

Nenhuma proposta demanda retrabalho do frontend. As condições acima tornam explícitos limites já presentes no Norte e nos contratos aprovados.

## Matriz de evidências

### TESTADO

- Raiz, branch, `HEAD`, remoto, worktree, lock, claim, idempotência, ancestralidade e integridade dos artefatos.
- `npm run check`: lint de 20 arquivos, 21/21 testes de unidade/integração e build com cinco etapas/37 habilidades aprovados.
- Cobertura documental das 17 propostas, fluxo global, doze wireframes, estados, `AudioButton`, gate adulto, acessibilidade, responsividade, fatia, tickets, budgets e protocolo infantil.
- Inspeção do baseline atual confirma foco, alvos lógicos, redução de movimento, alto contraste, zoom, confirmação de exclusão e alternativa à ordenação por gesto.
- Inspeção confirma acesso adulto atual por clique, interface textual, ausência de Capivara, Português, áudio e estados de pacote.
- `images/icon-512x512.png` continua com 385.793 bytes.
- Produto, código, testes, PWA, conteúdo, áudio e assets permaneceram inalterados.

### FALHOU

- Asset atual: `images/icon-512x512.png` possui 385.793 bytes, acima do teto de 150.000 bytes.
- Interface atual abre Área do Responsável por clique simples, não por pressão contínua de 3 segundos.
- Produto atual não comprova autonomia pré-leitora, próxima missão global, Capivara, troca de matéria, áudio por toque ou estados de pacote de Português.
- Shell futuro não possui medição fria real nem prova de release coerente.
- Nenhum teste funcional do baseline atual falhou.

As falhas de interface atual não reprovam este plano documental: são exatamente o trabalho futuro bloqueado até G4. Os P1 de orçamento bloqueiam futura aprovação de asset/shell, não a próxima especificação visual.

### NAO TESTADO

- Model sheet, P0a/P0b/P0c, consistência, anatomia, paleta, recortes, máscaras, transparência e bytes reais.
- Wireframes/protótipo com crianças; meta 80%, autonomia das pré-leitoras e zero bloqueio crítico.
- Atratividade, compreensão dos símbolos, nomeação de imagem e ausência de pista pedagógica.
- `AudioButton`, pronúncia, toque, repetição, autoplay, leitor de tela, latência e erro reais.
- Redesign nos cinco viewports, teclado virtual, zoom, safe areas, VoiceOver/TalkBack e engines além de Chromium.
- Gate adulto real, cancelamento, entrada acidental e confirmações destrutivas.
- Pacote, quota, corrupção, atualização, offline, persistência, retomada e item inválido reais.
- Shell frio final, transferência, `Content-Encoding`, zero release híbrido e pacote Etapa 1.
- Privacidade observada, ausência de transmissão e regressão pós-redesign das 37 habilidades de Matemática.

### INFERIDO

- Próxima missão dominante e cinco marcos tendem a reduzir carga de decisão.
- Capivara funcional e demonstração multimodal tendem a ampliar autonomia.
- Componentes compartilhados tendem a preservar coerência entre matérias.
- Pressão de 3 segundos tende a reduzir entrada acidental.
- Envelopes e derivação por âncora tendem a limitar peso e deriva visual.

Nenhuma inferência foi usada como prova de runtime, adequação infantil, asset ou orçamento.

## Problemas P0–P3

### P1 — ícone 512 atual excede teto visual

- **Reprodução:** `wc -c images/icon-512x512.png`.
- **Evidência:** 385.793 bytes contra máximo de 150.000 bytes.
- **Critério objetivo de aceite:** futuro asset distribuído possui no máximo 150.000 bytes; P0c propõe 80 KB; máscaras, legibilidade, recorte e `budget:check` são aprovados.
- **Efeito:** bloqueia aprovação futura do ícone e do shell visual; não autoriza sua substituição agora.

### P1 — shell final sem prova fria/coerente

- **Reprodução:** medir carga fria completa do release no host final com HAR/`PerformanceResourceTiming`, `Content-Encoding` e manifesto de bytes esperado.
- **Evidência:** aproximação anterior de 487.673/500.000 bytes deixa 12.327 bytes de margem e não prova transferência real nem zero shell híbrido.
- **Critério objetivo de aceite:** shell final sem áudio transfere no máximo 500.000 bytes em carga fria reproduzível, cobre todas as respostas normativas e serve um único release coerente.
- **Efeito:** bloqueia aprovação futura de shell/build; não bloqueia planejamento visual dentro dos envelopes.

Nenhum P0 novo foi encontrado. Nenhum P2/P3 exige retrabalho documental antes da próxima especificação.

## Veredito

**APROVADO COM RESSALVAS**

O plano de frontend/design atende o subgate documental do Gate G3. As 17 propostas estão estáveis para orientar o artista, preservam autonomia pré-leitora, fluxo global Matemática/Português, gate adulto, acessibilidade, responsividade, fatia vertical e orçamento.

O Gate G3 completo permanece aberto. Model sheet, piloto visual, assets, teste infantil e runtime continuam `NAO TESTADO`. Os P1 de ícone e shell permanecem ativos e não podem ser rebaixados por orçamento teórico.

### Próximo papel recomendado

- **Agente:** artista IA.
- **Skill:** `lumon-arte-capivara`.
- **Escopo autorizado enquanto a proibição atual permanecer:** somente especificação/planejamento não-final de model sheet, âncoras, prompts, referências, poses, recortes, safe areas, acessibilidade, proveniência e budgets.
- **Proibido:** gerar imagem final, substituir ícone, criar asset embarcável, alterar app ou liberar implementação.
- **Próxima revisão:** supervisor deve revisar a saída documental do artista. Qualquer geração futura depende de autorização compatível e gate próprio.

Programador, implementação, código, assets finais, áudio final, Firebase, backend, rede e transmissão de dados continuam bloqueados até autorização explícita do usuário e Gate G4.

Somente o orquestrador altera `STATUS.yaml`, comenta a Issue e aciona o próximo papel após confirmar este relatório e seu handoff no remoto.
