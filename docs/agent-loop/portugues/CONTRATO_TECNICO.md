# Contrato técnico de Português — Gate G2

> **Estado:** recomendação do arquiteto para revisão independente do Gate G2
> **Execução:** `pt-20260718T142849Z-arquiteto-29d5db3`
> **Commit de entrada publicado:** `f98fff34590337e2a353a558f194908425388463`
> **Implementação:** não autorizada
> **Autoridade:** `_reversa_sdd/norte-modulo-portugues.md`

## 1. Escopo, autoridade e marcação

Este contrato especifica limites, dados, interfaces, migração, conteúdo e funcionamento offline necessários para o módulo de Português. Ele não autoriza código, mudança de interface, conteúdo executável, assets finais, áudio final, Firebase, backend ou rede.

Ordem de autoridade aplicada:

1. decisões explícitas do usuário;
2. `_reversa_sdd/norte-modulo-portugues.md`;
3. `_reversa_sdd/plano-evolucao-lumon.md`;
4. contrato pedagógico G1 aprovado e seu relatório de supervisão;
5. este contrato, somente após veredito independente do supervisor G2.

As afirmações usam estas marcas:

- **NORTE/APROVADO:** decisão já confirmada no Norte.
- **G1/APROVADO:** regra do contrato pedagógico aceita pelo supervisor G1.
- **OBSERVADO POR LEITURA G2:** fato constatado no código ou configuração do commit de entrada; não prova comportamento em navegador.
- **TESTADO G2:** verificação executada nesta entrega documental.
- **INFERIDO G2:** consequência provável da leitura; não usada como prova de runtime.
- **PROPOSTA G2:** decisão arquitetural nova, aguardando revisão independente.
- **TRABALHO FUTURO / NÃO TESTADO:** requisito para implementação ou gate posterior, sem evidência nesta entrega.

Em conflito, prevalece o Norte. Toda interface e estrutura abaixo é contrato lógico, não código pronto nem autorização de implementação.

## 2. Estado atual observado

### 2.1 Fatos observados por leitura

**OBSERVADO POR LEITURA G2:**

- O produto atual é uma PWA estática, sem framework, com módulos ES nativos e `package.json` em `type: module`.
- Matemática possui cinco etapas, 37 habilidades e IDs como `number.find.1-10`, `addition.plus-1` e `subtraction.minus-1` em `src/config/levels.js`.
- Estado canônico atual usa `localStorage`, chave `lumon-state-v1`, `schemaVersion: 1` e perfil único `local-child`.
- O estado atual contém `profile`, `progress`, `preferences` e `activeSession`.
- Progresso atual contém `completedSessions`, `skillMastery`, `weakItems`, `unlockedSkills` e `manualUnlocked`; histórico de sessões é limitado às 250 entradas mais recentes.
- Sessão ativa materializa perguntas, respostas, índice, `skillId`, `seed` e timestamps. Sessão concluída preserva `seed`, respostas e estado de conclusão/abandono.
- O ID atual da sessão é formado por habilidade e seed; novas seeds são criadas na borda da sessão com tempo local. Depois de persistida a seed, os geradores usam PRNG injetado e reproduzível.
- Perguntas atuais registram `skill`, `prompt`, `response`, `answer` e metadados com `stage`, `sourceGenerator`, `itemKey` e tags.
- `question.id` atual combina `skill.id` e índice. `itemKey` representa o item matemático; nenhum deles possui `contentVersion` explícito.
- Avaliação atual normaliza respostas como números. Essa regra é válida para os tipos matemáticos existentes, mas não expressa normalização textual por habilidade.
- Progressão atual importa diretamente catálogo e regras de Matemática; interface atual também conhece prompts e respostas matemáticos.
- Validação do schema atual rejeita habilidades desconhecidas. Português não pode ser acrescentado ao estado atual sem versão/migração e registro de módulo.
- Migração existente lê `lumon-last-settings`, guarda `lumon-legacy-backup` e converte configuração antiga para uma habilidade matemática. JSON/schema inválido é salvo em `lumon-corrupt-backup` e substituído por padrão seguro.
- O shell PWA usa cache `lumon-shell-*`, instala HTML, CSS, JS, manifesto e ícones, e remove somente versões antigas com esse prefixo.
- O service worker faz requisições apenas `GET` de mesma origem dentro de seu escopo. Não existe fonte de conteúdo, pacote de áudio ou cache de mídia separado.
- Não há Firebase, SDK de backend, autenticação, analytics ou API de conteúdo no app atual.
- Nenhum blob, MP3 ou imagem aparece dentro do estado JSON atual. Ícones e imagens são arquivos estáticos.
- A suíte E2E existente cobre, para Matemática, primeira utilização, sessão, revisão, domínio, desbloqueio, abandono, teclado, persistência, atualização PWA, offline e matriz de viewports; ela não foi executada nesta entrega G2.

### 2.2 Evidência testada nesta execução

**TESTADO G2:**

- `npm run check`: aprovado no commit de entrada.
- Lint: 20 arquivos JavaScript sintaticamente válidos e sem execução dinâmica.
- Unidade/integração: 21 de 21 testes aprovados.
- Build estático: cinco etapas, 37 habilidades e manifesto PWA validados.
- Busca em código executável: nenhuma ocorrência de `eval()` ou `new Function()`.
- Busca de integrações: nenhuma referência a Firebase, analytics, `XMLHttpRequest`, `WebSocket`, `EventSource` ou `sendBeacon` no produto.
- Worktree permaneceu limpa após as verificações.

### 2.3 Inferências e lacunas

**INFERIDO G2:**

- Reutilizar a normalização numérica para Português produziria avaliações incorretas; Português precisa de avaliadores e normalizadores registrados por habilidade.
- Acoplar Português diretamente aos arrays atuais aumentaria risco de regressão de Matemática; um registro de módulos e adaptador matemático reduz esse risco.
- O cache shell atual pode servir versões de recursos atualizadas em momentos distintos pela estratégia `stale-while-revalidate`; coerência atômica precisa ser especificada antes da expansão.
- `localStorage` sem revisão otimista permite perda por última escrita em duas abas; repositório versionado deve detectar conflito.
- Sobrescrever estado inválido com padrão seguro após apenas um backup fixo pode dificultar recuperação; migração G2 precisa de backup imutável, checksum e journal.

**TRABALHO FUTURO / NÃO TESTADO:**

