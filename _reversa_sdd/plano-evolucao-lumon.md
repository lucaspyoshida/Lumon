# Plano de evolução do Lumon

## 1. Objetivo

Evoluir o Lumon de um aplicativo de cartões com números, operações e letras para uma plataforma infantil de prática matemática progressiva, inspirada em princípios gerais de aprendizagem gradual:

- começar por atividades simples e concretas;
- avançar em pequenos passos;
- repetir até atingir segurança;
- revisar erros;
- respeitar o ritmo individual da criança;
- estimular autonomia sem depender de explicações longas.

O objetivo não é reproduzir materiais proprietários de terceiros. O conteúdo, a identidade visual, os exercícios e a progressão devem ser próprios do Lumon.

## 2. Resultado final esperado

Ao final das cinco etapas, o Lumon deverá oferecer uma trilha matemática inicial composta por:

1. reconhecimento visual de números e quantidades;
2. domínio da sequência numérica;
3. associação entre numeral e quantidade;
4. composição de sequências e seleção da resposta correta;
5. introdução progressiva à adição e à subtração.

O aplicativo deverá registrar o desempenho localmente, recomendar revisão ou avanço e funcionar de forma confortável em celulares, tablets e computadores.

## 3. Princípios do produto

### 3.1 Princípios pedagógicos

- Uma habilidade nova por vez.
- Dificuldade crescente em passos pequenos.
- Instruções curtas e visuais.
- Sessões pequenas, entre 5 e 15 exercícios.
- Feedback imediato, acolhedor e não punitivo.
- Repetição direcionada aos erros.
- Avanço baseado em domínio, não somente em conclusão.
- Conteúdo independente da série escolar ou idade.

### 3.2 Princípios técnicos

- Continuar funcionando sem backend na primeira versão.
- Preservar funcionamento offline como PWA.
- Remover o uso de `eval()`.
- Separar regras de domínio, interface, persistência e geração de exercícios.
- Tornar geradores determinísticos e testáveis.
- Manter dados da criança somente no dispositivo.
- Permitir evolução futura sem reescrever todo o aplicativo.

### 3.3 Princípios de experiência infantil

- Alvos de toque grandes.
- Pouco texto por tela.
- Cores consistentes por tipo de atividade.
- Ícones acompanhados de texto, nunca usados isoladamente para ações críticas.
- Ausência de cronômetros visíveis ou pressão excessiva.
- Celebração de esforço e progresso, não apenas de acertos.
- Alternativas aos gestos para uso por teclado ou botão.

---

# 4. Estrutura proposta dos níveis

## Etapa 1 — Reconhecimento e contagem até 10

### Objetivo pedagógico

Familiarizar a criança com os numerais de 1 a 10 e com quantidades concretas equivalentes.

### Atividades

- Reconhecer o numeral apresentado.
- Contar bolinhas ou objetos até 10.
- Ouvir ou ler uma instrução e selecionar o numeral correto.
- Associar uma quantidade ao numeral correspondente.
- Ordenar números de 1 a 10.
- Identificar o número ausente em uma sequência curta.

### Critério sugerido de domínio

- Pelo menos 90% de acerto em três sessões recentes.
- Nenhum número com taxa de erro individual superior a 30%.
- Conclusão sem abandono recorrente.

## Etapa 2 — Sequência e quantidades até 30

### Objetivo pedagógico

Expandir o reconhecimento numérico e consolidar anterior, posterior e continuidade da sequência.

### Atividades

- Reconhecimento de números até 30.
- Contagem visual até 20 e depois até 30.
- Número anterior e posterior.
- Completar sequências com uma lacuna.
- Completar sequências com duas lacunas.
- Ordenar pequenos grupos de números.
- Associar quantidades agrupadas ao numeral correto.

### Critério sugerido de domínio

- Pelo menos 90% de acerto em três sessões recentes.
- Tempo de resposta usado apenas como diagnóstico, nunca como punição.
- Revisão automática dos números com erros frequentes.

## Etapa 3 — Leitura, seleção e escrita até 50

