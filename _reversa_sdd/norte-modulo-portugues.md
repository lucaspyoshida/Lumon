# Norte do Lumon — módulo de Português e operação multiagente

> **Estado:** PLANEJAMENTO CONSOLIDADO — IMPLEMENTAÇÃO NÃO AUTORIZADA
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

Enquanto a implementação permanecer **NÃO AUTORIZADA**:

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
| USR-018 | Sessões temáticas registrarão prática e dificuldades, mas não liberarão avanço sozinhas; domínio exige verificação com itens aprovados do corpus Lumon. | APROVADA |
| USR-019 | Haverá uma voz principal pt-BR escolhida por teste auditivo cego, com revisão humana obrigatória e gravação humana quando o TTS não for didaticamente correto. | APROVADA |
| USR-020 | Autonomia de uma criança pré-leitora é fundamento não negociável: o fluxo infantil não pode depender de leitura nem de ajuda operacional adulta. | APROVADA |
| USR-021 | Leitura oral usará cartão de autoavaliação infantil com botões visuais; swipe será apenas atalho e a autoavaliação não comprovará domínio sozinha. | APROVADA |
| USR-022 | A Capivara será a mascote única do Lumon, substituindo a coruja em toda a experiência. | APROVADA |
| USR-023 | A mascote será chamada simplesmente de **Capivara**, sem nome próprio. | APROVADA |
| USR-024 | O agente de design decidirá medalhão, paleta final, poses e escolhas visuais dentro dos critérios infantis, de consistência, acessibilidade e validação. | APROVADA |
| USR-025 | Animações simples em CSS estão autorizadas para tornar a experiência mais atraente, desde que sejam leves, responsivas e respeitem redução de movimento. | APROVADA |
| USR-026 | Responsividade é requisito universal: todas as telas, estados, atividades, assets e orientações devem funcionar nas dimensões exigidas. | APROVADA |
| USR-027 | A primeira fatia vertical será uma atividade completa da Etapa 1 com palavra, imagem, som, áudio por toque, seleção, digitação, feedback da Capivara, revisão, persistência e offline. | APROVADA |
| USR-028 | O supervisor controla o avanço entre gates, aprova, reprova, pede retrabalho ou encerra quando o objetivo estiver comprovadamente atingido; supervisor não altera o produto. | APROVADA |
| USR-029 | Agentes usarão comunicação padronizada por estado, entrada, handoff, evidências, critérios de aceite e próximo agente autorizado. | APROVADA |
| USR-030 | O orquestrador rodará a cada 10 minutos como fallback de despacho, com um agente ativo por vez e proteções contra duplicidade. | APROVADA |
| USR-031 | O pacote de áudio da Etapa 1 será preparado na configuração inicial do responsável; etapas seguintes serão baixadas/preparadas antes do primeiro uso, sem baixar toda a biblioteca de uma vez. | APROVADA |
| USR-032 | Pacotes temáticos futuros terão validade de 7 dias, poderão ser apagados antes ou renovados explicitamente pelo responsável por mais 7 dias. | APROVADA |
| USR-033 | Skills especialistas serão criadas e validadas depois deste Norte consolidado e antes de qualquer implementação ou orquestração formal. | APROVADA |
| USR-034 | A primeira versão terá somente um perfil/criança local; múltiplos perfis ficam adiados para a fase Firebase/sincronização. | APROVADA |
| USR-035 | A Área do Responsável terá acesso por pressionar e segurar por 3 segundos; ações críticas exigem confirmação adulta separada. | APROVADA |
| USR-036 | O redesign infantil com Capivara, cores, animações leves, responsividade e autonomia pré-leitora vale para todo o app, incluindo Matemática e Português. | APROVADA |
| USR-037 | O áudio das atividades será reproduzido por clique/toque explícito em botão grande de ouvir; autoplay não será requisito nem dependência funcional. | APROVADA |

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

Validade definida:

- o pacote temático futuro vale por 7 dias;
- o responsável pode apagá-lo antes do prazo;
- o responsável pode renová-lo explicitamente por mais 7 dias;
- sem renovação, o pacote é descartado automaticamente;
- o descarte do pacote não apaga o histórico sintético de prática, dificuldades e origem dos resultados.

Fase e provisionamento arquitetural definidos:

