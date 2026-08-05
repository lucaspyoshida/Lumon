# Plano da trilha de Português do Lumon

> Documento irmão de `plano-evolucao-lumon.md`, que cobre a trilha de Matemática.
> Escopo: alfabetização inicial em português brasileiro dentro do mesmo aplicativo.

## 1. Objetivo

Criar no Lumon uma trilha de alfabetização que leve a criança do reconhecimento das
letras à leitura de frases curtas, usando método fônico-silábico e áudio como
elemento central — não como enfeite.

O conteúdo, o vocabulário, as imagens e a progressão são próprios do Lumon. Não há
reprodução de material proprietário de terceiros.

## 2. A premissa que determina todo o desenho

**Alfabetização é o mapeamento entre grafema e fonema. Fonema é som.**

A atividade `letras` que existe hoje (`script.js:124-143`) mostra a letra em um cartão
e a criança se autoavalia com swipe. Isso treina *nomear* a letra, que é a habilidade
menos útil do processo. O que faz a criança ler é:

1. associar o grafema **F** ao som /f/;
2. fundir /f/ + /a/ = **fa**;
3. fundir **fa** + **ca** = **faca**.

Três consequências diretas:

- **Sem banco de áudio não existe trilha de português.** Existe o que já está no app.
- **O flashcard com autoavaliação não serve como formato principal.** Uma criança
  pré-alfabetizada não sabe julgar se acertou. São necessários tipos de resposta com
  correção objetiva.
- **A fundação técnica da Fase 1 do plano de Matemática é pré-requisito.** Não é
  possível construir "ouvir → escolher entre três" sobre o `script.js` atual. Essa
  fundação é compartilhada pelas duas trilhas e só precisa ser feita uma vez.
- **A criança não sabe ler as instruções.** Isso é óbvio e por isso mesmo passa
  despercebido: em um aplicativo de alfabetização, o usuário é, por definição, alguém
  que ainda não lê. Nenhuma tela pode depender de texto lido para ser compreendida.
  Toda instrução precisa existir como **áudio + ícone**, com o texto presente apenas
  para o adulto que acompanha. Isso vale igualmente para as telas de Matemática, que
  hoje dependem de rótulos escritos.

## 3. Decisões tomadas

| Tema | Decisão |
|---|---|
| Origem do áudio | 100% sintetizado na primeira versão |
| Substituição futura | **A mãe grava.** Substituição por bloco fechado, nunca clipe solto — ver 5.5 |
| Ordem de trabalho | Fundação técnica (Bloco 1) antes de qualquer conteúdo de português |
| Escopo do app | Português e Matemática no mesmo aplicativo, como trilhas irmãs |
| Vocabulário | Definido neste documento, seção 7 |
| Timbre | **Voz feminina** |
| Serviço de síntese | Kokoro v1.0 local + eSpeak NG para fonemas — ver seção 5 |

## 4. Estrutura da trilha

Cinco etapas, espelhando a organização da trilha de Matemática.

### P1 — Letras e seus sons

**Objetivo:** reconhecer a forma da letra e associá-la ao som correspondente.

Atividades:
- ouvir o som → tocar a letra correta entre três;
- ver a letra → ouvir o som → confirmar;
- parear maiúscula e minúscula (**A** ↔ **a**);
- identificar a letra inicial de uma palavra falada.

Ordem de introdução das letras, por estabilidade sonora e frequência:
`A E I O U` → `P B T D` → `M N` → `F V` → `L` → `C G` → `S R` → `J Z X` → `H K W Y`

**Critério de domínio:** 90% de acerto em três sessões; nenhuma letra com erro acima
de 30%; maiúscula e minúscula reconhecidas separadamente.

### P2 — Sílabas simples (padrão CV)

**Objetivo:** fundir consoante e vogal, que é o salto cognitivo central da leitura.

Famílias na ordem: `PA PE PI PO PU` → `BA…` → `TA…` → `DA…` → `MA…` → `NA…` →
`FA…` → `VA…` → `LA…` → `CA CE CI CO CU` → `GA…` → `SA…` → `RA…` → `JA…` → `ZA…`