### Objetivo pedagógico

Consolidar a representação simbólica dos números e introduzir a produção da resposta.

### Atividades

- Reconhecer números até 50.
- Selecionar um numeral entre três ou quatro alternativas.
- Digitar o número apresentado por quantidade.
- Completar tabelas e sequências numéricas.
- Identificar dezenas e unidades visualmente.
- Ordenar números do menor para o maior.
- Atividade opcional de traçado do número em canvas.

### Critério sugerido de domínio

- Pelo menos 90% de acerto em seleção e sequência.
- Pelo menos 80% de acerto em digitação ou escrita.
- Revisão das confusões recorrentes, como 12/21 ou 13/31.

## Etapa 4 — Adição progressiva

### Objetivo pedagógico

Desenvolver cálculo mental em incrementos pequenos.

### Progressão interna

1. Somar `+1`.
2. Somar `+2`.
3. Somar `+3`.
4. Misturar `+1`, `+2` e `+3`.
5. Adições com resultado até 5.
6. Adições com resultado até 10.
7. Decomposição visual com objetos ou bolinhas.

### Atividades

- Cartão com operação e resposta no verso.
- Seleção entre alternativas.
- Digitação do resultado.
- Representação visual: grupo inicial + grupo adicionado.
- Descobrir o termo ausente, por exemplo `3 + ? = 5`.
- Revisão específica por operando.

### Critério sugerido de domínio

- 90% de precisão nas sessões recentes.
- Domínio separado por grupo: `+1`, `+2`, `+3` e misto.
- Ausência de dependência obrigatória do apoio visual antes de avançar.

## Etapa 5 — Subtração progressiva e consolidação

### Objetivo pedagógico

Introduzir a retirada de quantidades, manter resultados não negativos e combinar as habilidades anteriores.

### Progressão interna

1. Subtrair `-1`.
2. Subtrair `-2`.
3. Subtrair `-3`.
4. Misturar `-1`, `-2` e `-3`.
5. Subtrações com valores até 10.
6. Misturar adição e subtração simples.
7. Encontrar termo ausente.

### Atividades

- Representação visual de objetos sendo retirados.
- Cartões de operação.
- Seleção de resposta.
- Digitação de resultado.
- Comparação entre adição e operação inversa.
- Sessões mistas baseadas nos pontos fracos da criança.

### Critério sugerido de domínio

- Pelo menos 90% de acerto nas últimas sessões.
- Domínio separado por operando e em atividades mistas.
- Capacidade de resolver sem resultado negativo ou ambiguidade.

---

# 5. Alterações estruturais do código

## 5.1 Problema atual

O arquivo `script.js` concentra:

- estado da aplicação;
- navegação;
- geração de questões;
- regras de números, letras e operações;
- gestos;
- feedback;
- persistência;
- registro do service worker.

Essa concentração dificulta testes, evolução dos níveis e correção de comportamentos.

## 5.2 Estrutura de diretórios proposta

```text
Lumon/
├── index.htm
├── manifest.json
├── service-worker.js
├── assets/
│   ├── icons/
│   ├── images/
│   ├── sounds/
│   └── fonts/
├── styles/
│   ├── tokens.css
│   ├── base.css
│   ├── components.css
│   ├── screens.css
│   └── accessibility.css
├── src/
│   ├── app.js
│   ├── config/
│   │   ├── levels.js
│   │   └── activities.js
│   ├── core/
│   │   ├── state.js
│   │   ├── router.js
│   │   ├── session.js
│   │   ├── progression.js
│   │   └── mastery.js
│   ├── generators/
│   │   ├── numbers.js
│   │   ├── quantities.js
│   │   ├── sequences.js
│   │   ├── addition.js
│   │   └── subtraction.js
│   ├── activities/
│   │   ├── flashcard.js
│   │   ├── multiple-choice.js
│   │   ├── numeric-input.js
│   │   ├── ordering.js
│   │   └── tracing.js
│   ├── ui/
│   │   ├── screens.js
│   │   ├── cards.js
│   │   ├── feedback.js
│   │   ├── progress.js
│   │   └── accessibility.js
│   ├── input/
│   │   ├── pointer.js
│   │   ├── keyboard.js
│   │   └── touch.js
│   ├── storage/
│   │   ├── repository.js
│   │   ├── migrations.js
│   │   └── schema.js
│   └── pwa/
│       └── registration.js
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/
```

