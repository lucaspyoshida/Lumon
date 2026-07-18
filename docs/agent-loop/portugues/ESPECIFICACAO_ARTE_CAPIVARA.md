# Especificação documental da arte da Capivara — Gate G3

> **Estado:** proposta documental do artista IA para revisão independente
> **Execução:** `pt-20260718T164034Z-artista-e245f3b`
> **Chave de idempotência:** `G3_EXPERIENCIA_PILOTO_VISUAL:artista_ia:e245f3b2dd6ad3bf84b36496a4942ac06f0ecb1b`
> **Commit de entrada publicado:** `734bc32fd3737d97e1082a9d7a05933fcd47f702`
> **Gate:** `G3_EXPERIENCIA_PILOTO_VISUAL`
> **Implementação e geração de assets finais:** não autorizadas
> **Autoridade:** `_reversa_sdd/norte-modulo-portugues.md`

## 1. Escopo e recomendação

Este documento torna verificável o futuro lote visual da Capivara. Ele especifica model sheet, âncoras, prompts, consistência, momentos de interface, ícones, dimensões, recortes, acessibilidade, proveniência, orçamentos e gates.

Não contém nem autoriza bitmap, vetor, ícone substituto, imagem pedagógica, ilustração de palavra, código, CSS, animação, áudio ou alteração no aplicativo. Também não escolhe ferramenta, fornecedor ou conteúdo editorial final. Os identificadores abaixo são tickets; não são arquivos distribuíveis.

Ordem aplicada:

1. decisões explícitas do usuário e Norte;
2. contrato pedagógico G1 e aprovação;
3. contrato arquitetural G2 e aprovação;
4. plano de engenharia e aprovação com ressalvas;
5. plano de frontend/design e aprovação com ressalvas;
6. esta especificação, somente depois de revisão independente.

Marcas de evidência:

- **FIXO:** decisão já aprovada e não reaberta;
- **PROPOSTA VISUAL:** parâmetro documental aguardando supervisor;
- **TESTADO:** verificação objetiva desta execução;
- **FALHOU:** baseline atual que não atende critério futuro;
- **NAO TESTADO:** requisito sem asset ou prova real;
- **INFERIDO:** hipótese que precisa de imagem, medição ou teste infantil.

**Recomendação:** publicar esta especificação e encaminhá-la ao supervisor com `lumon-supervisao-final`, em `EM_REVISAO` no Gate G3. Mesmo se aprovada, a saída apenas estabiliza o briefing. Produção de imagem continua bloqueada até autorização compatível e novo claim canônico.

## 2. Identidade fixa e limites

### 2.1 Identidade não negociável

- **FIXO:** há uma única mascote: **Capivara**.
- **FIXO:** ela não recebe nome próprio.
- **FIXO:** substitui a coruja em Matemática, Português e superfícies globais.
- **FIXO:** é infantil, acolhedora, brasileira, curiosa e calma.
- **FIXO:** usa ilustração 2D contemporânea de livro infantil, formas arredondadas e textura mínima.
- **FIXO:** não deriva de personagem, estúdio, franquia, app, material didático ou artista existente.
- **FIXO:** Matemática e Português mudam contexto, objeto pequeno e cor de superfície; anatomia não muda.
- **FIXO:** nenhuma expressão comunica culpa, tristeza punitiva, reprovação, medo, perda de energia ou decepção.
- **FIXO:** nenhuma arte inclui texto, pseudoalfabeto, número, logotipo, assinatura ou marca-d'água.

### 2.2 Função antes de decoração

Todo futuro asset terá uma destas funções:

| Função | Definição | Regra de acessibilidade |
|---|---|---|
| `decorative` | acrescenta encanto sem informação necessária | `alt=""`; ignorado por tecnologia assistiva |
| `emotional` | reforça acolhimento já comunicado por outro canal | normalmente decorativo; estado não depende da pose |
| `instructional` | demonstra ação, direção ou gesto | texto alternativo funcional e equivalente estático |
| `pedagogical` | participa do estímulo ou da resposta | aprovação pedagógica, nomeação infantil e alt sem revelar resposta |

Capivara não calcula acerto, domínio ou progressão. Ela reage a eventos semânticos aprovados. Uma pose nunca transforma conteúdo inválido em válido nem oferece pista da resposta.

### 2.3 Proibições específicas

Rejeitar antes de revisão:

- segunda mascote, filhote duplicado ou variação que pareça outra personagem;
- roupa, adereço ou objeto com marca reconhecível;
- emblema de matéria gravado no corpo;
- olhar, pata, brilho ou composição que aponte alternativa pedagógica correta;
- sorriso de deboche, choro, sobrancelha de reprovação ou corpo abatido em erro;
- silhueta humana, bípede permanente ou proporção de brinquedo que elimine leitura de capivara;
- detalhe fino indispensável que desapareça abaixo de 96 px;
- textura pesada, ruído, sombra fotográfica, contorno serrilhado ou halo de transparência;
- reaproveitamento cumulativo de pose gerada como nova âncora;
- prompt com “no estilo de”, nome de artista vivo/morto, estúdio, personagem ou obra protegida.

## 3. Taxonomia e registro dos tickets

### 3.1 Identidade dos lotes

| Lote | Objetivo | Pode ser produzido agora? | Gate seguinte |
|---|---|---:|---|
| `P0a` | model sheet e âncoras anatômicas | não | supervisor aprova âncoras antes de P0b |
| `P0b` | cinco momentos essenciais | não | supervisor valida consistência, função e bytes |
| `P0c` | ícone PWA, favicon e marcador | não | supervisor valida máscaras, leitura e orçamento |

### 3.2 Registro obrigatório por asset futuro

Cada ticket precisa materializar, antes da geração:

- `assetId`, lote, versão e estado editorial;
- tela, componente e evento semântico;
- função `decorative`, `emotional`, `instructional` ou `pedagogical`;
- emoção, pose, gesto e direção permitida;
- matéria `global`, `matematica` ou `portugues`;
- fonte, dimensões de exportação e densidades;
- fundo/transparência, recorte, área segura e espaço negativo;
- texto alternativo ou `alt=""` justificado;
- teto individual, teto do lote e impacto no shell/pacote;
- ID da âncora P0a aprovada;
- ferramenta, modelo, versão, parâmetros e seed;
- prompts positivo/negativo versionados;
- autoria/proveniência, termos/licença e operador;
- revisão visual, técnica, acessível e pedagógica quando aplicável;
- SHA-256, MIME, dimensões e bytes do futuro arquivo;
- decisão do supervisor e commit de aprovação.

Nenhum campo pode ser reconstruído apenas pela memória do operador.

## 4. P0a — model sheet documental

### 4.1 Objetivo do P0a

P0a cria uma fonte única de verdade visual. As vistas frontal e 3/4 aprovadas tornam-se âncoras primárias. Lateral, posterior, poses e expressões servem para verificar a mesma anatomia; não criam novas versões independentes.

O model sheet futuro é referência editorial e não entra automaticamente no shell. O arquivo-fonte lossless pode exceder tetos de distribuição porque não é embarcado, mas qualquer export de revisão compartilhado permanece em até `150.000` bytes.

### 4.2 Sistema proporcional inicial

**PROPOSTA VISUAL:** usar a altura do corpo sem orelhas como unidade `H = 1,00`:

| Elemento | Faixa proposta | Critério de estabilidade |
|---|---:|---|
| comprimento focinho–garupa | `1,48H–1,58H` | silhueta baixa, nunca humanoide |
| altura total com orelhas | `1,08H–1,14H` | orelhas pequenas não viram chifres |
| cabeça visível | `0,48H–0,54H` | integrada ao tronco, sem pescoço longo |
| focinho projetado | `0,22H–0,27H` | arredondado e largo, sem bico/canino |
| olho | `0,045H–0,060H` | dois olhos iguais; sem cílios de marcação de gênero |
| orelha | `0,075H–0,095H` | pequena, redonda, alta e lateral |
| pata visível | `0,18H–0,24H` | curta e simples; alcance não alonga membro |
| medalhão | `0,105H–0,130H` | legível, subordinado ao rosto |
| lenço | faixa de `0,10H–0,15H` | não encobre focinho nem muda silhueta central |

Tolerâncias são envelopes de desenho, não licença para variar cada pose aleatoriamente. Depois de P0a aprovado, a versão registra medidas de referência; divergência acima de 5% exige revisão explícita, não correção informal.

### 4.3 Âncoras anatômicas

| ID | Vista/conteúdo | Obrigatório | Uso futuro |
|---|---|---|---|
| `P0A-01-F` | frontal neutra | sim | simetria, olhos, focinho, lenço e medalhão |
| `P0A-01-Q` | 3/4 neutra, lado visual fixado | sim | âncora principal de poses e ícones |
| `P0A-02-L` | lateral neutra | sim | comprimento, orelhas, patas e garupa |
| `P0A-02-B` | posterior neutra | sim | pelagem, lenço e ausência de detalhe inventado |
| `P0A-02-S` | sentada neutra | sim | compressão do corpo sem virar outra anatomia |
| `P0A-02-U` | em pé/alcance curto | sim | limite de gesto sem postura humana permanente |

**PROPOSTA VISUAL:** lado de 3/4 permanece constante nas âncoras. Espelhamento em runtime só é permitido para pose global sem assimetria semântica; se medalhão, nó do lenço ou gesto tiver direção, o espelhamento precisa de ticket próprio para não inverter significado.

### 4.4 Marcadores constantes

O supervisor futuro compara cada vista por estes marcadores:

1. topo arredondado da cabeça e garupa formam silhueta contínua;
2. focinho largo em tom mais claro, sem contorno de bico;
3. olhos escuros pequenos, calmos e com distância estável;
4. orelhas pequenas, redondas e posicionadas na mesma linha relativa;
5. quatro patas curtas sugeridas quando o corpo inteiro aparece;
6. lenço simples verde-petróleo, sem estampa ou texto;
7. medalhão-luz circular dourado, preso ao lenço, sem letra ou numeral;
8. pelagem sem manchas identificadoras novas entre vistas;
9. textura mínima uniforme, não usada para esconder inconsistência;
10. matéria comunicada fora da anatomia.

### 4.5 Expressões P0a

| ID | Expressão | Olhos | Boca/focinho | Corpo | Rejeitar se |
|---|---|---|---|---|---|
| `EXP-NEUTRA` | calma disponível | abertos, suaves | sorriso mínimo/neutro | apoiado | parecer apática ou sonolenta |
| `EXP-ACOLHER` | convite seguro | contato visual suave | sorriso discreto | peito aberto | braço humano ou euforia |
| `EXP-OUVIR` | atenção curiosa | foco no botão, não resposta | neutro | cabeça levemente inclinada | orelha gigante ou dedo acusatório |
| `EXP-FALAR` | demonstração oral | foco frontal | boca simples aberta | estável | fonema desenhado, texto ou exagero |
| `EXP-ACERTO` | alegria breve | arco suave | sorriso claro | pequena elevação | vitória competitiva ou explosão |
| `EXP-TENTAR` | confiança acolhedora | contato visual | sorriso pequeno | gesto circular curto | pena, decepção ou resposta revelada |
| `EXP-CONCLUIR` | orgulho pelo esforço | brilhantes sem excesso | sorriso sereno | postura aberta | troféu, ranking ou superioridade |

### 4.6 Poses P0a

O model sheet futuro demonstra sem fundo complexo:

- neutra frontal;
- neutra 3/4;
- sentada;
- pequeno alcance de pata;
- apontar para espaço vazio reservado;
- gesto de ouvir;
- gesto de falar;
- microcelebração;
- gesto de repetir/nova tentativa;
- conclusão acolhedora.

Nenhuma pose segura objeto pedagógico final. Livro, forma ou onda sonora, se usados como contexto de teste, são placeholders geométricos sem palavra, letra, número ou resposta.

### 4.7 Lenço e medalhão

**PROPOSTA VISUAL:** manter lenço verde-petróleo como parte constante e medalhão circular dourado como âncora de “luz”. Regras:

- nó e queda do lenço mantêm lado e proporção nas âncoras;
- medalhão não pulsa, pontua, muda de forma ou comunica estado sozinho;
- brilho é discreto e não reduz contraste do contorno;
- medalhão não contém `L`, símbolo matemático, letra, estrela proprietária ou ícone de resposta;
- variação de matéria ocorre em moldura, superfície ou pequeno objeto externo; corpo, lenço e medalhão permanecem reconhecíveis;
- qualquer alternativa de cor precisa manter a identidade e passar revisão WCAG no contexto real.

### 4.8 Paleta inicial

| Função | Valor inicial | Uso e limite |
|---|---|---|
| pelagem principal | `#9A6545` | maior área; não varia por matéria |
| sombra da pelagem | `#70452F` | volume mínimo, sem sombra fotográfica |
| luz da pelagem | `#BC8057` | planos iluminados, não brilho plástico |
| focinho | `#D9AB79` | separação clara da pelagem |
| olhos/contorno essencial | `#2B211D` | legibilidade do rosto |
| lenço | `#1F6F64` | identidade constante |
| medalhão-luz | `#F6C453` | acento; nunca único canal |
| Matemática | `#176B87` | contexto externo à anatomia |
| Português principal | `#8A3D78` | contexto externo à anatomia |
| Português secundária | `#F27B62` | acento com texto escuro quando aplicável |

Esses valores são configuração inicial, não prova de aparência final. Export, textura, antialias e fundo alteram contraste percebido; combinações reais precisam de medição. Não se embute perfil de cor exótico que cause variação entre navegadores; o pipeline futuro registra espaço de cor e exporta de forma consistente.

### 4.9 Quadro e export de revisão P0a

- fonte recomendada: quadrado `2048×2048` ou grade lossless equivalente;
- export de revisão: `1536×1536`, fundo neutro e/ou transparência conforme ticket;
- margem mínima: 10% da tela em todos os lados;
- corpo completo sem corte nas âncoras;
- fundo sem cenário, texto, régua numerada ou elemento proprietário;
- cada vista também pode ser inspecionada isoladamente em 512, 256, 192, 96 e 48 px;
- o model sheet de trabalho não é asset de runtime;
- export distribuído para revisão, se houver, deve ficar em até `150.000` bytes e não entra no shell.

## 5. Prompts para futura geração

### 5.1 Regra de uso

Prompts abaixo são templates documentais. Não devem ser executados nesta etapa. Antes do uso futuro, preencher ticket, modelo/versão, seed, dimensões, orçamento, referências P0a e autorização canônica.

Prompt nunca substitui imagem-âncora. Depois da aprovação P0a, toda geração P0b/P0c referencia diretamente as âncoras aprovadas; não referencia somente uma pose derivada.

### 5.2 Prompt-base P0a futuro

```text
Criar model sheet original de uma única capivara infantil brasileira chamada apenas
Capivara. Ilustração 2D contemporânea de livro infantil, formas arredondadas,
silhueta baixa e estável, focinho largo claro, olhos pequenos e acolhedores,
orelhas pequenas redondas, patas curtas, pelagem marrom quente com textura mínima.
Lenço verde-petróleo constante e medalhão-luz circular dourado sem símbolo.
Mostrar as vistas e expressões definidas no ticket {ASSET_ID}, com anatomia idêntica,
fundo editorial neutro, margem segura {SAFE_AREA}, sem texto. Usar a paleta
versionada {PALETTE_VERSION}. Finalidade: referência editorial, não asset final.
```

### 5.3 Prompt-base P0b futuro

```text
Derivar das âncoras aprovadas {ANCHOR_FRONT_ID}@{VERSION} e
{ANCHOR_3Q_ID}@{VERSION} a mesma Capivara, preservando silhueta, proporções,
focinho, olhos, orelhas, pelagem, lenço e medalhão. Momento {MOMENT_ID};
função {ROLE}; emoção {EMOTION}; pose {POSE}; gesto {GESTURE}; contexto {CONTEXT}.
Reservar {NEGATIVE_SPACE_PERCENT}% de espaço no lado {TARGET_SIDE}; manter rosto,
medalhão e gesto na safe area {SAFE_AREA}. Fundo {BACKGROUND}; transparência
{ALPHA_POLICY}; export futuro {EXPORT_SIZE}. Não indicar resposta pedagógica.
```

### 5.4 Prompt-base P0c futuro

```text
Derivar diretamente da âncora 3/4 aprovada {ANCHOR_3Q_ID}@{VERSION} um recorte
icônico original da mesma Capivara. Preservar focinho, olhos, orelhas, lenço e
medalhão; essenciais dentro do centro seguro especificado em {MASK_SAFE_AREA}.
Leitura clara em {TARGET_SIZES}, fundo e transparência conforme {ICON_POLICY},
sem texto, letra, número, logotipo ou marca-d'água. Não redesenhar anatomia.
```

### 5.5 Negative prompt comum

