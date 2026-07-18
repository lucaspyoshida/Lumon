# Plano de frontend infantil — Gate G3

> **Estado:** proposta de frontend/design para revisão independente
> **Execução:** `pt-20260718T155615Z-frontend-09621e7`
> **Chave de idempotência:** `G3_EXPERIENCIA_PILOTO_VISUAL:frontend_design:09621e7dbe1f6e3fb2e8842f54053ffc315da1c7`
> **Commit de entrada publicado:** `88f40e75d4e9a6498fc2d105da7dcb887c64a80e`
> **Gate:** `G3_EXPERIENCIA_PILOTO_VISUAL`
> **Implementação e geração de assets:** não autorizadas
> **Autoridade:** `_reversa_sdd/norte-modulo-portugues.md`

## 1. Escopo, autoridade e recomendação

Este documento especifica experiência infantil, fluxos, wireframes textuais, componentes, estados, responsividade, acessibilidade, primeira fatia vertical e briefing do piloto visual. Vale para Matemática e Português sob uma identidade Lumon compartilhada.

Não implementa HTML, CSS, JavaScript, PWA, teste, conteúdo, áudio ou imagem. Não escolhe palavra, ilustração pedagógica ou arquivo final. Não altera produto, privacidade, custo, dados, rede, currículo, arquitetura ou regras de domínio.

Ordem aplicada:

1. decisões explícitas do usuário e Norte;
2. plano geral do Lumon;
3. contrato pedagógico G1 e aprovação do supervisor;
4. contrato arquitetural G2 e aprovação do supervisor;
5. plano de engenharia leve e aprovação com ressalvas;
6. propostas G3 deste documento, somente depois de revisão independente.

Marcas usadas:

- **NORTE/APROVADO:** decisão já fixada no Norte;
- **G1/G2 APROVADO:** decisão aceita por supervisão anterior;
- **TESTADO NESTA EXECUÇÃO:** comando ou inspeção objetiva no commit de entrada;
- **OBSERVADO POR LEITURA:** fato do produto atual, sem prova de adequação futura;
- **PROPOSTA G3:** decisão de experiência/visual aguardando supervisor;
- **VALIDAÇÃO INFANTIL:** hipótese que precisa de observação com crianças;
- **NAO TESTADO:** requisito futuro sem evidência executável nesta entrega.

**Recomendação:** encaminhar este plano ao supervisor com `lumon-supervisao-final`, em `EM_REVISAO` no Gate G3. Não liberar artista diretamente. O piloto P0a/P0b/P0c só pode começar após aprovação do supervisor e tickets estáveis; nenhum asset final é gerado nesta execução.

## 2. Diagnóstico do produto atual

### 2.1 Evidência técnica preservada

**TESTADO NESTA EXECUÇÃO:** `npm run check` foi aprovado no commit de entrada:

- 20 arquivos JavaScript válidos e sem execução dinâmica;
- 21/21 testes de unidade e integração aprovados;
- build estático com cinco etapas, 37 habilidades e PWA íntegra.

**OBSERVADO POR LEITURA:** o produto atual já oferece:

- alvos principais com mínimo lógico de 48 px;
- foco visível, navegação por teclado e anúncio de troca de tela;
- controles alternativos para ordenação, sem depender só de arraste;
- redução de movimento, alto contraste e zoom permitido;
- cinco viewports na suíte E2E: 360×640, 390×844, 768×1024, 1280×720 e 844×390;
- confirmação separada para apagar progresso;
- persistência, retomada, abandono, resultado e offline de Matemática;
- visual responsivo e funcional, mas baseado sobretudo em texto, listas e cartões administrativos.

Esses acertos são baseline de regressão. Redesign não autoriza removê-los.

### 2.2 Lacunas contra o Norte e G3

**FALHOU contra critérios futuros do G3:**

- Entrada atual apresenta título, parágrafos, status e várias habilidades; criança pré-leitora depende de leitura para entender continuidade e escolha.
- `Área do responsável` fica exposta no cabeçalho infantil e abre por clique simples; Norte exige pressionar e segurar por 3 segundos.
- Tela inicial não possui próxima missão dominante nem alternância coerente entre matérias.
- Trilha mostra cinco etapas, mas expande dezenas de habilidades; aparência continua de catálogo/painel.
- Feedback de acerto/erro é majoritariamente textual e revela resposta após erro; não implementa escada visual de nova tentativa, pista, exemplo e item análogo.
- Saída abandona imediatamente por clique ou `Escape`, sem estado visual de confirmação/retomada.
- Não há Capivara, demonstração pré-leitora, botão **Ouvir**, leitura oral autoavaliada nem estados de pacote de Português.
- Ícone 512 atual mede `385.793` bytes, acima do teto de `150.000` bytes.
- Shell atual possui aproximação estática de `487.673/500.000` bytes e não possui prova fria real; não há margem para simplesmente somar frontend ou assets.

Essas lacunas não reprovam Matemática já aprovada. Definem escopo do redesign global e critérios bloqueantes antes de declarar G3 ou build futuro conforme.

## 3. Norte da experiência

### 3.1 Princípios não negociáveis

1. **Missão antes de menu:** primeira informação infantil é o próximo passo, não configuração ou lista.
2. **Uma ação principal por tela:** uma decisão dominante; ações secundárias ficam visualmente subordinadas.
3. **Autonomia pré-leitora:** fala, demonstração, forma e posição explicam ação; texto apoia alfabetização, nunca opera sozinho.
4. **Consistência entre matérias:** mesma estrutura, Capivara, controles e comportamento; cor/objetos contextuais diferenciam Matemática e Português.
5. **Erro acolhedor:** tentativa preservada, pista graduada e nova oportunidade; sem perda, ranking, tristeza punitiva ou pressa.
6. **Áudio explícito:** **Ouvir** é grande, repetível e acionado por toque, mouse, Enter ou Espaço; autoplay não é dependência.
7. **Canal nunca único:** estado não depende só de cor, som, gesto, movimento ou texto. Exceção: som quando ouvir é a habilidade, com indisponibilidade tratada como item inválido.
8. **Movimento opcional:** animação orienta ou encanta por até 250 ms; redução de movimento recebe sequência estática equivalente.
9. **Resposta imediata:** controle muda visualmente em até 100 ms, independentemente da latência de mídia.
10. **Privacidade visível, não invasiva:** dados locais são explicados ao responsável; fluxo infantil não exibe texto administrativo.
11. **Offline honesto:** pacote ausente, preparando, corrompido ou sem espaço nunca é disfarçado como atividade disponível.
12. **Peso é requisito de design:** nenhum novo asset entra sem ticket, orçamento e efeito sobre shell/pacote.

### 3.2 Direção visual global

**PROPOSTA G3:** identidade chamada **Lumon — pequenas descobertas**:

- base clara, quente e calma, com superfícies arredondadas e bastante espaço;
- Capivara como única mascote e guia emocional;
- caminho de cinco marcos como metáfora de progresso;
- formas simples em CSS para luzes, caminhos, estrelas e estados, evitando fundos raster pesados;
- sem aparência de planilha, dashboard, apostila ou painel administrativo na área infantil;
- sem copiar personagem, layout, medalha, ícone, exercício ou linguagem visual de terceiro;
- fontes do sistema arredondadas; nenhuma webfont ou chamada externa necessária;
- texto curto, caixa normal e leitura confortável; sem blocos em maiúsculas como instrução infantil.