O projeto pode continuar sem framework. A separação pode ser feita com módulos ES nativos (`type="module"`).

## 5.3 Modelo de estado proposto

```js
{
  profile: {
    id: "local-child",
    displayName: "",
    currentStage: "reconhecimento-10",
    createdAt: "ISO_DATE"
  },
  session: {
    activityId: null,
    levelId: null,
    mode: "sequencial",
    questions: [],
    currentIndex: 0,
    correct: 0,
    incorrect: 0,
    startedAt: null
  },
  progress: {
    completedSessions: [],
    skillMastery: {},
    weakItems: {},
    unlockedLevels: []
  },
  preferences: {
    sound: true,
    reducedMotion: false,
    highContrast: false
  }
}
```

## 5.4 Contrato padronizado de questão

Todos os geradores devem devolver o mesmo formato:

```js
{
  id: "unique-id",
  skill: "number-recognition",
  difficulty: 1,
  prompt: {
    type: "number | dots | expression | sequence | audio",
    value: 7
  },
  response: {
    type: "self-assessment | choice | numeric-input | ordering | tracing",
    options: [6, 7, 8]
  },
  answer: 7,
  metadata: {
    stage: "reconhecimento-10",
    sourceGenerator: "numbers",
    tags: ["ate-10"]
  }
}
```

## 5.5 Remoção de `eval()`

O resultado deve ser calculado no gerador:

```js
{
  prompt: { type: "expression", left: 3, operator: "+", right: 2 },
  answer: 5
}
```

O componente visual apenas apresenta os dados. Ele não interpreta código ou strings matemáticas.

## 5.6 Geradores determinísticos

Cada gerador deve aceitar uma fonte de aleatoriedade ou seed:

```js
generateAdditionQuestions({ maxResult: 10, count: 10, random })
```

Isso permite:

- testes repetíveis;
- evitar questões duplicadas;
- controlar equilíbrio de dificuldade;
- reproduzir uma sessão com erro;
- gerar revisão por habilidade.

---

# 6. Sistema de progressão e domínio

## 6.1 Unidade de progresso

O progresso não deve existir apenas por “nível”. Ele deve ser registrado por habilidade:

```text
number.recognize.1-10
number.quantity.1-10
number.sequence.1-10
number.recognize.11-30
number.sequence.11-30
number.write.1-50
addition.plus-1
addition.plus-2
addition.plus-3
addition.within-10
subtraction.minus-1
subtraction.minus-2
subtraction.minus-3
subtraction.within-10
```

## 6.2 Métricas locais

Registrar por habilidade:

- total de tentativas;
- acertos;
- erros;
- sequência recente de resultados;
- tempo mediano de resposta;
- data da última prática;
- itens com maior dificuldade;
- quantidade de sessões dominadas.

## 6.3 Regra inicial de avanço

Uma regra simples para a primeira versão:

```text
Avançar se:
- houver pelo menos 3 sessões concluídas;
- a média das 3 últimas for >= 90%;
- nenhum item tiver erro em mais de 30% das tentativas recentes.
```

Caso contrário:

- recomendar nova sessão;
- inserir itens errados com maior frequência;
- reduzir temporariamente a quantidade de questões;
- oferecer apoio visual.

Essa regra deve ficar em configuração, não espalhada pelo código.

## 6.4 Desbloqueio

- A próxima habilidade pode aparecer bloqueada visualmente.
- Um responsável deve poder desbloquear manualmente qualquer nível.
- A criança nunca deve receber mensagem negativa por não avançar.
- O sistema deve dizer “vamos praticar mais um pouco” em vez de “você falhou”.

---

# 7. Novos tipos de atividade

