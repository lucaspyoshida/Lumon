# Inventário do sistema — Lumon

> Gerado pelo Scout em 2026-07-17. As afirmações usam a escala de confiança do Reversa.

## Visão geral

- 🟢 **CONFIRMADO** — O Lumon é uma aplicação web estática, mobile-first e instalável como PWA, voltada a atividades educativas infantis.
- 🟢 **CONFIRMADO** — A aplicação roda inteiramente no navegador, sem processo de build, backend ou banco de dados.
- 🟢 **CONFIRMADO** — O código de execução é composto por HTML, CSS e JavaScript puro.
- 🟡 **INFERIDO** — O caminho `/Lumon/` usado no registro do service worker sugere publicação sob GitHub Pages ou outro host em subdiretório.

## Estrutura de diretórios

```text
Lumon/
├── index.htm                 # Documento principal e todas as telas da SPA
├── script.js                 # Estado, navegação, atividades e gestos
├── style.css                 # Layout mobile-first, temas e animações
├── manifest.json             # Manifesto PWA
├── service-worker.js         # Cache offline e estratégia cache-first
├── favicon.ico               # Ícone do navegador
├── images/
│   ├── feliz.png             # Feedback visual de acerto
│   ├── triste.png            # Feedback visual de erro
│   ├── icon-192x192.png      # Ícone PWA
│   └── icon-512x512.png      # Ícone PWA
├── GEMINI.md                 # Descrição legada do projeto
└── .gitattributes            # Configuração Git
```

As estruturas `.git/`, `.agents/`, `.reversa/` e `_reversa_sdd/` foram excluídas do inventário do legado.

## Arquivos e linguagens

| Tipo | Quantidade | Papel |
|---|---:|---|
| JavaScript (`.js`) | 2 | Aplicação e service worker |
| HTML (`.htm`) | 1 | Entrada e estrutura das telas |
| CSS (`.css`) | 1 | Apresentação e responsividade |
| JSON (`.json`) | 1 | Manifesto PWA |
| Markdown (`.md`) | 1 legado | Orientação existente (`GEMINI.md`) |
| PNG (`.png`) | 4 | Feedback e ícones PWA |
| ICO (`.ico`) | 1 | Favicon |

Contagem de linhas dos arquivos textuais principais: `script.js` 457, `style.css` 363, `index.htm` 116, `service-worker.js` 55 e `manifest.json` 20.

## Pontos de entrada

| Caminho | Tipo | Evidência |
|---|---|---|
| `index.htm` | Entrada da aplicação | Carrega `style.css`, `manifest.json` e `script.js` |
| `script.js` | Bootstrap do cliente | Inicializa no evento `DOMContentLoaded` e abre `menu-inicial` |
| `service-worker.js` | Entrada do worker PWA | Escuta `install`, `fetch` e `activate` |
| `manifest.json` | Configuração PWA | Define nome, ícones, `start_url` e modo `standalone` |

Não foram encontrados scripts de build, gerenciador de pacotes, Docker, CI/CD ou arquivos de ambiente.

## Componentes funcionais identificados

### 1. Shell e navegação entre telas

- 🟢 **CONFIRMADO** — `index.htm` declara nove seções de tela controladas pela classe `ativa`.
- 🟢 **CONFIRMADO** — `navegarPara()` alterna a tela visível sem mudança de URL; o Lumon funciona como SPA estática.

### 2. Sessão de treino

- 🟢 **CONFIRMADO** — `estadoAtual` mantém atividade, modo, nível, questões, posição, acertos, erros e fila de revisão.
- 🟢 **CONFIRMADO** — Sessões comuns são limitadas a 15 questões, exceto intervalo de letras.
- 🟢 **CONFIRMADO** — Ao final, o usuário vê acertos/erros, pode recomeçar ou treinar apenas os itens errados.

### 3. Atividade de números

- 🟢 **CONFIRMADO** — Oferece níveis até 10, 20 e 30 e intervalo numérico customizado de 1 a 100.
- 🟢 **CONFIRMADO** — Pode apresentar os números sequencialmente ou em ordem aleatória.