Atividades:
- ouvir a sílaba → escolher entre três escritas;
- ver a sílaba → ouvir → confirmar;
- fusão guiada: ouve /f/, ouve /a/, ouve **fa**, escolhe a escrita;
- qual sílaba começa a palavra falada.

**Critério de domínio:** 90% por família; famílias visualmente próximas
(`PA`/`BA`, `TA`/`DA`, `FA`/`VA`) avaliadas em conjunto antes de liberar avanço.

### P3 — Palavras de duas sílabas

**Objetivo:** ler palavras completas formadas só por sílabas já dominadas.

Atividades:
- ouvir a palavra → escolher entre três imagens;
- ver a imagem → montar a palavra com blocos de sílabas;
- ver a palavra escrita → escolher a imagem;
- qual palavra começa com este som.

Vocabulário: seção 7.

**Critério de domínio:** 90% em reconhecimento; 80% em montagem por sílabas.

### P4 — Dificuldades ortográficas do português

**Objetivo:** cobrir o que foge do padrão CV.

Blocos, nesta ordem:
1. dígrafos: `CH` `LH` `NH`
2. sílabas travadas: `-R` (porta), `-L` (mel), `-S` (festa), `-M/-N` (campo, ponte)
3. encontros consonantais: `BR CR DR FR GR PR TR VR` e `BL CL FL GL PL`
4. `R` / `RR`
5. `S` / `SS` / `Ç` / `Z`
6. `M` antes de `P` e `B`
7. `QU` / `GU`
8. os sons do `X`

Atividades: as de P3, mais **ditado** — ouvir a palavra e digitar.

**Critério de domínio:** 90% em reconhecimento; 70% em ditado, que é a habilidade
mais difícil e não deve travar o avanço.

### P5 — Frases e leitura

**Objetivo:** ler com compreensão.

Atividades:
- frase de três a cinco palavras → escolher a imagem que corresponde;
- ouvir a frase → ordenar as palavras;
- ler e responder pergunta simples de duas alternativas;
- ditado de palavra completa.

**Critério de domínio:** lê frases novas sem apoio de áudio, com 80% de compreensão.

---

## 5. Serviço de síntese — decisão e justificativa

### O que foi testado nesta sessão

| Ferramenta | Resultado |
|---|---|
| `sherpa-onnx` 1.13.4 via pip | ✅ instalou |
| Kokoro v1.0 multi-lang, voz `pf_dora` | ✅ **feminina, português, 24 kHz** |
| `piper-tts` 1.6.0 + `pt-br-edresson-low` | ✅ funcional, mas voz masculina de 16 kHz |
| `espeak-ng` 1.51 | ✅ pt-BR, IPA, fonemas sustentados e variantes femininas (`pt-br+f3`) |
| `ffmpeg` 6.1.1 | ✅ conversão para AAC/`.m4a` |
| Custo medido por clipe | 9,9 KB a 64 kbps · 7,9 KB a 48 kbps |

### Decisão: Kokoro v1.0 local, com eSpeak NG para fonemas isolados

O Piper foi a escolha inicial, mas **nenhuma voz feminina pt-BR do Piper é alcançável**
sem o HuggingFace: as femininas (`dii`) só existem lá, e o espelho no GitHub tem apenas
vozes masculinas. O Kokoro resolve isso e ainda melhora a qualidade.

**Motivos:**

1. **Tem voz feminina em português** — `pf_dora`, o requisito que motivou a troca.
2. **24 kHz** contra 16 kHz do Piper alcançável aqui. Qualidade sensivelmente melhor.
3. **Não exige conta, cartão, chave de API ou cota.** Roda offline, de ponta a ponta,
   sem nenhuma etapa manual de configuração externa.
4. **Apache 2.0** — licença limpa, o app pode ser publicado sem restrição. Diferente do
   free tier da Azure, que **não concede direito de uso comercial** das vozes prebuilt.
5. **Reprodutível e versionável.** O corpus fica em JSON no repositório e o script
   regenera tudo com um comando.

Custo: o modelo tem 350 MB, mas isso é peso de build. Nada disso vai para o aplicativo.