```text
sem texto, letras, números, pseudoalfabeto, logotipo, assinatura, marca-d'água;
sem personagem conhecido, franquia, estúdio, artista ou estilo imitável;
sem coruja, castor, hamster, urso, hipopótamo ou segunda mascote;
sem anatomia humana, pescoço longo, patas longas, mãos humanas, cinco dedos;
sem olhos gigantes, orelhas grandes, focinho pontudo, dentes ameaçadores;
sem roupa de marca, troféu, ranking, medalha competitiva;
sem choro, culpa, reprovação, medo, vergonha, sarcasmo ou derrota;
sem fotorrealismo, 3D plástico, render cinematográfico, sombra pesada;
sem cenário complexo, gradiente banding, ruído, halo, serrilhado ou recorte sujo;
sem gesto, brilho, olhar ou objeto que entregue resposta pedagógica;
sem alteração de pelagem, lenço, medalhão, silhueta ou proporções da âncora.
```

### 5.6 Parâmetros registráveis

Na futura execução, registrar sem exceção:

```yaml
generation:
  provider: null
  tool: null
  model: null
  model_version: null
  interface_version: null
  prompt_id: null
  prompt_version: null
  negative_prompt_version: null
  seed: null
  sampler: null
  steps: null
  guidance: null
  width: null
  height: null
  reference_assets: []
  reference_strength: null
  generated_at: null
  operator: null
  terms_snapshot: null
```

`null` significa não produzido nesta execução. A ferramenta futura precisa permitir procedência suficiente; se versão ou seed não puder ser registrada, o lote não é reprodutível e deve ser marcado como risco explícito, nunca silenciosamente aprovado.

## 6. Matriz de consistência e rejeição

### 6.1 Comparação obrigatória

Cada candidato futuro é comparado lado a lado com `P0A-01-F` e `P0A-01-Q`:

| Dimensão | Critério | Falha bloqueante |
|---|---|---|
| silhueta | comprimento/altura dentro do envelope P0a | corpo alto, humanoide ou espécie ambígua |
| cabeça/focinho | forma, projeção e cor constantes | bico, nariz novo, mandíbula/dentes dominantes |
| olhos | tamanho, distância e posição estáveis | olhos gigantes ou assimétricos sem gesto |
| orelhas | tamanho/posição estáveis | orelha nova, grande ou pontuda |
| patas | curtas, simples e coerentes | mão humana, membro alongado, número incoerente |
| pelagem | três tons e textura mínima | manchas/gradiente que criam nova identidade |
| lenço | cor, lado, nó e proporção constantes | ausência, estampa, texto ou troca não autorizada |
| medalhão | circular, dourado, subordinado | símbolo, letra, número ou estado exclusivo |
| expressão | corresponde ao momento sem punição | culpa, reprovação, medo ou resposta revelada |
| pose | gesto claro e anatomicamente possível | direção ambígua ou corpo deformado |
| contexto | matéria fora da anatomia | duas versões da mascote por matéria |
| recorte | gesto/rosto dentro da safe area | corte de orelha, focinho, pata funcional ou medalhão |
| transparência | borda limpa nos fundos de teste | halo, pixels opacos soltos ou serrilhado visível |
| tamanho reduzido | intenção legível em tamanhos-alvo | depender de detalhe que desaparece |
| proveniência | registro completo e licença compatível | modelo/versão/seed/licença ausentes |

### 6.2 Método de decisão

**PROPOSTA VISUAL:** dois revisores fazem inspeção cega quanto à seed e marcam cada dimensão como `CONFORME`, `DIVERGE` ou `NAO AVALIAVEL`.

- qualquer divergência em espécie, silhueta, focinho, olhos, orelhas, lenço, medalhão, emoção segura, licença ou orçamento rejeita o candidato;
- `NAO AVALIAVEL` em item essencial impede aprovação, não conta como conforme;
- não se corrige deriva aceitando a pose divergente como nova referência;
- edição manual futura volta a ser derivada das âncoras e recebe nova versão/proveniência;
- seleção por preferência estética ocorre somente entre candidatos que passaram nos critérios bloqueantes.

### 6.3 Versionamento da personagem

- versão `capivara-model-v1` nasce somente após P0a aprovado;
- P0b/P0c registram essa versão e não alteram anatomia;
- correção de export sem mudança visual incrementa `assetVersion`;
- mudança de anatomia, paleta essencial, lenço ou medalhão exige proposta `capivara-model-v2`, decisão deliberada e regressão de todo lote;
- candidato rejeitado permanece em registro editorial, nunca vira âncora ou asset ativo.

## 7. P0b — cinco momentos essenciais

### 7.1 Orçamento agregado

`KB` nesta seção significa bytes decimais. O lote P0b distribuído soma no máximo `300.000` bytes. Tetos individuais não podem ser somados além desse agregado.

| ID | Momento | Evento/componente | Função | Teto |
|---|---|---|---|---:|
| `P0B-01` | boas-vindas | `ChildHome` / missão disponível | emocional/decorativa | `70.000` bytes |
| `P0B-02` | ouvir | `audio.requested` / `AudioButton` | instrucional | `50.000` bytes |
| `P0B-03` | acerto | `feedback.correct` | emocional/decorativa | `45.000` bytes |
| `P0B-04` | nova tentativa | `feedback.retry` / `feedback.hint` | emocional/instrucional | `45.000` bytes |
| `P0B-05` | conclusão | `session.completed` | emocional/decorativa | `90.000` bytes |
| **Total máximo** |  |  |  | **`300.000` bytes** |

O pipeline deve medir a soma real. Economia em um asset pode ser usada por outro sem ultrapassar seu teto individual de `150.000` bytes e sem elevar o lote acima de `300.000` bytes.

### 7.2 `P0B-01` — boas-vindas

