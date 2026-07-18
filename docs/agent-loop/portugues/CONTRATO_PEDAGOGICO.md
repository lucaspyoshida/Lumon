# Contrato pedagógico de Português — Gate G1

> **Estado:** recomendação do pedagogo para revisão independente do Gate G1
> **Execução:** `pt-20260718T135710Z-pedagogo-9893095`
> **Público principal:** crianças de 4 a 8 anos em alfabetização, com entrada por habilidade
> **Implementação:** não autorizada
> **Autoridade:** `_reversa_sdd/norte-modulo-portugues.md`

## 1. Escopo, autoridade e marcação

Este contrato detalha o planejamento pedagógico das cinco etapas de Português. Ele não autoriza código, conteúdo executável, assets finais, geração de áudio ou mudança no módulo de Matemática.

As afirmações usam estas marcas:

- **NORTE/APROVADO:** decisão já confirmada no Norte; não é reaberta aqui.
- **DERIVAÇÃO G1:** especificação necessária para tornar uma decisão do Norte verificável, sem mudar produto, privacidade, custo, dados, rede ou experiência central.
- **PROPOSTA G1:** parâmetro novo recomendado pelo pedagogo. Só se torna contrato aprovado após veredito do supervisor e registro rastreável.
- **VALIDAÇÃO INFANTIL:** hipótese que exige observação com crianças; não pode ser aprovada por inferência documental.

Em caso de conflito, prevalece o Norte. Este documento não apresenta nenhum número como critério oficial do Kumon e não autoriza copiar material proprietário.

## 2. Princípios pedagógicos não negociáveis

1. **NORTE/APROVADO — entrada individual:** o ponto inicial é definido por evidência de habilidade, nunca por idade ou série escolar.
2. **NORTE/APROVADO — pequenos passos:** introduzir uma habilidade nova por vez, com prática curta e frequente.
3. **NORTE/APROVADO — domínio:** avançar por desempenho recente, revisão de erros e transferência; conclusão isolada não basta.
4. **NORTE/APROVADO — autonomia pré-leitora:** nenhuma ação infantil depende de leitura operacional ou ajuda adulta.
5. **NORTE/APROVADO — feedback acolhedor:** erro leva a nova tentativa e pista; não há vergonha, tristeza punitiva da Capivara, ranking ou pressão por tempo.
6. **NORTE/APROVADO — multimodalidade com função:** áudio, imagem e digitação entram somente quando cumprem função pedagógica explícita.
7. **NORTE/APROVADO — língua real:** letras não são ensinadas como se tivessem sempre um único som; nome, forma e sons aparecem em palavras reais.
8. **NORTE/APROVADO — conteúdo próprio:** corpus padrão original, em domínio público ou licenciado, revisado e disponível offline.
9. **NORTE/APROVADO — privacidade e offline:** a V1 não depende de backend nem transmite dados da criança.
10. **NORTE/APROVADO — leitura oral:** autoavaliação infantil orienta revisão, mas nunca comprova domínio sozinha; V1 não usa reconhecimento de fala.

## 3. Progressão de habilidades e pré-requisitos

Os códigos abaixo são **PROPOSTA G1** para identificação pedagógica estável. Nomes técnicos finais pertencem ao contrato arquitetural. Uma criança pode praticar habilidades de etapas diferentes quando os pré-requisitos objetivos estiverem demonstrados; a etapa organiza progressão, não cria trava etária.

### 3.1 Etapa 1 — palavra, imagem e som

| Código | Habilidade observável | Pré-requisitos | Evidência de transferência |
|---|---|---|---|
| `P1.oral-vocabulary` | Associar uma palavra familiar ouvida ao significado e à imagem | Atenção conjunta breve; tocar uma opção após demonstração | Reconhecer a mesma palavra em outro exemplar visual aprovado |
| `P1.visual-word` | Associar imagem familiar à palavra escrita correspondente | `P1.oral-vocabulary`; discriminação visual básica | Selecionar a palavra em posição e conjunto de distratores novos |
| `P1.initial-sound` | Identificar palavras que começam com um som-alvo regular | Vocabulário oral dos itens; compreender a tarefa por demonstração | Resolver com palavras aprovadas não praticadas na sessão |
| `P1.rhyme` | Reconhecer rimas simples pela terminação sonora | Vocabulário oral; discriminação auditiva | Identificar novo par de rima sem depender da mesma imagem |
| `P1.syllable-segmentation` | Perceber e segmentar oralmente palavras familiares em partes silábicas | `P1.oral-vocabulary`; modelo auditivo | Classificar ou montar palavra equivalente ainda não praticada |
| `P1.letter-in-context` | Relacionar nome, forma e sons regulares de letras em palavras reais | Vocabulário oral e associação imagem–palavra | Reconhecer a relação em outra palavra aprovada |
| `P1.missing-letter` | Completar letra ausente em palavra muito familiar com apoio visual/sonoro | `P1.letter-in-context`; palavra oral conhecida | Completar outra palavra equivalente sem repetir o mesmo item |
| `P1.supported-typing` | Digitar palavra muito familiar com apoio graduado | Reconhecer a palavra-alvo; localizar letras; `P1.missing-letter` quando aplicável | Digitar em nova ordem de itens e com apoio reduzido, sem cópia mecânica integral |

