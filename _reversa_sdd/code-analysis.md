# Análise técnica do código — Lumon

> Nível: Essencial · Organização futura das specs: features · Progresso do Arqueólogo: 8 de 8 módulos — concluído.

## Modelo arquitetural

🟢 **CONFIRMADO** — O Lumon é uma SPA estática orientada a eventos. `index.htm` contém todas as telas; `script.js` concentra estado, regras e controladores; `style.css` define a apresentação. Não há separação física entre domínio, aplicação e infraestrutura.

Fluxo macro: carregar documento → registrar seletores e eventos → escolher atividade/modo/nível → gerar questões → executar sessão → registrar acertos/erros → apresentar resumo ou repetir erros.

## Módulo `shell-navigation`

**Propósito:** controlar as telas e encaminhar escolhas do menu até o início de uma atividade.

**Arquivos principais:** `index.htm:14-113`, `script.js:11-46`, `script.js:89-92`, `script.js:222-301`.

### Funções e fluxo

- `navegarPara(idTela)` não retorna valor; remove `ativa` de todas as telas e a adiciona ao elemento indicado (`script.js:89-92`).
- O menu inicial grava `atividade` e direciona letras para seu submenu; outras atividades seguem ao menu de modo (`script.js:223-231`).
- A escolha do modo encaminha letras para configurações específicas ou inicia vogais diretamente; números e aritmética recebem botões de nível gerados dinamicamente (`script.js:239-291`).
- Botões “Voltar” usam `data-target`; saídas ao menu principal também limpam o estado (`script.js:293-297`).

### Regras e lacunas

- 🟢 **CONFIRMADO** — Apenas uma seção `.tela` deve permanecer com a classe `ativa`.
- 🟢 **CONFIRMADO** — O roteamento é interno e não altera URL ou histórico do navegador.
- 🟡 **INFERIDO** — IDs de tela inválidos causariam erro ao acessar `classList`; todos os alvos declarados no HTML são válidos.
- 🔴 **LACUNA** — Não há suporte explícito a navegação pelo botão voltar do navegador, foco acessível ou deep links.

## Módulo `training-session`

**Propósito:** manter a sessão corrente, controlar a progressão, totalizar resultados e permitir retreino de erros.

**Arquivos principais:** `index.htm:37-58`, `index.htm:87-94`, `script.js:48-53`, `script.js:157-220`, `script.js:299-301`.

### Estrutura de estado

| Campo | Tipo observado | Inicial | Papel |
|---|---|---|---|
| `atividade` | `string \| null` | `null` | Números, somas, subtrações ou letras |
| `modo` | `string \| null` | `null` | Sequencial ou aleatório |
| `nivel` | `object \| null` | `null` | Configuração da atividade |
| `questoes` | `Array<number|string>` | `[]` | Fila da sessão |
| `questaoAtual` | `number` | `0` | Índice corrente |
| `acertos` | `number` | `0` | Total de swipes à direita |
| `erros` | `number` | `0` | Total de swipes à esquerda |
| `errosQuestoes` | `Array<number|string>` | `[]` | Itens destinados ao retreino |

### Funções e fluxo

- `iniciarSessao(treinarErros = false)` gera uma sessão nova ou copia a fila de erros, zera contadores, mostra a primeira questão e abre a tela de atividade (`script.js:157-176`).
- No retreino, a fila de erros é esvaziada após a cópia, o modo vira aleatório e a fila é embaralhada quando possui mais de um item.
- `mostrarQuestao()` encerra quando o índice atinge o tamanho da fila; do contrário, atualiza progresso, conteúdo e estado visual do cartão (`script.js:178-205`).
- `finalizarSessao()` publica contadores e exibe “Treinar erros” somente quando houve erro (`script.js:207-216`).
- `resetarEstado()` devolve todos os campos aos valores iniciais (`script.js:218-220`).

### Regras e lacunas

- 🟢 **CONFIRMADO** — Sessão comum limita a fila a 15 itens, exceto intervalo alfabético (`script.js:150-154`).
- 🟢 **CONFIRMADO** — “Acerto” e “erro” são autoavaliações indicadas pelo sentido do gesto; não há comparação automática com entrada do aluno.
- 🟢 **CONFIRMADO** — Ao repetir erros, resultados e fila de erros são reiniciados.
- 🔴 **LACUNA** — Uma sessão sem questões termina imediatamente; a interface não explica esse caso.
- 🔴 **LACUNA** — Não há persistência de resultados ou progresso pedagógico.

## Módulo `numbers-activity`

**Propósito:** gerar e apresentar sequências de reconhecimento numérico.

**Arquivos principais:** `index.htm:18`, `index.htm:96-111`, `script.js:60-65`, `script.js:99-105`, `script.js:280-288`, `script.js:303-332`.

### Configuração e algoritmo