- emoção: calma, curiosa, pronta para acompanhar;
- pose: corpo inteiro ou 3/4 sentada, contato visual suave;
- gesto: pequena abertura de pata, sem apontar alternativa;
- export futuro: base `512×512`, transparente; recorte seguro em 256 e 192;
- safe area: 10% geral; rosto/medalhão dentro do centro de 70%;
- uso: global, compartilhado entre matérias;
- alt: decorativo (`alt=""`) se título/CTA já comunica a missão;
- responsividade: pode recuar para meio corpo em paisagem, nunca esconder ação principal;
- shell: pode ocupar a reserva de `70.000` bytes somente uma vez.

### 7.3 `P0B-02` — ouvir

- emoção: atenção e curiosidade, não surpresa;
- pose: 3/4 derivada, cabeça levemente inclinada;
- gesto: pata aponta para espaço vazio reservado ao `AudioButton`;
- espaço negativo: 35% do quadro no lado do alvo;
- export futuro: `512×512` com variante de recorte `256×256` derivada do mesmo fonte;
- safe area: rosto, medalhão e pata funcional dentro de 80% centrais;
- alt instrucional: `Capivara aponta para o botão Ouvir` quando a demonstração depender da pose;
- equivalente reduced-motion: quadro estático com botão visível e fala, sem exigir animação;
- rejeitar se olhos/pata apontarem opção de resposta.

### 7.4 `P0B-03` — acerto

- emoção: alegria breve e serena;
- pose: meio corpo, leve elevação das patas, sem salto competitivo;
- gesto: celebra esforço, não vitória sobre outra criança;
- export futuro: `512×512`, transparente, recorte seguro em 256;
- alt: decorativo se símbolo/texto/fala já anunciam acerto;
- movimento futuro: CSS pode aplicar microtransição de até 250 ms; asset permanece estático;
- rejeitar confete textual, troféu, medalha competitiva ou euforia que distraia.

### 7.5 `P0B-04` — nova tentativa

- emoção: confiança acolhedora;
- pose: meio corpo, contato visual e postura aberta;
- gesto: movimento circular simples de repetir, sem mostrar resposta;
- export futuro: `512×512`, transparente, recorte seguro em 256;
- alt funcional somente se o gesto for parte da pista: `Capivara convida a tentar de novo`;
- canal equivalente: símbolo repetir + fala curta + CTA;
- rejeitar tristeza, pena, sobrancelha de reprovação, ombros caídos ou dedo apontando erro.

### 7.6 `P0B-05` — conclusão

- emoção: orgulho pelo esforço e curiosidade pelo próximo passo;
- pose: hero 3/4, postura aberta, medalhão discreto;
- gesto: convida a voltar ao caminho;
- fonte futura: `1024×768`; export responsivo dentro do mesmo asset/recorte aprovado;
- safe area: rosto, medalhão e gesto no centro de 60%; 20% de margem lateral para recortes;
- alt: decorativo se o componente já comunica conclusão e ação;
- recortes testados: 360×640, 390×844, 768×1024, 1280×720 e 844×390;
- rejeitar ranking, velocidade, número de acertos, troféu ou recompensa externa dominante.

### 7.7 Compartilhamento por matéria

Os cinco assets são globais. Matemática e Português usam moldura, fundo e objeto contextual separado por CSS/componente. Variante raster por matéria só pode existir com justificativa de função, orçamento recalculado e aprovação; preferência estética não basta.

## 8. P0c — ícone PWA, favicon e marcador

### 8.1 Princípio de derivação

P0c deriva diretamente da âncora 3/4 aprovada, não de `P0B-01` ou de outro ícone reduzido. Todas as saídas preservam centro, focinho, olhos, orelhas, lenço e medalhão. Redução não redesenha a personagem; simplificação técnica precisa manter identidade.

### 8.2 Tickets e budgets

| ID | Saída futura | Dimensão | Fundo/alpha | Área segura | Teto |
|---|---|---:|---|---|---:|
| `P0C-01` | ícone PWA 512 | `512×512` | PNG conforme manifesto | essenciais no centro 60%; margem 20% | `80.000` bytes |
| `P0C-02` | ícone PWA 192 | `192×192` | derivado do 512 | mesmo centro relativo | `25.000` bytes |
| `P0C-03A` | favicon | `48×48` | formato compatível futuro | rosto/medalhão legíveis | `7.000` bytes |
| `P0C-03B` | atalho | `96×96` | derivado da mesma âncora | centro conservador | `3.000` bytes |
| `P0C-04` | marcador de trilha | `256×256` | transparente | margem 12% | `25.000` bytes |
| **Total P0c máximo** |  |  |  |  | **`140.000` bytes** |

`P0C-01` recomendado em até `80.000` bytes é mais estrito que o teto individual geral de `150.000` bytes. O futuro ícone 512 atual só pode ser substituído após aprovação, teste de máscaras e autorização; este documento não o altera.

### 8.3 Testes de ícone futuros

- máscaras circular, squircle, rounded square e corte Android maskable;
- fundo claro, escuro e cor de sistema sem halo;
- leitura a 512, 192, 96, 48, 32 e 16 px;
- focinho, olhos, orelhas e medalhão permanecem distinguíveis;
- nenhuma letra, nome do app ou estado dentro da imagem;
- arquivo, manifesto e service worker apontam para uma versão coerente;
- hashes, MIME, dimensões e bytes passam `budget:check`;
- captura instalada em Android/desktop; iOS/Safari marcado testado ou `NAO TESTADO`.

### 8.4 Marcador de trilha

- pose neutra/luz, sem indicar concluído, bloqueado ou revisão;
- estado da trilha vem do componente por forma, rótulo e acessibilidade;
- `alt=""` porque o nó fornece nome/estado acessível;
- legível em 48 e 64 px; detalhe fino não é essencial;
- não duplica asset por matéria.

## 9. Exportação, transparência e recortes

### 9.1 Fonte e formatos

