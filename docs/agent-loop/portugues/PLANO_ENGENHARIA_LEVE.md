# Plano de engenharia leve de Português — Gate G2

> **Estado:** recomendação do engenheiro para revisão independente
> **Execução:** `pt-20260718T150534Z-engenheiro-214f180`
> **Chave de idempotência:** `G2_ENGENHARIA_LEVE:engenheiro:214f1804a3298e196f504c3c5abafb464fbe4331`
> **Commit de entrada publicado:** `532c6ddceb1f795901dabfe545d827db1d8be7ae`
> **Implementação:** não autorizada
> **Autoridade:** `_reversa_sdd/norte-modulo-portugues.md`

## 1. Escopo, autoridade e classificação da evidência

Este documento detalha tecnologia, processo editorial técnico, armazenamento, pacote, cache, PWA, desempenho, recuperação e testes para Português. Ele não implementa o produto, não escolhe conteúdo final, não desenha interface, não gera áudio ou imagem e não aprova o próprio gate.

Ordem aplicada:

1. decisões explícitas do usuário e Norte;
2. plano geral do Lumon;
3. contrato pedagógico G1 e supervisão aprovada;
4. contrato arquitetural G2 e supervisão aprovada;
5. propostas deste plano, somente se aceitas pelo supervisor.

As afirmações usam estas marcas:

- **NORTE/APROVADO:** decisão já fixada no Norte.
- **G1/G2 APROVADO:** contrato aceito por supervisão independente.
- **TESTADO NESTA EXECUÇÃO:** comando ou inspeção objetiva executada no commit de entrada.
- **OBSERVADO POR LEITURA:** fato do código/configuração atual; não prova comportamento futuro.
- **PROPOSTA ENG-G2:** decisão operacional nova deste plano; aguarda supervisor.
- **INFERIDO:** consequência técnica plausível que ainda exige prova.
- **NAO TESTADO:** requisito futuro sem evidência executável nesta entrega documental.

Em conflito, prevalece o Norte. Nenhum `PROPOSTA ENG-G2` autoriza implementação.

## 2. Baseline atual

### 2.1 Procedência

**TESTADO NESTA EXECUÇÃO:**

- raiz Git: `/Users/yoshida/Documents/Codex/2026-07-16/quai/Lumon`;
- branch: `feature/evolucao-pedagogica`;
- `HEAD`, `origin/feature/evolucao-pedagogica` e `FETCH_HEAD`: `532c6ddceb1f795901dabfe545d827db1d8be7ae` após `git fetch`;
- worktree limpa antes e depois dos testes;
- lock global pertence ao mesmo `run_id`;
- o `run_id` e a chave de idempotência existem somente no claim canônico de `STATUS.yaml`; não havia handoff nem commit desta execução.

### 2.2 Código e armazenamento existentes

**OBSERVADO POR LEITURA:**

- PWA estática, sem framework, com módulos ES e sem dependência de runtime.
- Estado atual é JSON em `localStorage`, chave `lumon-state-v1`, `schemaVersion: 1`, um perfil `local-child` e uma sessão ativa materializada.
- Matemática tem cinco etapas e 37 habilidades; geração recebe seed e usa PRNG injetado.
- O service worker atual possui somente `lumon-shell-*`, precache de shell e `stale-while-revalidate`; ainda não há pacote de Português, cache de conteúdo ou cache de mídia.
- O shell ativo pode revalidar arquivos isoladamente dentro do mesmo cache. Isso não comprova coerência de release para a expansão futura.
- Não há `HTMLAudioElement` compartilhado, pacote MP3, manifesto editorial, hash de asset, IndexedDB, Firebase, analytics, TTS de runtime ou API de conteúdo.
- O único pacote de desenvolvimento é `@playwright/test`; lint, unidade, integração e build usam Node.js e scripts locais.
- A suíte E2E existente usa somente Chromium/Chrome e cobre Matemática, teclado, persistência, atualização, offline e cinco viewports.

### 2.3 Testes executados

**TESTADO NESTA EXECUÇÃO:**

| Verificação | Resultado |
|---|---|
| `npm run check` | Aprovado |
| Sintaxe/lint | 20 arquivos JavaScript válidos |
| Execução dinâmica | nenhuma ocorrência executável de `eval()` ou `new Function()` |
| Unidade/integração | 21/21 aprovados |
| Build estático | 5 etapas, 37 habilidades e manifesto PWA aprovados |
| `npm run test:e2e:chromium` | 10/10 aprovados |
| E2E offline/PWA atual | primeira carga online, sessão retomada offline, atualização e preservação de cache externo aprovadas no cenário existente |
| Busca de rede/fornecedores | nenhuma referência de produto a Firebase, analytics, `XMLHttpRequest`, `WebSocket`, `EventSource`, `sendBeacon`, síntese ou reconhecimento de fala |

A primeira tentativa E2E não iniciou servidor local por restrição de sandbox (`PermissionError: [Errno 1] Operation not permitted`). A mesma suíte foi repetida com permissão para bind local/Chrome e terminou aprovada. Isso é falha ambiental inicial, não falha do produto.

### 2.4 Baseline de peso

**TESTADO NESTA EXECUÇÃO:** a soma de `gzip -c` por entrada do `SHELL_ASSETS`, contando `./` e `./index.htm` como duas respostas, foi `487.673` bytes. É uma aproximação estática, não uma medição de `transferSize` do host final.

- Limite do Norte: `500.000` bytes transferidos comprimidos para shell inicial sem áudio.
- Margem aproximada atual: `12.327` bytes, apenas `2,5%`.
- `images/icon-512x512.png`: `385.793` bytes armazenados e `385.948` bytes no ensaio gzip.
- Limite do Norte para asset visual individual embarcado: `150.000` bytes.

**PROPOSTA ENG-G2:** tratar a margem mínima do shell e o ícone atual acima do orçamento como risco P1 e critério bloqueante de uma implementação futura. O gate de frontend/arte deverá propor otimização/substituição; este documento não altera o asset existente.

**NAO TESTADO:** compressão e cabeçalhos do host de produção, `transferSize` em aparelho real, cache frio real e peso do futuro shell com Português.

