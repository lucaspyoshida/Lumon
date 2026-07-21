# Evidência de licença, termos e tratamento de conteúdo — P0a v2

> Registro operacional; não substitui parecer jurídico.

## Identificação

- fornecedor/ferramenta: OpenAI, `image_gen` integrada do Codex
- acesso às fontes: `2026-07-21`
- geração do candidato: `2026-07-21`
- operador: agente `artista_ia`
- dados de criança, voz, nome, idade, histórico ou desempenho enviados: não
- referência visual enviada: somente model sheet P0a v1 próprio do Lumon, publicado no Git
- artista, estúdio, personagem ou marca pedidos no prompt: nenhum

## Fontes oficiais consultadas

1. **OpenAI — Terms of Use**  
   URL: https://openai.com/policies/terms-of-use/  
   Publicados e efetivos em `2026-01-01`; acesso em `2026-07-21`.  
   Relevância: aplicam-se a ChatGPT, DALL·E e outros serviços individuais. Entre usuário e OpenAI, o usuário mantém os direitos sobre o input e possui o output, com cessão dos direitos que a OpenAI possa ter. O usuário continua responsável pelo conteúdo, pelos direitos do input e pela avaliação do output. Outputs podem não ser únicos; não há garantia de não infração.

2. **OpenAI Help Center — How your data is used to improve model performance**  
   URL: https://help.openai.com/en/articles/5722486-api-data-usage-policies  
   Página marcada como atualizada em julho de 2026; acesso em `2026-07-21`.  
   Relevância: em serviços individuais como ChatGPT e Codex, o conteúdo pode ser usado para treinamento, salvo opt-out. Codex possui controles próprios para ambientes completos. A configuração concreta da conta não foi inspecionada nesta execução.

3. **OpenAI Help Center — Chat and File Retention Policies in ChatGPT**  
   URL: https://help.openai.com/en/articles/8983778-chat-and-file-retention-policies-in-chatgpt  
   Página marcada como atualizada em julho de 2026; acesso em `2026-07-21`.  
   Relevância: chats permanecem até exclusão manual; após exclusão, são programados para remoção em até 30 dias, com exceções legais, de segurança ou desidentificação. Arquivos de Library têm ciclo separado. O comportamento específico do diretório local temporário do `image_gen` não é documentado nessa página.

4. **OpenAI — Service Terms**  
   URL: https://openai.com/policies/service-terms/  
   Página oficial vigente; acesso em `2026-07-21`.  
   Relevância: complementa o acordo aplicável e registra limites de responsabilidade e condições para ofertas específicas. Não foi usada uma API nem CLI nesta geração.

## Decisão operacional de compatibilidade

- **Uso do output no projeto:** compatível sob os termos consultados, porque a titularidade do output é atribuída ao usuário entre as partes e não há restrição não comercial específica para esta imagem.
- **Input:** compatível; a referência é arte própria do Lumon já publicada, sem referência protegida de terceiro fornecida silenciosamente.
- **Privacidade:** compatível com o Norte para este lote; nenhum dado infantil ou pessoal entrou no prompt. O possível uso de conteúdo para melhoria do modelo em conta individual permanece dependente da configuração do Codex, não verificada.
- **Retenção:** conhecida em nível de chat/arquivo conforme fonte oficial; retenção exata do artefato transitório do built-in não foi comprovada. O master canônico no Git elimina dependência operacional desse artefato temporário, mas não altera a política do fornecedor.
- **Originalidade/licença:** a cessão contratual não prova exclusividade, originalidade absoluta ou ausência de conflito com terceiros. Prompt sem imitação, inspeção visual humana e revisão supervisora continuam necessários.

## Limitações explícitas

- revisão jurídica exaustiva: não realizada;
- busca reversa ampla de imagem: não realizada;
- configuração de opt-out/treinamento da conta: não inspecionada;
- retenção específica do `image_gen` built-in: não exposta;
- garantia de exclusividade ou não infração: inexistente nas fontes consultadas.

Conclusão do artista: a evidência resolve a ausência documental do lote v1 para decisão do supervisor, sem prometer garantia jurídica que as fontes não oferecem.