- Níveis fixos: `ate10` (1–10), `ate20` (1–20) e `ate30` (1–30).
- `gerarQuestoes()` percorre inclusivamente `nivel.min…nivel.max`, adicionando cada inteiro à fila.
- No modo aleatório, a fila é reordenada; depois, níveis comuns são truncados para 15 questões.
- O intervalo customizado usa dois sliders entre 1 e 100. Ao mover um limite além do outro, o limite oposto é ajustado para manter `min <= max`.
- O botão de início cria `{id: "custom", label, min, max}` e inicia uma sessão normal.

### Regras e lacunas

- 🟢 **CONFIRMADO** — Os extremos do intervalo são inclusivos.
- 🟢 **CONFIRMADO** — Um intervalo customizado sempre contém pelo menos um número.
- 🟢 **CONFIRMADO** — No modo sequencial, “Até 20” e “Até 30” mostram somente os primeiros 15 números devido ao truncamento global.
- 🟡 **INFERIDO** — O truncamento provavelmente pretende limitar a duração, mas impede cobrir os números 16–30 no modo sequencial.
- 🔴 **LACUNA** — Não há requisito que esclareça se a cobertura parcial de níveis maiores é intencional.

## Módulo `arithmetic-activities`

**Propósito:** gerar exercícios de soma e subtração, revelar a resposta e integrar os exercícios ao ciclo de sessão.

**Arquivos principais:** `index.htm:19-20`, `index.htm:43-57`, `script.js:66-67`, `script.js:106-123`, `script.js:178-205`, `script.js:409-410`.

### Algoritmos e regras

- Níveis fixos aplicam operandos 1, 2 ou 3. Somas geram `0…10 + op`; subtrações geram `op…10+op - op`, mantendo resultados de 0 a 10.
- Soma aleatória cria 20 expressões. O primeiro operando está entre 1 e 9; o segundo entre 1 e `10-a`, portanto o resultado fica entre 2 e 10.
- Subtração aleatória cria 20 expressões. O minuendo está entre 2 e 10 e o subtraendo entre 1 e `a-1`, portanto o resultado fica entre 1 e 9 e nunca é negativo.
- A fila é truncada para 15 e pode ser embaralhada. Duplicatas aleatórias são permitidas.
- `mostrarQuestao()` usa `eval()` em qualquer questão string e mostra `?` se a avaliação lançar exceção (`script.js:191-196`).
- Clique/toque curto vira o cartão apenas em soma ou subtração.

### Lacunas

- 🟢 **CONFIRMADO** — Não há multiplicação, divisão, resultado negativo ou soma acima de 10 no modo aleatório.
- 🟢 **CONFIRMADO** — Não existe validação automática da resposta; o aluno se autoavalia pelo gesto.
- 🟡 **INFERIDO** — `eval()` é desnecessário para o domínio restrito e aumenta o risco caso questões passem a aceitar conteúdo externo.
- 🔴 **LACUNA** — Não está definido se questões aleatórias devem ser únicas ou cobrir uniformemente as combinações.

## Módulo `letters-activity`

**Propósito:** treinar reconhecimento de vogais, letras distintas de uma palavra ou um intervalo alfabético.

**Arquivos principais:** `index.htm:60-85`, `script.js:68`, `script.js:124-143`, `script.js:233-249`, `script.js:334-374`.

### Algoritmos e regras

- Vogais produzem exatamente `A, E, I, O, U`.
- Palavra exige entrada não vazia; aplica normalização Unicode NFD, remove diacríticos, converte para maiúsculas e elimina letras repetidas preservando a primeira ocorrência.
- Intervalo preenche dois selects com `A…Z`, inicia em `A…Z` e rejeita início posterior ao fim.
- Intervalos alfabéticos são inclusivos e são o único tipo que não sofre o limite global de 15 questões.
- Modo sequencial preserva a ordem; modo aleatório embaralha a fila em todos os três subtipos.

### Lacunas

- 🟢 **CONFIRMADO** — Espaços, números e pontuação de uma palavra não são filtrados e podem virar cartões.
- 🟢 **CONFIRMADO** — Letras acentuadas são reduzidas à forma básica latina quando representáveis por NFD.
- 🔴 **LACUNA** — Não há regra explícita sobre caracteres permitidos, alfabetos além de A–Z ou tratamento de emojis.
- 🔴 **LACUNA** — Não há mensagem quando o botão de palavra é acionado com entrada vazia.

## Módulo `gestures-feedback`

**Propósito:** interpretar clique ou arraste, revelar respostas aritméticas e registrar autoavaliação com feedback visual.

**Arquivos principais:** `index.htm:43-57`, `script.js:377-453`, `style.css:165-260`.

### Máquina de interação

1. `handleDragStart(e)` ativa o arraste, presume clique e captura a coordenada X inicial.
2. `handleDragMove(e)` calcula `deltaX`; acima de 20 px deixa de ser clique e transforma o cartão proporcionalmente.
3. `handleDragEnd()` vira o cartão aritmético em clique; em arraste acima de 100 px registra direita/esquerda; abaixo disso retorna à origem.
4. `registrarResposta(direcao)` incrementa acertos ou erros, guarda a questão errada, anima a saída e, após 500 ms, avança.