**Limite pedagógico:** reconhecimento visual de palavra não prova decodificação. Imagem não pode permanecer como pista obrigatória quando a habilidade avaliada for a forma escrita ou o som inicial.

### 3.2 Etapa 2 — decodificação e digitação de palavras

| Código | Habilidade observável | Pré-requisitos | Evidência de transferência |
|---|---|---|---|
| `P2.regular-decoding` | Decodificar palavras curtas de estrutura silábica regular | Consciência fonológica e relações letra–som da Etapa 1 | Ler palavra inédita equivalente do corpus aprovado |
| `P2.auditory-word-choice` | Selecionar a palavra escrita correspondente ao item ditado | Vocabulário oral; discriminação de grafias | Resolver com palavra equivalente e distratores novos não ambíguos |
| `P2.syllable-composition` | Ordenar sílabas para formar palavra conhecida | Segmentação silábica; palavra oral conhecida | Formar palavra equivalente sem modelo visual completo |
| `P2.word-completion` | Completar grafema ou sílaba coerente com a palavra | Relações letra–som e estrutura-alvo | Completar item inédito de mesma complexidade |
| `P2.listen-and-type` | Digitar palavra ouvida | Discriminação auditiva; domínio motor mínimo do teclado | Digitar palavra equivalente não copiada nem praticada na sessão |
| `P2.orthographic-contrast` | Diferenciar pares próximos sem reduzir a língua a correspondências unívocas | Decodificação regular consolidada | Resolver contraste novo, revisado contra ambiguidade regional |
| `P2.semantic-check` | Associar palavra nova decodificada a significado/imagem | `P2.regular-decoding`; vocabulário ou contexto suficiente | Aplicar decodificação em item novo e confirmar significado |

**Limite pedagógico:** erro de digitação, erro ortográfico e erro de compreensão sonora recebem classificações diferentes. Nenhum avaliador pode remover acentos universalmente.

### 3.3 Etapa 3 — leitura e construção de frases

| Código | Habilidade observável | Pré-requisitos | Evidência de transferência |
|---|---|---|---|
| `P3.sentence-reading` | Ler frase curta com palavras e estruturas graduadas | Decodificação de palavras; vocabulário funcional | Compreender frase inédita de estrutura equivalente |
| `P3.who-what-where` | Identificar quem, o quê e onde em frase | `P3.sentence-reading` | Responder em frase inédita sem pistas posicionais |
| `P3.sentence-image` | Relacionar frase curta à cena correspondente | Leitura da frase e vocabulário dos itens | Selecionar nova cena sem detalhe visual que entregue a resposta |
| `P3.word-order` | Ordenar palavras em frase simples coerente | Estrutura frasal oral; palavras funcionais | Ordenar frase inédita com composição equivalente |
| `P3.sentence-completion` | Completar frase preservando sentido e estrutura | Leitura de frase; vocabulário do contexto | Completar frase nova com distratores plausíveis e resposta única |
| `P3.function-words-punctuation` | Usar palavras funcionais, maiúscula e pontuação em contexto | Leitura básica de frases | Aplicar convenção em outra frase, não apenas reconhecer símbolo |
| `P3.supported-sentence-typing` | Digitar frase curta a partir de apoio controlado | Digitação de palavras; ordem frasal | Produzir frase equivalente com apoio reduzido e critérios explícitos |

### 3.4 Etapa 4 — textos curtos

| Código | Habilidade observável | Pré-requisitos | Evidência de transferência |
|---|---|---|---|
| `P4.short-text-reading` | Ler texto de duas a seis frases | Leitura de frases e vocabulário compatível | Ler texto inédito de extensão e dificuldade equivalentes |
| `P4.explicit-information` | Localizar informação explícita | `P4.short-text-reading`; identificar pergunta | Responder em texto inédito sem repetir frase decorada |
| `P4.sequence` | Reconhecer sequência de acontecimentos | Compreensão literal de frases conectadas | Ordenar eventos de narrativa inédita |
| `P4.title` | Selecionar título coerente com o texto | Compreensão global básica | Selecionar título de texto inédito com distratores plausíveis |
| `P4.context-vocabulary` | Inferir vocabulário simples pelo contexto | Compreensão do restante do trecho | Inferir termo novo com pista contextual suficiente |
| `P4.complete-passage` | Completar trecho coerente | Sequência e coesão básicas | Completar texto inédito sem pista puramente superficial |
| `P4.short-retelling` | Recontar por seleção ou digitação curta | Sequência e informação explícita | Recontar novo texto preservando eventos essenciais |

### 3.5 Etapa 5 — compreensão e produção