- Migração real de dados, retomada de sessão migrada e rollback.
- Persistência de Português, conteúdo, áudio, imagem e pacotes.
- Cache separado, hash, atomicidade, quota, recuperação e atualização.
- Privacidade observada por interceptação de rede em build futuro.
- Desempenho, responsividade, acessibilidade e regressão E2E depois da implementação.
- Funcionamento em engines diferentes de Chromium.

## 3. Decisões arquiteturais fixas

1. **NORTE/APROVADO:** Lumon permanece uma única PWA.
2. **NORTE/APROVADO:** Matemática e Português são matérias independentes sob núcleo comum.
3. **NORTE/APROVADO:** progresso, domínio, revisão e sessão são separados por matéria.
4. **NORTE/APROVADO:** V1 possui um único perfil/criança local.
5. **NORTE/APROVADO:** nenhum dado da criança é transmitido na V1.
6. **NORTE/APROVADO:** persistência inicial é local; Firebase futuro é apenas fronteira arquitetural nesta fase.
7. **NORTE/APROVADO:** nenhum blob, MP3 ou imagem fica em `localStorage`.
8. **NORTE/APROVADO:** conteúdo, áudio e imagem usam IDs estáveis, versão e manifesto.
9. **NORTE/APROVADO:** geradores são determinísticos por habilidade, versão de conteúdo e seed.
10. **NORTE/APROVADO:** nenhuma dependência externa crítica existe em runtime.
11. **NORTE/APROVADO:** modo temático online fica ausente/desativado na V1 e não libera domínio sozinho.
12. **NORTE/APROVADO:** IDs, seeds, sessões, progresso e comportamento de Matemática não podem ser perdidos ou reinterpretados silenciosamente.

## 4. Limites entre núcleo e matérias

### 4.1 Topologia proposta

**PROPOSTA G2:** quatro camadas lógicas, com dependências voltadas para contratos:

```text
Composição da PWA
├── Núcleo de domínio comum
│   ├── sessão e ciclo de tentativa
│   ├── envelopes de progresso/domínio/revisão
│   ├── PRNG e contexto determinístico
│   ├── portas de persistência, conteúdo e mídia
│   └── eventos semânticos de apresentação
├── Módulos de matéria
│   ├── Matemática — adaptador preserva contrato e IDs atuais
│   └── Português — catálogo, conteúdo e regras textuais próprias
├── Adaptadores locais
│   ├── repositório de estado
│   ├── repositório de pacotes e assets
│   └── PWA/service worker
└── Apresentação
    ├── renderizadores por tipo semântico
    └── controles infantis e Área do Responsável
```

### 4.2 Responsabilidade do núcleo comum

**PROPOSTA G2:** núcleo pode:

- registrar e localizar módulos por `subjectId`;
- iniciar, retomar, abandonar e concluir sessões;
- persistir envelopes e detectar conflito de revisão;
- fornecer seed/PRNG, relógio injetado e IDs de execução;
- ordenar tentativas e publicar eventos semânticos como `correct`, `retry`, `hint`, `invalid-item` e `complete`;
- coordenar fonte de conteúdo, resolução de assets e repositórios por interfaces;
- aplicar invariantes comuns: 5 a 15 exercícios, uma resposta por oportunidade, origem rastreável, domínio separado e nenhum blob no estado;
- manter pacote/versionamento fixos durante sessão ativa;
- solicitar ao módulo avaliação, domínio e planejamento de revisão.

Núcleo comum não pode:

- conhecer regra de acento, ortografia, cálculo ou decodificação;
- decidir se imagem, áudio ou digitação prova habilidade;
- importar `localStorage`, DOM, Cache Storage, Firebase ou fornecedor editorial em regra pedagógica;
- importar um módulo de matéria diretamente; somente composição/registro conhece implementações;
- converter autoavaliação oral ou tema temporário em domínio.

### 4.3 Responsabilidade de cada módulo

**PROPOSTA G2:** cada módulo declara:

- `subjectId`, `moduleContractVersion`, `progressSchemaVersion` e `contentVersion`;
- etapas, habilidades, pré-requisitos e IDs estáveis;
- tipos de item/prompt/resposta aceitos;
- geradores/editorial e versões de algoritmo;
- normalizadores e avaliadores nomeados, sem execução dinâmica;
- critérios configuráveis de domínio e transferência;
- classificação de erro e planejamento de revisão;
- validação/migração de seu estado;
- renderizadores semânticos necessários, sem acessar diretamente armazenamento.

Matemática não importa Português. Português não importa Matemática. Um módulo futuro não altera IDs históricos de módulos existentes.

### 4.4 Porta do módulo

**PROPOSTA G2:** contrato lógico mínimo:

```ts
interface SubjectModule {
  readonly subjectId: string;
  readonly moduleContractVersion: number;
  readonly progressSchemaVersion: number;
  readonly contentVersion: string;
  readonly generatorVersion: string;
  listStages(): StageDefinition[];
  getSkill(skillId: string): SkillDefinition | null;
  validateProgress(payload: unknown): ValidationResult;
  createInitialProgress(): SubjectProgress;
  buildSession(request: SessionRequest, content: ContentSource): SessionSnapshot;
  evaluate(request: EvaluationRequest): EvaluationResult;
  evaluateMastery(request: MasteryRequest): MasteryResult;
  planReview(request: ReviewRequest): ReviewPlan;
}
```

Este texto é interface normativa, não escolha de TypeScript nem arquivo a criar.

## 5. Identidade e versionamento

### 5.1 Namespaces

**PROPOSTA G2:** identidade completa usa composição, nunca renomeia ID histórico:

```text
subjectKey      = subjectId
skillKey        = subjectId + "/" + skillId
itemKey         = sourceId + "/" + packageId + "/" + itemId
assetKey        = sourceId + "/" + packageId + "/" + assetId
sessionKey      = subjectId + "/" + sessionId
```

- `subjectId` inicial: `matematica` e `portugues`.
- IDs atuais de Matemática permanecem byte a byte iguais dentro de `skillId`.
- Códigos G1 como `P1.oral-vocabulary` são IDs pedagógicos aceitos; o módulo pode usá-los diretamente como `skillId`. Alteração exige alias/migração, nunca substituição silenciosa.
- ID estável identifica entidade; versão identifica revisão. Uma revisão não ganha ID novo sem mudança real de identidade.
- ID removido não pode ser reutilizado para outro significado.

### 5.2 Versões independentes

**PROPOSTA G2:** não usar um único número para tudo:

| Campo | Escopo | Quando muda |
|---|---|---|
| `schemaVersion` | envelope local global | estrutura raiz muda |
| `progressSchemaVersion` | payload de uma matéria | forma do progresso da matéria muda |
| `moduleContractVersion` | interface/semântica do módulo | contrato do módulo muda |
| `contentVersion` | catálogo editorial | item/rubrica/metadado muda |
| `generatorVersion` | algoritmo determinístico | geração/ordenação muda |
| `packageVersion` | pacote distribuível | composição ou asset muda |
| `assetVersion` | áudio/imagem individual | bytes ou metadados normativos mudam |
| `normalizerVersion` | normalização de resposta | tolerâncias mudam |
| `masteryRulesVersion` | regras de domínio | critérios/configuração mudam |

Sessão sempre fixa `contentVersion`, `generatorVersion`, `normalizerVersion`, `masteryRulesVersion` e `packageVersion`. Atualização não muda sessão já iniciada.

## 6. Schema local por matéria

### 6.1 Envelope global V2

**PROPOSTA G2:** próxima estrutura lógica usa `schemaVersion: 2` e mantém um único perfil local:

```json
{
  "schemaVersion": 2,
  "revision": 1,
  "profile": {
    "id": "local-child",
    "displayName": "",
    "createdAt": "ISO-8601",
    "currentSubjectId": "matematica",
    "currentSkillBySubject": {
      "matematica": "number.find.1-10",
      "portugues": null
    }
  },
  "subjects": {
    "matematica": {
      "progressSchemaVersion": 1,
      "moduleContractVersion": 1,
      "progress": {},
      "activeSession": null
    },
    "portugues": {
      "progressSchemaVersion": 1,
      "moduleContractVersion": 1,
      "progress": {},
      "activeSession": null
    }
  },
  "preferences": {},
  "migration": {},
  "updatedAt": "ISO-8601"
}
```

Regras:

- `profile.id` continua `local-child`; nenhum array de perfis entra na V1.
- `subjects` separa colisão, progresso, domínio, revisão e sessão ativa.
- Cada matéria tem no máximo uma sessão ativa; composição do app decide se somente uma sessão global pode ficar em primeiro plano.
- Preferências realmente globais permanecem globais. Preferência pedagógica específica vive no payload da matéria.
- `revision` cresce em toda gravação válida e sustenta controle otimista.
- Campo desconhecido é preservado quando seguro; versão desconhecida nunca é interpretada como versão atual.
- Nenhum pacote, MP3, imagem, `Blob`, data URL ou base64 entra neste envelope.

### 6.2 Progresso comum

**PROPOSTA G2:** forma mínima compartilhada:

```ts
interface SubjectProgress {
  completedSessions: SessionRecord[];
  skillMastery: Record<string, MasteryResult>;
  weakItems: Record<string, Record<string, WeakItemState>>;
  reviewQueue: ReviewEntry[];
  unlockedSkills: string[];
  manualUnlocked: string[];
  masteryRulesVersion: string;
}
```

- Histórico e limites de retenção são por matéria; Português nunca expulsa histórico matemático.
- Migração mantém o limite e a ordem atuais de Matemática. Mudança posterior de retenção matemática exige teste explícito.
- Desbloqueio manual concede acesso, não domínio.
- Regra de domínio considera apenas evidência elegível da própria matéria.
- Resultado temático pode alimentar `weakItems`/`reviewQueue`, mas não `skillMastery` sem verificação Lumon elegível.

### 6.3 Payload matemático preservado

**PROPOSTA G2:** migração V1 para V2 apenas envolve o payload atual:

| V1 atual | V2 proposto | Regra |
|---|---|---|
| `profile.id/displayName/createdAt` | mesmos campos em `profile` | cópia exata |
| `profile.currentSkillId` | `profile.currentSkillBySubject.matematica` | cópia exata |
| ausência de matéria atual | `profile.currentSubjectId = matematica` | mantém entrada atual |
| `progress.completedSessions` | `subjects.matematica.progress.completedSessions` | ordem e objetos preservados |
| `progress.skillMastery` | `subjects.matematica.progress.skillMastery` | chaves/valores preservados |
| `progress.weakItems` | `subjects.matematica.progress.weakItems` | chaves/valores preservados |
| `progress.unlockedSkills` | `subjects.matematica.progress.unlockedSkills` | ordem/IDs preservados |
| `progress.manualUnlocked` | `subjects.matematica.progress.manualUnlocked` | ordem/IDs preservados |
| `activeSession` | `subjects.matematica.activeSession` | seed, ID, perguntas, respostas e índice preservados |
| `preferences` | `preferences` | valores preservados |

Campos comuns novos podem ser derivados, mas nenhum campo matemático antigo é descartado. Sessão matemática ativa migra materializada e não é regenerada.

## 7. Contratos de domínio

### 7.1 Item de conteúdo

**PROPOSTA G2:**

```ts
interface ContentItem {
  itemId: string;
  itemVersion: string;
  subjectId: string;
  stageId: string;
  skillIds: string[];
  prerequisiteSkillIds: string[];
  source: "lumon" | "tematico";
  masteryEligibility: "eligible" | "practice-only";
  transferRole: "practiced" | "transfer-candidate" | "diagnostic-only";
  prompt: PromptSpec;
  response: ResponseSpec;
  evaluatorId: string;
  evaluatorVersion: string;
  normalizerId: string;
  normalizerVersion: string;
  rubricId?: string;
  audioRefs: MediaUse[];
  imageRefs: MediaUse[];
  pedagogicalMetadata: Record<string, unknown>;
  provenance: ContentProvenance;
  approval: ApprovalRecord;
}
```

Invariantes:

- Item objetivo possui uma única resposta defensável ou rubrica explícita.
- Item declara função de áudio/imagem: `essential`, `support`, `instructional`, `feedback` ou `unused`.
- Item essencial com asset ausente/inválido produz `invalid-item`; nunca erro da criança.
- `source`, elegibilidade e versão acompanham toda tentativa.
- Conteúdo final precisa de autoria, domínio público ou licença documentada.
- Resposta correta não é calculada por string executável.

### 7.2 Prompt e resposta

**PROPOSTA G2:** prompts são dados semânticos, não HTML:

```ts
type PromptSpec =
  | { type: "audio-image-match"; audioId: string; optionImageIds: string[] }
  | { type: "image-word-match"; imageId: string; optionTexts: string[] }
  | { type: "sound-discrimination"; audioIds: string[]; target: string }
  | { type: "text"; text: string }
  | { type: "structured-math"; payload: unknown }
  | { type: string; payload: unknown };

type ResponseSpec =
  | { type: "choice"; optionIds: string[] }
  | { type: "text-input"; inputMode: string; maxLength: number }
  | { type: "ordering"; tokenIds: string[] }
  | { type: "self-assessment"; choices: ["read-alone", "practice"] }
  | { type: "numeric-input" }
  | { type: string; payload?: unknown };
```

