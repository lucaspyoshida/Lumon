# Evidência de licença, termos e tratamento de conteúdo — P0b v1

> Registro operacional; não substitui parecer jurídico.

## Identificação

- fornecedor/ferramenta: OpenAI, `image_gen` integrada do Codex
- acesso às fontes: `2026-07-21`
- geração: `2026-07-21`
- operador: agente `artista_ia`
- dados de criança, voz, nome, idade, histórico ou desempenho enviados: não
- referências visuais: somente `capivara-model-v1`, publicada no P0a v2 do próprio Lumon
- artista, estúdio, personagem ou marca pedidos no prompt: nenhum

## Fontes oficiais consultadas

1. **OpenAI — Terms of Use** — https://openai.com/policies/terms-of-use/  
   Publicados e efetivos em `2026-01-01`; acesso em `2026-07-21`. Entre usuário e OpenAI, o usuário mantém os direitos sobre o input e possui o output, nos limites da lei aplicável. O usuário permanece responsável pelo conteúdo e direitos; outputs podem não ser únicos e não há garantia de não infração.

2. **OpenAI Help Center — How your data is used to improve model performance** — https://help.openai.com/en/articles/5722486-api-data-usage-policies  
   Página oficial acessada em `2026-07-21`. Em serviços individuais, conteúdo pode ser usado para treinamento salvo opt-out; Codex possui controles próprios. A configuração concreta da conta não foi inspecionada.

3. **OpenAI Help Center — Chat and File Retention Policies in ChatGPT** — https://help.openai.com/en/articles/8983778-chat-and-file-retention-policies-in-chatgpt  
   Página oficial acessada em `2026-07-21`. Registra ciclos de retenção de chats e arquivos; não documenta a retenção específica do artefato transitório local do `image_gen`.

4. **OpenAI — Service Terms** — https://openai.com/policies/service-terms/  
   Página oficial vigente, acessada em `2026-07-21`. Complementa o acordo aplicável. Esta geração não usou API nem CLI.

## Decisão operacional

- uso no projeto: compatível sob os termos consultados, sem alegar exclusividade;
- input: compatível, pois veio somente de arte própria publicada do Lumon;
- privacidade: nenhum dado infantil ou pessoal foi enviado;
- retenção: master lossless e derivados canônicos ficam no Git, sem dependência operacional da saída transitória; política do fornecedor permanece aplicável;
- originalidade: prompt sem imitação e inspeção humana reduzem risco, mas não substituem busca reversa ou parecer jurídico.

## Limitações

- revisão jurídica exaustiva: não realizada;
- busca reversa ampla: não realizada;
- opt-out/treinamento da conta: não inspecionado;
- retenção específica do built-in: não exposta;
- garantia de exclusividade ou não infração: não oferecida.

Conclusão do artista: evidência suficiente para revisão independente do gate visual, sem promessa jurídica além das fontes.