## 7.1 Associação quantidade → numeral

### Tela

- Uma área central exibe bolinhas, estrelas ou objetos.
- Três ou quatro botões mostram numerais.
- A criança seleciona a quantidade correta.

### Regras

- Objetos devem ser grandes e não se sobrepor.
- Para quantidades maiores, usar agrupamento em linhas de cinco ou dez.
- Alternativas incorretas devem ser próximas, mas não ambíguas.
- Evitar mudar simultaneamente forma, tamanho e cor se isso interferir na contagem.

## 7.2 Associação numeral → quantidade

### Tela

- Um numeral aparece no topo.
- Três grupos visuais aparecem como alternativas.
- A criança seleciona o grupo correspondente.

## 7.3 Completar sequência

### Tela

```text
1  2  ?  4  5
```

- A lacuna fica em destaque.
- Resposta por seleção ou digitação.
- Começar com uma lacuna interna.
- Evoluir para lacuna no início, no fim e múltiplas lacunas.

## 7.4 Ordenação

- Mostrar de três a cinco cartões.
- Permitir arrastar ou usar botões de mover.
- Trabalhar ordem crescente inicialmente.
- Introduzir ordem decrescente somente como habilidade separada.

## 7.5 Entrada numérica

- Usar teclado numérico próprio ou `inputmode="numeric"`.
- Botão de apagar grande e acessível.
- Bloquear caracteres não numéricos.
- Não considerar resposta enquanto a criança ainda está digitando.

## 7.6 Traçado de numeral

Atividade opcional para uma fase posterior:

- Canvas com guia pontilhada.
- Traçado por toque ou mouse.
- Avaliação tolerante, sem exigir precisão motora excessiva.
- Botão para limpar e tentar novamente.
- Alternativa sem canvas para acessibilidade.

---

# 8. Mudanças de layout e experiência

## 8.1 Nova tela inicial

Substituir o menu plano por uma visão de continuidade:

```text
Olá, [nome]

Continuar
[Sequência até 10 — 80%]

Trilha de Matemática
[1] Números e quantidades
[2] Sequências
[3] Números até 50
[4] Adição
[5] Subtração

Praticar erros
Área do responsável
```

## 8.2 Mapa da trilha

- Apresentar cinco etapas em cartões grandes.
- Mostrar estado: disponível, em andamento, dominado ou bloqueado.
- Usar ícone, título e descrição curta.
- Não depender somente de cor para indicar estado.
- Permitir visualizar atividades concluídas.

## 8.3 Tela de atividade

Elementos sugeridos:

- botão Sair no canto superior;
- progresso discreto, como `3 de 10`;
- instrução de uma linha;
- área principal do exercício;
- alternativas ou campo de resposta;
- botões “acertei” e “preciso praticar” para o modo de autoavaliação;
- gesto de swipe como atalho opcional;
- feedback visual e sonoro configurável.

## 8.4 Tela de resultado

Exibir:

- mensagem positiva;
- quantidade concluída;
- acertos e itens para praticar;
- habilidade trabalhada;
- sugestão: repetir, revisar erros ou avançar;
- botão de voltar à trilha.

Evitar:

- rankings;
- comparação com outras crianças;
- mensagens de fracasso;
- excesso de animações;
- pressão baseada somente em velocidade.

## 8.5 Área do responsável

Proteger por gesto simples ou código local opcional.

Permitir:

- visualizar evolução por habilidade;
- desbloquear nível manualmente;
- ajustar quantidade de questões;
- ativar ou desativar sons e animações;
- apagar o progresso local;
- exportar/importar backup em JSON;
- escolher se o tempo de resposta será registrado.

## 8.6 Sistema visual

Criar tokens CSS:

```css
:root {
  --color-primary: #4a90e2;
  --color-success: #4fba6f;
  --color-review: #f2a541;
  --color-danger: #d95d5d;
  --color-background: #f7f9fc;
  --color-surface: #ffffff;
  --color-text: #263238;
  --radius-card: 24px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --touch-target: 48px;
}
```

