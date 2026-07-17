# Navegação e interface

> Contrato operacional da feature de navegação do Lumon. 🟢 **CONFIRMADO** em `index.htm:14-113` e `script.js:11-46,89-92,222-301`.

## Visão geral

🟢 **CONFIRMADO** — Esta unit apresenta as telas do Lumon e conduz o usuário pelo funil de configuração até uma sessão de treino. 🟢 **CONFIRMADO** — A navegação ocorre dentro de uma única página, alternando a classe CSS `ativa`, sem alterar URL ou histórico do navegador.

## Responsabilidades

- 🟢 Exibir uma única tela lógica por vez.
- 🟢 Permitir a seleção de uma entre quatro atividades: números, somas, subtrações ou letras.
- 🟢 Permitir a escolha do modo sequencial ou aleatório.
- 🟢 Encaminhar números e aritmética ao menu de níveis.
- 🟢 Encaminhar letras ao submenu próprio e às configurações específicas.
- 🟢 Permitir retorno à tela anterior por alvos declarados em `data-target`.
- 🟢 Limpar o estado da sessão quando o usuário sai ao menu principal.

## Regras de negócio

- 🟢 RN-01 — Apenas elementos com a classe `tela` participam da navegação (`script.js:12,89-92`).
- 🟢 RN-02 — A tela solicitada torna-se visível ao receber `ativa`; todas as demais perdem essa classe (`script.js:89-92`).
- 🟢 RN-03 — Selecionar `letras` abre `menu-letras`; selecionar números, somas ou subtrações abre `menu-modo` (`script.js:223-231`).
- 🟢 RN-04 — Após escolher um modo para letras, `palavra` abre `tela-palavra`, `intervalo` abre `tela-intervalo-letras` e `vogais` inicia a sessão (`script.js:239-249`).
- 🟢 RN-05 — Após escolher um modo para números ou aritmética, o sistema recria a lista de níveis e abre `menu-nivel` (`script.js:250-290`).
- 🟢 RN-06 — A opção “Intervalo Customizado” é adicionada somente à atividade `numeros` (`script.js:280-288`).
- 🟢 RN-07 — O botão “Último Jogo” só é exibido quando atividade e modo salvos coincidem com as escolhas atuais (`script.js:254-266`).
- 🟢 RN-08 — Voltar usa o valor de `data-target` sem redefinir o estado; sair ao menu principal redefine todo o estado (`script.js:293-297`).
- 🔴 RN-09 — O comportamento esperado para um `data-target` inexistente não está definido; o legado lançaria erro ao acessar `classList`.

## Requisitos funcionais

| ID | Requisito | Prioridade | Critério de aceite | Confiança |
|---|---|---|---|---|
| RF-01 | O sistema deve iniciar em `menu-inicial`. | Must | Ao carregar o documento, somente o menu inicial fica ativo. | 🟢 |
| RF-02 | O sistema deve permitir selecionar uma das quatro atividades. | Must | Cada botão grava seu `data-activity` no estado e segue ao fluxo correspondente. | 🟢 |
| RF-03 | O sistema deve permitir selecionar modo sequencial ou aleatório. | Must | O valor de `data-mode` é gravado antes da próxima tela ou do início da sessão. | 🟢 |
| RF-04 | O sistema deve criar os botões de nível compatíveis com a atividade escolhida. | Must | Números, somas e subtrações exibem somente seus níveis configurados. | 🟢 |
| RF-05 | O sistema deve oferecer submenu de letras com vogais, palavra e intervalo. | Must | Selecionar Letras exibe as três opções declaradas em `menu-letras`. | 🟢 |
| RF-06 | O sistema deve permitir retornar usando o alvo declarado no botão. | Should | Clicar em voltar abre exatamente a tela indicada por `data-target`. | 🟢 |
| RF-07 | Sair para o menu principal deve apagar a sessão corrente. | Must | Após sair, atividade, modo e nível ficam nulos e listas/contadores ficam zerados. | 🟢 |
| RF-08 | O sistema deve poder exibir atalho para a última configuração compatível. | Should | Quando atividade e modo coincidem, o botão usa o nível salvo e inicia uma sessão. | 🟢 |