### 3.3 Paleta funcional proposta

Paleta respeita o Norte e ainda precisa de auditoria WCAG em cada combinação real:

| Função | Valor inicial | Uso |
|---|---|---|
| Fundo compartilhado | `#FFF9F1` | canvas infantil, sem codificar matéria |
| Superfície | `#FFFFFF` | cartões e controles |
| Texto principal | `#2B211D` | texto/ícones sobre fundo claro |
| Foco | `#0B5FFF` | contorno de foco independente da matéria |
| Matemática principal | `#176B87` | ação/contorno da matéria |
| Matemática secundária | `#1F6F64` | marcos e apoio |
| Português principal | `#8A3D78` | ação/contorno da matéria |
| Português secundária | `#F27B62` | fundo/acento com texto escuro; não usar como texto sem prova |
| Acerto | `#237A4B` | acompanhado de símbolo e mensagem |
| Nova tentativa | `#9A5700` | acompanhado de repetir/pista |
| Erro técnico | `#9B2C2C` | somente adulto ou estado recuperável, com ícone/texto |
| Luz da Capivara | `#F6C453` | medalhão e encanto, nunca único estado |

**PROPOSTA G3:** Capivara mantém anatomia e paleta entre matérias. Medalhão-luz circular dourado no lenço funciona como âncora de identidade. Contexto de matéria usa moldura, chão, pequeno objeto ou cor de superfície; não recolore corpo nem cria duas mascotes.

## 4. Arquitetura de informação infantil

### 4.1 Hierarquia

```text
Lumon
├── Início infantil
│   ├── Próxima missão / Continuar
│   ├── Trocar matéria
│   └── Ver trilha de cinco marcos
├── Sessão infantil
│   ├── Preparação/demonstração
│   ├── Atividade de uma tarefa
│   ├── Acerto ou correção
│   ├── Leitura oral quando aplicável
│   └── Conclusão/retorno
└── Área do Responsável
    ├── Progresso por matéria/habilidade
    ├── Preferências e acessibilidade
    ├── Pacotes offline
    ├── Desbloqueio manual
    └── Backup/importação/exclusão com confirmação
```

Área do Responsável é separada visual e operacionalmente. Nenhuma tabela, porcentagem, tamanho de pacote, importação ou decisão destrutiva aparece na área infantil.

### 4.2 Seleção e continuidade de matéria

**PROPOSTA G3:** `SubjectSwitcher` usa duas opções grandes e estáveis:

- Matemática: símbolo de três formas/quantidades + rótulo falado e textual;
- Português: símbolo de livro aberto com onda sonora + rótulo falado e textual;
- seleção atual usa contorno, marca, título falado e cor; nunca só cor;
- posição das matérias não muda entre acessos;
- se há sessão ativa, `Continuar` domina e preserva matéria da sessão;
- troca de matéria não abandona sessão silenciosamente: mostra folha de decisão com `Continuar missão` dominante e `Guardar e trocar` secundário;
- progresso e missão de cada matéria permanecem independentes.

Primeira V1 não exibe matéria futura, tema online, múltiplos perfis ou botão inativo.

### 4.3 Trilha de cinco marcos

**PROPOSTA G3:** `TrailMap` mostra exatamente cinco marcos de etapa, não lista habilidades:

- disponível: marco cheio + símbolo de começar;
- atual: halo/luz + rótulo `Agora` falado/textual;
- concluído: estrela/check + rótulo `Concluído`;
- bloqueado: contorno + cadeado aberto ao responsável, sem linguagem de fracasso;
- revisão: pequeno símbolo de repetir, sem apagar estado principal;
- toque no marco atual abre sua próxima missão; toque em marco concluído abre escolha simples de praticar;
- habilidades internas ficam invisíveis à criança e detalhadas apenas para o responsável.

## 5. Fluxo infantil completo

### 5.1 Primeira entrada do dispositivo

Configuração inicial do pacote da Etapa 1 é responsabilidade adulta aprovada no Norte. Autonomia infantil começa depois do preparo.

1. App verifica shell e pacote sem mostrar erro técnico à criança.
2. Se Etapa 1 está pronta, abre `ChildHome` na última matéria ou Matemática por compatibilidade de migração.
3. Se pacote necessário está ausente, mostra estado infantil calmo `Capivara está preparando a missão` e oferece somente retorno para matéria pronta; controle adulto discreto permite preparo.
4. Responsável mantém controle por 3 segundos, vê tamanho estimado, estado offline e ação `Preparar etapa`.
5. Durante preparo, pode sair da área adulta; staging não aparece como pronto.
6. Após validação integral, próxima entrada infantil apresenta `NextMission`.
7. Se não há nenhuma matéria pronta, tela de espera tem uma única ação adulta explícita e não atribui falha à criança.

### 5.2 Início, missão e trilha

1. Capivara e emblema da matéria confirmam contexto.
2. `NextMission` ocupa área dominante: ilustração curta, símbolo da ação e botão `Começar`.
3. `Continuar` substitui `Começar` quando há sessão ativa.
4. `SubjectSwitcher` fica acima ou ao lado da missão, sem competir em tamanho.
5. `Ver caminho` expande a trilha de cinco marcos; voltar mantém missão em destaque.
6. Primeira ocorrência de um tipo de atividade abre demonstração falada/visual não pontuada.

### 5.3 Atividade

1. Topo mantém `Sair`, progresso por pontos e matéria; nenhum número de desempenho.
2. Instrução operacional toca apenas por **Ouvir** e aparece também como demonstração visual curta.
3. Tarefa apresenta um estímulo e uma forma de resposta.
4. Toque na resposta confirma seleção em até 100 ms.
5. Quando resposta exige submissão, `Conferir` torna-se única ação principal; seleção simples pode submeter ao tocar se não houver risco de toque acidental.
6. Acerto abre microcelebração curta e botão `Continuar`.
7. Erro abre nova tentativa sem revelar resposta. Depois, pista graduada; depois, exemplo demonstrado e item análogo conforme G1.
8. Item inválido por áudio/conteúdo/asset sai da pontuação e avança com mensagem acolhedora.

### 5.4 Ouvir, selecionar e digitar

- **Ouvir:** primeiro gesto pode ser tocar o botão. Estado muda `pronto`, `carregando`, `tocando` ou `indisponível` com forma, texto/estado acessível e sinal visual.
- **Selecionar:** opções grandes, mesma área e peso; imagem não possui detalhe, posição ou escala que revele resposta.
- **Digitar:** campo e teclado virtual não escondem estímulo, **Ouvir** ou `Conferir`; apoio visual/sonoro reduz gradualmente; erro motor recebe ajuda sem virar falha de leitura.
- **Ordenar:** botões `Mover antes/depois` sempre existem. Arraste/swipe pode ser atalho, nunca caminho único.

### 5.5 Erro, pista e revisão