- a primeira versão entrega somente o corpus Lumon aprovado e offline;
- a busca temática online será implementada em uma segunda fase;
- conteúdo editorial e pacote temporário deverão obedecer ao mesmo contrato básico de item e sessão;
- cada pacote declarará origem (`lumon` ou `tematico`), versão, tema, validade e estado de aprovação;
- a montagem de sessões dependerá de uma fonte de conteúdo abstrata, não de arquivos ou API específicos;
- um futuro provedor temático poderá ser conectado sem modificar progressão, renderizadores ou persistência principal;
- a funcionalidade futura deverá entrar por configuração explícita e permanecer ausente/desativada até estar completa e testada;
- não adicionar na primeira fase endpoints, chaves, SDK, chamadas de rede, botões inativos ou implementação parcial do provedor online.

Efeito no progresso definido:

- acertos, erros, abandono e habilidades praticadas em sessão temática podem alimentar o histórico local;
- resultados temáticos podem recomendar revisão e identificar dificuldade;
- nenhuma quantidade de sessões temáticas, isoladamente, marca uma habilidade como dominada;
- depois de bom desempenho temático, o sistema oferece verificação com itens inéditos do corpus Lumon;
- somente a verificação aprovada participa do desbloqueio automático;
- o histórico identifica claramente a origem dos resultados para auditoria e futura calibração.

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

### Leitura oral autônoma

A primeira versão não usará reconhecimento automático de fala nem validação obrigatória do responsável.

Fluxo aprovado:

1. mostrar palavra ou frase em um cartão, com apoio visual quando pedagogicamente adequado;
2. a capivara demonstra visualmente que é hora de falar;
3. a criança tenta ler em voz alta;
4. apresentar dois botões grandes, visuais e com rótulo falado ao tocar ou focar:
   - **Li sozinho**, com símbolo positivo e cor verde;
   - **Quero praticar**, com símbolo de repetir e cor âmbar;
5. permitir swipe para direita ou esquerda somente como atalho equivalente;
6. mostrar microcelebração da capivara em **Li sozinho**;
7. mostrar incentivo e disponibilidade de ajuda em **Quero praticar**, sem tristeza, culpa, reprovação ou punição;
8. liberar **Ouvir** depois da tentativa para a criança comparar a leitura;
9. reapresentar itens marcados para prática em sessões futuras.

Regras:

- os botões permanecem visíveis e utilizáveis por toque e teclado;
- cor nunca é o único diferenciador;
- setas e animação demonstram o gesto na primeira ocorrência;
- redução de movimento usa demonstração estática;
- autoavaliação registra confiança e orienta revisão;
- autoavaliação positiva isolada nunca marca domínio nem desbloqueia habilidade;
- domínio continua exigindo atividades objetivas e itens de transferência do corpus Lumon.

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

Política de voz aprovada:

- selecionar uma única voz principal pt-BR por comparação cega;
- avaliar clareza, naturalidade, acolhimento, ritmo e inteligibilidade para crianças de 4 a 8 anos;
- não escolher fornecedor ou voz apenas pelo menor custo;
- usar o mesmo perfil de voz e parâmetros em todo o lote para evitar variação de identidade;
- exigir revisão humana antes de publicar qualquer ativo;
- registrar provedor, voz, parâmetros, texto, versão, revisor e estado de aprovação;
- substituir por gravação humana letras, fonemas, sílabas ou palavras cuja pronúncia sintética não seja pedagogicamente adequada;
- nova voz principal exige decisão registrada e nova validação de regressão auditiva.

Não usar reconhecimento de fala como critério de domínio na primeira versão.

### 7.3 Reprodução por toque explícito

O aplicativo não dependerá de reprodução automática de áudio. Navegadores e PWAs podem bloquear autoplay sem gesto do usuário, especialmente em mobile; por isso, autoplay não é critério de aceite.

Regra aprovada:

- cada atividade que usa áudio terá um botão **Ouvir** grande, óbvio e repetível;
- o primeiro gesto esperado da criança pode ser tocar em **Ouvir**;
- a Capivara pode apontar, demonstrar ou animar discretamente esse gesto;
- o botão deverá funcionar por toque, mouse e teclado;
- nenhum requisito crítico depende de áudio tocar sozinho;
- quando ouvir for a habilidade avaliada, a indisponibilidade do áudio deverá ser tratada como estado explícito, não como falha silenciosa;
- redução de movimento substitui animação por indicação visual estática.

### 7.4 Formato, cache e desempenho propostos