**Por que não Google Cloud TTS**, apesar da qualidade superior: exige criar projeto,
ativar billing, gerar chave de service account e trazer essa credencial para dentro do
fluxo. É melhor som, mas não é autônomo. Fica documentado como upgrade opcional — o
script terá backend plugável, e trocar `--engine kokoro` por `--engine google` regenera
o mesmo corpus com voz melhor sem tocar no app.

### Qual voz usar

| Voz | `sid` | Observação |
|---|---|---|
| `pf_dora` | 43 | **Recomendada.** Feminina, português |
| `pm_alex` | 44 | Masculina |
| `pm_santa` | 45 | Masculina |

O modelo expõe 53 vozes; só essas três são portuguesas. A velocidade de síntese usa
`speed=0.85` para itens curtos (letras e sílabas, que precisam ser articulados devagar)
e `0.95` para frases.

⚠️ **A confirmar por escuta:** se a `pf_dora` soa como português brasileiro ou europeu.
O prefixo `p` do Kokoro indica pt-BR, mas isso precisa passar pelo ouvido antes de virar
560 clipes.

### O problema dos fonemas, e por que ele é menor do que parece

Nenhum TTS pronuncia fonema isolado: mandar `"f"` retorna **"éfe"**, o nome da letra.

Mas há um fato de fonética que resolve metade do problema: **consoantes oclusivas não
podem ser pronunciadas isoladamente por ninguém** — nem por um TTS, nem por um humano.
Não existe /b/ puro; sai sempre "bê" ou "buh". Logo:

- **Contínuas** (`F S M N L V Z R J X CH`) podem ser sustentadas. `espeak-ng` gera com
  notação de fonema, em variante feminina para casar com a voz principal:
  `espeak-ng -v pt-br+f3 "[[f::::]]"`. São ~12 clipes.
- **Oclusivas** (`P B T D C G Q`) devem ser ensinadas **sempre em contexto silábico**
  — "**P** de **PA**-to" — porque é assim que funcionam de verdade.

Isso não é contorno técnico, é o desenho pedagogicamente correto. A etapa P1 deve
refletir essa distinção em vez de forçar "o som isolado de cada letra".

### Dimensionamento do banco

| Conteúdo | Clipes |
|---|---|
| Letras: nome + som quando aplicável | ~50 |
| Fonemas contínuos isolados | ~12 |
| Sílabas: simples, dígrafos, travadas | ~220 |
| Palavras | 168 |
| Frases da P5 | ~60 |
| Instruções e feedback da interface | ~40 |
| **Total** | **~560 clipes** |

Peso medido, não estimado: **5 MB a 64 kbps** ou **4 MB a 48 kbps**. Para fala mono de
voz única, 48 kbps é suficiente — é o padrão adotado, com 64 kbps reservado para as
frases da P5.

Formato: WAV mestre fora do repositório → **`.m4a` AAC mono** versionado. AAC por
compatibilidade universal; Opus é menor mas o suporte no Safari é irregular.

### 5.5 Protocolo de regravação humana

A mãe grava. A voz sintética é o andaime que permite a trilha existir antes das
gravações — não é a versão final pretendida.

**Regra inegociável: substituir por bloco fechado, nunca clipe solto.** Um bloco é uma
categoria inteira (todos os fonemas, ou todas as instruções da interface, ou todas as
sílabas de uma família). Trocar clipes avulsos faz a trilha alternar entre voz humana e
sintética dentro do mesmo exercício, o que é pior que usar só sintético.

**Ordem de prioridade**, por impacto pedagógico decrescente:

1. os ~12 fonemas contínuos — hoje vêm do eSpeak, de timbre visivelmente pior;
2. as ~40 instruções e falas de feedback da interface — são o que a criança mais ouve;
3. as sílabas da P2 — o núcleo da fusão;
4. as palavras da P3;
5. o resto, se houver ânimo.

Parar em qualquer ponto da lista deixa o app coerente, desde que o bloco tenha sido
concluído.

**Especificação de captura:** WAV 48 kHz mono, 16 bits; ambiente silencioso e sem eco;
distância constante do microfone; ~0,3 s de silêncio antes e depois de cada item. O
celular serve — a diferença entre celular e microfone dedicado é irrelevante perto da
diferença entre voz humana e sintética.