- Apresentação mapeia tipo para renderizador registrado; ausência de renderizador bloqueia pacote antes da sessão.
- DOM recebe view model e devolve resposta bruta; não avalia nem persiste domínio.
- Texto não usa normalização universal. Cada habilidade declara caixa, espaço, pontuação, acento e variantes aceitas.
- Resposta por gesto sempre possui botão/teclado equivalente quando aplicável.

### 7.3 Avaliação

**PROPOSTA G2:**

```ts
interface EvaluationRequest {
  subjectId: string;
  skillId: string;
  itemId: string;
  itemVersion: string;
  rawResponse: unknown;
  attemptNumber: number;
  supportLevel: "none" | "hint" | "example";
  versions: {
    evaluator: string;
    normalizer: string;
    content: string;
  };
}

interface EvaluationResult {
  status: "correct" | "incorrect" | "invalid" | "inconclusive";
  normalizedResponse?: unknown;
  dimensions: Record<string, "met" | "not-met" | "not-evaluated">;
  errorCode?: string;
  countsForMastery: boolean;
  countsForReview: boolean;
  feedbackEvent: "celebrate" | "retry" | "hint" | "technical-unavailable";
}
```

- Avaliadores pertencem ao módulo e são selecionados por mapa fechado de funções.
- `eval()`, `new Function()`, expressão executável, script em pacote ou função recebida por rede são proibidos.
- `E-INSTR`, `E-AUDIO`, `E-MOTOR` e `E-CONT` podem produzir resultado inconclusivo/invalidado conforme G1; não são automaticamente erro de conteúdo.
- Resposta após exemplo explicado é prática assistida e não conta para domínio naquela apresentação.
- Autoavaliação oral registra confiança, nunca precisão ou domínio isolado.

### 7.4 Sessão e tentativa

**PROPOSTA G2:**

```ts
interface SessionSnapshot {
  sessionId: string;
  subjectId: string;
  skillIds: string[];
  mode: "diagnostic" | "practice" | "review" | "verification" | "thematic";
  seed: string;
  deterministicKey: string;
  contentSource: "lumon" | "tematico";
  contentVersion: string;
  packageId: string;
  packageVersion: string;
  generatorVersion: string;
  masteryRulesVersion: string;
  itemSnapshots: ContentItemSnapshot[];
  currentIndex: number;
  attempts: AttemptRecord[];
  startedAt: string;
  status: "active" | "completed" | "abandoned" | "blocked";
}
```

- Sessão possui 5 a 15 exercícios; G1 propõe oito oportunidades para o piloto vertical.
- Item é materializado sem blobs; referências de assets permanecem por ID/hash.
- Sessão ativa fixa versões e mantém snapshot suficiente para retomada, inclusive após atualização.
- Uma resposta aceita por oportunidade; tentativas adicionais entram como tentativas numeradas, não sobrescrevem a primeira.
- Abandono é evento explícito e não erro automático.
- Timestamps diagnosticam e ordenam; não entram na chave determinística nem punem a criança.
- Sessão temática permanece `practice-only`; verificação de domínio usa pacote `lumon` aprovado.

### 7.5 Domínio e transferência

**PROPOSTA G2:** `MasteryResult` registra:

- `subjectId`, `skillId` e `masteryRulesVersion`;
- janela de sessões usada e IDs das evidências;
- precisão por dimensão exigida;
- contagem de itens distintos e de transferência;
- maior taxa de erro recorrente;
- sessões concluídas/abandonos considerados;
- fontes de conteúdo consideradas;
- `mastered`, motivos objetivos e data de cálculo.

Regras obrigatórias:

- Percentuais, três sessões, amostra, erro recorrente e transferência seguem contrato G1 aprovado.
- Cálculo filtra `countsForMastery = true`, `source = lumon` e conteúdo aprovado.
- Desbloqueio adulto e confiança oral não alteram `mastered`.
- Resultado deve ser recalculável com mesmas evidências e versão de regra.
- Alteração de regra não reescreve histórico; produz novo cálculo versionado.

### 7.6 Revisão

**PROPOSTA G2:** `ReviewEntry` contém:

- matéria, habilidade, item/classe de erro e origem;
- evidência que abriu a revisão;
- `dueAt` e degrau aproximado `1d`, `3d` ou `7d`;
- item análogo preferencial e pré-requisito quando necessário;
- número de recuperações independentes;
- estado `due`, `scheduled`, `completed`, `invalidated` ou `blocked-content`;
- regra/versionamento usado.

Revisão nunca cruza matéria por coincidência de ID. Ciclo pode encerrar conforme regra G1 aceita, mas não substitui domínio.

## 8. Conteúdo e pacotes

### 8.1 Porta de fonte de conteúdo

**PROPOSTA G2:**

```ts
interface ContentSource {
  readonly sourceId: "lumon" | "tematico";
  listAvailablePackages(subjectId: string): Promise<PackageDescriptor[]>;
  getManifest(packageId: string, version: string): Promise<PackageManifest>;
  resolveItems(query: ItemQuery): Promise<ContentItem[]>;
  validateItem(item: ContentItem): ValidationResult;
}
```

Sessão depende dessa porta, nunca de caminho de arquivo, API ou fornecedor.

### 8.2 Fonte `lumon`

**NORTE/APROVADO + PROPOSTA G2:**

- fonte padrão editorial, própria/licenciada, versionada e disponível offline;
- única fonte elegível para domínio automático;
- pacote declara autoria/licença, revisão linguística/pedagógica e aprovação de assets;
- falha de rede não afeta acesso depois do preparo do pacote;
- Etapa 1 é preparada na configuração inicial do responsável; etapas posteriores antes do primeiro uso.

### 8.3 Fonte futura `tematico`

**NORTE/APROVADO + PROPOSTA G2:**

- usa o mesmo contrato básico de item/pacote/sessão;
- `source = tematico`, `masteryEligibility = practice-only` e validade de sete dias;
- origem e resultados permanecem auditáveis depois do descarte do pacote;
- renovação exige ação explícita do responsável;
- nenhum resultado bruto, link, imagem de internet ou conteúdo não confirmado chega à criança;
- provedor fica ausente do bundle, registro, configuração e UI da V1;
- não existem endpoint, SDK, credencial, autenticação, chamada de rede, flag visível ou código morto nesta fase.

### 8.4 Manifesto de pacote