- MP3 mono, 24 kHz, 32 kbps; 40 kbps somente se teste auditivo justificar;
- gerar de uma fonte sem compressão e comprimir uma única vez;
- não incluir áudio como base64 no JavaScript;
- um único `HTMLAudioElement`, sem reproduções sobrepostas;
- carregar o item atual e, no máximo, o próximo;
- cache de áudio separado do shell da PWA;
- pacotes por etapa, baixados sob demanda;
- pacote da Etapa 1 preparado na configuração inicial da Área do Responsável;
- pacote de cada etapa seguinte baixado ou preparado antes do primeiro uso da etapa;
- não baixar toda a biblioteca de áudio na primeira inicialização;
- marcar pacote como offline somente depois de validar todos os arquivos;
- alternativa textual ou visual quando o áudio não for essencial;
- quando áudio for a habilidade avaliada, informar claramente a indisponibilidade do pacote em vez de fingir funcionamento completo.

Decisões de implementação delegadas ao engenheiro:

- uso exato de Cache Storage, IndexedDB auxiliar ou manifesto de arquivos;
- hashes, validação atômica, recuperação de pacote corrompido e tratamento de quota;
- formato final do manifesto de áudio;
- estratégia de atualização de pacote sem quebrar sessão offline.

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

- haverá somente um perfil/criança local;
- perfis, sessões, domínio, revisão, preferências e progresso ficam somente no dispositivo;
- não existe conta online, login, sincronização, banco remoto ou transmissão de progresso;
- o aplicativo continua utilizável offline;
- exportação e importação local podem oferecer portabilidade sem servidor.

Múltiplos perfis ficam fora da primeira versão. Eles serão reavaliados somente na fase Firebase/sincronização, quando também existir uma decisão específica de produto, privacidade, consentimento e segurança.

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

O redesign infantil é global. Ele vale para todo o app, incluindo Matemática, Português, tela inicial, troca de matéria, trilhas, sessões, feedback, telas de erro, estados vazios, conclusão, Área do Responsável e PWA. A criança não deve sentir que entrou em produtos diferentes ao alternar matérias.

### 9.2 Direção proposta

- projetar primeiro para a criança que ainda não sabe ler;
- uma ação principal inequívoca por tela;
- tela inicial com próxima missão dominante;
- trilha simples de cinco marcos, sem expor dezenas de habilidades simultaneamente;
- atividade com uma tarefa por tela;
- instrução curta, falada e repetível pelo botão **Ouvir**;
- imagem ou demonstração visual do que deve ser feito;
- setas contextuais apontando a ação ou o destino, sem uso meramente decorativo;
- capivara podendo demonstrar o gesto ou a ação esperada;
- nenhuma instrução crítica apresentada somente como texto;
- opções grandes e legíveis;
- apoio visual somente quando tiver função pedagógica ou emocional clara;
- acerto com microcelebração curta;
- erro com pista e nova tentativa, nunca punição;
- conclusão com conquista e próximo passo;
- área do responsável separada por acesso adulto e visual neutro;
- animações simples em CSS podem ser usadas para orientar gesto, chamar atenção e celebrar, desde que leves, sem travamento e com alternativa por `prefers-reduced-motion`;
- nenhuma animação pode ser indispensável para compreender a tarefa;
- todos os elementos precisam ser responsivos por padrão, sem exceção por componente, estado ou matéria.

Contrato de autonomia pré-leitora:

1. ao entrar pela primeira vez em um tipo de atividade, apresentar demonstração curta com imagem, seta e fala;
2. mostrar somente a ação necessária naquele momento;
3. manter **Ouvir novamente** sempre disponível e fácil de reconhecer;
4. usar a mesma imagem, posição e comportamento para ações equivalentes;
5. oferecer botões visíveis mesmo quando houver swipe, arraste ou outro gesto;
6. confirmar visualmente cada toque em até 100 ms;
7. explicar erro por pista visual e nova demonstração, não por texto longo;
8. não exigir que um adulto leia instruções, valide cada resposta ou conduza a navegação;
9. separar configurações e explicações adultas do ambiente infantil;
10. em redução de movimento, substituir animação demonstrativa por sequência estática igualmente compreensível.

Área do Responsável:

- acesso por pressionar e segurar por 3 segundos em controle discreto;
- sem conta, login ou PIN obrigatório na primeira versão;
- a barreira evita entrada acidental da criança, mas não é mecanismo de segurança forte;
- apagar progresso, gerenciar pacotes, preparar tema futuro, importar/exportar dados e ações equivalentes exigem confirmação adulta separada;
- nenhuma ação destrutiva pode ser acionada por toque simples;
- o visual dessa área pode ser mais neutro e informativo, sem perder consistência com a identidade do app.

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
- animações CSS limitadas a funções de orientação, feedback ou encanto infantil;
- interface responde visualmente ao toque em menos de 100 ms;
- transições de até 250 ms;
- shell inicial, sem áudio, com até 500 KB transferidos comprimidos;
- nenhum asset visual individual embarcado acima de 150 KB;
- validação em 360×640, 390×844, 768×1024, 1280×720 e paisagem relevante;
- teste moderado com pelo menos cinco crianças do público;
- incluir crianças pré-leitoras no teste moderado;
- meta inicial: ao menos 80% inicia a primeira missão, entende a ação, responde e encontra **Ouvir** sem instrução operacional adulta;
- zero bloqueios críticos no teste infantil.

## 10. Identidade visual — Capivara Lumon

### 10.1 Decisões e proposta

Está aprovado que a Capivara será a mascote única do Lumon, substituindo a coruja anterior em todo o app. A mascote será chamada simplesmente de **Capivara**, sem nome próprio.

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

A paleta final, o uso do medalhão, acessórios e variações por matéria são decisões do agente de design/artista, validadas pelo supervisor contra contraste, consistência, atratividade infantil, responsividade e ausência de dependência exclusiva de cor. Essas escolhas não precisam voltar ao usuário salvo se mudarem a identidade central aprovada.

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
- validação do design e aprovação do supervisor contra este Norte;
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

Skills aprovadas para criação e validação após este Norte consolidado, antes de qualquer implementação ou orquestração formal:

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

A criação das skills não autoriza alteração do produto. Cada skill deverá ser validada como instrução de processo antes de ser usada por um agente formal.

## 12. Ordem de execução dos agentes

Somente um agente poderá estar em execução por vez.

Estados obrigatórios:

- `PRONTO`;
- `EM_EXECUCAO`;
- `EM_REVISAO`;
- `APROVADO`;
- `RETRABALHO`;
- `BLOQUEADO`;
- `AGUARDA_USUARIO`;
- `CONCLUIDO`.

Cada ativação de agente deverá registrar:

- agente e skill;
- objetivo;
- commit de entrada;
- entradas consultadas;
- escopo permitido;
- entregáveis;
- critérios de aceite;
- proibições;
- próximo gate.

Cada handoff deverá registrar:

- agente executor;
- `run_id`;
- commit de entrada e saída;
- trabalho feito;
- artefatos;
- decisões aplicadas;
- evidências;
- testes;
- falhas;
- itens não testados;
- pendências;
- riscos;
- recomendação de próximo agente.

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

Primeira fatia vertical aprovada:

- uma atividade completa da Etapa 1;
- palavra, imagem e som;
- áudio por toque explícito;
- seleção;
- digitação;
- feedback da Capivara;
- revisão de erro;
- persistência local;
- funcionamento offline;
- evidências suficientes para o supervisor bloquear ou liberar o avanço.

O supervisor deverá revisar entre gates e decidir avanço, retrabalho, bloqueio ou encerramento. Ele não altera o produto nem suaviza critério para manter cadência.

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

### 13.1 Orquestração e antirrepetição

Haverá um único orquestrador. Ele verificará o estado a cada 10 minutos como fallback de despacho. Esse intervalo é frequência de verificação, não limite de duração da tarefa.

O próximo agente também poderá ser acionado imediatamente após handoff publicado quando o ambiente suportar isso, mas o tick de 10 minutos continuará existindo como recuperação.

Proteções obrigatórias:

- `max_concurrency=1`;
- lock atômico global antes de qualquer spawn ou alteração de estado;
- claim de estado `PRONTO -> EM_EXECUCAO` antes de chamar o agente;
- `run_id` e chave de idempotência por execução;
- heartbeat durante execução;
- lease operacional de até 50 minutos;
- lock com mais de 55 minutos só pode ser tratado como possivelmente órfão depois de checar ausência de processo ativo;
- tick que encontra `EM_EXECUCAO` com heartbeat válido encerra sem spawn;
- reinício procura handoff ou commit do mesmo `run_id` antes de repetir;
- conflito remoto, falha de publicação do claim ou estado divergente interrompe o despacho;
- em GitHub Actions, usar `concurrency` com `cancel-in-progress: false`.