## Requisitos não funcionais

| Tipo | Requisito inferido | Evidência no código | Confiança |
|---|---|---|---|
| Usabilidade móvel | A interface deve ocupar a tela e limitar o conteúdo a 450 px em telas largas. | `index.htm:5`; `style.css:50-62` | 🟢 |
| Feedback de transição | A troca de tela deve usar animação curta de opacidade e escala. | `style.css:65-86` | 🟢 |
| Operação client-side | A navegação deve funcionar sem backend ou roteador externo. | `script.js:89-92`; ausência de chamadas de negócio | 🟢 |
| Acessibilidade | O legado não define gestão de foco, estados ARIA ou navegação completa por teclado. | `index.htm:14-113`; `script.js:222-301` | 🔴 |

## Critérios de aceitação

### Cenário feliz: iniciar atividade numérica 🟢

```gherkin
Dado que o menu inicial está ativo
Quando o usuário escolhe Números, depois Sequencial e depois Até 10
Então a atividade deve ser "numeros"
E o modo deve ser "sequencial"
E o nível deve ser "ate10"
E a tela de atividade deve ser exibida
```

### Cenário feliz: configurar letras por palavra 🟢

```gherkin
Dado que o menu inicial está ativo
Quando o usuário escolhe Letras, Palavra e modo Aleatório
Então a tela de entrada de palavra deve ser exibida
E nenhuma sessão deve começar antes de uma palavra não vazia
```

### Cenário alternativo: voltar sem apagar seleção 🟢

```gherkin
Dado que o usuário está no menu de níveis
Quando aciona o botão Voltar com destino ao menu de modo
Então o menu de modo deve ser exibido
E o estado corrente não deve ser redefinido
```

### Cenário de saída: abandonar a sessão 🟢

```gherkin
Dado que existe uma sessão em andamento
Quando o usuário aciona Sair para o menu principal
Então o menu inicial deve ser exibido
E todo o estado da sessão deve retornar aos valores iniciais
```

### Cenário de falha: alvo de navegação inválido 🔴

```gherkin
Dado um controle com data-target que não corresponde a uma tela existente
Quando o usuário aciona esse controle
Então o comportamento seguro esperado deve ser definido pelo responsável do produto
```

## Prioridade MoSCoW

| Requisito | MoSCoW | Justificativa | Confiança |
|---|---|---|---|
| Alternância de tela | Must | Sustenta todos os fluxos da aplicação. | 🟢 |
| Seleção de atividade, modo e nível | Must | Pré-condição para gerar qualquer sessão. | 🟢 |
| Limpeza ao sair | Must | Evita reutilização indevida de estado parcial. | 🟢 |
| Voltar à tela anterior | Should | Existe alternativa de sair ao menu, mas perderia o contexto. | 🟡 |
| Atalho de último jogo | Should | Melhora conveniência; níveis normais continuam disponíveis. | 🟢 |

## Rastreabilidade de código

| Arquivo | Símbolo/trecho | Cobertura | Confiança |
|---|---|---|---|
| `index.htm:14-113` | Seções `.tela` e controles | Estrutura completa das telas | 🟢 |
| `script.js:11-46` | Seletores DOM | Dependências de interface | 🟢 |
| `script.js:89-92` | `navegarPara` | Alternância de tela | 🟢 |
| `script.js:222-291` | Listeners dos menus | Funil atividade/modo/nível | 🟢 |
| `script.js:293-297` | Voltar e sair | Navegação reversa e reset | 🟢 |
| `style.css:50-148` | `.app-container`, `.tela`, botões | Layout e estados visuais | 🟢 |