- fonte de trabalho futura: lossless, preservada fora do bundle;
- poses com transparência: comparar PNG otimizado e WebP lossless/adequado em navegadores-alvo; escolher por qualidade, compatibilidade e bytes registrados;
- ícones PWA: PNG quando exigido pelo manifesto/plataforma;
- não embutir base64, data URL, perfil excessivo, thumbnail, metadado privado ou camada editorial no arquivo distribuído;
- uma única compressão final a partir do master; reedição volta ao master;
- cor consistente, alpha limpo e ausência de halo em fundos `#FFF9F1`, branco, Matemática e Português.

Nenhum formato é aprovado por estimativa. O futuro pipeline compara aparência pixel a pixel/visualmente e peso real.

### 9.2 Safe areas comuns

| Uso | Área segura mínima | Espaço negativo |
|---|---|---|
| pose padrão | 10% em cada borda | conforme componente |
| pose de apontar | gesto dentro de 65% do quadro | 35% no lado do alvo |
| hero | elementos essenciais no centro 60% | 20% lateral para recorte |
| ícone maskable | essenciais no centro 60% | margem conservadora 20% |
| marcador | 12% em cada borda | não aplicável |

Orelhas, focinho, medalhão e pata instrucional não podem cair fora da área segura. Corte decorativo do dorso pode ocorrer em viewport pequeno somente se rosto/gesto e CTA permanecerem claros.

### 9.3 Matriz responsiva de validação

| Viewport | Uso esperado | Critério do asset |
|---|---|---|
| `360×640` | coluna infantil | Capivara não empurra missão/CTA abaixo da área útil crítica |
| `390×844` | coluna com pose maior | corpo/rosto sem corte acidental |
| `768×1024` | duas áreas possíveis | mantém escala e espaço negativo sem dominar tarefa |
| `1280×720` | largura limitada | não estica nem vira hero horizontal excessivo |
| `844×390` | paisagem compacta | recorte seguro; instrução e resposta continuam visíveis |

Também validar zoom 200%, texto ampliado, safe-area insets e teclado virtual. Imagem nunca bloqueia rolagem nem recebe foco se decorativa.

## 10. Acessibilidade e função

### 10.1 Política de alt

- decorativa/redundante: `alt=""` e sem papel interativo;
- emocional: `alt=""` quando mensagem acessível já expressa o estado;
- instrucional: frase funcional curta, descrevendo ação sem depender de direção visual vaga;
- pedagógica: descrição identifica o conceito necessário sem revelar a alternativa correta; exige pedagogo;
- ícone PWA: nome acessível vem do manifesto/app, não de texto dentro da arte;
- marcador: estado acessível vem de `StageNode`, não da Capivara.

Texto alternativo pertence ao ticket e ao conteúdo; não deve ser inferido automaticamente a partir do prompt.

### 10.2 Canais equivalentes

- Capivara apontando para **Ouvir** acompanha botão grande, foco, nome acessível e fala;
- acerto/nova tentativa/conclusão possuem símbolo, texto/fala e estado do componente;
- cor, brilho do medalhão e animação nunca são canal único;
- `prefers-reduced-motion` preserva quadro estático equivalente;
- imagem não pisca, pulsa continuamente ou muda de escala para capturar atenção;
- contraste do componente e foco é responsabilidade do frontend, mas o asset não pode obscurecê-los.

### 10.3 Conteúdo pedagógico futuro

Esta especificação não escolhe palavra, objeto ou imagem de resposta. Qualquer ilustração pedagógica futura precisa:

- item e habilidade aprovados do corpus Lumon;
- conceito, exemplar e grupo de generalização identificados;
- autoria/licença e proveniência;
- nomeação espontânea com crianças/revisores;
- duas revisões quando houver ambiguidade potencial;
- ausência de pista por cor, tamanho, posição, enquadramento ou detalhe;
- pelo menos um exemplar alternativo quando a transferência exigir;
- aprovação pedagógica antes de pacote ativo.

Capivara não ocupa opção de resposta e não segura o objeto correto em atividades avaliativas.

## 11. Proveniência, licença e auditoria

### 11.1 Registro mínimo

Cada futuro candidato e export registra:

- autor/operador responsável;
- ferramenta, fornecedor, modelo e versões exatas;
- prompt/negative prompt e versões;
- seed e parâmetros disponíveis;
- IDs/hashes das âncoras de referência;
- data/hora UTC;
- termos/licença aplicáveis no momento da geração;
- origem de qualquer referência visual;
- histórico de edição e ferramenta de pós-processamento;
- fonte lossless e SHA-256;
- export, MIME, dimensões, alpha, espaço de cor, bytes e SHA-256;
- revisores visual, técnico, acessível, legal/licença e pedagógico quando aplicável;
- decisão e commit do supervisor.

### 11.2 Licença e originalidade

- referências só podem ser próprias, aprovadas ou licenciadas para o uso;
- não usar imagem encontrada na internet como referência silenciosa;
- não pedir imitação de artista/estúdio/personagem;
- documentar termos do modelo, permissão comercial, retenção e uso de inputs;
- se o fornecedor usar prompts/referências de modo incompatível com privacidade ou licença, bloquear a execução e voltar ao usuário quando custo/risco/uso de dados mudar;
- hash comprova integridade, não autoria nem licença;
- dúvida material de originalidade ou licença bloqueia o candidato.

Nenhum dado da criança, histórico, voz, nome, idade exata ou resultado entra em prompt ou serviço.

## 12. Orçamentos bloqueantes

### 12.1 Tabela consolidada

| Envelope | Teto |
|---|---:|
| qualquer asset visual distribuído | `150.000` bytes |
| pose 256 preferencial | `45.000` bytes |
| pose 512 preferencial | `90.000` bytes |
| P0c 512 recomendado | `80.000` bytes |
| P0b agregado | `300.000` bytes |
| visuais do shell | `210.000` bytes |
| shell frio total sem áudio | `500.000` bytes transferidos |
| fatia visual Etapa 1 | `750.000` bytes |
| uma etapa completa | `2 MiB` = `2.097.152` bytes |
| Português total | `8 MiB` = `8.388.608` bytes |