```text
tentativa independente
  ├── acerto: celebrar + continuar
  └── erro: acolher + tentar novamente
        ├── recuperação independente: registrar recuperação + revisar depois
        └── novo erro: pista graduada
              ├── acerto assistido: prática, não domínio
              └── dificuldade: exemplo curto + item análogo
```

- Capivara nunca chora, perde energia, vira de costas ou expressa decepção.
- Não exibir resposta correta imediatamente após primeiro erro.
- Revisão aparece como `Vamos treinar mais uma`, não como punição.
- Item análogo preserva habilidade e muda superfície; UI não declara transferência por simples troca de posição.

### 5.6 Leitura oral autoavaliada

1. Cartão mostra palavra/frase e apoio visual quando pedagogicamente permitido.
2. Capivara em pose de falar demonstra ação; instrução falada é repetível.
3. Criança tenta ler em voz alta sem gravação/reconhecimento.
4. Aparecem duas ações equivalentes e grandes:
   - `Li sozinho`: símbolo de voz confiante + verde + rótulo falado;
   - `Quero praticar`: símbolo de repetir + âmbar + rótulo falado.
5. Swipe pode ser atalho, mas botões permanecem visíveis.
6. **Ouvir** é liberado depois da tentativa para comparação.
7. `Li sozinho` registra confiança; não libera domínio.
8. `Quero praticar` agenda apoio/revisão sem contar erro punitivo.

### 5.7 Abandono, retomada, conclusão e retorno

- `Sair` abre `ExitSheet`, não abandona imediatamente.
- Ação principal: `Continuar missão`.
- Ação secundária: `Guardar e sair`, com ícone de casa; registra abandono/retomada conforme contrato.
- Fechar navegador conserva sessão ativa materializada.
- Início posterior mostra `Continuar missão` como ação dominante e contexto visual do último item, sem revelar resposta.
- Conclusão mostra esforço, itens praticados e próximo passo; não mostra ranking ou velocidade.
- Ação principal: `Voltar ao caminho` quando há revisão/avanço a compreender; `Praticar de novo` fica secundária.
- Retorno posiciona foco e viewport na próxima missão/marco atual.

## 6. Wireframes textuais

Wireframes descrevem hierarquia, não pixels finais.

### WF-01 — início infantil

```text
┌──────────────────────────────────┐
│ [Lumon]        [controle adulto] │
│ [Matemática] [Português]         │
│                                  │
│       [Capivara acolhedora]      │
│  PRÓXIMA MISSÃO                  │
│  [símbolo visual da tarefa]      │
│  [       COMEÇAR       ]         │  ação principal
│                                  │
│  [ caminho: ● ○ ○ ○ ○ ]         │
│  [Ver caminho]                   │
└──────────────────────────────────┘
```

Texto da missão pode existir, mas símbolo, fala e demonstração permitem agir sem lê-lo.

### WF-02 — retomada

```text
┌──────────────────────────────────┐
│ [matéria]          [marco 2/5]   │
│       [Capivara esperando]       │
│  Sua missão está guardada        │
│  [      CONTINUAR MISSÃO      ]  │  ação principal
│  [Começar outra depois]          │
└──────────────────────────────────┘
```

### WF-03 — trilha

```text
┌──────────────────────────────────┐
│ [voltar]  Caminho de Português   │
│                                  │
│  ★───◎───○───○───○               │
│  1   2   3   4   5               │
│      AGORA                       │
│                                  │
│  [       CONTINUAR       ]       │  ação principal
└──────────────────────────────────┘
```

### WF-04 — demonstração inicial

```text
┌──────────────────────────────────┐
│ [sair]             ● ○ ○ ○ ○     │
│                                  │
│ [OUVIR 🔊]  [Capivara aponta]    │
│       [seta para resposta]       │
│  [exemplo visual não pontuado]   │
│                                  │
│  [       VAMOS TENTAR       ]    │  ação principal
└──────────────────────────────────┘
```

Redução de movimento troca gesto animado por quadro estático `1. ouvir; 2. tocar` com símbolos e fala.

### WF-05 — seleção auditiva/visual

```text
┌──────────────────────────────────┐
│ [sair]             ● ● ○ ○ ○     │
│            [ OUVIR 🔊 ]          │
│                                  │
│     [imagem A]   [imagem B]      │
│     [imagem C]   [imagem D]      │
│                                  │
│ [mensagem acessível reservada]   │
└──────────────────────────────────┘
```

Seleção é ação principal. Opções mantêm área equivalente e ordem determinística sem pista posicional recorrente.

### WF-06 — digitação com teclado virtual

```text
┌──────────────────────────────────┐
│ [sair]             ● ● ● ○ ○     │
│ [imagem/forma-alvo] [OUVIR 🔊]   │
│                                  │
│ [ campo de resposta____________ ]│
│ [          CONFERIR           ]  │  ação principal
├──────────────── teclado ─────────┤
│ viewport rola; estímulo/Ouvir/   │
│ campo/Conferir ficam alcançáveis │
└──────────────────────────────────┘
```

### WF-07 — nova tentativa e pista

```text
┌──────────────────────────────────┐
│ [Capivara incentiva, sem tristeza]│
│ [símbolo repetir] Vamos de novo  │
│ [pista visual/sonora graduada]    │
│                                  │
│ [       TENTAR DE NOVO       ]   │  ação principal
│ [OUVIR PISTA]                     │
└──────────────────────────────────┘
```

### WF-08 — item inválido

```text
┌──────────────────────────────────┐
│ [Capivara calma] [símbolo pausa] │
│ Esta parte não ficou pronta      │
│ [fala equivalente disponível]    │
│                                  │
│ [       CONTINUAR        ]       │  ação principal
└──────────────────────────────────┘
```

Sem código técnico, sem marcar erro, sem oferecer resposta correta.

### WF-09 — leitura oral

```text
┌──────────────────────────────────┐
│ [sair]             ● ● ● ● ○     │
│ [cartão palavra/frase]            │
│ [Capivara demonstra falar]        │
│                                   │
│ [LI SOZINHO] [QUERO PRATICAR]     │ ações equivalentes
│          [OUVIR DEPOIS]           │
└───────────────────────────────────┘
```

### WF-10 — confirmação de saída

```text
┌──────────────────────────────────┐
│ Sua missão pode ficar guardada   │
│ [      CONTINUAR MISSÃO      ]   │  ação principal
│ [Guardar e sair]                 │
└──────────────────────────────────┘
```

### WF-11 — conclusão

```text
┌──────────────────────────────────┐
│ [Capivara celebra]               │
│ [marcos/itens praticados]        │
│ Você fez uma descoberta!         │
│ [      VOLTAR AO CAMINHO      ]  │  ação principal
│ [Praticar de novo]               │
└──────────────────────────────────┘
```

### WF-12 — gate e área do responsável

```text
controle infantil discreto
  manter pressionado 3 s
  [progresso temporal + rótulo acessível]

┌──────── ÁREA DO RESPONSÁVEL ────────┐
│ [fechar]  visão neutra e informativa│
│ Matéria: [Matemática] [Português]   │
│ Progresso por habilidade            │
│ Preferências e acessibilidade       │
│ Pacotes offline                     │
│ Backup / importar                   │
│ [Apagar progresso]                  │
│   confirmação separada obrigatória  │
└─────────────────────────────────────┘
```