**Fluxo:** o `build-audio.mjs` gera um roteiro numerado a partir do `corpus.json`, com o
id e o texto de cada item na ordem de gravação. A mãe grava tudo em um arquivo contínuo
por bloco; o script fatia pelos silêncios, confere se a contagem bate com o roteiro,
normaliza o volume e marca `origem: "humano"` no manifesto. Divergência na contagem
falha o build em vez de desalinhar os clipes silenciosamente.

---

## 6. Arquitetura

### 6.1 Camada de áudio

```text
audio/
├── manifest.json          # id → { arquivo, duracao, sha, origem: "tts"|"humano" }
├── letras/
├── fonemas/
├── silabas/
├── palavras/
├── frases/
└── ui/
```

O `manifest.json` é o que permite a substituição progressiva por gravações humanas:
trocar um clipe é substituir o arquivo e atualizar a entrada, sem tocar em código.
O campo `origem` deixa visível o que já foi humanizado.

`src/audio/player.js` precisa de:
- **unlock no primeiro toque** — obrigatório no iOS, senão nada toca;
- pré-carga dos clipes da questão seguinte;
- botão "ouvir de novo" em toda tela com som;
- fallback para `SpeechSynthesis` quando um clipe faltar;
- respeito à preferência `preferences.sound`.

### 6.2 Pipeline de geração

```text
content/pt/
├── corpus.json            # fonte da verdade: id, texto, tipo, etapa
└── palavras.json          # palavra → sílabas, imagem, etapa

scripts/
└── build-audio.mjs        # corpus.json → wav → m4a → manifest.json
```

Regras: idempotente (só regera o que mudou, por hash do texto), backend selecionável
(`kokoro` | `espeak` | `google`), e falha explícita se um id do corpus não tiver áudio.

### 6.3 Contrato de questão

Reaproveita o contrato já definido em `plano-evolucao-lumon.md` seção 5.4. O tipo
`audio`, já previsto na linha 320 daquele documento, passa a ser usado de fato:

```js
{
  id: "pt-p2-fa-001",
  skill: "pt.silaba.fa",
  prompt:   { type: "audio", audioId: "silaba/fa" },
  response: { type: "choice", options: ["FA", "VA", "PA"] },
  answer: "FA"
}
```

### 6.4 Service worker

560 arquivos em precache tornaria a instalação inviável. Estratégia:

- precache: shell + `ui/` + áudio da etapa P1;
- sob demanda: o pacote de cada etapa é baixado quando a criança entra nela;
- cache versionado por hash do manifesto, para invalidar só o que mudou.

### 6.5 Imagens

A etapa P3 precisa de 168 imagens. Fonte adotada: **Noto Emoji, Apache 2.0** — cobre
quase todo o vocabulário concreto da seção 7, com estilo consistente. Foi preferida ao
OpenMoji, que é CC BY-SA e exigiria atribuição e compartilhamento igual das derivadas.
O mapeamento palavra → imagem fica em `palavras.json`, e as palavras sem emoji
correspondente precisarão de desenho próprio ou de substituição no vocabulário —
levantar quais na hora de montar o `palavras.json`.

---

## 7. Vocabulário

Critérios: duas sílabas no padrão CV-CV sempre que possível; substantivo concreto e
representável por imagem; do universo infantil; usando apenas sílabas já ensinadas na
posição em que a palavra aparece na trilha.

Contagem fechada: **97 palavras únicas na P3, 73 na P4, 168 no total.** Palavras
aparecem de propósito em mais de uma família — *casa* reforça `C`, `S` e `Z`; *luva*
reforça `L` e `V` — porque a repetição em contexto novo é o que consolida. Isso é
desenho, não duplicata.

### P3 — palavras CV-CV, agrupadas pela consoante nova