## 3. Decisões técnicas fixas preservadas

1. **NORTE/APROVADO:** MP3 estático pt-BR, sem TTS em runtime.
2. **NORTE/APROVADO:** reprodução somente após clique/toque explícito em **Ouvir**; autoplay não é requisito.
3. **NORTE/APROVADO:** um único `HTMLAudioElement`; nunca há reproduções sobrepostas.
4. **NORTE/APROVADO:** Etapa 1 é preparada no setup adulto; etapas seguintes antes do primeiro uso; biblioteca inteira não é baixada na primeira inicialização.
5. **NORTE/APROVADO:** cache de áudio fica separado do shell.
6. **NORTE/APROVADO:** V1 funciona offline, sem backend e sem transmitir dados da criança.
7. **G2 APROVADO:** pacote usa staging, validação integral, ativação atômica, versão fixada por sessão e rollback.
8. **G2 APROVADO:** pacote contém dados, nunca código; registros de gerador, avaliador, normalizador e renderizador são fechados no build.
9. **G2 APROVADO:** blobs, MP3, imagens, data URLs e base64 ficam fora do estado e de `localStorage`.
10. **G2 APROVADO:** Matemática preserva IDs, seeds, perguntas, sessões, progresso e comportamento.
11. **NORTE/APROVADO:** interface confirma visualmente toque em até 100 ms, transições duram no máximo 250 ms e redução de movimento preserva compreensão.

## 4. Pipeline editorial de áudio

### 4.1 Fonte e encode

**PROPOSTA ENG-G2:**

1. Aprovar roteiro, função pedagógica, `scriptId` e `scriptVersion` antes de produzir som.
2. Capturar ou receber master lossless em WAV PCM ou FLAC. O master preservado não é derivado de MP3/AAC/OGG.
3. Editar ruído, cortes, ganho e silêncio somente no master lossless.
4. Gerar o arquivo distribuível diretamente desse master, com uma única compressão lossy:
   - codec MP3;
   - mono;
   - `24.000 Hz`;
   - `32 kbps` nominal como padrão inicial;
   - `40 kbps` somente para a classe de fala em que teste auditivo cego, registrado, demonstre ganho didático relevante.
5. Não recodificar MP3. Toda correção volta ao master e produz nova `assetVersion`.
6. Validar tecnicamente com `ffprobe` e validador Node antes de revisão humana.
7. Submeter pronúncia, clareza, ritmo, acolhimento e adequação didática a humano identificado.
8. Usar gravação humana quando TTS editorial não representar corretamente letra, fonema, sílaba, dígrafo, prosódia ou palavra.
9. Somente estado `approved` entra em pacote ativável.

O encoder editorial recomendado é `ffmpeg`/`ffprobe` fixado por versão e argumentos, como ferramenta externa de build, nunca dependência do navegador. A execução futura deverá registrar binário, versão, sistema e linha de argumentos. Nenhum fornecedor, chave ou SDK entra no cliente.

### 4.2 Proveniência mínima

**PROPOSTA ENG-G2:** cada áudio registra no manifesto ou registro editorial referenciado:

- `assetId`, `assetVersion`, `scriptId`, `scriptVersion` e texto canônico;
- `language: pt-BR`, função pedagógica e itens que o usam;
- método `editorial-tts` ou `human-recording`;
- para TTS editorial: fornecedor, voz, versão do perfil e parâmetros;
- para gravação: origem, autorização/licença e versão do master;
- SHA-256 do master lossless e do MP3 distribuído;
- encoder, versão, argumentos, data de produção e operador;
- duração, canais, sample rate, bitrate nominal e bytes;
- revisão de pronúncia, revisor, data, resultado e observações;
- licença, estado de aprovação e motivo de bloqueio quando aplicável.

SHA-256 prova integridade dos bytes, não autoria ou licença. Aprovação editorial e proveniência continuam obrigatórias.

### 4.3 Validação técnica por arquivo e lote

**PROPOSTA ENG-G2:** o build falha se:

- codec, mono, `24 kHz` ou bitrate aprovado divergirem;
- arquivo vier de fonte lossy ou tiver mais de um encode registrado;
- SHA, tamanho ou duração divergirem do manifesto;
- proveniência, licença, roteiro ou revisão humana estiverem ausentes;
- asset essencial não estiver `approved`;
- mediana do lote ultrapassar `24 KiB` ou p95 ultrapassar `64 KiB`;
- variante a `40 kbps` não referenciar evidência auditiva aprovada.

O p95 usa nearest-rank: ordenar bytes crescentes e selecionar posição `ceil(0,95 × N)`. Mediana e p95 são calculados por pacote e no conjunto completo de Português.

## 5. Runtime de áudio por toque

### 5.1 Controlador único

**PROPOSTA ENG-G2:** um `AudioController` de composição possui exatamente um `HTMLAudioElement`, criado uma vez e não exposto ao domínio pedagógico.

Contrato lógico:

```ts
interface AudioController {
  play(ref: VersionedAudioRef, gestureToken: string): Promise<AudioOutcome>;
  stop(reason: "replace" | "exit" | "error"): void;
  preload(refs: VersionedAudioRef[]): Promise<void>;
  getState(): "idle" | "loading" | "playing" | "error";
}
```

Regras:

- `play` só nasce de gesto explícito de botão/teclado equivalente.
- O toque altera estado visual no próximo frame; a reprodução pode começar depois sem apagar essa confirmação.
- Antes de trocar o asset: incrementar token de operação, `pause()`, zerar `currentTime`, substituir `src`, chamar `load()` e aguardar a promessa de `play()`.
- Evento ou promessa de token antigo é ignorado; não pode alterar o novo estado.
- Repetir **Ouvir** no mesmo asset reinicia de forma determinística, sem criar outro elemento.
- Saída da atividade, pacote bloqueado ou asset trocado chama `stop`.
- Nunca usar `AudioContext`, buffer decodificado de lote ou múltiplos elementos por item na V1.
- A fila contém o descritor atual e, no máximo, o próximo. Preload valida existência/cache; não materializa biblioteca em memória.
- URL de mídia é same-origin, versionada e imutável. O service worker resolve a versão exata fixada pela sessão.
- `ended`, `error`, `abort`, `stalled`, `canplay` e rejeição de `play()` possuem transições explícitas e testadas.
- Falha essencial resulta em item `invalid`/`inconclusive`, nunca erro da criança.