## 7. Contrato do botão Ouvir

### 7.1 Forma e operação

**PROPOSTA G3:** `AudioButton` infantil:

- alvo visual e interativo preferencial de 64×64 px; nunca menor que 48×48 px;
- ícone de alto-falante/onda + texto `Ouvir` quando houver espaço;
- nome acessível inclui finalidade: `Ouvir palavra`, `Ouvir instrução`, `Ouvir novamente`;
- toque, clique, Enter e Espaço executam a mesma ação;
- foco permanece no botão durante reprodução/repetição;
- repetir enquanto toca reinicia o mesmo áudio, conforme controlador aprovado;
- feedback visual ocorre no próximo frame e no máximo em 100 ms;
- não usa `aria-pressed` como se fosse liga/desliga; expõe estado operacional separado;
- área de resposta não fica bloqueada sem explicação enquanto áudio carrega.

### 7.2 Estados

| Estado | Visual | Estado acessível | Ação |
|---|---|---|---|
| Pronto | ondas paradas + rótulo | `Ouvir, pronto` | tocar inicia |
| Carregando | anel/reticências + texto | `Carregando áudio` | nova ativação não duplica |
| Tocando | ondas cheias + `Tocando` | `Áudio tocando` | repetir reinicia |
| Finalizado | volta a pronto | anúncio breve opcional | pode repetir |
| Indisponível essencial | símbolo pausa/erro + texto | `Áudio indisponível; item não será contado` | sai do item com segurança |
| Indisponível de apoio | símbolo + fallback aprovado | `Áudio indisponível; use o apoio visual` | continua somente se pedagogia permitir |

Som nunca é usado para confirmar que o próprio áudio começou. Estado visual e leitor de tela oferecem canal independente.

## 8. Estados universais

Todos os estados abaixo existem para Matemática e Português quando aplicáveis. Estado técnico detalhado pertence ao responsável; criança recebe orientação simples.

| Estado | Área infantil | Área do responsável | Próxima ação |
|---|---|---|---|
| Vazio sem progresso | próxima missão inicial + demonstração | progresso ainda não iniciado | começar missão |
| Carregando tela | esqueleto simples preserva estrutura; sem falso botão | estado técnico curto | aguardar/cancelar seguro |
| Preparando pacote | Capivara prepara, matéria pronta alternativa | bytes/etapa/progresso/retomar | continuar matéria pronta |
| Offline com pacote pronto | selo offline visual/textual discreto | pacote verificado | começar/continuar |
| Offline durante preparo | missão dependente indisponível, sem erro infantil | `Conecte para terminar o preparo` | tentar depois |
| Pacote ausente | não oferece atividade dependente | `Preparar etapa` | preparar |
| Pacote incompleto | staging invisível | retomar ou limpar staging próprio | reparar |
| Pacote corrompido | item/missão não conta; retorno seguro | versão, reparo e ativo anterior | reparar/rollback |
| Sem quota | progresso intacto; matéria pronta continua | liberar pacote opcional com confirmação | gerenciar espaço |
| Acerto | símbolo + mensagem + microcelebração | tentativa registrada | continuar |
| Nova tentativa | repetir + pista, sem revelar resposta | classe de erro quando disponível | tentar novamente |
| Item inválido | pausa acolhedora; não pontua | código técnico sem dado infantil | continuar/reparar |
| Abandono pedido | confirmação com continuar dominante | registro apenas após confirmar | continuar/guardar |
| Retomada | missão guardada dominante | sessão/versão fixadas | continuar |
| Conclusão | conquista + próximo passo | resumo por habilidade | voltar ao caminho |
| Atualização disponível | não interrompe sessão | atualizar após sessão/ação explícita | agora não/atualizar |

Nenhum estado vazio recomenda ação impossível. Nenhum erro técnico aparece como `Você errou`.

## 9. Componentes e contratos visuais

Componentes recebem estado semântico; não calculam domínio, não avaliam resposta, não acessam storage e não transmitem telemetria.

| Componente | Responsabilidade visual | Estados essenciais |
|---|---|---|
| `AppShell` | identidade comum, safe areas, foco/troca de tela | matéria, offline, atualização |
| `ChildHome` | próxima missão e continuidade | primeira entrada, vazio, retomada |
| `SubjectSwitcher` | alternar matéria sem perder sessão | selecionada, disponível, sessão ativa |
| `NextMission` | uma ação dominante | começar, continuar, indisponível |
| `TrailMap` | cinco marcos | concluído, atual, disponível, bloqueado, revisão |
| `StageNode` | símbolo/estado de uma etapa | foco, toque, bloqueio |
| `ActivityFrame` | tarefa única, progresso e saída | demo, ativo, feedback, inválido |
| `AudioButton` | reproduzir/repetir áudio | pronto, carregando, tocando, erro |
| `ResponseChoice` | alternativa grande e equivalente | neutra, foco, selecionada, correta, tentar |
| `TextEntry` | digitação e submissão | vazio, digitando, inválido, apoiado |
| `OrderingControl` | ordenar com botão equivalente | mover, limite, pronto, enviado |
| `HintPanel` | pista graduada | fechada, pista, exemplo |
| `FeedbackMoment` | acerto/recuperação/revisão | celebrar, acolher, pista, inválido |
| `OralSelfAssessment` | confiança oral | falar, escolher, comparar áudio |
| `ExitSheet` | impedir abandono acidental | continuar, guardar/sair |
| `ResumeCard` | retomar sessão fixada | pronta, pacote bloqueado |
| `SessionCelebration` | conclusão e próximo passo | revisão, repetir, avançar |
| `PackageState` | estado infantil recuperável | ausente, preparando, pronto, erro |
| `CaregiverGate` | gesto adulto de 3 s | ocioso, pressionando, cancelado, concluído |
| `CaregiverDashboard` | controles neutros e confirmações | progresso, pacote, backup, ação crítica |
| `CapybaraMoment` | pose com função declarada | instrucional, emocional, decorativa |

### 9.1 Eventos semânticos de apresentação

**PROPOSTA G3:** eventos locais, sem analytics/rede:

- `subject.selected`;
- `mission.started`, `mission.resume_requested`;
- `activity.demo_requested`, `activity.demo_completed`;
- `audio.requested`, `audio.state_changed`;
- `response.selected`, `response.submitted`;
- `feedback.correct`, `feedback.retry`, `feedback.hint`, `feedback.invalid_item`;
- `oral.read_alone`, `oral.practice_requested`;
- `session.exit_requested`, `session.abandoned`, `session.resumed`, `session.completed`;
- `package.preparation_requested`, `package.state_changed`;
- `caregiver_gate.started`, `caregiver_gate.completed`, `critical_action.confirmed`.

Eventos carregam IDs/estados necessários ao domínio local, não nome, idade, voz, gravação ou histórico para rede. Capivara reage a eventos; ela não decide avaliação.

## 10. Área do Responsável

### 10.1 Gate de 3 segundos

**PROPOSTA G3:** controle adulto discreto mantém alvo mínimo de 48 px:

- pointer/touch: `pointerdown` inicia; soltar, sair da área, cancelar ou perder visibilidade antes de 3 s cancela;
- teclado: manter Enter ou Espaço por 3 s; repetição automática não acelera;
- leitor de tela: nome `Área do responsável`; descrição `Mantenha pressionado por 3 segundos`;
- indicador mostra duração por anel + preenchimento + texto acessível; não apenas movimento;
- `prefers-reduced-motion` usa preenchimento estático por passos, sem pulso;
- conclusão abre modal/rota adulta e devolve foco corretamente ao fechar;
- gate evita entrada acidental, não é apresentado como segurança forte.

### 10.2 Conteúdo adulto

- resumo por matéria, habilidade, domínio, revisão e abandono;
- sessão por quantidade configurável dentro de 5–15;
- reduced motion, contraste e preferência de tempo local;
- preparo/reparo/remoção de pacote, com tamanho e disponibilidade offline;
- desbloqueio manual separado de domínio;
- exportar/importar backup local;
- apagar progresso e outras ações críticas com confirmação modal separada.

Confirmação crítica declara alvo, efeito e preservação. Toque simples nunca executa exclusão. Tema online futuro, Firebase, conta e múltiplos perfis permanecem ausentes da V1.

## 11. Acessibilidade e resposta

### 11.1 Critérios bloqueantes

- alvo mínimo 48×48 px; **Ouvir** preferencialmente 64×64 px;
- espaçamento evita toques acidentais entre ações opostas;
- foco visível de pelo menos 2 px e contraste suficiente, independente da cor de matéria;
- ordem de teclado segue ordem visual e mantém foco lógico após troca de tela;
- Enter/Espaço acionam botões; `Escape` pede confirmação antes de abandonar;
- nomes, papéis, valores e estados acessíveis em todo controle;
- mudanças relevantes usam anúncio curto sem duplicação ou roubo de foco;
- feedback combina símbolo, texto/fala e forma; nunca só cor/som/animação;
- imagens pedagógicas recebem texto alternativo funcional sem revelar resposta;
- imagens emocionais redundantes são decorativas (`alt=""`);
- WCAG AA para texto, controles e estados; combinações finais precisam de medição, não inferência;
- zoom a 200% sem perda funcional ou rolagem horizontal global;
- redução de movimento preserva sequência, direção e feedback por quadros estáticos;
- VoiceOver/TalkBack, teclado físico, toque e mouse pertencem à prova futura.

### 11.2 Latência percebida

- estado `pressionado/selecionado` até 100 ms;
- transição visual até 250 ms;
- áudio possui orçamento independente; UI não espera `playing` para confirmar toque;
- hash, preparo de pacote e validação pesada não rodam no fluxo infantil;
- esqueleto/carregamento preserva dimensões para evitar salto de layout.

## 12. Responsividade universal

### 12.1 Regras comuns

- layout começa em 320 px, mas matriz bloqueante do Norte começa em 360×640;
- conteúdo principal centralizado; largura não vira painel de muitas colunas em desktop;
- safe areas usam margens lógicas equivalentes a `safe-area-inset-*` em topo, laterais e base;
- nenhum CTA fixo cobre campo, teclado virtual, diálogo ou mensagem;
- orientação não apaga estado nem reinicia áudio/sessão;
- assets declaram recortes; corpo/gesto essencial da Capivara nunca sai da área segura;
- texto pode crescer 200%; botões expandem em altura e não truncam rótulo crítico;
- zoom do navegador permanece permitido.

### 12.2 Matriz de comportamento

| Viewport | Início/trilha | Atividade | Responsável |
|---|---|---|---|
| 360×640 | uma coluna; missão antes da dobra; switcher compacto | prompt 40%, resposta 60%; rolagem vertical natural | modal quase tela cheia, cabeçalho/fechar visíveis |
| 390×844 | uma coluna com Capivara maior | prompt e 2×2 opções quando alvos mantêm 48 px | seções empilhadas |
| 768×1024 | missão + Capivara em duas áreas; trilha central | prompt e resposta lado a lado somente se leitura ficar clara | painel central até 720 px |
| 1280×720 | largura limitada; sem dashboard horizontal | duas áreas compactas; todo controle primário no viewport | modal central rolável |
| 844×390 paisagem | cabeçalho reduzido, Capivara recortada de modo seguro | instrução compacta; prompt/resposta lado a lado; sem corte | modal ocupa altura disponível e rola internamente |

### 12.3 Teclado virtual

- ao focar entrada, rolar somente o necessário para manter estímulo resumido, **Ouvir**, campo e `Conferir` alcançáveis;
- não depender de `100vh` fixo; considerar viewport visual reduzido;
- CTA não fica preso atrás do teclado;
- fechar teclado não desloca foco para topo;
- orientação/zoom preservam conteúdo digitado;
- acentos e teclado pt-BR precisam de teste infantil; teclado próprio não é proposto nesta fase.

## 13. Primeira fatia vertical — Etapa 1

### 13.1 Objetivo

Provar experiência completa de palavra, imagem e som com áudio por toque, seleção, digitação apoiada, feedback, revisão, persistência, retomada e offline. Nenhuma palavra ou imagem final é escolhida aqui.

Placeholders normativos:

- `{PALAVRA_A..E}`: 3–5 itens futuros do corpus Lumon aprovados;
- `{IMAGEM_X_1..2}`: exemplares pedagógicos futuros, aprovados e não ambíguos;
- `{AUDIO_X}`: MP3 futuro revisado;
- `{ITEM_TRANSFERENCIA}`: item aprovado não praticado na sessão.

### 13.2 Pré-condições visuais/editoriais

- pacote Etapa 1 `ready`, validado e fixado pela sessão;
- áudio/imagem por ID, versão e hash; bytes fora do estado;
- função `essential`, `support`, `instructional`, `feedback` ou `decorative` por asset;
- pelo menos um exemplar diferente para evitar memorizar imagem;
- Capivara compartilhada não fornece pista da resposta;
- demonstração inicial não é pontuada;
- uma sessão não concede domínio.

### 13.3 Sequência operacional

| Passo | Tela/ação principal | Evidência esperada |
|---:|---|---|
| 0 | responsável prepara pacote | pacote fica `ready` só após validação integral |
| 1 | criança toca `Começar` | matéria/etapa/versões fixadas |
| 2 | demonstração toca **Ouvir** e aponta seleção | `E-INSTR` se ação não for compreendida; sem pontuação |
| 3 | ouvir `{AUDIO_A}` e selecionar `{IMAGEM_A_1}` | escolha independente e repetição de áudio permitida |
| 4 | repetir com `{PALAVRA_B}` e posições novas | não usar posição como pista |
| 5 | observar `{IMAGEM_C_1}` e selecionar forma escrita | imagem tem função semântica declarada |
| 6 | completar som/letra de item familiar | áudio/pista preservam relação contextual |
| 7 | digitar `{PALAVRA_D}` com apoio | separar ortografia, audição e erro motor |
| 8 | provocar/observar erro de fixture, nova tentativa e pista | erro original preservado; assistência não conta domínio |
| 9 | resolver item análogo ou `{ITEM_TRANSFERENCIA}` | superfície muda sem elevar dificuldade |
| 10 | concluir, voltar ao caminho | sessão/progresso/revisão persistidos |
| 11 | fechar app, ficar offline e retomar fixture | mesma sessão, pacote, item, ordem e estado |