| Família | Palavras |
|---|---|
| P | pato, pipa, pena, pote, pele, mapa, capa, sopa |
| B | bola, bota, boca, bebê, bala, bode, bule, bico |
| T | tatu, teto, tia, tela, mato, pato, gato, fita |
| D | dado, dedo, dama, doce, roda, moda, nada, vida |
| M | mala, mesa, moto, mudo, mola, mula, cama, lama |
| N | nave, nota, nove, cano, lona, mina, pano, sino |
| F | faca, fada, fita, foca, fogo, feno, fofo, sofá |
| V | vaca, vela, vaso, vovó, vovô, uva, ave, luva |
| L | lua, lobo, lata, luva, lima, bala, mala, gelo |
| C | casa, cama, capa, coco, copo, cabo, cuca, boca |
| G | gato, gola, gude, guri, fogo, jogo, mago, lago |
| S | sapo, sino, sofá, sala, suco, saco, sela, casa |
| R | rato, rede, roda, rosa, rua, rio, cara, muro |
| J | jaca, jipe, jogo, joia, loja, caju, beijo |
| Z | zero, azul, vaso, casa, mesa, rosa |

### P4 — palavras por dificuldade ortográfica

| Dificuldade | Palavras |
|---|---|
| CH | chave, chuva, chapéu, cacho, bicho, chulé |
| LH | filho, milho, folha, telha, palha, abelha, coelho |
| NH | ninho, banho, sonho, unha, aranha, galinha |
| RR | carro, ferro, jarra, serra, barril, terra |
| SS | massa, osso, passo, pêssego, vassoura |
| Ç / S / Z | laço, poço, caça, casa, rosa, zebra |
| M antes de P/B | campo, tempo, bomba, sombra, pomba |
| QU / GU | queijo, quiabo, foguete, guitarra, manga |
| Travadas -R | porta, carta, verde, barco, forte |
| Travadas -L | mel, sol, papel, farol, funil |
| Travadas -S | festa, pasta, gosto, cesta, resto |
| Encontros | bravo, prato, trem, flor, globo, planta, cravo |
| Sons do X | caixa, peixe, exame, táxi, xícara |

### P5 — frases

Construídas apenas com palavras das etapas anteriores. Exemplos do padrão:

```text
O gato subiu no muro.
A bola é azul.
O pato nada no lago.
A vovó fez o bolo.
O sapo pulou na água.
```

---

## 8. Bloco 1 — fundação técnica (o próximo trabalho)

Idêntico à Fase 1 de `plano-evolucao-lumon.md`, detalhado em ordem de commit. Serve
Matemática e Português.

1. **Congelar o comportamento atual** com testes de caracterização dos geradores
   existentes, para garantir que a refatoração não quebre o que a criança já usa.
2. **Migrar para módulos ES** (`type="module"`), criando `src/` conforme a estrutura
   da seção 5.2 do plano de Matemática.
3. **Extrair estado, roteador e sessão** de `script.js` para `src/core/`.
4. **Criar o contrato de questão** e adaptar os geradores atuais a ele.
5. **Remover o `eval()`** (`script.js:193`), calculando o resultado no gerador.
6. **Persistência versionada** com `schemaVersion`, migração do `lumon-last-settings`
   existente e recuperação segura de JSON inválido.
7. **Componente de alternativas** (`multiple-choice`), acessível por toque, mouse e
   teclado — é o componente que a trilha de português mais usa.
8. **Tokens CSS** e alvos de toque de 48 px.
9. **Remover `user-scalable=no`** do `index.htm:5`.

**Critério de conclusão do Bloco 1:** as quatro atividades atuais continuam
funcionando, nenhum cálculo usa `eval()`, os geradores têm testes e existe um
componente de múltipla escolha reutilizável.

Só depois disso entram os Blocos 2 (camada de áudio), 3 (pipeline do corpus) e 4
(etapa P1 completa).

---

## 9. Primeiro incremento comprovável de Português

Depois do Bloco 1:

> **"Ouça e toque na vogal" — cinco vogais, áudio real, três alternativas, resultado
> salvo e treino dos erros.**

Pequeno, testável com a criança em uma semana, e obriga a criar tudo que importa:
player com unlock de iOS, manifesto de áudio, pipeline de geração, tipo de prompt
`audio` e persistência de progresso da trilha de português.

---

## 10. Riscos e pontos em aberto

- **Qualidade da voz sintética.** Definida por escuta, não por especificação. Se a
  `pf_dora` não convencer, o caminho é Google Cloud TTS pelo backend plugável.