### 5.2 Requisições e heap

**PROPOSTA ENG-G2:** mídia é servida como `Response` de Cache Storage por URL versionada. O service worker aceita `Range` quando o navegador solicitar e devolve `206` coerente, sem buscar host externo. Não criar base64 nem persistir `Blob` no estado.

O resolvedor mantém somente metadados do atual/próximo. Object URL só pode existir como fallback comprovadamente necessário; se usado, deve ser um por vez e revogado em troca/erro/saída. A preferência é URL same-origin atendida pelo cache, que reduz cópia no heap JavaScript.

### 5.3 Estados acessíveis e erro

Sem desenhar UI, o contrato técnico exige:

- estado `idle`, `loading`, `playing` e `error` perceptível por nome/estado acessível, não apenas cor/animação;
- botão acionável por toque, mouse, Enter e Espaço;
- foco não é roubado ao iniciar ou terminar áudio;
- erro é anunciado de forma curta e permite nova tentativa ou retorno ao preparo adulto;
- redução de movimento remove pulso/animação, mas mantém mudança estática equivalente;
- quando ouvir é a habilidade avaliada, indisponibilidade bloqueia o item explicitamente;
- quando áudio é apoio, fallback só ocorre se o contrato pedagógico do item permitir.

## 6. Serialização canônica, SHA-256 e validação

### 6.1 Regra canônica

**PROPOSTA ENG-G2:** JSON normativo usa JSON Canonicalization Scheme, RFC 8785, codificado em UTF-8, sem BOM. Não se cria dialeto próprio.

- Objetos obedecem à ordenação/serialização RFC 8785.
- Arrays preservam ordem; ordem de índices no manifesto é normativa.
- Valores não JSON, números não finitos, chaves duplicadas ou Unicode inválido são rejeitados no pipeline antes da publicação.
- Datas usam UTC ISO-8601 já normalizada; caminhos usam `/` e são relativos ao escopo Lumon.
- Build e browser compartilham fixtures de bytes canônicos e hashes esperados.

Hashes:

```text
item.sha256       = SHA-256(bytes RFC8785 do item)
asset.sha256      = SHA-256(bytes exatos do arquivo)
manifestSha256    = SHA-256(bytes RFC8785 do manifesto sem a propriedade
                            top-level manifestSha256)
```

Ao validar o manifesto, remover somente a propriedade top-level `manifestSha256`, nunca um campo homônimo aninhado. Depois de calcular, comparar em tempo constante quando a API usada permitir. SHA-256 usa `node:crypto` no build e Web Crypto no browser; não requer biblioteca de runtime.

### 6.2 Validação antes de staging

**PROPOSTA ENG-G2:** rejeitar antes de baixar mídia quando houver:

- schema/versão desconhecidos;
- `subjectId`, fonte, etapa, pacote ou versão incompatíveis;
- pacote não aprovado, bloqueado ou expirado;
- ID duplicado, ID reutilizado com semântica diferente ou referência ausente;
- caminho absoluto, `..`, query/hash inesperado, origem externa ou MIME não permitido;
- tamanho negativo, total incoerente ou orçamento excedido;
- avaliador, normalizador, renderizador ou versão não presentes no registro fechado do build;
- item sem habilidade, resposta/rubrica, elegibilidade, proveniência ou aprovação;
- asset essencial sem licença, função, revisão ou aprovação;
- manifesto cujo hash canônico diverge.

### 6.3 Validação durante staging

Para cada item/asset:

1. baixar ou ler somente URL same-origin declarada;
2. limitar bytes lidos ao valor declarado e ao orçamento do pacote;
3. validar status HTTP, MIME, bytes e SHA-256;
4. validar JSON canônico e schema de item;
5. validar MP3 por metadados técnicos e imagem por dimensões/formato quando aplicável;
6. conferir integridade referencial entre itens, assets e licenças;
7. conferir contagem e `totalBytes` recalculados;
8. executar fixtures de sessão/renderizador sem executar conteúdo como código.

Somente o conjunto integralmente válido pode tornar-se candidato à ativação.

## 7. Escolha física de armazenamento

### 7.1 Decisão

**PROPOSTA ENG-G2:** usar apenas APIs nativas, com duas superfícies físicas:

| Dado | Armazenamento | Motivo |
|---|---|---|
| Estado V2 da criança, `revision`, sessão/progresso e preferências | IndexedDB | gravação transacional, revisão explícita e crescimento controlado sem `localStorage` |
| Fonte V1 bruta, backup, candidato e journal de migração | IndexedDB, preservando `lumon-state-v1` original em `localStorage` | rollback e retomada idempotente |
| Manifestos, itens JSON, catálogo, staging e ponteiro ativo | IndexedDB | transação atômica entre validação lógica e ponteiro ativo |
| MP3 e imagens de pacote | Cache Storage `lumon-media-portugues-*` | `Response` binária, same-origin e serviço offline |
| Shell PWA | Cache Storage `lumon-shell-*` | release coerente e separado de conteúdo |

Banco inicial: `lumon-local-v2`, com stores lógicos `learnerState`, `migrationJournal`, `packageCatalog`, `packageManifests`, `contentItems` e `activePackages`. Nomes físicos finais podem ganhar prefixo de schema, mas sem misturar blobs.

Não guardar em `localStorage`/estado:

- MP3, imagem, `Blob`, `ArrayBuffer`, data URL ou base64;
- manifesto completo ou item editorial;
- cache de shell/mídia;
- credencial, SDK ou configuração futura de backend.

Essa escolha substitui a possibilidade arquitetural de manter o JSON V2 em `localStorage` porque IndexedDB oferece transação e concorrência reais com API nativa, sem dependência adicional. O adapter mantém o contrato `LearnerStateRepository`; Firebase continua apenas fronteira documental futura.

### 7.2 Concorrência e falha

**PROPOSTA ENG-G2:**