### 13.4 Estados obrigatórios da fatia

- demo inicial;
- **Ouvir** pronto/carregando/tocando/erro;
- escolha neutra/selecionada/acerto/nova tentativa;
- digitação vazia/ativa/erro motor/apoiada;
- pista/exemplo/item análogo;
- item inválido por conteúdo, áudio ou imagem;
- saída pedida, abandono confirmado e retomada;
- conclusão e revisão futura;
- pacote ausente, preparando, corrompido e sem quota;
- offline pronto e offline sem pacote.

### 13.5 Critérios de aceite visual/operacional

- uma ação principal por tela;
- nenhuma instrução crítica só em texto;
- **Ouvir** encontrado e repetido sem autoplay;
- seleção e digitação não confundem interface com conteúdo;
- item inválido não vira erro infantil;
- feedback não revela resposta no primeiro erro;
- saída não abandona acidentalmente;
- retomada não perde contexto;
- todos os estados funcionam nos cinco viewports, com teclado virtual/zoom/safe areas;
- nenhuma palavra, pose ou imagem final entra antes de aprovação editorial/visual.

## 14. Briefing para artista da Capivara

### 14.1 Contrato comum

Todo ticket precisa declarar:

- ID, lote e finalidade;
- tela/contexto e evento semântico;
- classificação decorativa, emocional, instrucional ou pedagógica;
- pose, gesto e emoção;
- matéria: global, Matemática ou Português;
- dimensões de fonte e exportação;
- fundo/transparência, recorte e safe areas;
- texto alternativo ou marcação decorativa;
- peso máximo individual e orçamento do lote;
- referência âncora aprovada, ferramenta/modelo/versão e proveniência;
- aprovação pedagógica quando influenciar resposta;
- licença/autoria e estado de revisão.

Proibido:

- texto, pseudoalfabeto, número, logotipo ou marca-d'água dentro da imagem;
- expressão de culpa, tristeza punitiva, medo ou reprovação;
- imitar artista, estúdio, app, mascote ou material proprietário;
- objeto, direção do olhar ou gesto que revele resposta pedagógica;
- mudança cumulativa de anatomia entre poses;
- asset sem orçamento ou duplicação por matéria quando CSS/contexto basta.

### 14.2 Anatomia e recorte

**PROPOSTA G3:** âncoras visuais:

- silhueta baixa, arredondada e estável;
- focinho, olhos, orelhas, pelagem, lenço e medalhão-luz constantes;
- medalhão circular dourado; matéria aparece no ambiente/acessório, não na anatomia;
- margem segura geral de 10% ao redor da silhueta;
- pose que aponta reserva 35% de espaço livre no lado do alvo;
- hero mantém rosto, medalhão e gesto dentro dos 60% centrais para recortes;
- ícone maskable mantém elementos essenciais dentro dos 60% centrais, margem conservadora de 20%;
- transparência limpa, sem halo serrilhado; leitura em 48, 96, 192, 256 e 512 px conforme finalidade.

### 14.3 Tickets P0a — model sheet

| Ticket | Pose/emoção/finalidade | Matéria | Dimensões/safe area | Recorte/alt | Peso |
|---|---|---|---|---|---:|
| `P0A-01` | frontal e 3/4 neutras; âncoras anatômicas | global | fonte 2048²; export ref 1536²; margem 10% | referência editorial, não embarcada; alt descritivo | export ≤150 KB |
| `P0A-02` | lateral, sentada, em pé e alcance de pata | global | fonte 2048²; margem 10% | referência editorial; alt descritivo | export ≤150 KB |
| `P0A-03` | acolher, ouvir, falar, celebrar, incentivar e concluir | global | grade 2048²; rosto/medalhão dentro centro seguro | referência editorial; sem texto | export ≤150 KB |
| `P0A-04` | teste de medalhão, lenço e pequenos contextos de matéria | Matemática/Português | 1536²; corpo idêntico | contexto nunca entrega resposta | export ≤150 KB |

P0a precisa aprovação de consistência antes de qualquer pose P0b. Fonte de trabalho pode permanecer lossless fora do shell; somente exports distribuídos entram nos tetos.

### 14.4 Tickets P0b — momentos essenciais

| Ticket | Pose/emoção/finalidade | Matéria | Export/safe area | Recorte/alt | Peso máx. |
|---|---|---|---|---|---:|
| `P0B-01` | boas-vindas, calma e convite para missão | global | 512×512; margem 10% | corpo inteiro/3⁄4; decorativa | 70 KB |
| `P0B-02` | aponta para **Ouvir**, curiosa e atenta | global | 512×512; 35% vazio no lado do botão | recorte 256/512; alt `Capivara aponta para Ouvir` quando instrucional | 60 KB |
| `P0B-03` | acerto, alegria breve sem euforia | global | 512×512; centro seguro 70% | meio corpo; decorativa se mensagem já existe | 60 KB |
| `P0B-04` | nova tentativa, acolhedora e confiante | global | 512×512; gesto de repetir, margem 10% | meio corpo; alt funcional se única demonstração | 60 KB |
| `P0B-05` | conclusão, orgulho pelo esforço | global | hero 1024×768; foco no centro 60% | recortes 360/390/768/desktop; decorativa | 120 KB |

Mesmas poses atendem Matemática e Português. Cor de matéria vem da moldura/CSS; variante raster só existe se supervisor provar necessidade e orçamento separado.

### 14.5 Tickets P0c — ícone e marcador

| Ticket | Pose/emoção/finalidade | Matéria | Export/safe area | Recorte/alt | Peso máx. |
|---|---|---|---|---|---:|
| `P0C-01` | rosto 3/4 + medalhão; ícone PWA 512 | global | 512² PNG; essenciais no centro 60% | testar máscaras; nome do app fora da imagem | 80 KB |
| `P0C-02` | derivação direta do ícone âncora 192 | global | 192² PNG; mesmo centro | não redesenhar anatomia | 25 KB |
| `P0C-03` | favicon/atalho mínimo derivado | global | 48/96, centro seguro | reconhecimento em tamanho pequeno | 10 KB |
| `P0C-04` | marcador de trilha, pose neutra/luz | global | 256² transparente; margem 12% | alt vazio; estado vem do componente | 25 KB |

P0c substitui ícone atual não conforme. Legibilidade, máscaras, recortes, transparência e bytes são bloqueantes.

## 15. Orçamento de assets e shell

### 15.1 Regras bloqueantes

- nenhum asset visual final distribuído excede `150.000` bytes;
- pose 256 preferencialmente ≤45 KB; pose 512 ≤90 KB; hero ≤150 KB;
- nenhum arquivo entra duas vezes por variante de matéria sem justificativa;
- decoração geométrica usa CSS sempre que não comprometer compreensão;
- ausência de webfont, cenário raster grande, sprite massivo ou vídeo no shell;
- orçamento mede bytes distribuídos e transferência fria conforme engenharia, não somente arquivo-fonte.