- **Descasamento de timbre nos fonemas.** As ~12 consoantes contínuas vêm do eSpeak, com
  timbre diferente do Kokoro. São, por isso, as primeiras candidatas à regravação humana.
- **Fadiga de repetição.** Áudio idêntico a cada repetição cansa mais rápido que
  estímulo visual. Mitigação: variar a frase de instrução entre três alternativas.
- **Uso sem som.** O app precisa continuar utilizável no mudo, com apoio visual, para
  não travar em ambientes onde não dá para usar áudio.
- **Volume do repositório.** ~3 MB de áudio versionado é aceitável; se crescer muito
  além disso, avaliar Git LFS.
- **Sotaque e variação regional.** O corpus assume português brasileiro padrão.
- **A definir com a criança:** quantas questões por sessão em P2 e P3, e se o ditado
  da P4 é motivador ou frustrante nesta idade.

---

## 11. Prontidão para implantação

### 11.1 Bloqueadores — impedem começar o Bloco 1

| # | Questão | Por que trava |
|---|---|---|
| B1 | **Um perfil ou vários?** | O título sorteia quatro nomes. Se mais de uma criança usa o app, perfis precisam existir no schema desde a v1; adicionar depois é migração de dados com progresso real dentro. Já pendente no plano de Matemática, seção 17 |
| B2 | **Idade da criança** | Define tamanho de sessão, se o ditado da P4 é viável, se P1 começa em letras ou já em sílabas. É a variável mais importante do desenho pedagógico e não está registrada em lugar nenhum |
| B3 | **URL de hospedagem** | `script.js:5` registra `/Lumon/service-worker.js` em caminho absoluto, `manifest.json` usa `index.htm` relativo, e o worker mistura `''`, `'index.htm'` e `/images/...`. Sem a URL base não dá para corrigir o escopo, e o carregamento de áudio por etapa depende disso. Pendente desde o plano de Matemática, seção 17 |
| B4 | **`index.htm` ou `index.html`?** | O GitHub Pages procura `index.html` ao servir a raiz de um diretório. Com apenas `index.htm`, a raiz tende a devolver 404 e o `start_url` do manifesto quebra junto com o escopo do service worker |

### 11.2 Decisões técnicas assumidas

Assumidas por padrão. Ficam registradas para poderem ser contestadas, não para
travarem o início.

| # | Decisão | Consequência |
|---|---|---|
| T1 | Módulos ES nativos, sem bundler | **Abrir `index.htm` por `file://` deixa de funcionar.** Módulos são bloqueados por CORS nesse protocolo; passa a ser necessário um servidor local para testar |
| T2 | `node --test` para testes | Embutido no Node 22, sem dependências. `jsdom` apenas onde houver DOM |
| T3 | Criar `package.json` | Necessário para os scripts de áudio e testes. Não implica bundler nem build do app |
| T4 | Noto Emoji para as imagens | Apache 2.0, sem exigência de atribuição |
| T5 | AAC 48 kbps mono | 4 MB para o banco completo |
| T6 | A atividade `letras` atual permanece intacta | Só é aposentada quando a P1 estiver pronta. A criança já a usa; retirar antes seria uma regressão percebida |
| T7 | Depois do Bloco 1, Português tem prioridade sobre Matemática | A trilha de Matemática fica congelada no que já existe até a P3. A janela de alfabetização é mais estreita que a de aritmética |

### 11.3 O que já está resolvido

Trilha e progressão pedagógica · vocabulário fechado em 168 palavras · serviço de
síntese verificado por execução real · voz feminina escolhida · tratamento de fonemas ·
formato, peso e estratégia de cache do áudio · protocolo de regravação humana ·
arquitetura da camada de áudio e do pipeline · ordem de trabalho do Bloco 1.

### 11.4 Veredito

**O Bloco 1 pode começar assim que B1 e B2 forem respondidos.** B3 e B4 só travam a
etapa de PWA e áudio sob demanda, que vem no Bloco 2 — mas convém resolvê-los antes,
porque são cinco minutos de verificação e evitam retrabalho de caminhos em três
arquivos.