- uma transação de leitura-escrita compara `expectedRevision` e grava estado/revisão juntos;
- evento `versionchange` fecha conexão antiga e pede recarga segura;
- pacote/versão é imutável; duas instalações idênticas são idempotentes;
- `navigator.locks` pode reduzir trabalho duplicado quando disponível, mas correção não depende dele;
- concorrência entre abas é provada com IndexedDB real no Playwright, não somente mock;
- crash antes do commit deixa transação abortada; crash depois do commit deixa ponteiro completo;
- erro de IndexedDB bloqueia nova prática que exija escrita, mas não apaga estado nem pacote.

## 8. Staging, ativação atômica e rollback

### 8.1 Identidade física

**PROPOSTA ENG-G2:**

```text
content key = subjectId/packageId/packageVersion/itemId/itemVersion
media URL   = /__lumon_media__/portugues/packageId/packageVersion/assetId/assetVersion
media cache = lumon-media-portugues-packageId-packageVersion-manifestHash12
active key  = portugues/packageId
```

O ponteiro ativo registra `packageId`, `packageVersion`, `manifestSha256`, cache de mídia, versões de contrato/conteúdo, `activatedAt` e `revision`. Sessão copia esses valores ao iniciar.

### 8.2 Fluxo de instalação

1. Ler estado atual e estimar quota.
2. Validar envelope/manifesto canônico antes de mídia.
3. Criar registro de staging e cache imutável ainda não referenciado.
4. Gravar itens/manifesto com `status: staging`.
5. Baixar e validar todos os assets no cache de staging.
6. Reler conteúdo/mídia, recalcular contagem, bytes e hashes.
7. Executar validações de compatibilidade e orçamento.
8. Em uma transação IndexedDB, marcar catálogo `ready` e trocar o ponteiro ativo se `expectedActiveVersion` ainda combinar.
9. Reler ponteiro e manifesto; somente então informar pacote pronto.
10. Manter versão anterior enquanto sessão a referenciar ou até novo pacote provar saúde.

Cache Storage não possui rename transacional. Por isso, o cache recebe nome final imutável desde o staging, mas permanece invisível sem ponteiro ativo. A troca de um único ponteiro IndexedDB torna a ativação atômica.

### 8.3 Rollback

- Falha antes do ponteiro: abortar transação, apagar staging próprio e preservar ativo.
- Falha após ativação detectada pelo health check: transação volta o ponteiro à última versão validada.
- Sessão iniciada continua usando sua versão; atualização só vale para nova sessão.
- Versão anterior não é removida enquanto houver `activeSession`/referência persistida.
- Se ambas as versões falharem, pacote vira `corrupted`/`blocked`; progresso permanece intacto.
- Rollback de app não sobrescreve nem apaga estado V2. V1 original permanece recuperável conforme contrato arquitetural.

## 9. Estados de pacote, quota e recuperação

### 9.1 Máquina de estados

**PROPOSTA ENG-G2:**

```text
absent -> preparing -> verifying -> ready
            |             |
            v             v
      insufficient-space  corrupt
            |             |
            +----> absent/repairing

qualquer estado editorial -> blocked
ready + nova versão -> update-available -> preparing (sem tocar no ativo)
```

`expired` existe no contrato para pacote temático futuro, mas não é usado pelo corpus Lumon V1.

### 9.2 Tratamento por cenário

| Cenário | Comportamento obrigatório |
|---|---|
| Ausente | Fluxo adulto prepara Etapa 1/etapa necessária; criança não recebe item dependente |
| Incompleto | Staging é invisível e removível; ativo anterior fica intacto |
| Corrompido no staging | Rejeitar, registrar código técnico sem dado infantil e apagar somente staging próprio |
| Corrompido ativo | Invalidar item, interromper áudio essencial, oferecer reparo adulto e preservar sessão/progresso |
| Bloqueado editorialmente | Não baixar/ativar; nenhuma substituição silenciosa |
| Sem quota | Limpar somente staging/versão antiga elegível; manter `insufficient-space` e orientar adulto |
| Atualização em sessão | Sessão usa versão fixada; nova versão fica para a próxima |
| App fechado durante preparo | Retomar por manifesto/hash ou limpar staging idempotentemente |
| Falha de rede | Ativo continua; staging pausa/falha sem afetar corpus pronto |
| Asset essencial ausente | Item inválido/inconclusivo, nunca erro infantil |
| Asset de apoio ausente | Fallback apenas se função pedagógica permitir |

### 9.3 Quota

**PROPOSTA ENG-G2:** antes do staging, consultar `navigator.storage.estimate()` e exigir espaço estimado para:

```text
bytes declarados do pacote
+ overhead medido do navegador
+ margem de segurança = max(1 MiB, 20% dos bytes do pacote)
```

A estimativa pode ser imprecisa. O fluxo ainda captura `QuotaExceededError` em cada write. A margem é proposta inicial e deve ser calibrada em aparelhos modestos sem reduzir os tetos do Norte.

Ordem de limpeza automática:

1. staging incompleto do próprio Lumon;
2. pacote temático expirado futuro;
3. versão antiga sem sessão/referência;
4. somente após confirmação adulta, pacote opcional pronto.

Nunca apagar automaticamente estado/progresso, sessão ativa, backup/journal de migração, pacote ativo necessário ou cache de outro app/origem.

## 10. Shell, conteúdo, atualização e offline

### 10.1 Namespaces

**PROPOSTA ENG-G2:**

- `lumon-shell-<releaseHash>`: HTML, CSS, JS, manifesto e ícones coerentes;
- IndexedDB: manifestos/itens/catálogo/pacote ativo;
- `lumon-media-portugues-*`: MP3/imagens versionados;
- estado e migração: stores IndexedDB separados de cache.

### 10.2 Política do shell

O service worker futuro:

1. cria cache novo por release durante `install`;
2. baixa e valida a lista completa; instalação falha se faltar item;
3. nunca grava recurso revalidado isoladamente no cache shell ativo;
4. serve o shell coerente cache-first depois da primeira instalação;
5. detecta release novo por atualização do service worker;
6. só usa `skipWaiting` após ação explícita prevista no fluxo de atualização;
7. mantém versão anterior enquanto cliente antigo puder depender dela;
8. remove apenas `lumon-shell-*` comprovadamente sem referência;
9. nunca limpa `lumon-media-*`, IndexedDB, progresso ou cache externo durante ativação do shell.