| Código | Habilidade observável | Pré-requisitos | Evidência de transferência |
|---|---|---|---|
| `P5.genre-reading` | Ler histórias, poemas, quadrinhos, instruções e informativos curtos | Compreensão de textos curtos | Compreender textos inéditos de pelo menos três gêneros |
| `P5.main-idea` | Identificar ideia principal | Localização de informações e compreensão global | Selecionar ou formular ideia principal de texto inédito |
| `P5.cause-effect` | Identificar causa e consequência | Sequência; conectivos básicos | Aplicar relação em texto ou gênero novo |
| `P5.simple-inference` | Fazer inferência simples apoiada em evidência textual | Compreensão literal estável | Inferir em texto inédito e indicar pista relevante |
| `P5.summary` | Completar ou digitar resumo breve | Ideia principal e sequência | Resumir texto inédito sem copiar trechos desconectados |
| `P5.short-response` | Digitar resposta curta pertinente ao texto | Compreensão da pergunta; digitação de frase | Responder a texto inédito conforme rubrica de sentido |
| `P5.cross-genre-transfer` | Aplicar habilidades de compreensão em gêneros distintos | Desempenho nas habilidades anteriores | Atingir critério em ao menos três gêneros, sem um único gênero mascarar dificuldade |

### 3.6 Regras de dependência e avanço

- **DERIVAÇÃO G1:** cada habilidade declara pré-requisitos; avanço de etapa exige as habilidades nucleares da etapa anterior, mas revisão pode atravessar etapas.
- **DERIVAÇÃO G1:** apoio é retirado gradualmente apenas depois de acerto estável; retirar imagem ou áudio cedo demais pode transformar alfabetização em teste de interface ou memória.
- **NORTE/APROVADO:** o responsável pode desbloquear manualmente; esse desbloqueio altera acesso, não registra domínio.
- **NORTE/APROVADO:** nenhuma mensagem negativa acompanha bloqueio ou revisão.
- **PROPOSTA G1:** habilidades nucleares são todas as listadas nas cinco tabelas; durante piloto, o supervisor pode separar habilidades compostas se os erros não forem diagnosticáveis.

## 4. Catálogo de atividades e função dos recursos

| Tipo de atividade | Habilidade principal | Áudio | Imagem | Digitação | Cuidado de validade |
|---|---|---|---|---|---|
| Ouvir e selecionar imagem | Vocabulário oral/compreensão sonora | Estímulo essencial, por toque explícito | Opções sem pistas decorativas | Não usada | Se áudio faltar, registrar indisponibilidade; não pontuar como erro da criança |
| Observar imagem e selecionar palavra | Associação significado–forma escrita | Apoio repetível, não resposta automática | Âncora semântica essencial | Não usada | Distratores devem ser legíveis, únicos e equivalentes visualmente |
| Identificar som inicial ou rima | Consciência fonológica | Estímulo essencial e revisado | Apoio semântico opcional | Não usada | Vocabulário e pronúncia devem ser familiares e não ambíguos |
| Segmentar ou ordenar sílabas | Consciência silábica/formação | Modelo e repetição quando necessários | Opcional | Não usada | Não validar só por posição, cor ou padrão repetido |
| Completar letra/sílaba | Relação som–grafia | Palavra-alvo e pista graduada | Apoio semântico removível | Entrada curta | Uma única resposta pedagógica aceitável ou rubrica explícita |
| Digitar palavra ouvida | Codificação/ortografia | Estímulo essencial | Apoio removido quando mede escrita | Essencial | Separar erro de teclado, acento, ortografia e audição |
| Associar palavra nova a imagem | Transferência de decodificação | Apoio de pronúncia após tentativa quando adequado | Confirma significado | Não usada | Não chamar de transferência se a imagem entregar a palavra por memorização |
| Ordenar palavras/completar frase | Estrutura frasal | Instrução e leitura opcional conforme habilidade | Contexto opcional | Opcional | Evitar mais de uma frase semanticamente válida sem rubrica |
| Selecionar cena de frase/texto | Compreensão literal | Leitura repetível se não estiver avaliando leitura silenciosa | Opções essenciais | Não usada | Cena não pode introduzir detalhe ausente que force inferência indevida |
| Pergunta literal/inferencial | Compreensão | Instrução e texto falado quando previsto | Somente se relevante ao texto | Seleção ou resposta curta | Classificar literal e inferencial separadamente |
| Ordenar acontecimentos | Sequência textual | Apoio opcional | Cenas ou frases | Opcional | Toda ordem deve ser justificável pelo texto |
| Recontar/resumir | Compreensão e produção | Repetição do texto conforme objetivo | Apoio de sequência removível | Essencial na V1 para produção escrita | Rubrica avalia sentido antes de ortografia, conforme a habilidade |
| Leitura oral autoavaliada | Confiança e recomendação de revisão | Modelo liberado após tentativa | Apoio quando adequado | Não usada | Autoavaliação nunca libera domínio isoladamente |

## 5. Contrato pedagógico de áudio, imagem e digitação

### 5.1 Áudio

- **NORTE/APROVADO:** áudio da V1 é arquivo estático pt-BR, funciona offline, não usa TTS em runtime e toca por botão **Ouvir** grande e repetível.
- **NORTE/APROVADO:** letras, fonemas, sílabas, dígrafos e casos de R, S, X, G/J, QU/GU, LH, NH e CH exigem revisão humana; usar gravação humana quando TTS editorial não for didaticamente correto.
- **DERIVAÇÃO G1:** cada item marca áudio como `essencial`, `apoio` ou `não usado`. Se essencial estiver indisponível, o item é inválido, não um erro.
- **DERIVAÇÃO G1:** o áudio instrucional ensina a ação; o áudio de conteúdo apresenta o estímulo; o áudio de feedback confirma ou orienta. Essas funções não devem se confundir.
- **DERIVAÇÃO G1:** repetir áudio não reduz pontuação nem sinaliza dependência por si só; quantidade de repetições pode indicar dificuldade para revisão, nunca punição.
- **VALIDAÇÃO INFANTIL:** clareza, ritmo, acolhimento, inteligibilidade e pronúncia devem ser observados com o público antes de publicar lote.