Aplicar identidade própria do Lumon, sem imitar marcas ou materiais de terceiros.

## 8.7 Responsividade

Suportar:

- celulares pequenos a partir de 320 px;
- celulares modernos;
- tablets em retrato e paisagem;
- desktop com conteúdo centralizado;
- orientação horizontal sem cortar controles;
- zoom do navegador sem perda de funcionalidade.

Remover `user-scalable=no`, pois impede ampliação por usuários que precisam de zoom.

---

# 9. Acessibilidade

## Requisitos mínimos

- Navegação completa por teclado.
- Foco visível.
- Ordem de tabulação lógica.
- Botões com nomes acessíveis.
- Mudança de tela anunciada por título/foco.
- Feedback não dependente somente de cor.
- `aria-live` para resultado e progresso.
- Alternativa aos gestos de swipe.
- Opção de reduzir movimento.
- Contraste suficiente.
- Imagens com `alt` adequado ou decorativas com `alt=""`.
- Campo numérico com label visível.
- Mensagens de erro próximas ao controle.

## Exemplo de controle alternativo ao swipe

```html
<div class="answer-actions">
  <button data-answer="review">Preciso praticar</button>
  <button data-answer="correct">Acertei</button>
</div>
```

---

# 10. Persistência e privacidade

## 10.1 Versão do schema

```js
{
  schemaVersion: 1,
  profile: {},
  progress: {},
  preferences: {}
}
```

## 10.2 Migrações

- Ler os dados antigos de `lumon-last-settings`.
- Converter atividade, modo e nível para o novo formato.
- Preservar a última configuração quando possível.
- Manter backup temporário antes da migração.
- Em JSON inválido, recuperar com padrão seguro sem quebrar a aplicação.

## 10.3 Privacidade

- Não coletar nome completo, escola, localização ou data de nascimento.
- Não enviar resultados pela internet.
- Não adicionar analytics sem decisão consciente do responsável.
- Explicar que os dados ficam no dispositivo.
- Permitir exclusão completa do progresso.

## 10.4 Limites do `localStorage`

Para a primeira versão, `localStorage` é suficiente. Se o histórico crescer, migrar para IndexedDB mantendo uma camada `repository` que isole a implementação.

---

# 11. PWA e funcionamento offline

## Alterações necessárias

- Usar caminhos relativos e consistentes.
- Definir corretamente o escopo do service worker.
- Incluir ícones e novos assets no cache.
- Versionar o cache com uma constante ligada à versão do aplicativo.
- Restringir a limpeza aos caches prefixados pelo Lumon.
- Adicionar `skipWaiting` e `clients.claim` somente com uma estratégia clara de atualização.
- Exibir mensagem quando houver versão nova.
- Criar fallback offline para navegação.
- Testar instalação e atualização em Android, iOS/Safari e desktop.

## Estratégia sugerida

- Cache-first para ícones, imagens e fontes versionadas.
- Stale-while-revalidate para HTML, CSS e JavaScript.
- Sem cache de dados pessoais fora do armazenamento local planejado.

---

# 12. Testes necessários

## 12.1 Testes unitários

### Geradores

- Números respeitam mínimo e máximo inclusivos.
- Questões não excedem a faixa configurada.
- Soma aleatória nunca ultrapassa o resultado máximo.
- Subtração nunca gera resultado negativo.
- Sequências apresentam lacunas válidas.
- Alternativas contêm exatamente uma resposta correta.
- Seed idêntica gera sessão idêntica.
- Gerador evita duplicatas quando configurado.

### Progressão

- Domínio é calculado somente com amostra mínima.
- Erros frequentes impedem avanço automático.
- Desbloqueio manual prevalece sobre recomendação.
- Revisão prioriza habilidades fracas.

### Persistência

- Dados válidos são recuperados.
- JSON corrompido não quebra a aplicação.
- Migração preserva última configuração.
- Exclusão remove todos os dados locais.

## 12.2 Testes de integração

