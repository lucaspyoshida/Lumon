# Navegação e interface — Design técnico

> Especificação do funcionamento interno da navegação. 🟢 **CONFIRMADO** pelo legado em `index.htm`, `script.js` e `style.css`.

## Interface

🟢 **CONFIRMADO** — A unit não expõe API HTTP ou classe pública; sua interface é formada por elementos DOM, atributos `data-*`, estado compartilhado e funções internas.

### Funções

| Símbolo | Assinatura observada | Retorno | Responsabilidade | Confiança |
|---|---|---|---|---|
| `navegarPara` | `(idTela: string)` | `void` | Desativar todas as telas e ativar o ID solicitado | 🟢 |
| `resetarEstado` | `()` | `void` | Substituir o estado corrente por valores iniciais | 🟢 |
| `loadLastUsedSettings` | `()` | `object \| null` | Obter configuração usada para o atalho “Último Jogo” | 🟢 |
| `iniciarSessao` | `(treinarErros: boolean = false)` | `void` | Consumir a seleção concluída e abrir a atividade | 🟢 |
| `popularIntervaloLetras` | `()` | `void` | Preparar selects A–Z antes da tela de intervalo | 🟢 |

### Contratos DOM

| Seletor/atributo | Tipo | Contrato | Confiança |
|---|---|---|---|
| `.tela` | `NodeList<Element>` | Conjunto completo de telas alternáveis | 🟢 |
| `.tela.ativa` | Classe de estado | Tela visível corrente | 🟢 |
| `.btn-menu[data-activity]` | Botão | Informa a atividade selecionada | 🟢 |
| `.btn-modo[data-mode]` | Botão | Informa modo sequencial/aleatório | 🟢 |
| `.btn-letras-menu[data-level]` | Botão | Informa subtipo de letras | 🟢 |
| `.btn-voltar[data-target]` | Botão | Informa tela anterior sem reset | 🟢 |
| `.btn-voltar-menu-principal[data-target]` | Botão | Informa destino com reset | 🟢 |
| `#niveis-container` | Contêiner | Recebe botões de nível criados dinamicamente | 🟢 |

### Telas

| ID | Entrada principal | Próximos destinos | Confiança |
|---|---|---|---|
| `menu-inicial` | Carga ou saída | `menu-modo`, `menu-letras` | 🟢 |
| `menu-modo` | Atividade comum ou subtipo de letras | `menu-nivel`, configuração de letras ou sessão | 🟢 |
| `menu-nivel` | Modo de números/aritmética | Sessão ou intervalo numérico | 🟢 |
| `menu-letras` | Atividade Letras | `menu-modo` | 🟢 |
| `tela-palavra` | Letras/Palavra + modo | Sessão | 🟢 |
| `tela-intervalo-letras` | Letras/Intervalo + modo | Sessão | 🟢 |
| `tela-intervalo-customizado` | Números + modo | Sessão | 🟢 |
| `tela-atividade` | Configuração completa | Resumo ou menu inicial | 🟢 |
| `tela-resumo` | Fim da fila | Nova sessão, treino de erros ou menu | 🟢 |

## Fluxo principal — atividade numérica

1. 🟢 O documento começa com `menu-inicial` contendo `tela ativa` (`index.htm:16`).
2. 🟢 O clique em Números grava `estadoAtual.atividade = "numeros"`, copia o texto para o título de modo e abre `menu-modo` (`script.js:223-230`).
3. 🟢 O clique em Sequencial/Aleatório grava `estadoAtual.modo` (`script.js:239-240`).
4. 🟢 O contêiner de níveis é limpo (`script.js:251-252`).
5. 🟢 Se a configuração persistida for compatível, um botão “Último Jogo” é inserido (`script.js:254-266`).
6. 🟢 Um botão é criado para cada entrada de `niveis.numeros` (`script.js:268-278`).
7. 🟢 Um botão extra abre o intervalo customizado (`script.js:280-288`).
8. 🟢 O sistema abre `menu-nivel`; escolher um nível atribui `estadoAtual.nivel` e chama `iniciarSessao()` (`script.js:273-276,289`).