Isso substitui, na implementação futura, o `stale-while-revalidate` atual para arquivos normativos do shell. A mudança ainda é **NAO TESTADA** e depende de G4.

### 10.3 Política de conteúdo/mídia

- Conteúdo e mídia são imutáveis por versão e não entram no shell inicial.
- Etapa 1 é preparada pelo responsável; outras etapas sob demanda antes do uso.
- Atualização é staged em paralelo e não troca referências de sessão ativa.
- Serviço offline resolve somente URL same-origin/versionada presente no pacote fixado.
- Nenhum CDN, fonte web, TTS, analytics ou host externo é fallback crítico.
- Limpeza usa allowlist de prefixos Lumon e escopo/origem; teste cria cache externo sentinela.
- Pacote não confirmado como `ready` nunca é anunciado como offline.

## 11. Orçamentos e método de medição

### 11.1 Limites bloqueantes

| Medida | Limite inicial | Regra de cálculo |
|---|---:|---|
| Shell inicial sem áudio | `500.000` bytes comprimidos | soma de transferências frias do release; sem áudio |
| Português total | `8 MiB` = `8.388.608` bytes | união de manifestos, itens e mídia ativos da V1 |
| Uma etapa | `2 MiB` = `2.097.152` bytes | bytes declarados e bytes físicos recalculados |
| MP3 mediano | `24 KiB` = `24.576` bytes | mediana por pacote e total |
| MP3 p95 | `64 KiB` = `65.536` bytes | nearest-rank p95 |
| Início em cache p95 | `100 ms` | gesto `pointerup`/teclado até evento `playing` |
| Início online p95 | `800 ms` | mesma janela, asset ausente do cache e rede controlada |
| Heap incremental de áudio | `5 MiB` = `5.242.880` bytes | delta estabilizado após sequência de reprodução |
| Asset visual individual | `150.000` bytes | bytes distribuídos do arquivo |
| Confirmação visual do toque | `100 ms` | gesto até primeiro frame com estado confirmado |
| Transição | `250 ms` | duração CSS/JS efetiva; reduzida quando solicitado |

Orçamento é condição de aprovação; média não compensa p95 excedido.

### 11.2 Aparelhos e amostra

**PROPOSTA ENG-G2:** medir, no mínimo:

- um Android físico modesto com 2–4 GiB de RAM, Chrome/PWA instalada, modelo/SoC/OS/browser registrados;
- um desktop Chromium de referência para repetibilidade automatizada;
- Safari/iOS e outra engine quando disponíveis, classificados como testados ou `NAO TESTADO`, nunca inferidos a partir do Chromium.

Para cada perfil:

- build de produção/release, cache/storage limpos quando o caso exigir;
- bateria sem economia extrema e sem outras tarefas pesadas conhecidas;
- 1 aquecimento não contado e pelo menos 30 observações válidas por cenário;
- p50 e p95 nearest-rank, falhas e outliers preservados no relatório;
- ensaio cacheado percorre pelo menos 20 MP3 distintos do pacote;
- ensaio online usa servidor same-origin, cache removido e perfil reproduzível de `1,6 Mbps` down, `750 kbps` up e `150 ms` RTT;
- repetir em rede sem throttling para separar custo de app e custo de transporte.

### 11.3 Instrumentação

- Marcas `performance.mark` no gesto, troca de estado, `play()` e `playing`.
- Event Timing/`requestAnimationFrame` para confirmação visual do toque.
- Playwright coleta amostras e exporta JSON/CSV de evidência; nenhuma telemetria entra no produto.
- Heap em Chromium via protocolo DevTools, com baseline estabilizada, coleta após 50 reproduções/trocas e GC apenas no harness de teste.
- Registrar heap inicial/final, máximo, listeners, object URLs e quantidade de elementos de áudio.
- `PerformanceResourceTiming`/HAR de ambiente de teste mede `transferSize`, origem e cache; dados infantis sintéticos apenas.
- Script de orçamento soma bytes físicos, gzip e, quando host suportar, transferência real com `Content-Encoding` registrado.

Se a API de heap não cobrir memória nativa de decoder, registrar limitação e complementar com painel de memória/OS manual. Não chamar estimativa de prova.

## 12. Interface responsiva como limite técnico

Sem definir layout, a implementação futura deve:

- mudar estado visual do controle até 100 ms após toque/teclado;
- não bloquear main thread para hash, leitura ampla do pacote ou preload de biblioteca;
- fatiar validação pesada fora do fluxo infantil e no setup adulto;
- limitar transições a 250 ms;
- respeitar `prefers-reduced-motion` e preferência local sem remover informação;
- manter botão funcional durante repetição, com debounce apenas contra duplicação física, não contra tentativa legítima;
- preservar foco, teclado, nomes/estados acessíveis e alvo mínimo definido no Norte;
- não usar áudio, cor, gesto, texto ou movimento como único canal, salvo som quando a própria habilidade auditiva é avaliada e indisponibilidade está tratada.

Teste de toque mede resposta visual, não espera o áudio começar. Latência de áudio tem orçamento próprio.

## 13. Ferramentas mínimas

### 13.1 Manter

- JavaScript/módulos ES nativos, sem framework de runtime.
- `node:test` para unidade/integração.
- scripts Node pequenos com `node:crypto`, `fs`, `zlib` e JSON canônico testado.
- Playwright existente para navegador real, IndexedDB, Cache Storage, service worker, offline, quota simulada e matriz visual/técnica.
- `ffmpeg`/`ffprobe` somente no pipeline editorial.

### 13.2 Não adicionar por preferência

- framework SPA, gerenciador de estado ou banco embutido;
- SDK de áudio, player de terceiros ou Web Audio para simples reprodução;
- Firebase, analytics, TTS, reconhecimento de fala ou backend;
- biblioteca de hash quando Node/Web Crypto bastam;
- mock como única prova de IndexedDB, Cache Storage, service worker ou áudio.