- Menu → nível → atividade → resultado.
- Resultado → treino de erros.
- Fechar e reabrir → progresso preservado.
- Alterar preferência → interface atualizada.
- Avançar nível → trilha desbloqueada.
- Atualizar PWA → dados preservados.

## 12.3 Testes E2E

- Fluxo completo de cada uma das cinco etapas.
- Touch e mouse.
- Teclado sem mouse.
- Tela de 320 px.
- Tablet em paisagem.
- Modo offline.
- Instalação PWA.
- Atualização do service worker.

## 12.4 Testes com a criança

Observar, sem orientar excessivamente:

- se ela entende o que deve fazer;
- se os botões são fáceis de tocar;
- se o feedback é compreendido;
- se consegue sair e voltar;
- se as sessões têm duração adequada;
- se identifica a diferença entre repetir e avançar;
- se alguma animação distrai ou incomoda.

---

# 13. Plano de implementação em cinco fases

## Fase 1 — Fundação técnica e reconhecimento até 10

### Alterações técnicas

- Criar estrutura modular em `src/` e `styles/`.
- Introduzir módulos ES.
- Extrair estado, roteamento e sessão.
- Criar contrato padronizado de questão.
- Remover `eval()`.
- Criar armazenamento versionado.
- Adicionar testes unitários básicos.

### Alterações funcionais

- Preservar atividades atuais.
- Criar associação quantidade ↔ numeral até 10.
- Criar alternativas de resposta.
- Adicionar controles visíveis além do swipe.

### Layout

- Criar tokens visuais.
- Refazer tela de atividade para múltiplos tipos de resposta.
- Implementar foco e navegação por teclado.

### Critério de conclusão

- Atividades existentes continuam funcionando.
- Associação até 10 funciona offline.
- Nenhum cálculo usa `eval()`.
- Geradores possuem testes.

## Fase 2 — Sequências e quantidades até 30

### Alterações funcionais

- Adicionar anterior/posterior.
- Adicionar completar sequência.
- Adicionar ordenação.
- Expandir quantidades até 30 com agrupamento visual.

### Progressão

- Introduzir domínio por habilidade.
- Registrar erros por numeral.
- Recomendar revisão automática.

### Layout

- Criar mapa da trilha.
- Mostrar nível atual e próximo passo.
- Criar estado visual de dominado/em andamento/bloqueado.

### Critério de conclusão

- Progressão até 30 é mensurável.
- Lacunas e ordenação funcionam por toque e teclado.
- Progresso persiste após fechar o aplicativo.

## Fase 3 — Seleção, digitação e escrita até 50

### Alterações funcionais

- Adicionar seleção entre alternativas.
- Adicionar entrada numérica.
- Adicionar tabelas/sequências até 50.
- Introduzir dezenas e unidades visualmente.
- Avaliar protótipo de traçado.

### Área do responsável

- Exibir progresso por habilidade.
- Permitir desbloqueio manual.
- Permitir apagar/exportar dados.

### Critério de conclusão

- A criança pode reconhecer, selecionar e digitar números até 50.
- Confusões frequentes são identificadas.
- Responsável consegue ajustar o percurso.

## Fase 4 — Adição progressiva

### Alterações funcionais

- Reorganizar soma em habilidades independentes.
- Criar `+1`, `+2`, `+3`, misto e até 10.
- Adicionar apoio visual.
- Adicionar termo ausente.
- Substituir resposta derivada de string por dados estruturados.

### Progressão

- Registrar domínio por operando.
- Reduzir apoio visual gradualmente.
- Criar sessões adaptativas com maior presença dos itens difíceis.

### Critério de conclusão

- Todas as adições têm resposta calculada no gerador.
- Progressão distingue domínio de `+1`, `+2`, `+3` e misto.
- Testes garantem resultado máximo e validade das alternativas.

## Fase 5 — Subtração e consolidação

### Alterações funcionais

- Criar `-1`, `-2`, `-3`, misto e até 10.
- Adicionar apoio visual de retirada.
- Adicionar termo ausente.
- Criar sessões combinadas de soma e subtração.
- Criar revisão geral baseada no histórico.

