# Norte do Lumon — módulo de Português e operação multiagente

> **Estado:** PLANEJAMENTO — IMPLEMENTAÇÃO NÃO AUTORIZADA  
> **Data-base:** 2026-07-17  
> **Branch de trabalho:** `feature/evolucao-pedagogica`  
> **Produto atual:** trilha de Matemática concluída e aprovada em `STATUS.md`  
> **Escopo deste documento:** consolidar o objetivo, as decisões, as propostas, as pendências e o processo rastreável para criar a trilha de Português.

## 1. Autoridade e uso obrigatório

Este documento é o Norte canônico da evolução do Lumon para Português. Todo agente, skill, programador, revisor e supervisor que trabalhar nesse objetivo deverá lê-lo antes de agir.

Ordem de autoridade:

1. decisões explícitas mais recentes do usuário;
2. este documento para o módulo de Português e o fluxo multiagente;
3. `_reversa_sdd/plano-evolucao-lumon.md` para os princípios gerais já consolidados do produto;
4. contratos técnicos e pedagógicos aprovados posteriormente;
5. relatórios, handoffs e recomendações dos agentes.

Uma recomendação de agente não se torna requisito até ser aprovada pelo usuário ou registrada como decisão aprovada neste documento.

Enquanto o estado acima permanecer **PLANEJAMENTO — IMPLEMENTAÇÃO NÃO AUTORIZADA**:

- não alterar código, estilos, PWA, conteúdo ou assets do aplicativo;
- não gerar imagens finais nem áudios finais;
- não ampliar escopo por preferência própria;
- permitir somente pesquisa, protótipos explicitamente autorizados e documentação de planejamento;
- preservar integralmente a trilha de Matemática já aprovada.

## 2. Visão do produto

O Lumon será uma plataforma infantil própria, local e offline, com matérias independentes sob a mesma identidade. A primeira expansão será uma trilha de Português para alfabetização infantil.

O módulo deverá:

- ensinar em pequenos passos;
- respeitar o ritmo individual;
- praticar até atingir domínio;
- revisar erros de forma direcionada e espaçada;
- desenvolver autonomia sem instruções longas;
- usar áudio, digitação e imagens infantis quando tiverem função clara;
- funcionar sem backend e sem transmitir dados da criança;
- manter a experiência rápida em celulares modestos;
- ter identidade própria, sem copiar materiais, personagens ou exercícios proprietários.

## 3. Inspiração pedagógica e limites

O Lumon adotará princípios públicos associados ao método Kumon:

- ponto inicial individual;
- progressão gradual em pequenos passos;
- prática curta e frequente;
- exemplos que favorecem autoinstrução;
- correção e nova tentativa;
- revisão antes do avanço;
- avanço por domínio, não somente por conclusão;
- leitura em complexidade crescente.

A sequência pública de língua materna do Kumon progride, em termos gerais, de vocabulário familiar e letras em palavras para palavras em frases, frases simples, parágrafos, resumo e leitura crítica.

O Lumon não copiará:

- fichas, apostilas ou exercícios;
- nomes proprietários de níveis;
- ordem interna não publicada;
- textos, ilustrações ou identidade visual;
- critérios numéricos apresentados como se fossem oficiais sem fonte pública.

Referências públicas consultadas:

- [Kumon — Small-step worksheets](https://www.kumon.com/about-kumon/kumon-method/small-step-worksheets/worksheets)
- [Kumon Brasil — Curso de Português](https://www.kumon.com.br/cursos/curso-de-portugues/)
- [Kumon Brasil — Material didático](https://www.kumon.com.br/metodo-kumon/material-didatico/)
- [Kumon Brasil — Estudo autodidata](https://www.kumon.com.br/metodo-kumon/estudo-autodidata/)

## 4. Decisões já confirmadas pelo usuário

| ID | Decisão | Estado |
|---|---|---|
| USR-001 | O público é alfabetização infantil. | APROVADA |
| USR-002 | Na primeira versão, a produção escrita será somente por digitação. | APROVADA |
| USR-003 | Haverá áudio na primeira versão se ele permanecer leve e verdadeiramente offline. | APROVADA |
| USR-004 | O áudio será pré-gerado em arquivos estáticos, sem TTS em runtime. | APROVADA |
| USR-005 | O aplicativo deverá usar imagens infantis. | APROVADA |
| USR-006 | A direção visual deverá focar desenhos de capivara. | APROVADA |
| USR-007 | O planejamento será multiagente, com funções especializadas. | APROVADA |
| USR-008 | Os agentes trabalharão um de cada vez, com rastreabilidade. | APROVADA |
| USR-009 | Ainda não está autorizada a implementação. | APROVADA |
| USR-010 | A faixa etária principal será de 4 a 8 anos, com entrada diagnóstica por habilidade e progressão não limitada pela idade. | APROVADA |
| USR-011 | A trilha de Português será organizada nas cinco etapas pedagógicas descritas na seção 5. | APROVADA |
| USR-012 | Os critérios iniciais de domínio seguirão os percentuais e salvaguardas da seção 6, serão configuráveis e deverão ser validados com crianças. | APROVADA |
| USR-013 | Na primeira versão, perfis, sessões e progresso serão armazenados somente no dispositivo; a arquitetura deverá permitir um adaptador Firebase futuro sem ativar persistência online agora. | APROVADA |
| USR-014 | O corpus padrão será próprio do Lumon, formado prioritariamente por palavras do cotidiano infantil e conteúdo original ou com licença documentada. | APROVADA |
| USR-015 | Quando houver internet, o produto poderá oferecer sessões temporárias com palavras relacionadas a um tema escolhido, mantendo o corpus Lumon como padrão. | APROVADA |
| USR-016 | O modo temático ficará na Área do Responsável e exigirá revisão e confirmação da lista antes de qualquer palavra ser apresentada à criança. | APROVADA |
| USR-017 | O modo temático online será entregue em uma segunda fase; a primeira versão deverá usar contratos extensíveis que permitam adicioná-lo sem reescrever sessões, conteúdo ou interface. | APROVADA |

## 5. Proposta pedagógica para Português

As cinco etapas abaixo estão **aprovadas como estrutura pedagógica principal**. O detalhamento das habilidades e dos critérios de domínio continua sujeito aos gates deste documento e não autoriza implementação.

### Etapa 1 — Palavra, imagem e som

Objetivo:

- ampliar vocabulário oral familiar;
- associar palavra, significado, imagem e som;
- desenvolver rima, segmentação e consciência fonológica;
- reconhecer nome, forma e sons regulares das letras em contexto.

Atividades candidatas:

- ouvir e selecionar a imagem correspondente;
- observar imagem e selecionar a palavra;
- encontrar palavras que começam com determinado som;
- identificar rimas simples;
- completar letra ausente com apoio visual e sonoro;
- digitar palavras muito familiares com apoio.

Regra pedagógica importante: Português não deve ser ensinado como se cada letra tivesse sempre um único som. Nome, forma e sons das letras devem aparecer em paralelo e em palavras reais.

### Etapa 2 — Decodificação e digitação de palavras

Objetivo:

- começar por estruturas silábicas regulares;
- ler palavras praticadas e palavras novas equivalentes;
- formar e digitar palavras curtas;
- separar erro de compreensão sonora, erro ortográfico e erro de digitação.

Atividades candidatas:

- completar palavra;
- selecionar palavra ditada;
- ordenar sílabas;
- digitar palavra ouvida;
- associar palavra nova a imagem;
- comparar palavras parecidas sem alternativas ambíguas.

### Etapa 3 — Leitura e construção de frases

Objetivo:

- ler frases curtas;
- compreender relações básicas de quem, o quê e onde;
- trabalhar palavras funcionais, maiúscula e pontuação;
- construir e digitar frases simples.

Atividades candidatas:

- ordenar palavras;
- completar frase;
- selecionar imagem correspondente;
- responder pergunta literal;
- digitar frase curta a partir de apoio controlado.

### Etapa 4 — Textos curtos

Objetivo:

- ler textos de duas a seis frases;
- reconhecer sequência de acontecimentos;
- localizar informação explícita;
- inferir vocabulário simples pelo contexto.

Atividades candidatas:

- ordenar cenas ou frases;
- selecionar título;
- responder perguntas literais;
- completar trecho;
- recontar por seleção ou digitação curta.

### Etapa 5 — Compreensão e produção

Objetivo:

- trabalhar histórias, poemas, quadrinhos, instruções e textos informativos curtos;
- identificar ideia principal, causa e efeito;
- fazer inferência simples;
- resumir e responder por digitação.

Atividades candidatas:

- selecionar ideia principal;
- identificar causa ou consequência;
- completar resumo;
- responder sobre texto inédito;
- digitar resposta curta com critérios adequados à alfabetização.

### Corpus padrão e modo temático online

O corpus padrão será próprio do Lumon, disponível offline e formado prioritariamente por palavras de uso cotidiano de crianças de 4 a 8 anos. Palavras, frases e textos deverão ter:

- objetivo pedagógico e etapa identificados;
- autoria própria, domínio público ou licença documentada;
- revisão linguística e pedagógica;
- ID e versão estáveis;
- metadados de dificuldade, estrutura silábica, tema e possíveis ambiguidades;
- áudio e imagem vinculados somente quando aprovados.

Como alternativa opcional, quando houver internet, um responsável poderá informar um tema de interesse atual da criança. O sistema buscará ou produzirá candidatos de vocabulário relacionados ao tema para uso temporário em uma sessão.

Diretrizes propostas para esse modo:

- o corpus Lumon continua sendo o padrão e funciona sem rede;
- enviar somente o tema informado, nunca identidade, idade exata, histórico ou desempenho da criança;
- retornar apenas palavras e metadados mínimos, sem copiar textos, diálogos, imagens ou áudios de terceiros;
- quando o tema envolver obra ou personagem protegido, preferir vocabulário cotidiano relacionado ao universo do tema, sem reproduzir conteúdo proprietário;
- filtrar linguagem imprópria, publicidade, links, instruções e conteúdo adulto;
- não exibir resultados brutos da internet no fluxo infantil;
- manter o pacote temporário separado do corpus editorial aprovado;
- permitir descarte ao final da sessão e não incluí-lo automaticamente no cache offline permanente;
- falha de rede nunca bloqueia o corpus padrão.

Fluxo de aprovação definido:

1. o responsável entra na Área do Responsável;
2. escolhe **Criar sessão temática** e informa somente o tema;
3. a interface explica que o tema será consultado online, mas nenhum dado da criança será enviado;
4. o serviço retorna candidatos já normalizados, deduplicados, classificados por dificuldade e filtrados;
5. o responsável vê uma prévia com palavra, significado infantil curto, etapa sugerida e disponibilidade de áudio;
6. todas as palavras começam apenas como candidatas; o responsável pode remover, editar ou confirmar individualmente;
7. alertas destacam palavra ambígua, nome próprio, marca, termo acima da dificuldade ou áudio ainda não revisado;
8. **Criar sessão** só é habilitado depois da confirmação explícita da lista final;
9. o pacote recebe identificação de temporário, tema, data e prazo de descarte;
10. a criança vê somente a sessão aprovada, nunca resultados brutos, fontes, links ou tela de busca.

Regras adicionais:

- sugerir inicialmente de 12 a 20 palavras para evitar revisão longa;
- selecionar automaticamente apenas palavras de baixo risco, sem dispensar confirmação humana;
- exigir um mínimo de palavras adequadas à habilidade antes de criar a sessão;
- bloquear palavrões, conteúdo adulto, violência gráfica, publicidade e instruções perigosas;
- não usar imagens encontradas na internet;
- palavras sem áudio aprovado só podem entrar em atividades que não dependam de ouvir;
- se futuramente houver geração online de áudio, ela ocorrerá durante a preparação adulta, será ouvida pelo responsável e ficará pronta antes do início da sessão infantil;
- permitir apagar o pacote imediatamente na Área do Responsável.

Ainda precisam ser decididos: duração do pacote e impacto dessas palavras no cálculo de domínio.

Fase e provisionamento arquitetural definidos:

- a primeira versão entrega somente o corpus Lumon aprovado e offline;
- a busca temática online será implementada em uma segunda fase;
- conteúdo editorial e pacote temporário deverão obedecer ao mesmo contrato básico de item e sessão;
- cada pacote declarará origem (`lumon` ou `tematico`), versão, tema, validade e estado de aprovação;
- a montagem de sessões dependerá de uma fonte de conteúdo abstrata, não de arquivos ou API específicos;
- um futuro provedor temático poderá ser conectado sem modificar progressão, renderizadores ou persistência principal;
- a funcionalidade futura deverá entrar por configuração explícita e permanecer ausente/desativada até estar completa e testada;
- não adicionar na primeira fase endpoints, chaves, SDK, chamadas de rede, botões inativos ou implementação parcial do provedor online.

## 6. Sessões, domínio e revisão

Princípios já herdados do Lumon:

- sessões entre 5 e 15 exercícios;
- feedback imediato, acolhedor e não punitivo;
- domínio por habilidade;
- uso das sessões recentes;
- revisão de erros;
- recomendação de avanço ou revisão;
- tempo apenas como diagnóstico, nunca como ranking ou pressão.

Critérios iniciais aprovados, configuráveis e sujeitos à validação com crianças:

| Etapa | Critério inicial de precisão |
|---|---|
| 1 — Palavra, imagem e som | 90% nas três sessões recentes |
| 2 — Decodificação e palavras | 95% em itens praticados e 90% em itens inéditos |
| 3 — Frases | 90% em reconhecimento e 85% em digitação |
| 4 — Textos curtos | 90% em compreensão literal e 80% em produção |
| 5 — Compreensão e produção | 85% em textos inéditos de pelo menos três gêneros |

Salvaguardas comuns:

- duração-alvo de 8 a 12 minutos;
- três sessões recentes para comprovar domínio;
- nenhum item recorrente com taxa de erro recente superior a 30%;
- itens inéditos ou de transferência para evitar aprovação por memorização;
- avanço somente depois de resolver item de transferência;
- composição aproximada de 70% a 80% de conteúdo conhecido e 20% a 30% de revisão ou desafio;
- reapresentação de erros após intervalos aproximados de 1, 3 e 7 dias;
- escada de correção: nova tentativa sem pista, pista graduada, exemplo explicado e item análogo;
- latência usada somente para detectar dificuldade ou fluência, nunca para punir.

Os números são a configuração inicial do produto, não uma alegação de que sejam critérios oficiais do Kumon. Ajustes exigirão evidência de uso e nova decisão rastreável.

## 7. Áudio verdadeiramente offline

### 7.1 Decisão de arquitetura

O aplicativo não chamará API de texto para fala durante o uso. TTS será utilizado somente no processo editorial para produzir arquivos estáticos em pt-BR.

Consequências:

- nenhuma chave no navegador;
- nenhum backend obrigatório;
- nenhuma transmissão de texto ou dados infantis;
- sessão reproduzível e verdadeiramente offline;
- voz previsível e passível de revisão;
- falha do provedor de TTS não afeta o aplicativo publicado.

### 7.2 Produção editorial

Fluxo proposto:

1. conteúdo pedagógico recebe ID estável;
2. roteiro de fala é aprovado;
3. ferramenta editorial gera somente itens novos ou alterados;
4. saída é validada tecnicamente;
5. pronúncia é revisada por humano;
6. arquivo e manifesto recebem versão e hash;
7. somente ativos aprovados podem entrar em pacote offline.

Letras, fonemas, sílabas, dígrafos e casos como R, S, X, G/J, QU/GU, LH, NH e CH exigem revisão humana. Quando o TTS não for didaticamente correto, usar gravação humana.

Não usar reconhecimento de fala como critério de domínio na primeira versão.

### 7.3 Formato, cache e desempenho propostos

- MP3 mono, 24 kHz, 32 kbps; 40 kbps somente se teste auditivo justificar;
- gerar de uma fonte sem compressão e comprimir uma única vez;
- não incluir áudio como base64 no JavaScript;
- um único `HTMLAudioElement`, sem reproduções sobrepostas;
- carregar o item atual e, no máximo, o próximo;
- cache de áudio separado do shell da PWA;
- pacotes por etapa, baixados sob demanda;
- marcar pacote como offline somente depois de validar todos os arquivos;
- alternativa textual ou visual quando o áudio não for essencial;
- quando áudio for a habilidade avaliada, informar claramente a indisponibilidade do pacote em vez de fingir funcionamento completo.

Orçamentos propostos para a primeira versão:

| Medida | Limite inicial |
|---|---:|
| Pacote total de Português | 8 MiB |
| Pacote por etapa | 2 MiB |
| MP3 mediano | 24 KiB |
| MP3 p95 | 64 KiB |
| Início em cache p95 | 100 ms |
| Início online p95 | 800 ms |
| Heap incremental atribuído ao áudio | 5 MiB |

O carregamento inicial do shell não deverá baixar áudio.

## 8. Arquitetura do produto

O Lumon permanecerá uma única PWA, com núcleo compartilhado e módulos independentes por matéria.

### Núcleo compartilhado

- sessão;
- progressão e domínio;
- revisão de erros;
- persistência e migrações;
- navegação e apresentação;
- componentes de resposta;
- acessibilidade;
- PWA e cache;
- testes e geradores determinísticos.

### Módulos de matéria

- Matemática;
- Português;
- futuros módulos somente após contrato explícito.

Cada módulo deverá declarar:

- ID e versão;
- etapas, habilidades e pré-requisitos;
- geradores e conteúdo editorial;
- tipos de prompt e resposta;
- regras de avaliação e normalização;
- critérios de domínio;
- versão do conteúdo.

Requisitos obrigatórios:

- progresso independente por matéria;
- nenhuma mudança de ID ou perda do histórico atual de Matemática;
- migração testada do schema existente;
- avaliação textual explícita por habilidade, sem remoção universal de acentos;
- IDs estáveis para conteúdo e áudio;
- determinismo dependente de habilidade, versão de conteúdo e seed;
- nenhum blob, MP3 ou imagem armazenado em `localStorage`;
- nenhuma dependência externa crítica em runtime.

### Persistência local e evolução futura

Na primeira versão:

- perfis, sessões, domínio, revisão, preferências e progresso ficam somente no dispositivo;
- não existe conta online, login, sincronização, banco remoto ou transmissão de progresso;
- o aplicativo continua utilizável offline;
- exportação e importação local podem oferecer portabilidade sem servidor.

A camada de persistência deverá ser acessada por um contrato de repositório, sem regras pedagógicas acopladas a `localStorage`, IndexedDB ou qualquer fornecedor. A implementação inicial será local. Uma futura implementação Firebase poderá cumprir o mesmo contrato e adicionar sincronização após decisão específica de produto, privacidade, consentimento e segurança.

Preparar para Firebase significa somente preservar essa separação arquitetural. Nesta fase, é proibido adicionar SDK, credenciais, configuração, chamadas de rede, autenticação ou código Firebase não utilizado.

Ordem técnica proposta:

1. introduzir registro de módulos sem alterar o comportamento de Matemática;
2. criar migração de progresso por matéria;
3. generalizar renderizadores e avaliadores;
4. provar uma fatia vertical mínima de Português;
5. criar pipeline editorial de conteúdo e áudio;
6. criar pacotes offline;
7. expandir as cinco etapas somente após a fatia vertical ser aprovada.

## 9. Experiência infantil e frontend

### 9.1 Diagnóstico

A interface atual atende requisitos técnicos importantes, mas tem aparência adulta e administrativa. A aprovação anterior comprovou responsividade e acessibilidade, porém não comprovou atratividade, identidade infantil nem autonomia de uma criança em alfabetização.

Essa lacuna passa a ser bloqueante para a expansão do produto.

### 9.2 Direção proposta

- uma ação principal inequívoca por tela;
- tela inicial com próxima missão dominante;
- trilha simples de cinco marcos, sem expor dezenas de habilidades simultaneamente;
- atividade com uma tarefa por tela;
- instrução curta e botão **Ouvir**;
- opções grandes e legíveis;
- apoio visual somente quando tiver função pedagógica ou emocional clara;
- acerto com microcelebração curta;
- erro com pista e nova tentativa, nunca punição;
- conclusão com conquista e próximo passo;
- área do responsável separada por acesso adulto e visual neutro.

Matérias propostas:

- base compartilhada do Lumon;
- Matemática em azul/verde;
- Português em coral/roxo;
- estado nunca comunicado somente por cor.

Componentes candidatos:

- `AppShell`;
- `SubjectSwitcher`;
- `ChildHome` e `NextMission`;
- `TrailMap` e `StageNode`;
- `ActivityFrame`;
- `AudioButton` com estados ocioso, carregando, tocando e erro;
- controles de seleção, digitação e ordenação;
- `HintPanel` e `FeedbackMoment`;
- `SessionCelebration`;
- `CaregiverGate` e `CaregiverDashboard`.

### 9.3 Critérios de experiência

- cada tela infantil possui uma ação principal clara;
- nenhum fluxo infantil exige compreender texto administrativo;
- áreas de toque com pelo menos 48 px;
- WCAG AA, foco visível, teclado, nomes e estados acessíveis;
- áudio nunca é o único canal, exceto quando ouvir for a habilidade explicitamente avaliada e houver tratamento equivalente de indisponibilidade;
- redução de movimento respeitada;
- interface responde visualmente ao toque em menos de 100 ms;
- transições de até 250 ms;
- shell inicial, sem áudio, com até 500 KB transferidos comprimidos;
- nenhum asset visual individual embarcado acima de 150 KB;
- validação em 360×640, 390×844, 768×1024, 1280×720 e paisagem relevante;
- teste moderado com pelo menos cinco crianças do público;
- meta inicial: ao menos 80% inicia a primeira missão, responde e encontra **Ouvir** sem instrução operacional adulta;
- zero bloqueios críticos no teste infantil.

## 10. Identidade visual — Capivara Lumon

### 10.1 Decisões e proposta

Está aprovado focar desenhos de capivara. Está pendente confirmar se a capivara substituirá integralmente a coruja anterior como mascote única. A recomendação dos agentes é usar uma única mascote para evitar identidade fragmentada e inventário duplicado.

Conceito proposto:

> Uma capivara-luz brasileira, acolhedora, curiosa e calma, que acompanha pequenas descobertas.

Estilo:

- ilustração 2D contemporânea de livro infantil;
- formas arredondadas, legíveis e consistentes;
- textura mínima de guache ou papel;
- sem imitar artista, estúdio ou personagem existente;
- mesma anatomia em todas as matérias;
- diferenças por matéria somente em acessórios, objetos e cores contextuais;
- nenhuma expressão de culpa, tristeza punitiva ou reprovação.

### 10.2 Paleta proposta

| Uso | Cor |
|---|---|
| Pelagem principal | `#9A6545` |
| Sombra da pelagem | `#70452F` |
| Luz da pelagem | `#BC8057` |
| Focinho | `#D9AB79` |
| Olhos | `#2B211D` |
| Lenço | `#1F6F64` |
| Luz/medalhão | `#F6C453` |
| Matemática | `#176B87` |
| Português principal | `#8A3D78` |
| Português secundária | `#F27B62` |

Os tons exatos da interface permanecem em CSS. Textura não pode alterar visualmente a identidade das cores essenciais da personagem.

### 10.3 Contrato do asset visual

Nenhuma geração começa sem:

- ID e finalidade;
- tela e contexto;
- classificação decorativa ou pedagógica;
- emoção, pose e gesto;
- matéria;
- dimensões de origem e exportação;
- área ocupada, espaço livre e safe areas;
- fundos e recortes responsivos;
- orçamento máximo;
- texto alternativo ou marcação decorativa;
- referência visual aprovada;
- aprovação do pedagogo quando a imagem influenciar a resposta.

Não incluir texto, pseudoalfabeto, número, logotipo ou marca-d'água dentro da imagem.

Orçamentos propostos:

| Asset | Limite |
|---|---:|
| Pose a 256 px | 45 KB |
| Pose a 512 px | 90 KB |
| Hero | 150 KB |
| Total visual inicial do shell | 500 KB |

### 10.4 Consistência e lote-piloto

1. gerar um único model sheet;
2. aprovar vistas frontal e 3/4 como imagens-âncora;
3. derivar todas as poses futuras das âncoras, nunca apenas de texto;
4. manter ferramenta e versão do modelo durante o lote;
5. preservar silhueta, proporções, focinho, olhos, orelhas, manchas, pelagem, lenço e medalhão;
6. rejeitar derivações cumulativas;
7. criar nova versão da personagem somente após decisão deliberada.

Gates do piloto:

- P0a: model sheet com vistas, expressões e poses;
- aprovação humana da personagem;
- P0b: boas-vindas, ouvir, acerto, nova tentativa e conclusão;
- validação de consistência, emoção, recortes, transparência e peso;
- P0c: ícone PWA e marcador de trilha;
- produção em escala somente após aprovação completa.

Não gerar inicialmente cenários extensos, animações, biblioteca ampla de objetos nem ilustrações pedagógicas em massa.

## 11. Modelo de agentes e skills

O processo usará um modelo híbrido:

- um agente coordenador controla o fluxo;
- agentes especialistas mantêm julgamentos independentes;
- cada especialista utiliza apenas sua skill de domínio quando acionado;
- o programador implementa;
- o supervisor final testa e decide, sem alterar o produto.

Skills candidatas, ainda não criadas:

| Agente | Skill | Responsabilidade estável |
|---|---|---|
| Coordenador | `lumon-fluxo-produto` | Estados, gates, handoffs e autorização do próximo agente |
| Pedagogo | `lumon-pedagogia-infantil` | Progressão, domínio, revisão e rubrica pedagógica |
| Arquiteto | `lumon-arquitetura-pwa` | Módulos, contratos, persistência e migração |
| Engenheiro | `lumon-engenharia-leve` | Performance, áudio, cache, formatos e testes |
| Frontend/design | `lumon-frontend-infantil` | Fluxos, componentes, acessibilidade e experiência infantil |
| Artista IA | `lumon-arte-capivara` | Identidade, prompts, referências, dimensões e consistência |
| Supervisor | `lumon-supervisao-final` | Matriz de aceite e veredito independente |

O agente visual também reutilizará a skill técnica de geração de imagens. A skill do Lumon definirá identidade e restrições; a skill técnica definirá o procedimento de geração e validação.

Uma skill deve conter apenas conhecimento e processo estáveis:

- quando acionar;
- entradas obrigatórias;
- passos essenciais;
- saídas;
- critérios de aceite e rejeição;
- referências carregadas somente quando necessárias.

Skills não devem simular personalidades nem armazenar conversas longas.

## 12. Ordem de execução dos agentes

Somente um agente poderá estar em execução por vez.

| Ordem | Agente | Entrada mínima | Saída obrigatória |
|---:|---|---|---|
| 1 | Pedagogo | objetivo e decisões do usuário | habilidade, progressão, domínio e função dos recursos |
| 2 | Arquiteto | contrato pedagógico aprovado | módulos, dados, integrações e migrações |
| 3 | Engenheiro | contratos pedagógico e arquitetural | tecnologia, desempenho, offline e testes |
| 4 | Frontend/design | conteúdo e limites técnicos | fluxo, wireframe, componentes e briefing visual |
| 5 | Artista IA | wireframe estável e ticket completo | piloto visual versionado |
| 6 | Programador | planejamento integral aprovado | implementação e evidências |
| 7 | Revisores especialistas | build testável | pareceres pedagógico, técnico, visual e de performance |
| 8 | Supervisor | produto e pareceres | veredito final baseado em evidências |

O agente visual não roda enquanto currículo ou wireframe estiverem abertos. O programador não roda enquanto o planejamento estiver pendente. O supervisor não implementa correções.

## 13. Rastreabilidade no Git e no GitHub

Princípio:

> Git guarda a verdade durável; GitHub coordena, resume e notifica.

Comentários isolados no GitHub não são fonte de verdade.

Estrutura futura proposta:

```text
docs/agent-loop/portugues/
├── OBJETIVO.md
├── STATUS.yaml
├── DECISOES.md
├── README.md
├── handoffs/
├── evidencias/
└── aprovacoes/
```

Uma Issue central do GitHub funcionará como painel humano, contendo:

- objetivo;
- fase atual;
- checklist;
- último commit publicado;
- links para relatórios;
- decisões aguardando o usuário;
- próximo agente autorizado;
- bloqueios.

O orquestrador só chama o próximo agente quando:

1. o relatório anterior existe;
2. o commit foi publicado e confirmado no remoto;
3. o estado permite a transição;
4. não há aprovação humana bloqueante;
5. os critérios de aceite da etapa anterior foram satisfeitos.

Falha de push impede o handoff. Trabalho local não publicado não pode ser tratado como entrada canônica do próximo agente.

### 13.1 Registro de decisão

Cada decisão deverá registrar:

- ID;
- título;
- estado: proposta, aprovada, rejeitada ou substituída;
- responsável pela decisão;
- data;
- justificativa resumida;
- alternativas consideradas;
- evidências;
- impacto;
- decisão anterior substituída, quando houver;
- commit de publicação.

Não registrar raciocínio interno bruto. Registrar a justificativa auditável necessária para entender e revisar a decisão.

### 13.2 Handoff obrigatório

```text
Agente:
Skill utilizada:
Commit de entrada:
Entradas consultadas:
Trabalho executado:
Decisões propostas:
Decisões aprovadas respeitadas:
Alternativas consideradas:
Evidências:
Pendências:
Critérios de aceite:
Arquivos alterados:
Commit de saída publicado:
Próximo agente recomendado:
```

Um agente nunca reescreve silenciosamente o relatório histórico de outro. Correções são novos registros que referenciam o item corrigido.

## 14. Gates do programa

### Gate G0 — Norte aprovado

- usuário aprova objetivo, público, etapas e decisões bloqueantes;
- documento deixa de estar em planejamento aberto;
- skills podem ser criadas, mas implementação continua bloqueada até autorização própria.

### Gate G1 — Contrato pedagógico

- habilidades e progressão aprovadas;
- critérios iniciais de domínio configuráveis;
- corpus e licenciamento definidos;
- papel de áudio e imagem definido por atividade.

### Gate G2 — Contrato técnico

- arquitetura por matérias;
- migração de Matemática;
- contrato de conteúdo, áudio e imagem;
- orçamentos de desempenho;
- estratégia offline;
- plano de testes.

### Gate G3 — Experiência e piloto visual

- wireframe infantil aprovado;
- model sheet da capivara aprovado;
- piloto visual validado;
- primeira fatia vertical especificada.

### Gate G4 — Autorização de implementação

- usuário autoriza explicitamente implementação;
- branch, escopo e critérios de aceite registrados;
- programador recebe somente requisitos aprovados.

### Gate G5 — Validação especializada

- pedagogia;
- arquitetura e regressão;
- desempenho e offline;
- frontend e acessibilidade;
- identidade e assets;
- testes com crianças quando aplicável.

### Gate G6 — Supervisão final

- matriz completa testada;
- falhas, não testados e inferências separados;
- nenhuma crítica acionável remanescente;
- push confirmado antes de encerrar o ciclo.

## 15. Matriz mínima de testes futura

### Pedagogia e domínio

- todas as atividades e progressões internas das cinco etapas;
- itens praticados e itens inéditos;
- três sessões recentes;
- revisão de erros e espaçamento;
- avanço, bloqueio e desbloqueio do responsável;
- abandono e retomada;
- critérios textuais e normalização por habilidade.

### Áudio

- zero requisições TTS em runtime;
- pacote completo offline;
- pacote ausente, incompleto, corrompido ou sem espaço;
- repetição rápida sem sobreposição;
- fallback textual e estados acessíveis;
- pronúncia humana aprovada;
- limites de peso, memória e latência.

### Interface infantil

- primeira utilização por criança;
- encontrar missão, resposta e botão **Ouvir**;
- estados vazio, carregando, erro, acerto, nova tentativa e conclusão;
- teclado, foco, leitor de tela e redução de movimento;
- viewports exigidas e teclado virtual;
- nenhuma dependência exclusiva de cor, gesto ou som;
- teste moderado com pelo menos cinco crianças.

### PWA, privacidade e regressão

- primeira carga online seguida de uso offline;
- atualização sem perda de progresso ou pacotes;
- dados somente locais;
- nenhuma transmissão inesperada;
- migração preserva Matemática;
- Matemática mantém seeds, habilidades, sessões e resultados atuais;
- Chromium obrigatório e outros engines registrados como testados ou não testados.

## 16. Definições ainda pendentes

### Bloqueiam o contrato pedagógico

| ID | Decisão pendente | Recomendação atual |
|---|---|---|
| PEN-005 | Variação regional da voz | Escolher por amostra cega de pronúncia pt-BR; permitir gravação humana |
| PEN-006 | Validação de leitura oral | Não usar reconhecimento automático na V1; decidir se haverá validação opcional por responsável |
| PEN-018 | Efeito no domínio | Registrar prática da habilidade, mas não usar conteúdo temporário sozinho para liberar avanço |

### Bloqueiam identidade e geração visual

| ID | Decisão pendente | Recomendação atual |
|---|---|---|
| PEN-007 | Mascote única | Substituir a coruja pela Capivara Lumon |
| PEN-008 | Nome da capivara | Decidir depois de aprovar o model sheet |
| PEN-009 | Símbolo do medalhão | Manter sem símbolo no primeiro model sheet |
| PEN-010 | Paleta final | Validar a proposta em telas claras, escuras e com contraste |

### Bloqueiam arquitetura ou implementação

| ID | Decisão pendente | Recomendação atual |
|---|---|---|
| PEN-011 | Escopo da primeira fatia vertical | Uma micro-habilidade da Etapa 1 com áudio, seleção, erro, revisão e persistência |
| PEN-012 | Download offline de áudio | Pacote explícito por etapa, com tamanho e progresso para o responsável |
| PEN-013 | Local dos pacotes | Cache Storage separado; avaliar persistência e quota no dispositivo |
| PEN-014 | Criação das skills | Criar após aprovação deste Norte e antes da implementação |
| PEN-015 | Organização no GitHub | Uma Issue central e relatórios canônicos no Git |

## 17. Condição para prosseguir

O próximo passo não é implementar. O próximo passo é revisar este Norte e decidir os itens pendentes prioritários.

Após aprovação do usuário:

1. registrar a aprovação e as correções neste documento;
2. criar a estrutura rastreável do loop de Português;
3. criar e validar as skills;
4. executar o pedagogo como primeiro agente formal;
5. percorrer os gates sem pular aprovações;
6. solicitar autorização separada antes de qualquer implementação ou geração de assets finais.

Nenhum agente pode interpretar a aprovação deste documento, por si só, como autorização para alterar o produto.