### 5.2 Imagem

- **NORTE/APROVADO:** imagem infantil tem função semântica, instrucional ou emocional explícita; material final precisa de autoria/licença documentada.
- **DERIVAÇÃO G1:** imagem que influencia resposta exige aprovação pedagógica e deve representar o conceito sem estereótipo, detalhe enganoso ou múltipla interpretação provável.
- **DERIVAÇÃO G1:** posição, cor, tamanho, enquadramento ou repetição não podem revelar resposta.
- **DERIVAÇÃO G1:** usar exemplares visuais alternativos para testar generalização; reconhecer sempre a mesma ilustração mede memória do asset.
- **NORTE/APROVADO:** não depender só de imagem quando a habilidade avaliada é auditiva, ortográfica ou textual; não depender só de cor para estado.
- **VALIDAÇÃO INFANTIL:** testar nomeação espontânea e possíveis leituras regionais/culturais antes de aprovar imagem pedagógica.

### 5.3 Digitação

- **NORTE/APROVADO:** produção escrita na V1 ocorre somente por digitação.
- **DERIVAÇÃO G1:** digitação é apoio na Etapa 1, resposta de palavra na Etapa 2, construção controlada na Etapa 3 e produção curta nas Etapas 4–5.
- **DERIVAÇÃO G1:** normalização é definida por habilidade. Acentos não são removidos universalmente; caixa, espaços e pontuação só podem ser tolerados quando não forem o objeto avaliado.
- **DERIVAÇÃO G1:** rubricas separam sentido, estrutura, ortografia e operação do teclado. Um deslize motor isolado não pode ser interpretado automaticamente como falha de leitura.
- **PROPOSTA G1:** após dois indícios consecutivos de erro motor no mesmo item, oferecer entrada mais apoiada e manter o item para nova verificação; não conceder acerto nem marcar domínio.
- **VALIDAÇÃO INFANTIL:** observar teclado virtual, localização de letras, uso de acentos, fadiga e necessidade de apoio para 4–8 anos.

## 6. Entrada diagnóstica por habilidade

### 6.1 Objetivo e resultado

O diagnóstico encontra o menor ponto de entrada produtivo sem rotular a criança por idade. O resultado por habilidade é **ainda não observado**, **precisa de apoio**, **em prática**, **pronto para verificação de domínio** ou **dominado por evidência posterior**. O diagnóstico inicial, sozinho, não concede domínio definitivo.

### 6.2 Fluxo pedagógico

1. **NORTE/APROVADO:** iniciar com ação demonstrada por imagem, seta e fala; **Ouvir** permanece disponível.
2. **PROPOSTA G1:** aplicar bloco curto de 6 a 10 oportunidades, com no máximo duas habilidades relacionadas e pelo menos dois formatos de item.
3. **PROPOSTA G1:** começar por amostra central da Etapa 1; diante de estabilidade, sondar o próximo pré-requisito; diante de dificuldade repetida, voltar ao pré-requisito imediato.
4. **PROPOSTA G1:** considerar estabilidade provisória quando houver pelo menos quatro respostas válidas e 75% ou mais de acerto sem pista máxima; isso apenas escolhe a próxima sondagem, não libera domínio.
5. **PROPOSTA G1:** encerrar um ramo após duas falhas consecutivas na mesma habilidade, frustração observável, pedido de parar ou duração total próxima de 12 minutos.
6. **DERIVAÇÃO G1:** abandono, áudio indisponível, instrução não compreendida ou erro de interface são inconclusivos, nunca erro pedagógico automático.
7. **DERIVAÇÃO G1:** encaminhar a criança à primeira habilidade não consolidada cujos pré-requisitos tenham evidência suficiente; incluir revisão de habilidades anteriores frágeis.

### 6.3 Salvaguardas do diagnóstico

- Não usar cronômetro visível, pressão, ranking ou comparação.
- Não inferir leitura por reconhecimento de uma palavra memorizada.
- Não inferir consciência sonora por pista de imagem, cor ou posição.
- Não usar conteúdo temático online para posicionamento ou domínio.
- Não exigir que responsável leia instruções ou valide cada resposta.
- Não atribuir falha à criança se a palavra, imagem, pronúncia ou alternativa for ambígua.
- **VALIDAÇÃO INFANTIL:** calibrar quantidade, parada, linguagem falada e transições com crianças pré-leitoras e leitoras iniciantes.

## 7. Domínio, amostra mínima e transferência

### 7.1 Critérios aprovados no Norte

| Etapa | Precisão inicial aprovada |
|---|---|
| 1 — palavra, imagem e som | 90% nas três sessões recentes |
| 2 — decodificação e palavras | 95% em itens praticados e 90% em itens inéditos |
| 3 — frases | 90% em reconhecimento e 85% em digitação |
| 4 — textos curtos | 90% em compreensão literal e 80% em produção |
| 5 — compreensão e produção | 85% em textos inéditos de pelo menos três gêneros |

