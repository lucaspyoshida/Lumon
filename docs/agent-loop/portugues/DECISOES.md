# Decisões rastreáveis — Português

## USR-038 — Autorizar implementação do Gate G4

- **Estado:** aprovada
- **Responsável:** usuário
- **Data:** 2026-08-04
- **Decisão explícita:** “Autorizada a implementação do gate 4”.
- **Justificativa resumida:** G1, G2 e sequência visual P0a/P0b/P0c possuem contratos, handoffs e aprovações publicados; implementação pode iniciar sob supervisão.
- **Escopo autorizado:** menor fatia vertical aprovada da Etapa 1, com fundação modular necessária, palavra/imagem/som, áudio por toque, seleção, digitação, feedback acolhedor, revisão, persistência local e offline.
- **Limites:** preservar Matemática; trabalhar somente em `feature/evolucao-pedagogica`; sem backend, Firebase, analytics, TTS em runtime, transmissão de dados, modo temático online ou ampliação das cinco etapas por preferência.
- **Assets/conteúdo:** usar somente candidatos e conteúdo com proveniência/aprovação suficientes; ausência de áudio ou imagem pedagógica final deve falhar fechada e ser registrada, nunca contornada por rede, TTS runtime ou asset de terceiros.
- **Alternativas consideradas:** implementar toda a trilha de uma vez; implementar somente fundação sem fatia; menor fatia vertical aprovada. Escolhida menor fatia por reduzir risco e permitir Gate G5 baseado em evidência real.
- **Evidências:** Norte; contratos G1/G2; plano de engenharia; plano frontend; aprovações e handoffs G1–G3; aprovação P0c v2 `60347fc257c4d07123fd6a831d334b4dba1701d7`.
- **Impacto:** `implementacao_autorizada` passa a `true`; programador torna-se único próximo papel; toda saída volta a revisão especializada/supervisão antes de novo avanço.
- **Substitui:** USR-009 apenas quanto ao bloqueio temporal de implementação; demais limites do Norte permanecem.
- **Commit de publicação:** pendente de fixação no claim imediatamente seguinte.
