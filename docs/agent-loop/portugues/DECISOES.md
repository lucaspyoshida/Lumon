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
- **Commit de publicação:** `d53608bfd77de55e28fcffb19f47080c7d5ad058`.

## USR-039 — Publicar repositório e aplicativo no GitHub Pages

- **Estado:** aprovada
- **Responsável:** usuário
- **Data:** 2026-08-04
- **Decisão explícita:** “Torne o repositório público e me mande o link do GitHub page com o app funcionando pra eu testar.”
- **Justificativa resumida:** disponibilizar o build aprovado da infraestrutura G4 em uma URL HTTPS pública para teste direto do aplicativo.
- **Escopo autorizado:** confirmar visibilidade pública de `lucaspyoshida/Lumon`, publicar o conteúdo canônico de `feature/evolucao-pedagogica` no GitHub Pages e executar smoke test do host real.
- **Impacto de privacidade/rede:** código, histórico, documentação e Issues do repositório ficam públicos; o app continua sem backend, analytics, conta ou transmissão de progresso infantil. GitHub Pages entrega apenas arquivos estáticos.
- **Limites:** não liberar conteúdo pedagógico inexistente, não alterar Gate G5, não adicionar Firebase/TTS runtime/telemetria e não publicar dados locais do navegador.
- **Alternativas consideradas:** manter Pages em `main` com versão legada; publicar a branch aprovada; criar infraestrutura externa. Escolhida a branch aprovada no Pages existente, sem novo fornecedor.
- **Evidências prévias:** varredura do estado atual e histórico sem segredo/credencial detectado; repositório já confirmado público; Pages legado confirmado em `main` antes da troca.
- **Commit de publicação:** `af4033b8d185138ac8f61f2dad21491de02283d4`.