**PROPOSTA ENG-G2:** nenhuma dependência de runtime nova é necessária. Dependência de desenvolvimento só entra se um teste objetivo impossível com ferramentas existentes justificar tamanho, licença e manutenção; o supervisor deve ver essa justificativa.

### 13.3 Scripts futuros recomendados

Sem criá-los nesta entrega:

- `check:forbidden`: execução dinâmica, hosts externos, SDKs e base64 de mídia;
- `audio:validate`: formato, proveniência, bytes e revisão;
- `package:validate`: RFC 8785, SHA-256, schemas e referências;
- `budget:check`: shell, pacote, etapa, asset, mediana/p95;
- `test:packages`: corrupção, staging, quota e rollback;
- `test:performance:audio`: latência/heap em ambiente controlado.

`npm run check` futuro agrega verificações determinísticas e rápidas. E2E/PWA/performance podem permanecer comandos separados de CI por duração, mas são obrigatórios antes do gate aplicável.

## 14. Matriz de testes futura

Tudo nesta seção é **NAO TESTADO** para Português nesta execução.

### 14.1 Áudio e editorial

| ID | Tipo | Cenário | Aceite objetivo |
|---|---|---|---|
| `AUD-01` | Auto | Formato | todo MP3 mono, 24 kHz, 32 kbps ou exceção 40 kbps aprovada |
| `AUD-02` | Auto | Fonte/encode | master lossless, um encode e hashes/proveniência completos |
| `AUD-03` | Manual | Pronúncia | revisão humana aprova; casos inadequados usam gravação humana |
| `AUD-04` | Auto/E2E | Toque explícito | zero reprodução antes de gesto; mouse/teclado/toque funcionam |
| `AUD-05` | E2E | Repetição rápida | 20 acionamentos/trocas, um elemento e zero sobreposição |
| `AUD-06` | E2E | Cancelamento | sair/trocar/erro interrompe som e ignora evento antigo |
| `AUD-07` | E2E | Estados de erro | ausente/corrupto/bloqueado/decode/play rejeitado ficam explícitos |
| `AUD-08` | Auto | Preload | fila contém atual + no máximo próximo; biblioteca não materializada |
| `AUD-09` | Perf | Latência | cache p95 ≤100 ms e online p95 ≤800 ms |
| `AUD-10` | Perf | Heap | delta estabilizado ≤5 MiB; sem vazamento por listener/object URL |
| `AUD-11` | Auto | Peso | mediana ≤24 KiB, p95 ≤64 KiB e pacote dentro do teto |
| `AUD-12` | E2E | Range/offline | respostas 200/206 corretas e reprodução integral offline |

### 14.2 Manifesto, pacote e quota

| ID | Tipo | Cenário | Aceite objetivo |
|---|---|---|---|
| `PKG-01` | Unit | Canonicalização | fixtures RFC 8785 produzem bytes e SHA esperados em Node/browser |
| `PKG-02` | Unit | Sem autorreferência | mudar `manifestSha256` não muda payload; mudar outro campo muda hash |
| `PKG-03` | Auto | Integridade | item/asset/tamanho/MIME/referência divergente bloqueia staging |
| `PKG-04` | Browser | Ativação | ponteiro só muda depois de conteúdo e mídia integralmente válidos |
| `PKG-05` | Browser | Crash por passo | reinício preserva ativo e remove/retoma staging idempotentemente |
| `PKG-06` | Browser | Ausente | criança não recebe item dependente; preparo adulto é recuperável |
| `PKG-07` | Browser | Incompleto/corrupto | ativo anterior permanece; falha não vira erro infantil |
| `PKG-08` | Browser | Bloqueado | estado editorial não aprovado nunca ativa |
| `PKG-09` | Browser | Quota | falha em cada write preserva estado, sessão, backup e ativo |
| `PKG-10` | Browser | Limpeza | remove só staging/versão Lumon elegível; cache sentinela sobrevive |
| `PKG-11` | Browser | Atualização em sessão | sessão mantém versão; nova sessão usa novo ponteiro |
| `PKG-12` | Browser | Rollback | health check falho volta à versão anterior validada |
| `PKG-13` | Browser | Duas abas | revision/conflito explícito; zero última escrita silenciosa |
| `PKG-14` | Auto | Orçamentos | total ≤8 MiB e etapa ≤2 MiB em declarado e físico |

### 14.3 PWA e offline

| ID | Tipo | Cenário | Aceite objetivo |
|---|---|---|---|
| `PWA-01` | E2E | Shell coerente | release instala integralmente; nenhum arquivo híbrido é servido |
| `PWA-02` | E2E | Primeira carga | shell inicial não requisita áudio |
| `PWA-03` | E2E | Reinício offline | fatia vertical completa funciona após preparo e fechamento do app |
| `PWA-04` | E2E | Atualização | shell novo preserva IndexedDB, pacote, sessão e progresso |
| `PWA-05` | E2E | Cache externo | cache de terceiro/sentinela nunca é removido |
| `PWA-06` | E2E | Ativo antigo | cliente/sessão antiga conclui sem perder versão referenciada |
| `PWA-07` | Auto/E2E | Peso | shell frio transferido comprimido ≤500.000 bytes |
| `PWA-08` | Manual | Instalação | Android/desktop e iOS/Safari registrados como testados ou NAO TESTADO |

### 14.4 Migração e persistência

| ID | Tipo | Cenário | Aceite objetivo |
|---|---|---|---|
| `MIG-01` | Unit/Browser | V1→V2 | 37 IDs, seeds, perguntas, respostas, ordem e timestamps iguais |
| `MIG-02` | Browser | Sessão ativa | retoma mesmo índice/pergunta e próxima resposta equivalente |
| `MIG-03` | Unit/Browser | Domínio/revisão | resultados matemáticos deep-equal antes/depois |
| `MIG-04` | Browser | Idempotência | repetição não muda hash, backup, journal ou canônico |
| `MIG-05` | Browser | Crash/quota | falha em cada passo mantém V1 utilizável e V2 não ativado |
| `MIG-06` | Browser | Backup divergente | bloqueia sem sobrescrever fonte/cópia |
| `MIG-07` | Browser | Downgrade | V2 novo permanece recuperável; Português nunca some silenciosamente |
| `PER-01` | Browser | Duas matérias | retenção/revisão/domínio de uma não expulsa ou altera a outra |
| `PER-02` | Auto | Blob proibido | estado/manifestos não contêm Blob, base64, MP3 ou imagem |
| `PER-03` | Browser | Import/export | validação/checksum antecede troca; estado restaura deep-equal |