### 12.2 Shell visual

| Asset compartilhado | Reserva máxima |
|---|---:|
| PWA 512 | `80.000` bytes |
| PWA 192 | `25.000` bytes |
| favicon/atalho | `10.000` bytes |
| boas-vindas global | `70.000` bytes |
| marcador de trilha | `25.000` bytes |
| **Total visual** | **`210.000` bytes** |

O asset de boas-vindas referenciado por shell e pacote é o mesmo ID/hash, não uma cópia. Poses de ouvir, acerto, nova tentativa e conclusão não entram automaticamente no shell.

Restam no máximo `290.000` bytes do teto frio para HTML, CSS, JavaScript, manifesto, service worker e demais respostas normativas. Isso é alocação, não prova. A release final precisa medir carga fria real, `Content-Encoding`, todas as requisições e zero shell híbrido.

### 12.3 Fatia visual

- P0b compartilhado: até `300.000` bytes;
- futuras imagens pedagógicas da fatia: até `450.000` bytes no cenário de 10 × `45.000`;
- total visual: até `750.000` bytes;
- áudio, conteúdo e manifesto ainda precisam caber no teto de `2 MiB` da etapa;
- nenhum envelope autoriza preencher o teto por padrão;
- `budget:check` futuro falha por arquivo, lote, shell, etapa e total.

### 12.4 Ressalvas P1 preservadas

1. `images/icon-512x512.png` atual possui `385.793` bytes e excede `150.000`; P0c exige futuro 512 em até `80.000` bytes. Nenhuma substituição ocorre agora.
2. aproximação estática do shell atual é `487.673/500.000` bytes, sem prova fria/coerente. Nenhum asset novo pode ser somado por estimativa.

Os P1 bloqueiam aprovação futura do asset/shell, não esta especificação documental.

## 13. Sequência e gates de revisão

```text
especificação documental atual
  -> supervisor G3
     -> se aprovada: aguardar autorização compatível para gerar imagens
        -> P0a: model sheet + âncoras
           -> supervisor aprova anatomia/consistência/proveniência
              -> P0b: cinco momentos essenciais
                 -> supervisor aprova função/emoção/recortes/bytes
                    -> P0c: ícones e marcador
                       -> supervisor aprova máscaras/legibilidade/bytes/shell
                          -> protótipo/fatia e teste infantil no gate aplicável
```

### 13.1 Gate documental atual

Supervisor deve decidir:

- identidade e anatomia estão específicas sem redesenhar a mascote;
- prompts evitam IP/estilo de artista e exigem âncoras;
- matriz de consistência possui rejeição objetiva;
- P0b cobre os cinco momentos e soma até `300.000` bytes;
- P0c cobre 512/192/favicon/marcador e 512 até `80.000` bytes;
- recortes, transparência, alt, responsividade e proveniência são verificáveis;
- budgets P1 continuam ativos;
- nenhuma palavra, asset, código ou implementação foi liberado.

### 13.2 Gate futuro P0a

Exige:

- imagens-âncora frontal e 3/4 aprovadas;
- vistas/proporções/expressões completas;
- consistência entre vistas;
- procedência/licença/modelo/versão/seed;
- inspeção em tamanhos reduzidos;
- nenhum desvio de identidade ou IP;
- bytes de exports de revisão dentro do teto aplicável.

P0b não começa por conveniência antes desse veredito.

### 13.3 Gate futuro P0b

Exige:

- derivação direta das âncoras P0a;
- cinco momentos completos, sem emoção punitiva;
- função/alt/canal equivalente registrados;
- recortes e transparência nos viewports;
- candidato individual ≤`150.000` e lote ≤`300.000` bytes;
- nenhuma pista pedagógica.

### 13.4 Gate futuro P0c

Exige:

- derivação direta P0a;
- legibilidade e máscaras reais;
- ícone 512 ≤`80.000` bytes;
- P0c total ≤`140.000` e shell visual ≤`210.000` bytes;
- carga fria completa ≤`500.000` bytes e release coerente antes de aprovar shell;
- manifesto/PWA/testes de instalação no build autorizado.

### 13.5 Condição do Gate G3 completo

Esta documentação não encerra G3. Model sheet, piloto visual, assets reais, protótipo e teste infantil seguem `NAO TESTADO`. O supervisor pode aprovar o subgate documental e ainda manter G3 aberto. Programador continua bloqueado até autorização explícita do usuário e Gate G4.

## 14. Checklist de rejeição por lote

### P0a

- [ ] frontal e 3/4 são a mesma personagem;
- [ ] lateral/posterior/sentada respeitam proporções;
- [ ] todas as expressões são acolhedoras;
- [ ] lenço/medalhão/paleta são constantes;
- [ ] nenhuma influência protegida ou estilo de artista;
- [ ] proveniência e licença completas;
- [ ] âncoras aprovadas antes de derivar.

### P0b

- [ ] cinco momentos presentes;
- [ ] função e evento definidos;
- [ ] nenhum gesto entrega resposta;
- [ ] alt/decorativo justificado;
- [ ] safe areas e recortes aprovados;
- [ ] consistência contra ambas as âncoras;
- [ ] soma real ≤`300.000` bytes.

### P0c

- [ ] 512, 192, favicon/atalho e marcador derivados de P0a;
- [ ] máscaras e tamanhos reduzidos legíveis;
- [ ] ausência de texto/logo/marca-d'água;
- [ ] 512 ≤`80.000` bytes;
- [ ] cada asset ≤`150.000` bytes;
- [ ] shell visual ≤`210.000` e shell frio real ≤`500.000` bytes;
- [ ] versão coerente do manifesto/service worker.