**PROPOSTA G2:**

```ts
interface PackageManifest {
  manifestVersion: number;
  packageId: string;
  packageVersion: string;
  subjectId: string;
  source: "lumon" | "tematico";
  stageIds: string[];
  contentVersion: string;
  createdAt: string;
  expiresAt?: string;
  approvalState: "draft" | "reviewed" | "approved" | "blocked";
  itemIndex: Array<{ itemId: string; itemVersion: string; sha256: string; bytes: number }>;
  assets: MediaDescriptor[];
  totalBytes: number;
  manifestSha256: string;
  licenseRefs: string[];
}
```

- Hash usa SHA-256 dos bytes canônicos; manifesto é validado antes de ativação.
- `approved` exige todos os itens/assets essenciais aprovados.
- `packageId` estável; `packageVersion` muda com conteúdo ou bytes.
- Pacote parcial/corrompido nunca é apresentado como offline.

## 9. Áudio e imagem

### 9.1 Descritor comum

**PROPOSTA G2:**

```ts
interface MediaDescriptor {
  assetId: string;
  assetVersion: string;
  kind: "audio" | "image";
  path: string;
  mimeType: string;
  bytes: number;
  sha256: string;
  pedagogicalRole: "essential" | "support" | "instructional" | "feedback" | "decorative";
  approvalState: "draft" | "technical-reviewed" | "pedagogical-reviewed" | "approved" | "blocked";
  licenseRef: string;
  reviewedAt?: string;
  metadata: Record<string, unknown>;
}
```

- Item referencia `assetId` e versão; UI não grava URL como identidade.
- Resolvedor transforma ID em URL/`Response` local depois de validar manifesto/hash.
- Bytes ficam em Cache Storage, IndexedDB ou arquivo estático conforme decisão futura do engenheiro; nunca em `localStorage` ou base64 no JS.
- Asset `essential` ausente/corrompido invalida item. Asset de apoio permite fallback somente quando pedagogicamente permitido.

### 9.2 Áudio

**NORTE/APROVADO:**

- MP3 estático pt-BR, sem TTS em runtime, por toque explícito e repetível;
- voz principal aprovada, revisão humana e gravação humana quando TTS editorial não for didaticamente correto;
- manifesto registra texto/roteiro, voz, parâmetros, origem editorial, revisão de pronúncia e hash;
- um item auditivo só entra em pacote aprovado após revisão humana;
- pacote não é marcado offline antes de todos os áudios essenciais serem verificados.

**PROPOSTA G2:** `metadata` de áudio inclui `language`, `scriptId`, `scriptVersion`, `voiceProfileVersion`, `productionMethod`, `pronunciationReviewState`, `durationMs`, `sampleRateHz`, `channels` e `bitrateKbps`.

### 9.3 Imagem

**G1/APROVADO:** imagem pedagógica declara função, não entrega resposta por posição/cor/detalhe e exige aprovação pedagógica quando influencia avaliação.

**PROPOSTA G2:** `metadata` de imagem inclui `width`, `height`, `alpha`, `altPolicy`, `conceptId`, `exemplarGroupId`, `safeArea`, `responsiveCropPolicy` e `namingReviewState`.

Asset decorativo não entra como evidência de resposta. Asset pedagógico bloqueado não pode ser resolvido pelo pacote ativo.

## 10. Repositórios locais e fronteira Firebase

### 10.1 Portas locais

**PROPOSTA G2:** separar três responsabilidades:

```ts
interface LearnerStateRepository {
  load(): Promise<VersionedState | null>;
  save(next: VersionedState, expectedRevision: number): Promise<VersionedState>;
  exportBackup(): Promise<string>;
  importBackup(raw: string): Promise<VersionedState>;
  clear(scope: "progress" | "all-local-data"): Promise<void>;
}

interface ContentPackageRepository {
  stage(manifest: PackageManifest): Promise<StagedPackage>;
  verify(stagedId: string): Promise<VerificationResult>;
  activate(stagedId: string, expectedActiveVersion?: string): Promise<void>;
  getActive(packageId: string): Promise<PackageManifest | null>;
  remove(packageId: string, version: string): Promise<void>;
}

interface MediaRepository {
  resolve(assetId: string, assetVersion: string): Promise<ResolvedMedia>;
  verify(assetId: string, assetVersion: string): Promise<VerificationResult>;
}
```

- Regras pedagógicas conhecem interfaces de domínio, não armazenamento físico.
- `expectedRevision` impede última escrita silenciosa em duas abas; conflito exige recarregar/mesclar conforme política explícita.
- Export/import valida schema, matéria, versões e checksum antes de alterar estado.
- Limpeza de progresso não apaga cache de outro app nem pacote sem confirmação correspondente.
- Escolha exata entre `localStorage`, IndexedDB e Cache Storage para cada adapter pertence ao engenheiro, desde que cumpra este contrato.
- Para menor risco de regressão, estado JSON pequeno pode continuar em adapter local compatível; pacotes/assets ficam fora dele.

### 10.2 Fronteira futura Firebase

**PROPOSTA G2:** Firebase futuro só pode implementar porta de persistência após nova decisão de produto, privacidade, consentimento, segurança, conflito e perfis. Sincronização é responsabilidade futura separada; não é escondida dentro do domínio.

Nesta fase:

- documentar interface é suficiente;
- não criar `FirebaseRepository`, arquivo de configuração, dependência, import, credencial, variável de ambiente, autenticação, regra, endpoint ou chamada de rede;
- não adicionar campos de conta, e-mail, UID remoto ou múltiplos perfis ao schema V2;
- adapter futuro não pode mudar avaliação/domínio nem transmitir dados sem consentimento e contrato aprovado.

## 11. Determinismo e segurança de execução

### 11.1 Chave determinística

**PROPOSTA G2:**

```text
deterministicKey = canonicalHash(
  subjectId,
  skillId,
  contentVersion,
  generatorVersion,
  normalizerVersion,
  masteryRulesVersion,
  seed,
  sessionRequest
)
```

- Mesmas entradas geram mesma sequência, IDs de itens, prompts, respostas esperadas e metadados pedagógicos.
- Timestamps, latência, ID de persistência e ordem de gravação ficam fora do resultado gerado.
- PRNG é injetado. Gerador não chama `Math.random()` nem relógio.
- Seed é criada na borda, persistida antes da primeira resposta e preservada na migração.
- Sessão antiga materializada nunca é regenerada com versão nova.
- Snapshot dourado usa serialização canônica para detectar deriva.

### 11.2 Registro fechado