Esses percentuais são configuráveis, sujeitos à validação com crianças e não são atribuídos como critérios oficiais do Kumon.

### 7.2 Amostra mínima recomendada

Os mínimos seguintes são **PROPOSTA G1** para evitar aprovação por amostras instáveis. A taxa é calculada sobre respostas válidas, sem arredondamento favorável.

| Etapa | Amostra mínima dentro de pelo menos três sessões recentes |
|---|---|
| 1 | 20 oportunidades válidas na habilidade, incluindo ao menos 5 itens distintos de transferência |
| 2 | 20 oportunidades em itens praticados e 10 em itens inéditos equivalentes |
| 3 | 10 oportunidades de reconhecimento e 20 de digitação quando ambas compõem a habilidade; ao menos 5 itens/frases de transferência |
| 4 | 10 respostas literais e 10 produções avaliáveis, em ao menos 3 textos, sendo 1 inédito |
| 5 | 20 respostas avaliáveis em textos inéditos, cobrindo pelo menos 3 gêneros e nenhuma lacuna crítica em ideia principal, causa/efeito ou inferência simples |

Regras comuns:

- **NORTE/APROVADO:** sessões têm de 5 a 15 exercícios e duração-alvo de 8 a 12 minutos.
- **NORTE/APROVADO:** domínio considera três sessões recentes, sem item recorrente acima de 30% de erro recente.
- **NORTE/APROVADO:** toda liberação exige item de transferência; 70%–80% da sessão usa conteúdo conhecido e 20%–30% revisão ou desafio.
- **PROPOSTA G1:** nenhuma sessão isolada fornece mais de 50% da amostra de domínio da habilidade.
- **PROPOSTA G1:** um mesmo item editorial não conta mais de uma vez na janela; variação apenas de posição não cria item novo.
- **DERIVAÇÃO G1:** respostas obtidas após exemplo explicado permanecem como prática, não como evidência de domínio naquela apresentação.
- **DERIVAÇÃO G1:** confiança oral, tema temporário e desbloqueio adulto podem recomendar prática, mas não substituem amostra objetiva.
- **VALIDAÇÃO INFANTIL:** mínimos, duração e percentuais devem ser recalibrados somente com evidência registrada e nova decisão rastreável.

### 7.3 Definição de transferência

Um item de transferência usa conteúdo aprovado que não apareceu na prática recente, preserva a habilidade-alvo e muda a superfície sem aumentar dificuldade indevidamente. Exemplos:

- Etapa 1: nova palavra equivalente, novo exemplar visual ou novo par sonoro aprovado.
- Etapa 2: palavra inédita com estrutura silábica e complexidade equivalentes.
- Etapa 3: frase inédita com mesma estrutura, sem repetir combinação decorada.
- Etapa 4: texto inédito de extensão, vocabulário e demanda equivalentes.
- Etapa 5: texto inédito e variação de gênero, mantendo rubrica comparável.

Não é transferência: trocar só posição de alternativas; trocar cor; repetir item com outra ilustração quase idêntica; usar tema temporário não editorial; ou introduzir vocabulário desconhecido que transforme o teste em conhecimento de mundo.

## 8. Erros, correção e revisão espaçada

### 8.1 Classificação de erros

| Código | Classe | Indício | Resposta pedagógica inicial |
|---|---|---|---|
| `E-INSTR` | Compreensão da ação | Criança não inicia ou usa controle errado | Redemonstrar com fala, seta e ação visível; não pontuar conteúdo ainda |
| `E-AUDIO` | Disponibilidade/clareza do áudio | Não toca, pronúncia duvidosa ou estímulo cortado | Invalidar item e encaminhar revisão editorial/técnica |
| `E-AUD` | Discriminação auditiva | Confunde sons ou palavra ouvida | Repetir estímulo; contrastar gradualmente sem punição |
| `E-SEM` | Associação semântica | Não relaciona palavra, imagem e significado | Reapresentar contexto/exemplar claro e item análogo |
| `E-FONO` | Consciência fonológica | Erra rima, som inicial ou segmentação | Modelar oralmente e reduzir contraste antes de novo análogo |
| `E-GRAF` | Relação grafema–som | Escolhe letra incompatível | Pista sonora/visual graduada em palavra real |
| `E-DEC` | Decodificação | Lê por adivinhação ou não combina unidades | Voltar a estrutura regular e testar palavra análoga |
| `E-ORT` | Ortografia | Produz palavra compreensível com grafia-alvo incorreta | Feedback específico da convenção, sem apagar evidência de sentido |
| `E-MOTOR` | Digitação/interface | Troca adjacente, toque duplicado ou não localiza caractere | Apoio de entrada; verificar novamente sem reclassificar como leitura |
| `E-SINT` | Estrutura frasal | Ordem ou palavra funcional inadequada | Modelo curto, reconstrução guiada e frase análoga |
| `E-LIT` | Compreensão literal | Não localiza informação explícita | Voltar ao trecho relevante e depois usar texto análogo |
| `E-INF` | Inferência | Resposta sem apoio no texto | Destacar pistas, comparar alternativas e tentar novo texto |
| `E-PROD` | Produção | Resposta não preserva sentido solicitado | Feedback pela rubrica: pertinência, sentido, estrutura e depois forma |
| `E-CONT` | Defeito de conteúdo | Duas respostas plausíveis, imagem ambígua, variante não prevista | Retirar item da pontuação e enviar à revisão editorial |

