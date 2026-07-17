# Dependências e plataforma — Lumon

> Gerado pelo Scout em 2026-07-17.

## Resumo

- 🟢 **CONFIRMADO** — O projeto não declara dependências externas.
- 🟢 **CONFIRMADO** — Não existe `package.json`, lockfile ou outro manifesto de pacotes.
- 🟢 **CONFIRMADO** — Não existe etapa de compilação, empacotamento ou transpilação.
- 🟢 **CONFIRMADO** — A aplicação depende exclusivamente de recursos nativos do navegador.

## Tecnologias

| Tecnologia | Versão declarada | Origem | Uso |
|---|---|---|---|
| HTML | HTML5 | `index.htm` | Estrutura e semântica das telas |
| CSS | Não declarada | `style.css` | Layout, tema, responsividade e animações |
| JavaScript | ECMAScript suportado pelo navegador | `script.js`, `service-worker.js` | Regras da aplicação e funcionamento offline |
| Web App Manifest | Não declarada | `manifest.json` | Instalação PWA e metadados visuais |

## APIs nativas do navegador

| API | Evidência | Finalidade |
|---|---|---|
| DOM Events | `script.js` | Inicialização, botões, toque, mouse e inputs |
| Service Worker | `script.js`, `service-worker.js` | Registro e ciclo de vida offline |
| Cache Storage | `service-worker.js` | Pré-cache e respostas cache-first |
| Fetch | `service-worker.js` | Fallback de rede quando não há cache |
| Local Storage | `script.js` | Persistência da última configuração de jogo |
| Web App Manifest | `manifest.json` | Instalação e execução standalone |

## Arquivos distribuídos no cache offline

O cache `math-kids-v8` inclui:

- `index.htm`
- `style.css`
- `script.js`
- `manifest.json`
- `favicon.ico`
- `images/feliz.png`
- `images/triste.png`

Os ícones de instalação do manifesto não aparecem explicitamente na lista de pré-cache.

## Gerenciadores e infraestrutura ausentes

Não foram encontrados:

- npm, pnpm, Yarn ou Bun;
- Maven, Gradle, pip, Poetry, Cargo, Go Modules, Bundler ou Composer;
- frameworks de interface ou CSS;
- bibliotecas de terceiros;
- CI/CD;
- Docker;
- banco de dados ou ORM;
- framework de testes.

## Compatibilidade mínima

- 🟡 **INFERIDO** — O navegador precisa suportar `const`/`let`, funções arrow, spread, `Set`, `String.prototype.normalize`, eventos touch, service workers, Cache Storage e `localStorage`.
- 🟡 **INFERIDO** — A funcionalidade principal pode abrir como arquivo estático, mas service workers exigem contexto seguro (`https` ou localhost) e escopo de hospedagem compatível.
- 🔴 **LACUNA** — O projeto não declara matriz de navegadores suportados nem versões mínimas.