**PROPOSTA G2:** geradores, avaliadores, normalizadores e renderizadores são mapas fechados de IDs para funções versionadas incluídas no build. Pacote contém dados, nunca código.

Proibido:

- `eval()`;
- `new Function()`;
- import dinâmico de URL recebida por conteúdo;
- expressão matemática/textual executada como código;
- HTML/script editorial não sanitizado;
- regra pedagógica fornecida por rede em runtime.

## 12. PWA, offline, cache e atualização

### 12.1 Separação lógica de caches

**PROPOSTA G2:** namespaces independentes:

| Namespace lógico | Conteúdo | Política |
|---|---|---|
| `lumon-shell-*` | HTML, CSS, JS, manifesto e ícones | versão coerente por release |
| `lumon-content-<subject>-*` | manifestos e itens sem blobs | pacote versionado |
| `lumon-media-<subject>-*` | MP3 e imagens de pacote | hash e ativação atômica |
| armazenamento de estado | perfil/progresso/sessões | nunca removido por atualização de cache |

Service worker remove somente namespaces Lumon que controla e nunca cache de terceiro. Atualização do shell não limpa estado ou pacotes.

### 12.2 Instalação e ativação atômicas

**PROPOSTA G2:**

1. estimar espaço e baixar para namespace de staging;
2. validar manifesto, quantidade, tamanho e SHA-256 de cada arquivo essencial;
3. validar compatibilidade de contrato/versão e presença de renderizadores/avaliadores;
4. gravar ponteiro ativo somente após verificação total;
5. manter versão anterior enquanto houver sessão ativa ou até confirmação de novo pacote saudável;
6. remover staging em falha; não alterar pacote ativo;
7. limpar versão anterior somente sem referência e dentro da política de quota.

Uma sessão iniciada usa pacote fixo. Atualização fica disponível para próxima sessão.

### 12.3 Quota e recuperação

**PROPOSTA G2:** ordem de recuperação, sem perda de progresso:

1. apagar staging incompleto;
2. apagar pacote temático expirado futuro;
3. apagar versão antiga sem sessão ativa;
4. pedir ao responsável remoção de pacote opcional;
5. manter estado `insufficient-space` e explicar preparo incompleto.

Nunca apagar silenciosamente:

- estado da criança;
- sessão ativa;
- backup de migração antes de confirmação de saúde;
- único pacote ativo de etapa necessária.

Áudio essencial indisponível bloqueia item auditivo. Áudio não essencial usa fallback aprovado. Falha nunca vira erro da criança.

### 12.4 Orçamentos herdados

**NORTE/APROVADO ou proposta já consolidada no Norte, sujeita a teste do engenheiro:**

| Medida | Limite inicial |
|---|---:|
| Shell inicial sem áudio | 500 KB transferidos comprimidos |
| Pacote total de Português | 8 MiB |
| Pacote por etapa | 2 MiB |
| MP3 mediano | 24 KiB |
| MP3 p95 | 64 KiB |
| Início de áudio em cache p95 | 100 ms |
| Início de áudio online p95 | 800 ms |
| Heap incremental de áudio | 5 MiB |
| Asset visual individual embarcado | 150 KB |

Shell inicial não baixa áudio. Pacote da Etapa 1 é preparado no setup adulto; biblioteca inteira não é baixada de uma vez.

### 12.5 Dependências de runtime

- Fluxo infantil, corpus Lumon, progresso, avaliação, domínio e revisão funcionam sem rede depois do preparo.
- Fonte externa, fonte remota, CDN, fonte web, TTS, analytics ou backend não é dependência crítica.
- Erro offline é estado explícito e recuperável.
- Service worker e app devem provar primeira carga online, reinício offline, atualização, pacote corrompido, quota e sessão fixada.

## 13. Migração V1 para V2

### 13.1 Invariantes

**PROPOSTA G2:** migração só é aprovada se:

- todos os 37 IDs matemáticos continuarem iguais;
- seeds, IDs de sessão/pergunta, `itemKey`, respostas, timestamps e ordem forem preservados;
- domínio, revisão, desbloqueios, recomendações e abandonos calcularem o mesmo resultado antes/depois;
- sessão ativa retomar no mesmo índice, com mesmas perguntas e respostas já dadas;
- preferências e perfil forem preservados;
- V1 bruto e checksum permanecerem recuperáveis;
- falha em qualquer passo deixar V1 utilizável;
- repetição da migração for idempotente.

### 13.2 Chaves e journal

**PROPOSTA G2:** adapter de migração usa namespaces explícitos:

```text
fonte atual                 lumon-state-v1
backup bruto imutável       lumon-migration-v1-backup
candidato                   lumon-state-v2-candidate
canônico novo               lumon-state-v2
journal                     lumon-migration-v1-v2-journal
```

O nome físico pode ser ajustado pelo engenheiro, mas sem alterar semântica: fonte preservada, backup imutável, candidato validado, canônico separado e journal idempotente.

Journal registra `migrationId`, `migratorVersion`, `sourceKey`, `sourceSchemaVersion`, `sourceSha256`, `targetSchemaVersion`, `targetSha256`, etapa concluída, timestamps e erro técnico sem dado infantil.

### 13.3 Algoritmo de migração

**PROPOSTA G2:**

1. adquirir lock de escrita local e ler V1 uma única vez;
2. calcular hash dos bytes brutos e validar com validator V1 congelado;
3. se backup não existir, gravar bytes brutos; se existir com hash diferente, bloquear e não sobrescrever;
4. transformar por função pura conforme tabela da seção 6.3;
5. validar V2, invariantes de IDs e equivalência matemática;
6. gravar candidato, reler e conferir hash;
7. gravar V2 canônico, reler e conferir hash;
8. marcar journal `committed` somente depois da verificação;
9. loader prefere V2 apenas quando canônico e journal combinam; caso contrário usa V1;
10. remover somente candidato temporário depois de confirmação; manter V1/backup até política de retenção aprovada.

Crash ou quota em qualquer passo não muda fonte preferida. Reexecução com mesmo `sourceSha256` retorna o mesmo resultado ou retoma passo seguro.

### 13.4 Rollback

**PROPOSTA G2:**

- rollback imediato do release volta loader para V1/backup sem apagar V2;
- se houve prática nova em V2, o sistema preserva V2 como recovery exportável e não afirma que V1 contém esses dados;
- projeção V2 para V1 só pode copiar Matemática quando equivalência estiver comprovada e nunca descarta Português silenciosamente;
- nenhuma correção sobrescreve backup bruto; novo recovery recebe nova chave/versão;
- Área do Responsável deve permitir exportar backup antes de operação destrutiva, mas desenho final pertence ao gate de experiência.