### 14.5 Privacidade, rede e segurança

| ID | Tipo | Cenário | Aceite objetivo |
|---|---|---|---|
| `PRI-01` | E2E | Interceptação | zero request com perfil, resposta, seed, progresso ou histórico |
| `PRI-02` | Auto | Dependências | bundle/lock sem Firebase, analytics, TTS runtime ou backend |
| `PRI-03` | E2E | Offline | depois do preparo, fluxo infantil não acessa host externo |
| `PRI-04` | Auto | Tema futuro | provider, rota, endpoint, flag e botão ausentes da V1 |
| `PRI-05` | Auto/E2E | Logs | erro técnico não contém resposta/histórico infantil |
| `SEC-01` | Auto | Execução dinâmica | lint bloqueia `eval`, `new Function`, import remoto e código editorial |
| `SEC-02` | Auto | Caminho/origem | manifesto rejeita traversal, URL externa, MIME e versão indevidos |
| `SEC-03` | Auto | Determinismo | mesma entrada/versões/seed gera snapshot canônico idêntico |
| `SEC-04` | Auto | Fontes não injetadas | gerador falha teste ao usar relógio ou `Math.random()` |

### 14.6 Desempenho e acessibilidade técnica

| ID | Tipo | Cenário | Aceite objetivo |
|---|---|---|---|
| `PERF-01` | Perf | Toque | confirmação visual p95 ≤100 ms sem long task bloqueante |
| `PERF-02` | Auto | Transição | todas ≤250 ms; reduced-motion tem equivalente compreensível |
| `PERF-03` | Perf | Pacote | hash/preparo não bloqueia fluxo infantil nem causa jank crítico |
| `A11Y-01` | E2E | Controles | Ouvir e erro funcionam por toque/mouse/teclado com foco preservado |
| `A11Y-02` | Auto/Manual | Estado | idle/loading/playing/error possuem nome e estado acessível |
| `A11Y-03` | Manual | Leitor de tela | VoiceOver/TalkBack anunciam controle, mudança e falha sem duplicação |
| `A11Y-04` | E2E | Canal | cor/som/gesto/movimento não são únicos, conforme exceção pedagógica |
| `A11Y-05` | E2E | Viewports | 360×640, 390×844, 768×1024, 1280×720 e paisagem sem corte |

### 14.7 Regressão de Matemática

| ID | Tipo | Cenário | Aceite objetivo |
|---|---|---|---|
| `REG-01` | Auto | Baseline | `npm run check` continua 100% aprovado |
| `REG-02` | E2E | Habilidades | 37 habilidades renderizam/respondem sem mudança não aprovada |
| `REG-03` | Auto | Seeds | snapshots dourados atuais permanecem byte a byte equivalentes |
| `REG-04` | E2E | PWA | sessão, revisão, domínio, desbloqueio, abandono e offline preservados |
| `REG-05` | Browser | Migração | V1/V2 produzem mesmo estado matemático e permitem rollback |

Mocks podem acelerar unidade, mas `PKG`, `PWA`, `MIG`, áudio e quota exigem prova complementar em navegador real.

## 15. Primeira fatia vertical — plano técnico comprovável

Esta seção especifica trabalho futuro; não implementa conteúdo, UI ou assets.

### 15.1 Pré-condições

- G4 autoriza implementação explicitamente.
- Microconjunto editorial de 3–5 palavras é aprovado depois, com áudio/imagem/licença reais.
- Pacote Etapa 1 atende manifesto, hashes, proveniência, orçamento e revisão humana.
- Contratos de módulo/sessão/tentativa/domínio G1/G2 permanecem normativos.

### 15.2 Sequência de prova

1. Migrar fixture V1 matemática para V2 e provar equivalência/rollback.
2. Instalar pacote Etapa 1 em staging e ativá-lo por ponteiro transacional.
3. Iniciar sessão com versão/seed fixas e sem baixar áudio no shell.
4. Tocar **Ouvir** explicitamente; provar um elemento, ausência de sobreposição e estados acessíveis.
5. Executar seleção e digitação; persistir tentativa por matéria sem blobs.
6. Executar erro, nova tentativa, pista e item análogo; não contar assistência como domínio.
7. Fechar app, ficar offline, retomar mesma sessão e reproduzir mídia do pacote fixado.
8. Disponibilizar versão nova durante a sessão; provar que só a próxima sessão a usa.
9. Corromper asset essencial; provar invalidação sem erro infantil nem perda de progresso.
10. Simular quota/staging interrompido; provar ativo/estado preservados.
11. Interceptar rede; provar zero dado infantil e zero host externo após preparo.
12. Medir peso, latência, heap, toque e regressão de Matemática.

### 15.3 Evidência mínima para supervisor

- commit/build exatos;
- manifestos e hashes de fixture/release;
- relatório de encode/revisão humana;
- saída dos testes por ID desta matriz;
- HAR/lista de requests, métricas brutas e cálculo p50/p95;
- dumps sanitizados de estado/ponteiro antes/depois;
- prova de versão fixada, rollback, quota e corrupção;
- `npm run check` e E2E Matemática completos;
- lista separada de `TESTADO`, `FALHOU`, `NAO TESTADO` e `INFERIDO`.

Uma sessão funcional não comprova domínio, calibração infantil, acessibilidade completa nem adequação pedagógica dos assets.

## 16. Riscos e controles

