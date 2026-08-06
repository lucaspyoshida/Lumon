/**
 * Persistência local versionada.
 *
 * Guarda um único perfil: só uma criança usa o aplicativo. A estrutura fica
 * aninhada sob `perfil` para que perfis múltiplos, se um dia forem
 * necessários, sejam uma adição e não uma migração destrutiva.
 *
 * Nada sai do dispositivo. Nenhum dado identificável é coletado.
 */

const CHAVE = 'lumon-dados';
const CHAVE_ANTIGA = 'lumon-last-settings';
const VERSAO = 1;

function estadoInicial() {
  return {
    versao: VERSAO,
    perfil: { criadoEm: new Date().toISOString() },
    ultimoJogo: null,
    progresso: { habilidades: {} },
    preferencias: { som: true, movimentoReduzido: false },
  };
}

/**
 * Converte o formato antigo (`lumon-last-settings`) para o novo, preservando
 * a última configuração usada. Roda uma vez só: a chave antiga é mantida
 * intacta como backup, mas deixa de ser lida depois da primeira migração.
 */
function migrarDoFormatoAntigo() {
  const dados = estadoInicial();
  try {
    const bruto = localStorage.getItem(CHAVE_ANTIGA);
    if (!bruto) return dados;
    const antigo = JSON.parse(bruto);
    if (antigo && antigo.atividade && antigo.nivel) {
      dados.ultimoJogo = {
        atividade: antigo.atividade,
        modo: antigo.modo === 'aleatorio' ? 'aleatorio' : 'sequencial',
        nivelId: antigo.nivel.id ?? null,
        rotulo: antigo.nivel.label ?? null,
      };
    }
  } catch {
    // JSON inválido no armazenamento antigo não pode derrubar o aplicativo.
  }
  return dados;
}

export function carregar() {
  let bruto = null;
  try {
    bruto = localStorage.getItem(CHAVE);
  } catch {
    return estadoInicial(); // localStorage bloqueado (modo privado, por exemplo)
  }
  if (!bruto) {
    const migrado = migrarDoFormatoAntigo();
    salvar(migrado);
    return migrado;
  }
  try {
    const dados = JSON.parse(bruto);
    if (!dados || typeof dados !== 'object' || dados.versao !== VERSAO) {
      return estadoInicial();
    }
    // Preenche campos que possam faltar por edição manual ou versão parcial.
    return { ...estadoInicial(), ...dados, preferencias: { ...estadoInicial().preferencias, ...dados.preferencias } };
  } catch {
    return estadoInicial();
  }
}

export function salvar(dados) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(dados));
  } catch {
    // Cota estourada ou armazenamento indisponível: seguir sem persistir é
    // melhor que interromper a criança no meio de uma sessão.
  }
}

export function registrarUltimoJogo(atividadeId, modo, nivel) {
  const dados = carregar();
  dados.ultimoJogo = { atividade: atividadeId, modo, nivelId: nivel.id, rotulo: nivel.rotulo };
  salvar(dados);
}

/** Acumula acertos e erros por habilidade, base da progressão futura. */
export function registrarResultado(habilidade, acertou) {
  if (!habilidade) return;
  const dados = carregar();
  const atual = dados.progresso.habilidades[habilidade] ?? { tentativas: 0, acertos: 0 };
  atual.tentativas += 1;
  if (acertou) atual.acertos += 1;
  atual.ultimaPratica = new Date().toISOString();
  dados.progresso.habilidades[habilidade] = atual;
  salvar(dados);
}

export function lerPreferencias() {
  return carregar().preferencias;
}

export function gravarPreferencia(chave, valor) {
  const dados = carregar();
  dados.preferencias[chave] = valor;
  salvar(dados);
}

export const _internos = { estadoInicial, CHAVE, CHAVE_ANTIGA, VERSAO };