### 13.5 Matriz de fixtures da migração

**PROPOSTA G2:** fixtures obrigatórias:

- estado padrão vazio;
- progresso parcial em cada uma das cinco etapas;
- 37 habilidades com IDs conhecidos;
- três sessões de domínio, erro recorrente e revisão;
- desbloqueio manual;
- abandonos recentes;
- histórico no limite de 250 sessões;
- sessão ativa antes da resposta, após resposta e no último item;
- seed com caracteres especiais e timestamps preservados;
- `lumon-last-settings` legado;
- V1 inválido/corrompido;
- ID desconhecido;
- backup pré-existente igual e divergente;
- quota falhando em cada write;
- crash simulado após cada passo;
- migração repetida;
- V2 válido, V2 inválido e journal incompleto;
- rollback antes e depois de nova prática V2.

## 14. Primeira fatia vertical da Etapa 1

### 14.1 Arquitetura mínima

**PROPOSTA G2:** fatia usa somente contratos aprováveis, sem definir UI ou assets:

```text
Registro de módulos
  recebe módulo Português
    recebe SessionRequest + seed
      consulta fonte lumon e pacote Etapa 1 ativo
        monta item snapshots determinísticos
          resolve áudio/imagem por ID+versão+hash
            apresentação captura seleção/digitação
              avaliador Português classifica tentativa
                núcleo persiste sessão/progresso por matéria
                  revisão agenda item análogo
```

### 14.2 Envelope da fatia

- Um microconjunto editorial futuro de 3 a 5 palavras, sem escolher palavras nesta entrega.
- Pacote `lumon`, Etapa 1, aprovado, offline e fixado durante sessão.
- Oito oportunidades iniciais conforme G1: demonstração, seleção auditiva/visual, forma escrita, som/letra, digitação, revisão e transferência.
- Pelo menos um prompt de seleção e um `text-input`.
- Áudio por toque; nenhuma dependência de autoplay.
- Imagem e áudio resolvidos por IDs; bytes fora do estado.
- Erro instrucional/conteúdo/asset não conta contra criança.
- Nova tentativa, pista, exemplo e item análogo registrados separadamente.
- Uma sessão não concede domínio.
- Persistência local e retomada offline preservam seed, versões, ordem, tentativa e revisão.
- Feedback é evento semântico para frontend/Capivara futura; arquitetura não escolhe pose, animação ou asset.

### 14.3 Estados obrigatórios

Antes de implementação, contratos devem representar:

- pacote ausente, preparando, pronto, expirado, corrompido e sem espaço;
- asset carregando, disponível, ausente, corrompido e bloqueado editorialmente;
- sessão ativa, retomada, concluída, abandonada e bloqueada por conteúdo;
- tentativa correta, incorreta, recuperada, assistida, inválida e inconclusiva;
- revisão futura, vencida, concluída e bloqueada por item removido.

## 15. Matriz objetiva de testes futuros

Itens desta matriz são **TRABALHO FUTURO / NÃO TESTADO**, salvo baseline explicitamente marcada.

### 15.1 Migração e regressão de Matemática

| ID | Cenário | Evidência objetiva de aceite |
|---|---|---|
| `MIG-01` | V1 padrão para V2 | perfil/preferências iguais; Matemática aninhada; Português vazio |
| `MIG-02` | todos os IDs | conjunto dos 37 `skillId` antes/depois byte a byte igual |
| `MIG-03` | sessões históricas | deep-equal de seeds, respostas, `itemKey`, ordem, timestamps e abandono |
| `MIG-04` | sessão ativa | retoma mesmo índice/pergunta; resposta seguinte produz mesmo registro |
| `MIG-05` | domínio/revisão | resultados, desbloqueios e recomendações iguais para fixtures completas |
| `MIG-06` | idempotência | segunda execução não altera V2, hash, backup ou journal committed |
| `MIG-07` | crash/quota | cada ponto de falha mantém V1 carregável e não ativa candidato |
| `MIG-08` | backup divergente | bloqueia sem sobrescrever qualquer cópia |
| `MIG-09` | rollback | release anterior carrega V1; V2 continua recuperável/exportável |
| `REG-01` | baseline Matemática | 21 testes atuais + build continuam aprovados |
| `REG-02` | geração | mesma seed produz fixtures matemáticas atuais para todas as 37 habilidades |
| `REG-03` | E2E Matemática | todos os cenários atuais e todas as habilidades passam sem mudança observável não aprovada |
| `REG-04` | retenção | Português não remove sessão, revisão ou domínio de Matemática |

### 15.2 Persistência

| ID | Cenário | Evidência objetiva de aceite |
|---|---|---|
| `PER-01` | recarga | progresso e sessão das duas matérias retornam iguais |
| `PER-02` | duas abas | `expectedRevision` detecta conflito; nenhuma escrita silenciosamente perdida |
| `PER-03` | import inválido | rejeita antes de sobrescrever estado válido |
| `PER-04` | export/import | checksum e deep-equal do estado restaurado |
| `PER-05` | limpeza de progresso | remove apenas escopo confirmado; preserva caches/keys externos |
| `PER-06` | blob proibido | varredura do estado não encontra `Blob`, data URL, base64, MP3 ou imagem |
| `PER-07` | versão desconhecida | bloqueia/migra explicitamente; nunca interpreta como atual |

### 15.3 Determinismo, avaliação e domínio

| ID | Cenário | Evidência objetiva de aceite |
|---|---|---|
| `DET-01` | chave idêntica | serialização canônica dos itens gerados é idêntica |
| `DET-02` | versão/seed diferente | alteração fica rastreada e não contamina sessão antiga |
| `DET-03` | relógio/`Math.random` | instrumentação falha teste se gerador acessar fonte não injetada |
| `DET-04` | execução dinâmica | busca/lint bloqueia `eval()`, `new Function()` e código editorial |
| `EVA-01` | acento por habilidade | tolerância obedece `normalizerVersion`; sem remoção universal |
| `EVA-02` | erro motor/áudio/conteúdo | registra classe correta e não concede/retira domínio indevidamente |
| `DOM-01` | fonte temática | qualquer volume temático isolado mantém `mastered = false` |
| `DOM-02` | transferência Lumon | somente evidência aprovada/transferência participa da liberação |

### 15.4 Offline, pacote e falhas

