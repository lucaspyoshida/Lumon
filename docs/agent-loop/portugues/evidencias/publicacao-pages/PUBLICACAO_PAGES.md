# Evidência — Publicação pública no GitHub Pages

## Identificação

- **Decisão:** `USR-039`
- **run_id:** `pt-20260804T112939Z-orquestrador-pages-7806195`
- **Repositório:** `https://github.com/lucaspyoshida/Lumon`
- **URL do app:** `https://lucaspyoshida.github.io/Lumon/`
- **Branch publicada:** `feature/evolucao-pedagogica`
- **Commit do build verificado:** `1f7c4c10b2b499e5af07b0be62f2a7d137e61109`
- **Build Pages:** `1131824862`
- **Verificação:** `2026-08-04T11:36:30Z`

## Mudança externa

- O repositório já estava `PUBLIC`; a visibilidade foi confirmada, sem alteração adicional.
- GitHub Pages existia em modo legado, HTTPS obrigatório, mas publicava `main` com a interface antiga.
- A fonte foi alterada para `feature/evolucao-pedagogica`, caminho `/`.
- Rebuild explícito terminou com estado `built` e sem mensagem de erro.

## Segurança antes da abertura

- Estado atual e histórico Git pesquisados por nomes comuns de `.env`, chaves, certificados, credenciais e secrets.
- Conteúdo pesquisado por padrões de private keys e tokens comuns.
- Nenhum segredo ou arquivo de credencial foi detectado pela varredura.
- A publicação não adiciona backend, analytics, conta, Firebase, TTS em runtime ou transmissão de progresso infantil.

## Smoke test no navegador real

- URL raiz abriu a nova interface Lumon com seletor Matemática/Português.
- Matemática iniciou **Encontre o número**, aceitou resposta e mostrou feedback correto.
- Português exibiu `blocked-content`, informou ausência de mídia aprovada e não contou erro infantil.
- Console do navegador: zero `error` e zero `warn` durante o fluxo observado.

## Integridade e host

- `release-manifest.json`: HTTP 200.
- Release ID: `59c683101a944d656d0904897ea573c85651c7ef740cf9282c1a162f76c70ca3`.
- Assets normativos: `31/31` com SHA-256 idêntico; zero divergência.
- Todos os assets do manifesto pertencem a `https://lucaspyoshida.github.io`.
- `service-worker.js`: HTTP 200, MIME JavaScript e release ID coerente.
- HTTPS e HSTS ativos.
- HTML, JavaScript e service worker entregues com gzip; imagens WebP/PNG permaneceram sem recompressão HTTP adicional.
- Shell público único medido: `161052/500000` bytes comprimidos em 33 respostas; zero resposta ausente.

## Não testado

- Troca atômica observada entre dois releases consecutivos no GitHub Pages.
- Instalação física e execução offline em Android/iOS nesta publicação.
- Safari, Firefox, leitor de tela e teste moderado infantil.
- Conteúdo real de Português, ainda ausente por gate.

## Resultado

Publicação pública e smoke test do host aprovados. Gate G5 permanece bloqueado pelo pacote editorial, não pela disponibilidade da URL.