Qualquer caixa não marcada mantém o lote em revisão; não se converte ausência de prova em aprovação.

## 15. Evidência desta execução

### TESTADO

- raiz Git, branch exclusiva, worktree limpa, `HEAD`, remoto, claim, `run_id`, idempotência e lock;
- leitura integral do Norte, plano frontend, relatório/handoff supervisor G3, contratos/aprovações G1/G2 e plano/aprovação de engenharia;
- ancestralidade do handoff supervisor G3 em relação ao claim de entrada;
- cobertura documental de P0a, P0b, P0c, prompts, negative prompts, consistência, rejeição, acessibilidade, responsividade, proveniência, licença, budgets e gates;
- `images/icon-512x512.png`: PNG RGBA 512×512, `385.793` bytes, SHA-256 `502d0e8eba0d4d197aa4e0ceb4541f9419be219ae03f79c6cbddf863335eb086`;
- nenhum arquivo de app, CSS, PWA, asset, imagem, áudio, STATUS, Norte ou Issue foi alterado por esta especificação.

### FALHOU

- ícone 512 atual: `385.793 > 150.000` bytes e também excede a meta P0c de `80.000`;
- shell final não possui medição fria real nem prova de release coerente;
- nenhum teste funcional foi executado ou falhou, porque não houve mudança de produto.

### NAO TESTADO

- qualquer model sheet, pose, expressão, ícone, marcador ou imagem pedagógica real;
- consistência visual real, atratividade infantil, nomeação, ambiguidade e ausência de pista;
- prompts em qualquer modelo/ferramenta, seed, reprodutibilidade e termos de fornecedor;
- transparência, halo, recortes, máscaras, formatos, compressão e bytes futuros;
- contraste final, leitor de tela, reduced motion, zoom, safe areas e cinco viewports no redesign;
- protocolo com cinco crianças, duas pré-leitoras, meta 80% e zero bloqueio crítico;
- P0b agregado, P0c, shell visual, shell frio, fatia, etapa e Português reais;
- app, pacote, PWA, offline, instalação, migração e regressão de Matemática futuros.

### INFERIDO

- âncoras frontal/3/4 e matriz explícita tendem a reduzir deriva;
- prompts com referência aprovada tendem a ser mais consistentes que texto isolado;
- budgets por ticket e agregado tendem a impedir expansão silenciosa do shell;
- safe areas e variantes de recorte tendem a preservar função em viewports diferentes;
- paleta e medalhão tendem a manter identidade entre matérias.

Nenhuma inferência aprova asset, experiência infantil, acessibilidade ou orçamento.

## 16. Riscos e controles

| Risco | Severidade | Controle de aceite |
|---|---:|---|
| derivação de IP/estilo | P0 | prompts sem nomes, referências licenciadas e revisão de originalidade |
| dado/referência enviado a fornecedor incompatível | P0 | termos registrados; nenhum dado infantil; bloquear e escalar mudança de risco |
| Capivara muda entre poses | P1 | P0a, duas âncoras, matriz e rejeição de deriva cumulativa |
| expressão pune erro | P1 | catálogo emocional, inspeção e teste infantil |
| gesto revela resposta | P1 | espaço vazio funcional e revisão pedagógica |
| ícone não parece Capivara em tamanho pequeno | P1 | derivação P0a e testes 16–512 px/máscaras |
| alpha/recorte quebra layout | P1 | quatro fundos, cinco viewports, safe areas e inspeção de borda |
| lote excede orçamento | P1 | tetos individuais/agregados e `budget:check` bloqueante |
| asset duplicado por matéria | P1 | IDs globais; variante só por função comprovada |
| alt revela resposta | P1 | política por função e aprovação pedagógica |
| paleta falha contraste | P1 | medição no componente real; cor nunca canal único |
| licença/proveniência incompleta | P0 | registro obrigatório e bloqueio de publicação |
| modelo não reproduzível | P2 | registrar versão/seed; risco explícito se ferramenta não expuser |
| textura/compressão apaga leitura | P2 | comparação em tamanhos-alvo e export a partir do master |

## 17. Critérios de aceite desta especificação

- [x] Identidade fixa, limites e funções visuais documentados.
- [x] P0a define anatomia, vistas, proporções, expressões, poses, lenço, medalhão e paleta.
- [x] Prompts futuros e negative prompt evitam derivação de IP/estilo de artista.
- [x] Matriz de consistência, método de decisão e critérios de rejeição definidos.
- [x] P0b cobre boas-vindas, ouvir, acerto, nova tentativa e conclusão.
- [x] P0c cobre 512, 192, favicon/atalho e marcador.
- [x] Dimensões, transparência, recortes, safe areas, alt e responsividade definidos.
- [x] Proveniência, licença, ferramenta, modelo, versão e seed definidos.
- [x] Sequência P0a → P0b → P0c e gates independentes preservados.
- [x] Teto individual, P0b, P0c, shell, fatia, etapa e Português consolidados.
- [x] Nenhuma palavra/imagem pedagógica, asset, app, CSS, STATUS ou Issue foi escolhida/alterada.
- [x] `TESTADO`, `FALHOU`, `NAO TESTADO` e `INFERIDO` separados.
- [ ] Supervisor emite veredito independente.

## 18. Recomendação final

**RECOMENDAR REVISÃO INDEPENDENTE** pelo supervisor com `lumon-supervisao-final`, em `EM_REVISAO` no Gate `G3_EXPERIENCIA_PILOTO_VISUAL`.

O supervisor deve avaliar esta especificação documental e manter assets, model sheet, piloto visual, teste infantil e runtime como `NAO TESTADO`. Se o subgate documental for aprovado, o fluxo deve aguardar autorização compatível antes de qualquer geração de imagem. Programador, implementação e Gate G4 não são liberados por esta entrega.