| ID | Cenário | Evidência objetiva de aceite |
|---|---|---|
| `OFF-01` | preparo Etapa 1 | shell inicial não baixa áudio; pacote só fica pronto após hashes válidos |
| `OFF-02` | reinício offline | fatia completa, áudio por toque, seleção, digitação e persistência funcionam sem rede |
| `OFF-03` | pacote ausente | estado explícito; criança não recebe exercício dependente |
| `OFF-04` | pacote incompleto/corrompido | ativo anterior permanece; item inválido não vira erro infantil |
| `OFF-05` | atualização durante sessão | sessão continua em versão fixada; próxima usa versão nova |
| `OFF-06` | quota insuficiente | staging limpo, progresso preservado, orientação adulta exibida |
| `OFF-07` | shell novo | estado/pacotes sobrevivem; caches externos permanecem |
| `OFF-08` | repetição de áudio | sem sobreposição, erro silencioso ou dependência de autoplay |
| `OFF-09` | orçamento | tamanhos, latências e heap cumprem seção 12.4 em aparelhos-alvo |

### 15.5 Privacidade e rede

| ID | Cenário | Evidência objetiva de aceite |
|---|---|---|
| `PRI-01` | interceptação de rede V1 | zero requisição com perfil, progresso, resposta, seed ou histórico |
| `PRI-02` | dependências | bundle/lockfile sem Firebase, analytics, TTS runtime ou backend |
| `PRI-03` | offline | nenhum fluxo infantil exige host externo depois do preparo |
| `PRI-04` | modo temático | rota, botão, provider, endpoint e flag ausentes na V1 |
| `PRI-05` | logs/erros | mensagens técnicas não contêm resposta/histórico infantil |

## 16. Riscos arquiteturais e controles

| Risco | Severidade proposta | Controle objetivo |
|---|---|---|
| Perda de Matemática na migração | P0 | backup bruto, hash, migração pura, equivalência e rollback antes de ativação |
| Reinterpretação de IDs/seeds antigos | P0 | IDs byte a byte, sessão materializada e snapshots dourados |
| Português apagar histórico pelo limite global | P1 | retenção independente por matéria |
| Regra textual acoplada à normalização numérica | P1 | avaliador/normalizador por módulo e versão |
| Pacote parcial marcado offline | P1 | staging, hash completo e ponteiro atômico |
| Atualização misturar versões em sessão | P1 | fixação de pacote e versão anterior retida |
| Blob/base64 inflar `localStorage` | P1 | portas separadas, validação e teste `PER-06` |
| Tema futuro liberar domínio | P1 | `practice-only` no item, sessão, tentativa e filtro de domínio |
| Firebase parcial transmitir dados | P0 | interface documental apenas; nenhuma dependência/código/configuração |
| Última escrita vencer em duas abas | P2 | `revision`, lock local e conflito explícito |
| Quota apagar progresso | P1 | ordem de recuperação que nunca remove estado da criança |
| Cache shell servir release incoerente | P1 | release versionado/atômico e teste de atualização |
| Asset ambíguo ou áudio incorreto medir criança | P1 | aprovação editorial, estado invalidado e hash/versão |
| Regra em pacote executar código | P0 | pacote somente dados e registro fechado; lint/busca |
| Contrato comum virar dependência circular entre matérias | P2 | módulos independentes e composição como única conhecedora |
| Histórico V2 novo perdido em downgrade | P1 | preservar recovery V2; nunca downgrade silencioso |

## 17. Decisões propostas para revisão G2

Supervisor deve aceitar, pedir retrabalho ou bloquear explicitamente:

1. registro de módulos com núcleo neutro e matérias sem import cruzado;
2. envelope global V2 com `subjects.matematica` e `subjects.portugues` sob um único `local-child`;
3. IDs compostos sem renomear IDs históricos;
4. versões independentes de schema, módulo, conteúdo, gerador, normalizador, domínio, pacote e asset;
5. payload matemático V1 aninhado e preservado, inclusive sessão ativa materializada;
6. interfaces de módulo, item, prompt/resposta, avaliação, sessão, domínio e revisão;
7. fontes `lumon` e `tematico` pelo mesmo contrato, com tema ausente da V1 e `practice-only`;
8. manifestos por SHA-256, aprovação e ativação atômica;
9. repositórios separados para estado, pacote e mídia;
10. revisão otimista por `revision` e conflito explícito;
11. fronteira Firebase somente documental;
12. chave determinística com todas as versões e seed;
13. caches lógicos separados, staging, fixação por sessão e recuperação de quota;
14. migração V1–V2 com backup imutável, candidato, canônico, journal e rollback;
15. arquitetura da primeira fatia vertical sem UI, código, palavra ou asset final;
16. matriz objetiva de testes e bloqueio de avanço se Matemática divergir.

Nenhuma proposta acima é apresentada como já aprovada pelo usuário.

## 18. Critérios de aceite do Gate G2

- [x] Limites entre núcleo, Matemática e Português definidos.
- [x] Schema/versionamento por matéria e perfil local único definidos.
- [x] Migração preserva IDs, seeds, progresso, sessões, preferências e comportamento matemático.
- [x] Backup, idempotência, falha parcial e rollback definidos.
- [x] Contratos de módulo, item, prompt/resposta, sessão, tentativa, avaliação, domínio e revisão definidos.
- [x] Repositório local isolado de regra pedagógica; Firebase limitado a adapter futuro documental.
- [x] Fontes `lumon` e `tematico` usam contrato extensível sem provider online na V1.
- [x] Áudio/imagem usam ID, versão, hash, manifesto, função e aprovação; blobs ficam fora de `localStorage`.
- [x] PWA/offline separa shell/pacotes, exige atomicidade, atualização segura, quota e recuperação.
- [x] Determinismo depende de habilidade, versões e seed; execução dinâmica proibida.
- [x] Primeira fatia vertical da Etapa 1 especificada arquiteturalmente sem implementação.
- [x] Estado atual, testes executados, inferências e trabalho futuro estão separados.
- [x] Riscos e matriz de testes cobrem migração, persistência, offline, privacidade, regressão e falhas.
- [ ] Supervisor revisa evidências e emite veredito independente.

## 19. Recomendação do arquiteto

**RECOMENDAR REVISÃO INDEPENDENTE** do Gate G2 pelo supervisor com `lumon-supervisao-final`.

O contrato cobre arquitetura, dados, migração, conteúdo, mídia, offline, privacidade e primeira fatia vertical sem alterar produto. Novidades permanecem `PROPOSTA G2`; implementação e assets continuam bloqueados. Engenheiro não deve ser liberado por esta recomendação. Somente veredito do supervisor e transição canônica do orquestrador podem abrir próximo gate.