### 8.2 Escada de correção

Aplicar a escada **NORTE/APROVADO** sem transformar apoio em acerto de domínio:

1. nova tentativa sem pista;
2. pista graduada que preserva a habilidade-alvo;
3. exemplo explicado, curto, falado e demonstrado;
4. item análogo para verificar aprendizagem.

**PROPOSTA G1:** se a segunda tentativa independente acerta, registrar recuperação, mas manter o erro original na revisão. Se o acerto ocorre com pista ou exemplo, registrar prática assistida. Se o item análogo falha, retornar ao pré-requisito mais próximo.

### 8.3 Revisão espaçada

- **NORTE/APROVADO:** reapresentar erros em intervalos aproximados de 1, 3 e 7 dias.
- **DERIVAÇÃO G1:** reapresentar primeiro item análogo, não somente a mesma resposta decorada.
- **DERIVAÇÃO G1:** aumentar frequência para erros repetidos e reduzir temporariamente volume da sessão quando houver fadiga ou abandono.
- **PROPOSTA G1:** considerar encerrado um ciclo de erro após acerto independente em dois itens análogos separados e uma verificação posterior; isso não substitui a regra completa de domínio.
- **NORTE/APROVADO:** latência serve apenas para detectar dificuldade/fluência; nunca reduz pontuação ou cria pressão.

## 9. Corpus, licenciamento e ambiguidade

### 9.1 Corpus padrão

Cada item deve ser próprio do Lumon, de domínio público ou ter licença documentada. Priorizar cotidiano infantil de 4 a 8 anos, uso natural do português brasileiro e diversidade sem estereótipos. O corpus padrão permanece offline.

Metadados pedagógicos mínimos — **DERIVAÇÃO G1**:

- ID e versão estáveis;
- etapa, habilidade e pré-requisitos;
- palavra, frase ou texto canônico e variantes aceitas por habilidade;
- estrutura silábica, dificuldade, tema e vocabulário pressuposto;
- tipo de item, resposta, distratores e justificativa;
- marca de praticado, inédito/transferência e origem `lumon`;
- autoria, domínio público ou licença e evidência documental;
- ambiguidades conhecidas, regionalismos, homógrafos/homófonos e variantes ortográficas;
- IDs de áudio/imagem, suas funções e estados de revisão;
- revisão linguística, pedagógica e de pronúncia quando aplicável;
- rubrica de avaliação e motivo de invalidação.

### 9.2 Controle de ambiguidade

- Um item objetivo tem uma única resposta defensável no contexto.
- Distratores não podem introduzir grafia impossível, detalhe visual revelador ou diferença de dificuldade desproporcional.
- Imagem é testada por nomeação: se crianças ou revisores nomeiam objetos diferentes, o item não mede com segurança.
- Regionalismo, nome próprio, marca, polissemia, homografia, pronúncia variável e vocabulário acima da etapa são sinalizados.
- Variante válida não pode ser marcada como erro sem regra pedagógica explícita.
- **PROPOSTA G1:** dois revisores, sendo ao menos um pedagógico/linguístico, aprovam itens de resposta potencialmente ambígua antes do pacote editorial.

### 9.3 Modo temático futuro

Regras **NORTE/APROVADO**:

- pertence à segunda fase; fica ausente/desativado na V1;
- responsável informa somente tema, revisa e confirma cada palavra antes da sessão infantil;
- lista inicial de 12 a 20 candidatas, filtrada e separada do corpus editorial;
- não envia identidade, idade exata, histórico ou desempenho da criança;
- não exibe resultados brutos, links, fontes, publicidade ou conteúdo adulto à criança;
- não usa imagens encontradas na internet; áudio não aprovado impede atividade que dependa de ouvir;
- pacote vale 7 dias, pode ser apagado antes e renovado explicitamente por mais 7 dias;
- prática temática registra dificuldades, mas nunca libera domínio sozinha;
- desbloqueio exige verificação posterior com itens inéditos aprovados do corpus Lumon;
- falha de rede nunca bloqueia a trilha padrão.

## 10. Autonomia pré-leitora e leitura oral

### 10.1 Autonomia operacional

Para cada tipo de atividade:

1. demonstrar primeira ocorrência com imagem, seta e fala;
2. exibir uma ação principal por vez;
3. manter **Ouvir novamente** visível, reconhecível e repetível;
4. usar comportamento consistente para ações equivalentes;
5. oferecer botão visível como alternativa a swipe, arraste ou gesto;
6. confirmar cada toque visualmente;
7. explicar erro por pista/demonstração, não texto longo;
8. permitir iniciar, responder, pedir ajuda, concluir e voltar sem leitura operacional adulta;
9. separar configurações e decisões adultas do fluxo infantil;
10. fornecer sequência estática equivalente quando houver redução de movimento.

