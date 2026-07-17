# C4 — Contexto do Lumon

> Diagrama de contexto gerado pelo Arquiteto.

```mermaid
flowchart LR
    crianca["Pessoa: Criança / aprendiz"]
    responsavel["Pessoa inferida: Responsável ou educador"]
    lumon["Sistema: Lumon\nPWA educativa de números, aritmética e letras"]
    browser["Sistema de suporte: Navegador\nDOM, Web Storage, Service Worker e Cache Storage"]
    host["Sistema de suporte: Hospedagem estática\nProvedor não confirmado"]

    crianca -->|"Seleciona atividades e autoavalia respostas por gesto"| lumon
    responsavel -.->|"Pode orientar a escolha dos exercícios"| lumon
    lumon -->|"Executa usando APIs Web"| browser
    browser -->|"Obtém arquivos por HTTPS quando não estão no cache"| host
```

## Relações

| Origem | Destino | Relação | Confiança |
|---|---|---|---|
| Criança | Lumon | Executa treinos e marca acerto/erro | 🟢 |
| Responsável/educador | Lumon | Orienta uso | 🟡 |
| Lumon | Navegador | Usa APIs nativas e armazenamento local | 🟢 |
| Navegador | Hospedagem estática | Baixa shell e assets por HTTP(S) | 🟢 |
| Lumon | Serviços externos | Nenhuma integração identificada | 🟢 |

## Fronteira do sistema

Dentro da fronteira do Lumon estão HTML, CSS, JavaScript, manifesto e service worker. Navegador, armazenamento/cache implementados pelo navegador e hospedagem dos arquivos são dependências de plataforma externas à base de código.