### Regras e lacunas

- 🟢 **CONFIRMADO** — Direita significa acerto; esquerda significa erro.
- 🟢 **CONFIRMADO** — O mesmo fluxo suporta mouse e touch; `touchmove` impede o comportamento padrão.
- 🟢 **CONFIRMADO** — O cartão possui flip 3D e as imagens de feedback ficam sobrepostas sem capturar eventos.
- 🟡 **INFERIDO** — Um clique aritmético pode alternar o flip em `handleDragEnd()` e novamente no listener `click`, anulando visualmente a ação em alguns navegadores.
- 🔴 **LACUNA** — Não há alternativa por teclado/botões para marcar acerto ou erro.

## Módulo `local-persistence`

**Propósito:** lembrar a última configuração de atividade utilizada para oferecer um atalho em sessões futuras.

**Arquivo principal:** `script.js:71-86`, consumo em `script.js:254-266`.

### Fluxo e estrutura

- A chave fixa é `lumon-last-settings`.
- `saveLastUsedSettings()` serializa somente `atividade`, `modo` e `nivel` em JSON; é chamada ao iniciar uma sessão comum.
- `loadLastUsedSettings()` lê e desserializa o valor ou retorna `null` quando a chave não existe.
- O atalho “Último Jogo” aparece apenas quando atividade e modo salvos coincidem com as escolhas atuais; ao acioná-lo, reutiliza o objeto `nivel` salvo.

### Regras e lacunas

- 🟢 **CONFIRMADO** — Pontuação, questões, erros e progresso não são persistidos.
- 🟢 **CONFIRMADO** — O armazenamento é local ao navegador/origem e não envolve servidor.
- 🟡 **INFERIDO** — JSON corrompido em `localStorage` interromperia o fluxo porque `JSON.parse` não possui tratamento de exceção.
- 🔴 **LACUNA** — Não existe versionamento/migração do formato salvo nem opção explícita de limpar preferências.

## Módulo `pwa-offline`

**Propósito:** tornar a aplicação instalável e disponibilizar recursos essenciais sem rede.

**Arquivos principais:** `index.htm:4-10`, `script.js:1-9`, `manifest.json:1-20`, `service-worker.js:1-56`.

### Fluxo e algoritmos

- Após `load`, o cliente tenta registrar `/Lumon/service-worker.js`; sucesso ou falha são enviados ao console.
- Na instalação, o worker abre `math-kids-v8` e usa `cache.addAll()` para pré-carregar shell, scripts, estilos, manifesto, favicon e duas imagens de feedback.
- Em `fetch`, a estratégia é cache-first: devolve qualquer resposta encontrada por `caches.match`; do contrário, chama `fetch` sem gravar a resposta obtida.
- Na ativação, todos os caches cujo nome difere de `math-kids-v8` são removidos.
- O manifesto define `start_url: index.htm`, modo `standalone`, cores e ícones de 192 e 512 px.

### Regras e lacunas

- 🟢 **CONFIRMADO** — Falha em qualquer item de `cache.addAll()` pode rejeitar toda a instalação do worker.
- 🟢 **CONFIRMADO** — Os ícones PWA não estão na lista explícita de pré-cache.
- 🟢 **CONFIRMADO** — O worker não chama `skipWaiting()` nem `clients.claim()`; a atualização segue o ciclo padrão do navegador.
- 🟡 **INFERIDO** — O registro sob `/Lumon/` combinado a imagens sob `/images/` pressupõe uma topologia específica de hospedagem e pode falhar sob outra base URL.
- 🟡 **INFERIDO** — A limpeza de todos os caches com outros nomes pode remover caches de aplicações que compartilhem a mesma origem.
- 🔴 **LACUNA** — Não há página/feedback de offline, política de atualização ou teste automatizado do cache.

## Entidades e dados resumidos

| Entidade conceitual | Campos principais | Confiança |
|---|---|---|
| Estado da sessão | atividade, modo, nível, questões, índice, acertos, erros, fila de erros | 🟢 |
| Nível numérico | id, label, min, max | 🟢 |
| Tela | id e estado CSS `ativa` | 🟢 |
| Nível aritmético | id, label, op | 🟢 |
| Nível de letras | id, label, min/max opcionais | 🟢 |
| Estado de gesto | isDragging, isClick, startX, deltaX | 🟢 |
| Última configuração | atividade, modo, nivel | 🟢 |
| Cache PWA | nome e lista de URLs | 🟢 |

## Conclusão da escavação

Os oito módulos identificados pelo Scout foram analisados. Foram encontradas cinco estruturas de dados conceituais principais, nenhum banco de dados e nenhum serviço externo. Os algoritmos centrais são geração de questões, progressão/retreino de sessão, normalização de letras, classificação de gestos e cache-first offline.