## Fluxo principal — atividade de letras

1. 🟢 O clique em Letras grava a atividade e abre `menu-letras` (`script.js:223-227`).
2. 🟢 O clique em um subtipo encontra o nível por `data-level`, define o título e abre `menu-modo` (`script.js:233-237`).
3. 🟢 O modo é gravado (`script.js:239-240`).
4. 🟢 Palavra abre `tela-palavra`; intervalo prepara os selects e abre `tela-intervalo-letras`; vogais inicia a sessão diretamente (`script.js:241-249`).

## Fluxos alternativos

- 🟢 **Voltar contextual:** qualquer `.btn-voltar` chama `navegarPara(data-target)` sem apagar o estado (`script.js:293`).
- 🟢 **Sair ao menu:** qualquer `.btn-voltar-menu-principal` chama `resetarEstado()` antes de navegar (`script.js:294-297`).
- 🟢 **Último jogo:** uma configuração compatível atribui o nível salvo e inicia a sessão (`script.js:255-265`).
- 🟢 **Recomeçar:** o botão de resumo inicia nova sessão com a configuração corrente (`script.js:299`).
- 🟢 **Treinar erros:** o botão de resumo inicia sessão com a fila de erros (`script.js:301`).
- 🔴 **Tela inexistente:** não existe guarda para `document.getElementById(idTela) === null` (`script.js:91`).

## Dependências

- 🟢 **Sessão de treinamento:** recebe atividade, modo e nível após a navegação.
- 🟢 **Atividades de números, aritmética e letras:** fornecem níveis e telas específicas.
- 🟢 **Persistência local:** fornece o objeto opcional de último jogo.
- 🟢 **DOM:** materializa telas, botões, títulos e contêiner dinâmico.
- 🟢 **CSS:** `.tela` oculta o conteúdo e `.tela.ativa` o exibe (`style.css:65-81`).

## Decisões de design identificadas

| Decisão | Evidência | Confiança |
|---|---|---|
| SPA sem roteador: visibilidade controlada por classe CSS | `script.js:89-92`; `style.css:65-81` | 🟢 |
| Configuração progressiva em atividade → modo → nível | `index.htm:16-35`; `script.js:223-291` | 🟢 |
| Letras usam ramo de navegação próprio | `index.htm:60-85`; `script.js:223-249` | 🟢 |
| Níveis comuns são botões criados em tempo de execução | `script.js:268-278` | 🟢 |
| Voltar preserva estado; sair ao menu apaga estado | `script.js:293-297` | 🟢 |
| Interface limitada a 450 px para foco mobile | `style.css:50-62` | 🟢 |

## Estado interno

🟢 **CONFIRMADO** — A unit escreve `estadoAtual.atividade`, `estadoAtual.modo` e `estadoAtual.nivel`. 🟢 **CONFIRMADO** — `resetarEstado()` também redefine questões, índice, acertos, erros e fila de erros (`script.js:218-220`).

🟢 **CONFIRMADO** — O estado visual é a presença da classe `ativa` em uma seção. 🟡 **INFERIDO** — O contrato assume uma única tela ativa porque `navegarPara` remove a classe globalmente antes de adicionar ao alvo.

## Observabilidade

- 🟢 A navegação não produz logs, métricas ou traces.
- 🟢 O único log próximo é o registro do service worker, fora da responsabilidade direta desta unit (`script.js:5-7`).
- 🔴 Não há instrumentação para abandono de fluxo, erros de alvo ou uso dos menus.

## Riscos e lacunas

- 🔴 O comportamento seguro para ID de tela inválido precisa ser definido.
- 🔴 Não há contrato de gerenciamento de foco após a troca de tela.
- 🔴 Não há semântica ARIA para anunciar a tela ativa.
- 🔴 Não há integração com histórico/URL; o comportamento do botão Voltar do navegador não está definido.
- 🟡 O título principal aleatório (`script.js:56-58`) parece personalização local, mas seu requisito de produto não está documentado.
- 🟡 A criação manual de botões acopla navegação, configuração e apresentação em um único listener.