| Risco | Severidade proposta | Controle/critério de bloqueio |
|---|---:|---|
| Perda/reinterpretação de Matemática | P0 | equivalência, backup, journal, rollback e REG/MIG completos |
| Transmissão de dado infantil ou host crítico | P0 | interceptação zero, scan de bundle e falha do build |
| Código editorial/dinâmico executado | P0 | pacote só dados; registro fechado; `eval`/import remoto bloqueados |
| Pacote parcial marcado pronto | P1 | staging invisível, hashes integrais e ponteiro transacional |
| Sessão mistura versões | P1 | snapshot/pacote fixado e retenção da versão referenciada |
| Quota apaga estado/progresso | P1 | ordem de limpeza allowlisted; falha em cada write |
| Áudio sobreposto ou autoplay crítico | P1 | um elemento, gesto explícito e teste rápido de troca |
| Pronúncia mede criança incorretamente | P1 | revisão humana; gravação humana; item inválido em falha |
| Cache shell híbrido | P1 | cache imutável por release, sem SWR no shell normativo |
| Hash autorreferente/ambíguo | P1 | RFC 8785 + exclusão top-level + fixtures Node/browser |
| Shell/asset excede orçamento | P1 | budget check bloqueante; ícone atual exige correção futura autorizada |
| Latência ou heap excede limite | P1 | p95/heap em aparelho modesto; sem aprovação por desktop apenas |
| Limpeza remove cache externo | P1 | allowlist por origem/prefixo e sentinela E2E |
| IndexedDB indisponível/corrompido | P1 | fail-closed, export/recovery e nenhuma limpeza automática |
| Duas abas perdem escrita | P2 | transação/revision e E2E de conflito real |
| Range de mídia falha em engine | P2 | testes 200/206 por engine; registrar NAO TESTADO |
| Métrica de heap não cobre decoder nativo | P2 | declarar limite e complementar com medição manual/OS |
| Ferramenta pesada entra por preferência | P2 | zero dependência runtime; justificar qualquer dev dependency |

## 17. Critérios de bloqueio do próximo gate de implementação

O supervisor deve bloquear avanço para implementação/validação se qualquer item abaixo estiver ausente no plano aprovado ou falhar no build futuro:

- autorização explícita G4;
- preservação comprovável de Matemática e rollback;
- pacote sem staging/ponteiro atômico ou hash canônico;
- blob/base64 em estado/`localStorage`;
- áudio sem gesto explícito, com sobreposição ou TTS runtime;
- pacote/shell/asset acima do orçamento;
- latência/heap sem método e aparelho registrados;
- asset essencial sem proveniência, licença e revisão humana;
- limpeza capaz de tocar progresso, backup ou cache externo;
- request externo crítico ou transmissão de dado infantil;
- execução dinâmica/código vindo de pacote;
- evidência de PWA/offline somente por mock;
- item futuro marcado aprovado por inferência.

## 18. Decisões propostas para revisão independente

O supervisor deve aceitar, pedir retrabalho ou bloquear explicitamente:

1. pipeline MP3 lossless → encode único, mono/24 kHz/32 kbps e 40 kbps apenas por evidência;
2. proveniência e revisão humana bloqueantes por áudio;
3. controlador único com `HTMLAudioElement`, fila atual/próximo e cancelamento por token;
4. RFC 8785 + SHA-256 sem `manifestSha256` top-level;
5. IndexedDB para estado/manifestos/itens/ponteiro e Cache Storage para shell/mídia;
6. mídia same-origin versionada com suporte a Range;
7. ativação por cache imutável invisível + ponteiro IndexedDB transacional;
8. estados e recuperação de pacote/quota sem apagar progresso;
9. shell imutável por release, sem revalidação isolada do cache ativo;
10. margem de quota `max(1 MiB, 20%)` como configuração inicial calibrável;
11. método de medição, amostra, perfil de rede e p95 nearest-rank;
12. ferramentas existentes + Node/Web Crypto + ffmpeg editorial, sem dependência runtime nova;
13. matriz automatizada/manual e evidência mínima da fatia vertical;
14. shell atual com margem estreita e ícone atual acima do orçamento como risco P1 futuro;
15. critérios de bloqueio do próximo gate.

## 19. Separação final de evidência

### TESTADO

- raiz, branch, remoto, commit, claim, lock, idempotência e worktree;
- `npm run check`: 20 arquivos, 21/21 testes, build 5 etapas/37 habilidades;
- E2E Chromium atual: 10/10;
- baseline atual de shell/ícones por bytes e ensaio gzip;
- ausência atual das integrações/execução dinâmica buscadas no produto;
- presença atual de PWA shell, estado V1 e geradores determinísticos após seed.

### FALHOU

- primeira tentativa E2E falhou por sandbox impedir bind local; repetição autorizada passou;
- baseline do `icon-512x512.png` excede o orçamento visual de 150.000 bytes;
- nenhum teste funcional do produto atual falhou.

### NAO TESTADO

- qualquer código, pacote, conteúdo, áudio ou imagem de Português;
- encode, pronúncia, manifesto, RFC 8785, SHA, staging, IndexedDB V2 e rollback reais;
- cache de mídia, Range, quota, corrupção, atualização fixada e recuperação;
- limites de pacote, áudio, latência, heap e toque em aparelhos modestos;
- host final/compressão real;
- privacidade observada do build futuro;
- Safari/iOS e outras engines;
- acessibilidade de áudio e primeira fatia real;
- migração/equivalência futura de Matemática;
- validação com crianças.

### INFERIDO

- IndexedDB transacional tende a reduzir perda entre abas e simplificar ponteiro atômico;
- URL versionada/Cache Storage tende a reduzir cópia de blobs no heap;
- cache imutável por release tende a impedir shell híbrido;
- RFC 8785 tende a eliminar divergência de serialização;
- fila limitada e um elemento tendem a cumprir heap/ausência de sobreposição.

Nenhuma inferência foi usada como prova de aceite futuro.

## 20. Recomendação do engenheiro

**RECOMENDAR REVISÃO INDEPENDENTE** pelo supervisor com `lumon-supervisao-final`, em `EM_REVISAO` no Gate `G2_ENGENHARIA_LEVE`.

O plano torna áudio, pacote, cache, quota, PWA, desempenho, robustez e testes verificáveis sem alterar produto. O supervisor deve decidir as propostas e manter toda evidência futura como `NAO TESTADO` até prova real. Frontend/design não deve ser liberado diretamente por esta recomendação.

Implementação, migração executável, conteúdo, corpus, áudio, imagem, Firebase, backend, rede e assets finais continuam bloqueados.
