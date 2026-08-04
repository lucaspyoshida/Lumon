# Evidência de implementação — Gate G4

- `run_id`: `pt-20260804T100522Z-programador-g4-d53608b`
- executado em: `2026-08-04T10:23:39Z`
- base canônica recebida: `b2be2de7d77c865c6f331bd271e163e86f7c5514`
- branch: `feature/evolucao-pedagogica`
- autorização: `USR-038`, publicada no commit `d53608b`

## Resultado

Foi implementada a infraestrutura mínima autorizada para o Gate G4, sem declarar uma fatia pedagógica de Português concluída. O módulo de Português permanece `blocked-content` e falha fechado porque o repositório ainda não contém microcorpus, áudio editorial pt-BR e imagens pedagógicas aprovados.

Entregas:

1. Registro isolado por matéria e estado V2 local-first, com Matemática preservada.
2. Migração V1 para V2 idempotente, backup bruto imutável, `SHA-256`, journal e commit IndexedDB atômico.
3. Contratos executáveis de Português para avaliação, domínio e revisão, sem remover acentos universalmente.
4. Controlador de áudio de instância única, somente após gesto explícito e fail-closed para asset não aprovado.
5. Navegação entre Matemática e Português; Português comunica indisponibilidade técnica sem contar erro infantil.
6. Gate do responsável por pressão contínua de três segundos.
7. Assets PWA e Capivara aprovados integrados com hash e limite de peso verificados no build.
8. Service worker coerente, cache-first imutável, com retenção do release atual e do anterior e sem chamadas de rede de produto.

## Evidências verificadas

- `npm run check`: aprovado.
  - lint: 28 arquivos JavaScript válidos;
  - busca de execução dinâmica: sem `eval()` ou `new Function()`;
  - testes unitários/integração: 31/31 aprovados;
  - build estático: 5 etapas, 37 habilidades e assets aprovados;
  - shell gzip estático estimado: `157578 bytes`, abaixo de `500 KB`.
- `npm run test:e2e:chromium`: 12/12 aprovados em Chromium real.
  - primeira utilização, erro, acerto, conclusão e revisão;
  - todas as etapas e habilidades de Matemática;
  - persistência e retomada;
  - migração V1→V2, backup e idempotência;
  - Português fail-closed;
  - teclado, foco, alvos de toque e responsividade;
  - primeira carga online, atualização segura e sessão offline;
  - matriz visual de início, atividade, feedback, resultado e área do responsável;
  - console sem erros e runtime restrito à origem local do teste.

Os dois primeiros E2E longos inicialmente expuseram uma corrida entre a renderização da próxima questão e a gravação IndexedDB. A ordem foi corrigida para renderizar o estado já atualizado antes de aguardar persistência; a suíte completa passou depois da correção.

## Assets aprovados integrados

| arquivo | bytes | SHA-256 |
|---|---:|---|
| `images/icon-192x192.png` | 6441 | `0137c76297efbbd7914d692da43948bda8a975344ea468b71a8bf463cab3d1d6` |
| `images/icon-512x512.png` | 37370 | `c7ba4443b5985f8b598cad6b4741b94c18d6ffea943b8d4f69d2545371ffb93a` |
| `images/favicon-48.png` | 713 | `474b80acd536522000689d6d9009bb4434ea997af157e378711668c9583566d0` |
| `images/capybara/welcome.webp` | 21072 | `7bf4e244dff15570716d0d899f00e4ed19bea8f23a40b7d793caa345604111a0` |
| `images/capybara/complete.webp` | 41256 | `97c95a84eab6e5684fdb38d85a4d7d9696609af83c82c8da23c801f8659e0a60` |
| `images/capybara/trail-marker-256.png` | 15560 | `5281e51df7dcdfc0e1f531a520cd7dc905ee6bf83cb0ad7949a514904ae79613` |

## Não testado ou não liberado

- transferência fria real com compressão do host de produção: não testada; somente estimativa gzip reprodutível do build.
- instalação em dispositivo físico e cotas reais de armazenamento: não testadas.
- áudio pedagógico pt-BR, imagens pedagógicas, microcorpus e sessão infantil de Português: não liberados; ausentes por contrato.
- voz sintética, Firebase, telemetria, anúncios, compras, contas e chamadas externas em runtime: não implementados.

## Próximo gate

Submeter este commit ao supervisor com `$lumon-supervisao-final`. A implementação de conteúdo de Português só pode avançar quando os pacotes editoriais aprovados forem publicados e o estado deixar `blocked-content`.
