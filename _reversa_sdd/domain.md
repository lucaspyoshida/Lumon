# Domínio e regras de negócio — Lumon

> Gerado pelo Detetive · nível Essencial · 2026-07-17.

## Propósito do produto

🟢 **CONFIRMADO** — O Lumon é um jogo educacional infantil de cartões para reconhecimento de números e letras e prática de soma e subtração. A criança escolhe uma atividade, um modo e um nível, percorre uma sessão e se autoavalia deslizando o cartão.

🟡 **INFERIDO** — O produto privilegia uso móvel, repetição curta e feedback visual imediato. Isso é sustentado pelo layout limitado a 450 px, gestos touch, PWA offline, sessões de até 15 itens e treino de erros.

## Glossário

| Termo | Definição operacional | Confiança |
|---|---|---|
| Atividade | Família de treino: números, somas, subtrações ou letras | 🟢 |
| Modo sequencial | Mantém a ordem gerada para as questões | 🟢 |
| Modo aleatório | Reordena a fila com `sort(() => Math.random() - 0.5)` | 🟢 |
| Nível | Configuração que determina intervalo ou operando da atividade | 🟢 |
| Questão | Número, letra ou expressão exibida na face frontal do cartão | 🟢 |
| Resposta | Resultado calculado no verso do cartão aritmético | 🟢 |
| Sessão | Execução de uma fila com contadores zerados e tela de resumo ao final | 🟢 |
| Acerto | Autoavaliação registrada por swipe à direita | 🟢 |
| Erro | Autoavaliação registrada por swipe à esquerda e guardada para retreino | 🟢 |
| Treinar erros | Nova sessão formada somente pelas questões erradas da rodada anterior | 🟢 |
| Último jogo | Atalho para reutilizar atividade, modo e nível salvos no navegador | 🟢 |
| Intervalo customizado | Faixa inclusiva definida pelo usuário para números ou letras | 🟢 |

## Regras de negócio confirmadas

### Seleção e navegação

1. 🟢 Uma atividade deve ser escolhida antes do modo; um nível deve ser definido antes de uma sessão.
2. 🟢 Letras usam submenu próprio com vogais, palavra e intervalo; demais atividades usam níveis gerados dinamicamente.
3. 🟢 Sair ao menu principal apaga todo o estado corrente da sessão.

### Sessão e avaliação

4. 🟢 Sessões novas zeram índice, acertos e erros e descartam a fila de erros anterior.
5. 🟢 Sessões comuns têm no máximo 15 questões; intervalos de letras preservam todos os itens.
6. 🟢 Swipe à direita conta um acerto; swipe à esquerda conta um erro e guarda a questão.
7. 🟢 O botão “Treinar erros” só aparece quando o total de erros é maior que zero.
8. 🟢 O retreino copia somente as questões erradas, apaga a fila antiga, força modo aleatório e zera os contadores.
9. 🟢 Não existe correção automática: o sentido do gesto representa a avaliação feita pelo usuário.

### Números

10. 🟢 Níveis fixos cobrem faixas inclusivas 1–10, 1–20 e 1–30 antes do limite de sessão.
11. 🟢 O intervalo customizado numérico fica entre 1 e 100 e mantém início menor ou igual ao fim.
12. 🟢 Intervalos numéricos incluem ambos os extremos.

### Aritmética

13. 🟢 Níveis fixos praticam adição ou subtração por 1, 2 ou 3.
14. 🟢 Somas aleatórias produzem operandos positivos e resultado máximo 10.
15. 🟢 Subtrações aleatórias produzem resultado positivo e nunca negativo.
16. 🟢 Cartões aritméticos podem ser virados por toque/clique para revelar o resultado.

### Letras

17. 🟢 O nível vogais usa exatamente A, E, I, O e U.
18. 🟢 Uma palavra é normalizada sem diacríticos, convertida em maiúsculas e deduplicada preservando a ordem.
19. 🟢 Uma palavra vazia não inicia sessão.
20. 🟢 Intervalos de letras usam A–Z, incluem os extremos e rejeitam início posterior ao fim.