### 4. Atividades aritméticas

- 🟢 **CONFIRMADO** — Somas suportam `+1`, `+2`, `+3` e combinações aleatórias cujo resultado não ultrapassa 10.
- 🟢 **CONFIRMADO** — Subtrações suportam `-1`, `-2`, `-3` e combinações aleatórias sem resultado negativo.
- 🟢 **CONFIRMADO** — O cartão pode ser virado para mostrar a resposta calculada.

### 5. Atividade de letras

- 🟢 **CONFIRMADO** — Suporta vogais, letras únicas extraídas de uma palavra digitada e intervalo alfabético customizado.
- 🟢 **CONFIRMADO** — Palavras são normalizadas sem diacríticos e convertidas para maiúsculas.

### 6. Gestos e feedback

- 🟢 **CONFIRMADO** — Deslizar para a direita registra acerto; para a esquerda, erro.
- 🟢 **CONFIRMADO** — Mouse e toque são suportados pelos mesmos manipuladores de arraste.
- 🟢 **CONFIRMADO** — Imagens de felicidade e tristeza fornecem feedback após cada resposta.

### 7. Persistência local

- 🟢 **CONFIRMADO** — A última combinação de atividade, modo e nível é gravada em `localStorage` sob `lumon-last-settings`.
- 🟢 **CONFIRMADO** — Não há persistência de pontuação, perfil ou histórico entre sessões.

### 8. PWA e funcionamento offline

- 🟢 **CONFIRMADO** — O manifesto configura execução standalone e ícones 192×192 e 512×512.
- 🟢 **CONFIRMADO** — O service worker pré-carrega os arquivos essenciais e responde usando cache-first, com fallback para a rede.
- 🟡 **INFERIDO** — Caminhos absolutos de imagens (`/images/...`) e do worker (`/Lumon/service-worker.js`) podem se comportar de forma diferente conforme a raiz de hospedagem.

## Integrações externas e APIs da plataforma

Não foram detectados serviços externos, APIs HTTP de negócio, analytics ou SDKs de terceiros.

APIs nativas usadas:

- DOM e eventos do navegador;
- Service Worker API;
- Cache Storage API;
- Fetch API como fallback do service worker;
- Web Storage (`localStorage`);
- Web App Manifest.

## Banco de dados

- 🟢 **CONFIRMADO** — Nenhum schema, migration, arquivo DDL ou modelo ORM foi encontrado.
- 🟢 **CONFIRMADO** — O único armazenamento identificado é `localStorage` no navegador.

## Testes e qualidade automatizada

- 🟢 **CONFIRMADO** — Nenhum framework ou arquivo de teste (`*.test.*`, `*.spec.*`, Gherkin ou E2E) foi encontrado.
- 🔴 **LACUNA** — Não há medida de cobertura automatizada disponível.
- 🔴 **LACUNA** — Compatibilidade offline, gestos e fluxos de exercícios dependem de validação manual.

## Riscos observáveis para análise posterior

- 🟢 **CONFIRMADO** — `mostrarQuestao()` usa `eval()` para calcular expressões aritméticas geradas internamente.
- 🟢 **CONFIRMADO** — A ordem aleatória usa `sort(() => Math.random() - 0.5)`, que não produz embaralhamento uniforme.
- 🟡 **INFERIDO** — O listener de clique do cartão e o encerramento de um clique no fluxo de drag podem alternar o cartão duas vezes em certos navegadores.
- 🔴 **LACUNA** — Não há documentação de requisitos pedagógicos, público etário, critérios de acessibilidade ou definição formal de “acerto” pelo usuário.

## Organização recomendada das especificações

**Por features** (`feature`). O projeto não possui módulos de domínio em pastas, roteamento por endpoints ou testes BDD. As fronteiras mais claras são as funcionalidades presentes no código: navegação, sessão de treino, números, aritmética, letras, gestos/feedback, persistência local e PWA offline.