Texto pode acompanhar ícones e fala para apoiar alfabetização, mas não pode ser o único canal da ação. Som, cor, gesto e movimento também nunca são canais únicos, exceto o som quando ouvir for a habilidade explicitamente avaliada e sua indisponibilidade estiver tratada.

### 10.2 Leitura oral autoavaliada

Fluxo **NORTE/APROVADO**:

1. mostrar palavra ou frase em cartão, com apoio visual quando adequado;
2. Capivara demonstra que é hora de falar;
3. criança tenta ler em voz alta;
4. apresentar botões grandes **Li sozinho** e **Quero praticar**, com símbolos e rótulo falado;
5. swipe é apenas atalho equivalente;
6. feedback é microcelebração ou incentivo, nunca culpa/tristeza;
7. liberar **Ouvir** após a tentativa para comparação;
8. reapresentar itens marcados para prática.

O registro mede confiança percebida. **Li sozinho** não valida precisão, não libera domínio e não desbloqueia habilidade. **Quero praticar** nunca é erro punitivo. A V1 não usa reconhecimento de fala nem exige responsável para validar cada leitura.

## 11. Primeira fatia vertical da Etapa 1

### 11.1 Objetivo pedagógico

Provar uma experiência completa de associação entre palavra familiar, significado, imagem, som e forma escrita, incluindo seleção, digitação apoiada, erro, revisão e transferência. Esta especificação não desenha UI final nem escolhe asset ou palavra final.

### 11.2 Pré-condições editoriais

- **PROPOSTA G1:** microconjunto de 3 a 5 palavras muito familiares, regulares para o objetivo, de baixo risco de ambiguidade e aprovadas no corpus Lumon.
- Cada palavra tem imagem pedagógica inequívoca e áudio pt-BR revisado.
- Distratores pertencem a dificuldade comparável, mas não são semanticamente ambíguos.
- Nenhum item, ilustração, exercício ou identidade é copiado de material proprietário.

### 11.3 Sequência pedagógica da sessão

A sessão contém de 5 a 15 exercícios. **PROPOSTA G1:** piloto com 8 oportunidades válidas:

1. demonstração não pontuada: tocar **Ouvir** e selecionar um exemplo;
2. ouvir palavra e selecionar imagem;
3. repetir associação com outra palavra e posições novas;
4. observar imagem e selecionar palavra escrita;
5. identificar som inicial ou completar letra em palavra já familiarizada;
6. digitar palavra com apoio visual/sonoro;
7. revisar um erro por nova tentativa, pista graduada e item análogo quando necessário;
8. resolver transferência com item aprovado não praticado na sessão ou novo exemplar visual equivalente.

**DERIVAÇÃO G1:** se a criança não encontra **Ouvir** ou não compreende a ação, redemonstrar e classificar `E-INSTR`; não pontuar como desconhecimento da palavra. Se áudio falha, invalidar item. Se imagem admite mais de uma leitura, classificar `E-CONT`.

### 11.4 Feedback e evidência

- Acerto: confirmação imediata e microcelebração curta da Capivara.
- Erro: acolhimento, nova tentativa, pista graduada e item análogo; nenhuma perda, vergonha ou tristeza da mascote.
- Digitação: feedback separa sentido, ortografia e operação do teclado.
- Persistência futura deve registrar habilidade, versão do conteúdo, item, origem, resultado, apoio, classe de erro, revisão e sessão sem dados pessoais online.
- Pacote deve provar uso offline e áudio por toque, mas estratégia técnica pertence aos gates G2/G3.
- Uma sessão piloto comprova fluxo e gera evidência; não marca domínio, pois faltam três sessões, amostra mínima e transferência suficiente.

### 11.5 Critérios pedagógicos de aceite da fatia

- Todos os exercícios declaram habilidade e função de áudio/imagem/digitação.
- A criança consegue realizar ações sem leitura operacional adulta.
- Há pelo menos uma seleção, uma digitação, uma ocorrência de revisão e um item de transferência.
- Erro assistido não é contado como domínio.
- Ausência de áudio/conteúdo inválido não é atribuída à criança.
- Não há resposta revelada por cor, posição, gesto, imagem repetida ou texto instrucional.
- A fatia respeita corpus, licenciamento, feedback não punitivo e autoavaliação oral.

## 12. Validação obrigatória com crianças

O Norte exige teste moderado com pelo menos cinco crianças do público, incluindo pré-leitoras, meta inicial de 80% de autonomia no primeiro fluxo e zero bloqueios críticos. O protocolo final pertence ao supervisor.

Itens **VALIDAÇÃO INFANTIL**:

- encontra e usa **Ouvir** sem instrução operacional adulta;
- entende a ação depois da demonstração falada/visual;
- seleciona e digita sem confundir interface com conteúdo;
- compreende acerto, pista, nova tentativa, revisão e conclusão;
- diferencia **Li sozinho** de **Quero praticar** sem sentir punição;
- nomeia imagens como previsto e entende áudio/pronúncia;
- mantém conforto durante 8–12 minutos e 5–15 exercícios;
- não depende de cor, animação, gesto, som ou texto como único canal;
- apresenta fadiga, frustração ou dificuldade motora com digitação/acento;
- demonstra transferência, não apenas memorização do item/asset;
- entende palavras, frases e imagens considerando variação regional e cultural.

