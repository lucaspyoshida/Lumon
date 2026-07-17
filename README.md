# Lumon

Trilha de matemática infantil com cinco etapas progressivas, dados somente no dispositivo e funcionamento offline após a primeira carga.

## Desenvolvimento

Requisitos: Node.js 20 ou superior, npm e Google Chrome instalado.

```bash
npm ci
npm run lint
npm test
npm run build
```

O projeto é uma aplicação estática com módulos ES; `npm run build` valida os assets, o manifesto, as cinco etapas e todos os geradores sem criar um bundle desnecessário.

## Testes ponta a ponta

```bash
npm run test:e2e:chromium
```

O Playwright inicia automaticamente o servidor em `127.0.0.1:4173`, usando `/Users/yoshida/Documents/Codex/2026-07-16/quai` como raiz para preservar o escopo `/Lumon/` do service worker. A suíte cobre primeira utilização, acerto/erro, revisão, domínio/bloqueio, abandono, teclado, reload, reset confirmado, atualização/offline e a matriz de viewports.

Para inspeção manual:

```bash
python3 -m http.server 4173 --bind 127.0.0.1 --directory /Users/yoshida/Documents/Codex/2026-07-16/quai
```

Abra `http://127.0.0.1:4173/Lumon/index.htm`.

## Privacidade

O Lumon não usa backend, analytics, login ou transmissão de desempenho. Sessões, preferências e backups ficam no `localStorage` do navegador e podem ser apagados na Área do responsável.