### 15.2 Envelope do shell inicial

**PROPOSTA G3:** reservar no máximo `210.000` bytes para visuais do shell:

| Visual de shell | Teto |
|---|---:|
| PWA 512 | 80 KB |
| PWA 192 | 25 KB |
| favicon/atalho | 10 KB |
| boas-vindas global | 70 KB |
| marcador de trilha | 25 KB |
| **Total visual máximo** | **210 KB** |

Restam no máximo `290.000` bytes do teto de `500.000` para HTML, CSS, JavaScript, manifesto, service worker e demais respostas normativas. Esse envelope não prova conformidade: build final deve medir `transferSize` frio, `Content-Encoding`, todas as requisições da regra publicada e zero shell híbrido.

Poses de ouvir, acerto, nova tentativa e conclusão não entram automaticamente no shell. Ficam em pacote visual offline/versionado ou são carregadas conforme estratégia técnica aprovada, sem impedir início infantil já preparado.

### 15.3 Envelope visual da fatia Etapa 1

Planejamento máximo, sem autorizar produção:

- P0b essencial compartilhado: até 300 KB;
- 3–5 palavras, até dois exemplares visuais cada: máximo 10 imagens × 45 KB = 450 KB;
- subtotal visual da fatia: até 750 KB;
- subtotal precisa caber dentro do pacote de etapa de 2 MiB junto com áudio, itens e manifesto; pipeline bloqueia lote se soma real não couber;
- total de Português permanece ≤8 MiB.

Nenhum lote adicional é aprovado por este envelope. Cada novo ticket recalcula total de shell/pacote antes de gerar.

## 16. Protocolo de validação

### 16.1 Teste moderado com crianças

**VALIDAÇÃO INFANTIL obrigatória:** mínimo cinco crianças de 4–8 anos, incluindo pelo menos duas pré-leitoras. Amostra de cinco mede bloqueios iniciais, não valida estatisticamente domínio pedagógico.

Salvaguardas:

- consentimento do responsável;
- código anônimo; não registrar nome completo, escola, data de nascimento ou voz;
- sem transmissão, analytics ou gravação por padrão;
- moderador não lê instrução nem aponta controle durante tentativa independente;
- criança pode parar a qualquer momento; frustração encerra tarefa sem punição;
- conteúdo, áudio e imagem usados no teste precisam de aprovação editorial/licença aplicável.

Tarefas observadas:

1. identificar matéria e iniciar próxima missão;
2. entender demonstração sem leitura adulta;
3. encontrar e repetir **Ouvir**;
4. selecionar resposta;
5. digitar com teclado virtual;
6. compreender acerto e nova tentativa/pista;
7. escolher `Li sozinho` ou `Quero praticar` sem sentir punição;
8. sair, guardar e retomar;
9. concluir e voltar ao caminho;
10. reconhecer que estado de pacote não é erro próprio.

Registro por tarefa:

- concluiu sem ajuda;
- concluiu após demonstração prevista do sistema;
- precisou de instrução operacional adulta;
- abandonou;
- encontrou bloqueio crítico;
- item foi invalidado.

Meta inicial:

- pelo menos 80% — com cinco crianças, no mínimo 4 — inicia primeira missão sem ajuda adulta;
- pelo menos 80% entende ação depois da demonstração prevista;
- pelo menos 80% responde ao primeiro item válido;
- pelo menos 80% encontra e repete **Ouvir**;
- zero bloqueio crítico;
- zero ação destrutiva acessada pela criança por toque simples.

Bloqueio crítico: criança não consegue prosseguir/voltar; controle primário fica invisível/inoperável; feedback induz resposta errada; estado técnico atribui falha à criança; gate adulto abre acidentalmente; ou layout corta ação sem alternativa.

Falhar meta exige retrabalho e novo teste; média global não compensa falha de pré-leitoras.

### 16.2 Matriz técnica futura

| ID | Prova | Aceite |
|---|---|---|
| `UX-01` | primeira missão | ação dominante encontrada sem leitura adulta |
| `UX-02` | troca de matéria | contexto muda sem perder sessão/progresso |
| `UX-03` | cinco marcos | nenhuma lista infantil de dezenas de habilidades |
| `UX-04` | erro/pista | primeiro erro não revela resposta; apoio não vira domínio |
| `UX-05` | abandono/retomada | confirmação, persistência e foco corretos |
| `AUD-UX-01` | **Ouvir** | toque/mouse/Enter/Espaço; repetição; estados acessíveis |
| `A11Y-G3-01` | alvo/foco | ≥48 px, foco visível, ordem lógica |
| `A11Y-G3-02` | leitores | VoiceOver/TalkBack anunciam nome/estado sem duplicação |
| `A11Y-G3-03` | canais | nenhum estado crítico só por cor/som/gesto/movimento/texto |
| `A11Y-G3-04` | contraste | todas as combinações reais cumprem WCAG AA |
| `RESP-01` | viewports | cinco dimensões sem corte/overflow/controle pequeno |
| `RESP-02` | teclado virtual | estímulo, Ouvir, campo e Conferir alcançáveis |
| `RESP-03` | zoom/safe area | 200% e insets sem perda funcional |
| `PERF-UX-01` | toque | p95 ≤100 ms |
| `PERF-UX-02` | transição | ≤250 ms e reduced-motion equivalente |
| `CARE-01` | gate | 3 s reais por touch/mouse/teclado; soltar cancela |
| `CARE-02` | ação crítica | confirmação separada; nenhum toque simples destrutivo |
| `PKG-UX-01` | estados | ausente/corrupto/quota/offline têm saída correta |
| `BUD-01` | asset | cada arquivo ≤150.000 bytes e ticket/lote dentro do orçamento |
| `BUD-02` | shell | frio ≤500.000 bytes, regra completa, `Content-Encoding`, zero híbrido |
| `REG-UX-01` | Matemática | fluxo, 37 habilidades, sessão, domínio, revisão e offline preservados |

Automação não substitui teste infantil; teste infantil não substitui teclado/leitor de tela/performance.

## 17. Propostas G3 para decisão do supervisor

1. identidade global `Lumon — pequenas descobertas`, com Capivara única e contexto de matéria por superfície/acento;
2. paleta funcional inicial, medalhão-luz circular e fontes de sistema;
3. `ChildHome` centrada em `NextMission`, com `SubjectSwitcher` estável;
4. trilha infantil com exatamente cinco marcos e habilidades internas restritas à área adulta;
5. fluxo completo de demonstração, atividade, erro, pista, item análogo, conclusão, saída e retomada;
6. contrato `AudioButton` preferencial 64 px e estados acessíveis;
7. leitura oral com `Li sozinho`/`Quero praticar`, swipe apenas atalho e áudio depois da tentativa;
8. `CaregiverGate` por pressão contínua de 3 s e confirmações separadas;
9. matriz universal de estados, incluindo pacote ausente/corrompido/quota/offline e item inválido;
10. componentes semânticos e eventos locais sem analytics/rede;
11. regras de acessibilidade, latência, redução de movimento e canal não único;
12. matriz responsiva, teclado virtual, zoom e safe areas;
13. especificação visual/operacional da primeira fatia Etapa 1 sem palavra/asset final;
14. tickets P0a/P0b/P0c e contrato de consistência da Capivara;
15. envelope visual de shell ≤210 KB e fatia Etapa 1 ≤750 KB de visuais;
16. teste com mínimo cinco crianças, duas pré-leitoras, meta 80% e zero bloqueio crítico;
17. bloqueio de artista até supervisor aprovar G3 e estabilizar tickets.