Ticks sem transição real não devem gerar commit, comentário ou ruído. Só artefato novo, transição de estado ou bloqueio relevante gera rastreabilidade.

### 13.2 Registro de decisão

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

### 13.3 Handoff obrigatório

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

## 16. Decisões resolvidas e perguntas futuras

Não há pendência essencial do usuário para consolidar este Norte. As pendências antigas foram resolvidas por decisão explícita do usuário ou por decisão de supervisor/especialista dentro do escopo aprovado.

### 16.1 Pendências antigas resolvidas

| ID anterior | Resolução |
|---|---|
| PEN-019 | Pacotes temáticos futuros valem 7 dias, podem ser apagados antes e renovados explicitamente por mais 7 dias. |
| PEN-007 | A Capivara é a mascote única e substitui a coruja. |
| PEN-008 | A mascote chama-se **Capivara**, sem nome próprio. |
| PEN-009 | Medalhão, símbolo, acessórios e variações ficam sob responsabilidade do design/artista, com validação do supervisor. |
| PEN-010 | Paleta final fica sob responsabilidade do design/artista, validada contra contraste, consistência e resposta infantil. |
| PEN-011 | A primeira fatia vertical é uma atividade completa da Etapa 1 com palavra, imagem, som, áudio, seleção, digitação, feedback, revisão, persistência e offline. |
| PEN-012 | Áudio será organizado por pacote de etapa; Etapa 1 preparada na configuração inicial e demais etapas antes do primeiro uso. |
| PEN-013 | Cache, hashes, quota e recuperação de pacote são decisões do engenheiro dentro dos critérios deste Norte. |
| PEN-014 | Skills serão criadas e validadas após este Norte consolidado e antes de qualquer implementação. |
| PEN-015 | Git permanece fonte canônica; GitHub funciona como painel de coordenação por Issue central e links para relatórios. |

### 16.2 Decisões assumidas pelo supervisor

| Tema | Decisão do supervisor |
|---|---|
| Perguntas ao usuário | Não perguntar detalhes operacionais óbvios. Voltar ao usuário somente se houver mudança de produto, privacidade, custo, risco, experiência central, escopo ou uso de dados/rede. |
| Model sheet | Design/artista propõe; supervisor aprova contra este Norte; usuário pode revisar por exceção, mas a aprovação operacional é gate do fluxo. |
| Teste com crianças | Supervisor define protocolo objetivo, incluindo pré-leitores, meta mínima de autonomia e registro de bloqueios. |
| Responsividade | Universal e bloqueante em todo componente e estado, não apenas nas telas principais. |
| Acessibilidade | Bloqueante para avanço; cor, som, gesto e movimento nunca podem ser o único canal. |
| Tecnologia de áudio | Engenheiro decide implementação concreta, desde que preserve MP3 estático, offline real, pacote por etapa e ausência de TTS em runtime. |
| Detalhes visuais | Frontend/design e artista decidem detalhes dentro dos critérios infantis; supervisor valida evidência. |

### 16.3 Perguntas futuras condicionais

Estas perguntas só devem voltar ao usuário se a execução propuser mudar a decisão atual:

| Gatilho | Pergunta ao usuário |
|---|---|
| Implementação | Autoriza iniciar implementação do produto? |
| Dados online | Autoriza transmitir algum dado da criança ou sincronizar progresso? |
| Perfis | Quer antecipar múltiplos perfis antes do Firebase? |
| Custo externo | Autoriza serviço pago, assinatura, API ou infraestrutura permanente? |
| Rede em runtime | Autoriza dependência online crítica fora do modo temático futuro? |
| Identidade | Quer trocar a Capivara, nome, tom infantil ou direção visual central? |
| Áudio | Quer trocar áudio por toque por tentativa de autoplay ou reconhecimento de fala? |
| Escopo | Quer adicionar matéria, fase, recurso ou público fora do definido aqui? |

## 17. Condição para prosseguir

O próximo passo não é implementar. Com as decisões atuais, o Norte está consolidado para orientar a criação das skills e a primeira execução formal dos agentes.

Após publicação deste documento consolidado:

1. criar ou atualizar a estrutura rastreável do loop de Português;
2. criar e validar as skills;
3. executar o pedagogo como primeiro agente formal quando houver autorização operacional;
4. percorrer os gates sem pular aprovações;
5. solicitar autorização separada antes de qualquer implementação ou geração de assets finais.

Nenhum agente pode interpretar a aprovação deste documento, por si só, como autorização para alterar o produto.