Registrar separadamente: concluiu sem ajuda, concluiu após demonstração prevista, precisou de instrução operacional adulta, abandonou, encontrou bloqueio crítico ou teve item invalidado. A amostra mínima de cinco crianças testa usabilidade/autonomia inicial; não basta, isoladamente, para validar estatisticamente todos os percentuais de domínio.

## 13. Riscos pedagógicos e controles

| Risco | Gravidade | Controle/critério |
|---|---|---|
| Memorização de item ou imagem fingir domínio | Alta | Transferência obrigatória, variação de exemplar e item editorial distinto |
| Português tratado como som único por letra | Alta | Palavra real, múltiplas relações contextuais e revisão humana |
| Imagem/distrator ambíguo invalidar resposta | Alta | Metadados, nomeação infantil, revisão e retirada da pontuação |
| Digitação medir coordenação, não alfabetização | Alta | Separar `E-MOTOR`, apoio graduado e nova verificação |
| Áudio sintético pronunciar item de modo didaticamente incorreto | Alta | Revisão humana e gravação humana quando necessário |
| Autoavaliação oral liberar avanço indevido | Alta | Confiança apenas; domínio objetivo e transferência continuam obrigatórios |
| Instrução textual exigir adulto | Alta | Demonstração falada/visual, uma ação e teste com pré-leitores |
| Percentuais/amostras inadequados ao público | Alta | Configuração, validação infantil e decisão rastreável antes de ajuste |
| Conteúdo proprietário ou licença ausente | Alta | Origem/licença por item; bloquear publicação sem evidência |
| Tema futuro contaminar domínio/corpus | Alta | Pacote separado, confirmação adulta e verificação posterior Lumon |
| Regionalismo ou variante válida virar erro | Média/alta | Metadados, rubrica por habilidade e revisão linguística |
| Pistas de cor, posição ou padrão | Média/alta | Randomização determinística futura e auditoria pedagógica dos distratores |
| Sessão longa gerar fadiga e erro falso | Média | 5–15 itens, alvo 8–12 minutos, parada acolhedora e retomada |
| Feedback/gamificação gerar vergonha ou pressão | Alta | Sem ranking/tempo punitivo/tristeza; observação infantil |
| Apoio visual nunca retirado impedir transferência | Média/alta | Retirada gradual e verificação sem pista não essencial |

## 14. Rastreabilidade das decisões do Norte

| Decisão | Aplicação neste contrato |
|---|---|
| `USR-001`, `USR-010` | Alfabetização 4–8; entrada e progressão por habilidade, sem trava etária |
| `USR-002` | Produção escrita apenas por digitação na V1 |
| `USR-003`, `USR-004`, `USR-019`, `USR-037` | Áudio estático offline, voz pt-BR revisada, toque explícito e gravação humana por exceção |
| `USR-005`, `USR-006`, `USR-022`, `USR-023` | Imagens infantis e feedback da Capivara, sem definir assets finais |
| `USR-011` | Cinco etapas e progressão detalhada |
| `USR-012` | Percentuais, três sessões, transferência, revisão e configuração preservados |
| `USR-014` | Corpus próprio/licenciado com metadados e revisão |
| `USR-015`–`USR-018`, `USR-032` | Tema futuro adulto, temporário, 7 dias e incapaz de liberar domínio isoladamente |
| `USR-020`, `USR-021` | Autonomia pré-leitora e leitura oral autoavaliada sem domínio isolado |
| `USR-027` | Primeira fatia vertical de Etapa 1 especificada pedagogicamente |
| `USR-034` | Nenhuma exigência pedagógica de múltiplos perfis na V1 |
| `USR-036` | Critérios infantis são globais, sem alterar Matemática neste gate |

## 15. Critérios de aceite do Gate G1

- [x] Habilidades e pré-requisitos das cinco etapas especificados.
- [x] Atividades e funções de áudio, imagem e digitação definidas.
- [x] Entrada diagnóstica por habilidade, independente de idade.
- [x] Percentuais aprovados, amostra mínima proposta, transferência e salvaguardas documentados.
- [x] Erros, escada de correção e revisão aproximada em 1, 3 e 7 dias definidos.
- [x] Corpus, licenciamento, metadados, ambiguidades e tema futuro delimitados.
- [x] Autonomia pré-leitora e leitura oral autoavaliada preservadas.
- [x] Riscos e validações com crianças explicitados.
- [x] Primeira fatia vertical da Etapa 1 especificada sem UI final ou implementação.
- [x] Decisões do Norte rastreadas; detalhes novos marcados como proposta.
- [ ] Supervisor revisa evidências e emite veredito independente.

## 16. Recomendação do pedagogo

**APROVAR** o contrato para revisão independente do supervisor no Gate G1.

Justificativa: os entregáveis pedagógicos estão cobertos, as decisões aprovadas do Norte foram preservadas e os detalhes novos estão explicitamente marcados como propostas configuráveis ou hipóteses de validação infantil. Esta recomendação não aprova o próprio gate, não libera o arquiteto e não autoriza implementação.
