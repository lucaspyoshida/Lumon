# Skills do fluxo de Portugues do Lumon

> Estado: prontas para uso operacional.
> Data: 2026-07-17
> Norte: `_reversa_sdd/norte-modulo-portugues.md`
> Local de instalacao: `/Users/yoshida/.codex/skills`

## Politica

Estas skills nao autorizam implementacao do produto por si so. Elas devem ser usadas somente dentro dos gates definidos no Norte consolidado. A implementacao continua bloqueada ate autorizacao explicita do usuario.

Todas as skills exigem leitura do Norte antes de agir e mantem o repositorio obrigatorio em:

`/Users/yoshida/Documents/Codex/2026-07-16/quai/Lumon`

Branch obrigatoria quando houver trabalho no repositorio:

`feature/evolucao-pedagogica`

## Skills criadas

| Skill | Agente | Caminho local | Papel |
|---|---|---|---|
| `lumon-fluxo-produto` | Coordenador/orquestrador | `/Users/yoshida/.codex/skills/lumon-fluxo-produto/SKILL.md` | Estados, gates, handoffs, antirrepeticao e proximo agente autorizado. |
| `lumon-pedagogia-infantil` | Pedagogo | `/Users/yoshida/.codex/skills/lumon-pedagogia-infantil/SKILL.md` | Progressao, dominio, revisao, corpus e autonomia pre-leitora. |
| `lumon-arquitetura-pwa` | Arquiteto | `/Users/yoshida/.codex/skills/lumon-arquitetura-pwa/SKILL.md` | Contratos de materia, persistencia, migracao, conteudo e offline. |
| `lumon-engenharia-leve` | Engenheiro | `/Users/yoshida/.codex/skills/lumon-engenharia-leve/SKILL.md` | Audio MP3 offline, cache, quotas, performance, PWA e testes. |
| `lumon-frontend-infantil` | Frontend/design | `/Users/yoshida/.codex/skills/lumon-frontend-infantil/SKILL.md` | UX infantil, responsividade, acessibilidade, estados e briefing visual. |
| `lumon-arte-capivara` | Artista IA | `/Users/yoshida/.codex/skills/lumon-arte-capivara/SKILL.md` | Identidade da Capivara, model sheet, prompts e criterios de assets. |
| `lumon-programador-pwa` | Programador | `/Users/yoshida/.codex/skills/lumon-programador-pwa/SKILL.md` | Implementacao futura somente apos gate G4 e escopo aprovado. |
| `lumon-supervisao-final` | Supervisor | `/Users/yoshida/.codex/skills/lumon-supervisao-final/SKILL.md` | Teste, relatorio, severidade, veredito e decisao entre gates. |

## Validacao executada

- Templates iniciais da `skill-creator` foram substituidos.
- `agents/openai.yaml` foi corrigido para manter `$skill-name` literal nos prompts.
- Frontmatter de todas as skills validado com YAML local.
- Metadados `agents/openai.yaml` validados com YAML local.
- Busca por `TODO`, `[TODO]`, prompt quebrado `Use -` e texto placeholder: sem ocorrencias.
- O validador oficial `quick_validate.py` nao rodou no Python do sistema porque o modulo `yaml` nao esta instalado nesse runtime. Foi executada validacao equivalente com Ruby/YAML sem instalar dependencias.

## Hashes dos SKILL.md

| Skill | SHA-256 |
|---|---|
| `lumon-arquitetura-pwa` | `2202d07ed07ce8c4ee30c1fe63409d485357c1ce981221a1495a856e09fbc9fa` |
| `lumon-arte-capivara` | `06c10322e689af01ffcb0d79008e07d3538c1b400b0f376bf46318e80f67fd29` |
| `lumon-engenharia-leve` | `5d7018b9a806d5c0a716217c76fbfaa71cc03ef6c1b6e4bc9e4bb5cbc83ec896` |
| `lumon-fluxo-produto` | `21b6222c902404723112d014bd2621ca51eeb213d278ecad0b76723d5b330c70` |
| `lumon-frontend-infantil` | `8b90c7c59117a8f86479b9c1ecdf138b0959cf832ec635df36434338c802e5de` |
| `lumon-pedagogia-infantil` | `cda6c23a2c21a9a8204517d048748473a49f3207a897518de48ff4f45cb1dd14` |
| `lumon-programador-pwa` | `563e5d173385be54852edb6093830559952aa8069ffadc73349d8cbbe210110f` |
| `lumon-supervisao-final` | `02ce08afe988ac550840b34debd2ffd5a117734fe866af56fbcd1456b67961e2` |

## Proximo passo

Quando o usuario autorizar a automacao, o primeiro agente formal deve ser o pedagogo usando `lumon-pedagogia-infantil`, conduzido pelo orquestrador com `lumon-fluxo-produto`.