### Qualidade final

- Revisar acessibilidade.
- Corrigir estratégia de cache.
- Validar atualização sem perda de progresso.
- Realizar testes E2E completos.
- Realizar sessões de observação com a criança.

### Critério de conclusão

- Cinco etapas utilizáveis do início ao fim.
- Progresso e revisão adaptativa funcionando localmente.
- Aplicação instalável e funcional offline.
- Fluxos principais acessíveis por toque, mouse e teclado.

---

# 14. Ordem recomendada das tarefas técnicas

1. Congelar e testar o comportamento atual.
2. Criar módulos ES e extrair estado.
3. Extrair navegação e sessão.
4. Padronizar o contrato de questão.
5. Extrair os geradores atuais.
6. Remover `eval()`.
7. Criar camada de persistência versionada.
8. Criar componentes de resposta reutilizáveis.
9. Implementar associação de quantidades.
10. Implementar sequências e ordenação.
11. Implementar progressão por habilidade.
12. Criar mapa da trilha.
13. Criar área do responsável.
14. Implementar entrada numérica e eventual traçado.
15. Reestruturar adição.
16. Reestruturar subtração.
17. Adicionar revisão adaptativa.
18. Revisar acessibilidade.
19. Corrigir e testar PWA/offline.
20. Executar testes com a criança e ajustar duração/dificuldade.

---

# 15. Critérios globais de aceite

O projeto final será considerado concluído quando:

- as cinco etapas estiverem disponíveis;
- cada habilidade tiver critérios configuráveis de domínio;
- o progresso for salvo localmente;
- erros alimentarem sessões de revisão;
- nenhuma operação depender de `eval()`;
- geradores forem testáveis e reproduzíveis;
- as atividades funcionarem por touch, mouse e teclado;
- a interface funcionar a partir de 320 px;
- o zoom do navegador estiver permitido;
- o aplicativo funcionar offline após a primeira carga;
- atualizações não apagarem o progresso;
- o responsável puder desbloquear e reiniciar níveis;
- a criança compreender os fluxos sem instrução constante;
- textos, imagens e exercícios tiverem identidade própria do Lumon.

---

# 16. Itens fora do escopo inicial

- Contas de usuário online.
- Sincronização entre dispositivos.
- Rankings ou competição.
- Publicidade.
- Pagamentos.
- Integração com escolas.
- Backend e banco de dados remoto.
- Inteligência artificial gerando exercícios.
- Cópia de fichas, nomes de níveis ou identidade visual proprietária de terceiros.

Esses itens podem ser reconsiderados no futuro, mas não são necessários para o objetivo familiar atual.

---

# 17. Riscos e decisões pendentes

## Decisões pedagógicas

- Quantas questões por sessão para cada etapa?
- Qual taxa mínima de acerto deve liberar avanço?
- O tempo de resposta deve influenciar o domínio?
- Quantas repetições são confortáveis para a criança?
- Quando retirar o apoio visual?
- Escrita por canvas é útil ou frustrante nesta idade?

## Decisões de produto

- Usar ou não o nome da criança.
- Adicionar sons e narração.
- Permitir múltiplos perfis locais.
- Exibir níveis bloqueados ou apenas o próximo nível.
- Manter letras no mesmo aplicativo ou em trilha separada.

## Decisões técnicas

- Permanecer em JavaScript puro ou adotar TypeScript.
- Usar apenas `localStorage` ou migrar cedo para IndexedDB.
- Adotar uma biblioteca de testes e automação E2E.
- Definir a URL/base oficial de hospedagem para corrigir o service worker.

---

# 18. Recomendação de primeiro incremento

O primeiro incremento deve ser pequeno e comprovável:

> **Criar uma atividade “Quantidade até 10” com três alternativas, salvar seu resultado e oferecer treino dos erros.**

Esse incremento força a criação das bases corretas — contrato de questão, componente de alternativas, persistência de progresso e revisão — sem exigir a implementação imediata das cinco etapas completas.