## 18. Riscos e controles

| Risco | Severidade | Controle de aceite |
|---|---:|---|
| Criança depende de leitura | P1 | demonstração falada/visual + teste 80% com pré-leitoras |
| Redesign quebra Matemática | P0 | contratos compartilhados + regressão integral das 37 habilidades |
| Lista vira painel administrativo | P1 | missão dominante + cinco marcos; habilidades só no responsável |
| Erro gera vergonha/memorização | P1 | Capivara acolhedora; escada G1; sem revelar resposta inicial |
| Ouvir fica invisível ou não acessível | P1 | alvo 64 px, quatro entradas, estados e teste infantil/leitor |
| Gesto vira canal único | P1 | botão equivalente sempre visível |
| Teclado virtual corta tarefa | P1 | matriz real em mobile, scroll/foco/viewport visual |
| Gate adulto abre por acidente | P1 | 3 s contínuos, cancelamento e teste touch/teclado |
| Pacote falha e pune criança | P1 | item inválido, estado adulto reparável, progresso preservado |
| Asset dá pista pedagógica | P1 | ticket funcional + aprovação pedagógica + teste de nomeação |
| Deriva da Capivara | P1 | P0a âncora, ferramenta/modelo fixos e rejeição de deriva cumulativa |
| Ícone continua acima do teto | P1 | P0c ≤80 KB e `budget:check` bloqueante |
| Shell excede 500 KB | P1 | envelope 210/290 KB + medição fria real antes de aprovação |
| Animação distrai/inacessível | P2 | função declarada, ≤250 ms e equivalente estático |
| Cor de matéria reduz contraste | P1 | WCAG AA medido por combinação, foco independente |
| Tela adulta invade área infantil | P1 | gate/rota separados e visual neutro |
| Dados de teste infantil vazam | P0 | consentimento, IDs anônimos, sem voz/analytics/transmissão |

## 19. Separação de evidência

### TESTADO

- raiz, branch, HEAD, remoto, worktree, lock, claim, `run_id` e idempotência;
- `npm run check`: 20 arquivos, 21/21 testes e build com cinco etapas/37 habilidades;
- leitura do HTML/CSS/JavaScript atual confirmou foco, 48 px, reduced motion, alto contraste, zoom permitido, confirmação de reset e alternativas por botão na ordenação;
- leitura da suíte E2E confirmou matriz 360×640, 390×844, 768×1024, 1280×720 e 844×390;
- leitura do produto confirmou acesso adulto atual por clique, instruções/feedback textuais e ausência de Capivara, áudio, matéria Português e estados de pacote;
- `images/icon-512x512.png` atual excede teto conforme evidência G2 aprovada e conferência de arquivo;
- cobertura documental de fluxo, wireframes, estados, componentes, fatia, tickets, orçamento e protocolo infantil.

### FALHOU

- ícone 512 atual: `385.793 > 150.000` bytes;
- interface atual não atende gate adulto de 3 s;
- interface atual não prova autonomia pré-leitora, missão dominante, identidade Capivara, troca de matéria, áudio por toque ou estados offline de Português;
- shell futuro não possui medição fria real nem prova de coerência; margem estática atual é insuficiente para soma cega de assets.

### NAO TESTADO

- wireframes com crianças;
- meta de 80%, zero bloqueio e conforto de pré-leitoras;
- paleta/contraste reais e atratividade infantil;
- assets P0a/P0b/P0c, consistência, recortes, máscaras, transparência e peso;
- áudio, **Ouvir**, pronúncia, leitor de tela e latência reais;
- responsividade do redesign, teclado virtual, zoom e safe areas em aparelhos;
- estados reais de pacote, quota, corrupção, offline e atualização;
- shell frio final, PWA coerente e orçamento de pacotes;
- privacidade observada, ausência de transmissão e regressão pós-redesign de Matemática;
- Safari/iOS e engines além de Chromium.

### INFERIDO

- missão dominante e cinco marcos tendem a reduzir carga de decisão; crianças precisam comprovar;
- Capivara funcional e demonstração multimodal tendem a aumentar autonomia; assets/teste precisam comprovar;
- componentes semânticos compartilhados tendem a preservar coerência entre matérias; implementação precisa comprovar;
- envelope de assets tende a criar margem no shell; transferência fria final precisa comprovar;
- pressão de 3 s tende a reduzir entrada acidental; interação real precisa comprovar.

Nenhuma inferência aprova runtime, asset ou teste infantil.

## 20. Critérios de aceite do plano G3

- [x] Fluxo infantil completo, incluindo primeira entrada, matérias, missão, trilha, atividade, erro, revisão, leitura oral, abandono, retomada, conclusão e retorno.
- [x] Redesign global coerente para Matemática e Português.
- [x] Wireframes com uma ação principal e suporte pré-leitor.
- [x] Estados vazio, carregando, pacote/offline/quota/corrupção, acerto, nova tentativa, item inválido, abandono, retomada e conclusão.
- [x] **Ouvir** grande, repetível e acessível por toque/mouse/teclado.
- [x] Gesto com botão equivalente.
- [x] Área do Responsável por 3 s e confirmação separada.
- [x] Alvos, foco, nomes/estados, leitor de tela, WCAG AA, reduced-motion e latências especificados.
- [x] Cinco viewports, paisagem, teclado virtual, zoom e safe areas especificados.
- [x] Primeira fatia vertical Etapa 1 sem palavra/asset final.
- [x] Protocolo com cinco crianças, pré-leitoras, meta 80% e zero bloqueio.
- [x] Tickets P0a/P0b/P0c com função, matéria, dimensões, safe areas, alt e peso.
- [x] Ressalvas P1 de ícone/shell incorporadas sem soma sem orçamento.
- [x] Componentes e eventos semânticos descritos sem código final.
- [x] `TESTADO`, `FALHOU`, `NAO TESTADO`, `INFERIDO` e propostas G3 separados.
- [ ] Supervisor emite veredito independente.

## 21. Recomendação final

**RECOMENDAR REVISÃO INDEPENDENTE** pelo supervisor com `lumon-supervisao-final`, em `EM_REVISAO` no Gate `G3_EXPERIENCIA_PILOTO_VISUAL`.

Supervisor deve decidir as 17 propostas, manter evidência infantil/runtime como `NAO TESTADO` e verificar especialmente autonomia pré-leitora, orçamento do shell, gate adulto, fatia vertical e estabilidade dos tickets.

Artista IA não está liberado por esta recomendação. Após aprovação do supervisor, o orquestrador pode acionar artista com `lumon-arte-capivara` para P0a primeiro. P0b depende de P0a aprovado; P0c depende da consistência anterior. Nenhum asset final ou código é autorizado antes dos gates aplicáveis.