### Persistência e offline

21. 🟢 Somente atividade, modo e nível do último jogo são persistidos.
22. 🟢 O atalho de último jogo aparece apenas quando atividade e modo atuais correspondem aos valores salvos.
23. 🟢 O shell PWA prioriza recursos em cache e recorre à rede quando não os encontra.
24. 🟢 Uma nova versão do cache remove caches com nomes diferentes durante a ativação.

## Regras inferidas e possíveis intenções

- 🟡 Sessões curtas provavelmente buscam reduzir fadiga infantil; o limite de 15 foi introduzido explicitamente no código.
- 🟡 O retreino em ordem aleatória provavelmente busca reduzir memorização da sequência e reforçar itens difíceis.
- 🟡 A combinação de PWA e cache offline indica intenção de uso em dispositivos móveis mesmo com conectividade limitada.
- 🟡 Cores distintas por atividade e imagens de acerto/erro buscam comunicação rápida e pré-alfabetizada.
- 🟡 A ausência de login, backend e telemetria parece uma escolha de simplicidade e privacidade local, mas não está documentada formalmente.

## Arqueologia Git

O histórico acessível contém 27 commits entre 26 de setembro e 13 de outubro de 2025.

| Evidência | Evolução observada | Interpretação |
|---|---|---|
| `552d26c` — “último jogo” | Introduziu `localStorage`, faixa numérica customizada e reorganizou a lógica de sessão | 🟢 O produto passou a favorecer repetição rápida e customização |
| `de3a34e` — “letras” | Adicionou atividade de letras, cores próprias e três modalidades | 🟢 O escopo evoluiu de matemática para alfabetização inicial |
| `6d2e0a3` — “manifest e ícones” | Adicionou manifesto e ícones instaláveis | 🟢 A instalação como PWA tornou-se requisito explícito |
| Série de commits em `service-worker.js` | Cache avançou até `math-kids-v8`; imagens foram adicionadas ao pré-cache | 🟢 O funcionamento offline e a atualização de assets foram refinados incrementalmente |
| `025ab8b` — “treinar erros” | Adicionou fila de erros e sessão específica de reforço | 🟢 A repetição de dificuldades virou comportamento central |
| `c9d70c6` — “acerto das letras” | Validou intervalo, persistiu limites e removeu o teto de 15 para intervalo alfabético | 🟢 O comportamento de letras foi corrigido para respeitar a faixa inteira |

Não foram encontrados reverts, hotfixes nomeados, branches de release ou mensagens que expliquem alternativas consideradas.

## Máquinas de estado

No nível Essencial, não foi criado `state-machines.md`: não existe entidade persistente com campo de status. O estado de interface é efêmero e pode ser resumido assim:

`menu inicial → seleção de modo → seleção/configuração de nível → sessão → resumo → recomeçar | treinar erros | menu inicial`.

🟡 O fluxo de letras insere telas específicas de palavra ou intervalo antes da sessão.

## Permissões e papéis

No nível Essencial, não foi criado `permissions.md`: não existem autenticação, usuários, papéis, RBAC ou ACL. Todas as funcionalidades ficam disponíveis ao usuário local.

## Lacunas para validação humana

- 🔴 Qual é a faixa etária e o objetivo pedagógico formal?
- 🔴 O limite de 15 deve truncar também níveis sequenciais “Até 20/30” ou deveria amostrar toda a faixa?
- 🔴 Espaços, números e pontuação devem ser aceitos no treino de palavra?
- 🔴 Questões aleatórias podem repetir ou deveriam ser únicas e balanceadas?
- 🔴 A autoavaliação por swipe é intencional ou existe plano de captura/verificação de resposta?
- 🔴 Quais requisitos de acessibilidade, teclado, leitor de tela e contraste devem ser atendidos?
- 🔴 Quais ambientes de hospedagem são suportados para os caminhos do service worker e das imagens?
- 🔴 O histórico de desempenho da criança deve continuar exclusivamente efêmero?
