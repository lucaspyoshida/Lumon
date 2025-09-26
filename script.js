document.addEventListener('DOMContentLoaded', () => {
    // Registro do Service Worker para funcionamento offline
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => console.log('Service Worker registrado com sucesso:', registration))
                .catch(error => console.log('Falha ao registrar Service Worker:', error));
        });
    }

    // Seletores de elementos DOM (sem alterações)
    const telas = document.querySelectorAll('.tela');
    const card = document.getElementById('card');
    const cardText = document.getElementById('card-text');
    const cardAnswer = document.getElementById('card-answer');
    const flipInstruction = document.getElementById('flip-instruction');
    const botoesMenu = document.querySelectorAll('.btn-menu');
    const botoesModo = document.querySelectorAll('.btn-modo');
    const botoesVoltar = document.querySelectorAll('.btn-voltar');
    const botoesVoltarMenuPrincipal = document.querySelectorAll('.btn-voltar-menu-principal');
    const btnRecomecar = document.getElementById('btn-recomecar');
    const modoTitulo = document.getElementById('modo-titulo');
    const nivelTitulo = document.getElementById('nivel-titulo');
    const niveisContainer = document.getElementById('niveis-container');
    const progressoSpan = document.getElementById('progresso');
    const resumoAcertosSpan = document.getElementById('resumo-acertos');
    const resumoErrosSpan = document.getElementById('resumo-erros');
    const feedbackAcerto = document.getElementById('feedback-acerto');
    const feedbackErro = document.getElementById('feedback-erro');
    const cardContainer = document.getElementById('card-container');

    let estadoAtual = {
        atividade: null, modo: null, nivel: null,
        questoes: [], questaoAtual: 0, acertos: 0, erros: 0
    };

    const niveis = {
        numeros: [
            { id: 'ate10', label: 'Até 10', max: 10 },
            { id: 'ate20', label: 'Até 20', max: 20 },
            { id: 'ate30', label: 'Até 30', max: 30 }
        ],
        somas: [ { id: 'mais1', label: 'Somar +1', op: 1 }, { id: 'mais2', label: 'Somar +2', op: 2 }, { id: 'mais3', label: 'Somar +3', op: 3 }, { id: 'aleatorio10', label: 'Aleatório até 10', op: 'aleatorio' }],
        subtracoes: [ { id: 'menos1', label: 'Subtrair -1', op: 1 }, { id: 'menos2', label: 'Subtrair -2', op: 2 }, { id: 'menos3', label: 'Subtrair -3', op: 3 }, { id: 'aleatorio10', label: 'Aleatório até 10', op: 'aleatorio' }]
    };

    // Funções de Navegação e Lógica do Jogo (sem alterações)
    function navegarPara(idTela) { telas.forEach(tela => tela.classList.remove('ativa')); document.getElementById(idTela).classList.add('ativa'); }
    function gerarQuestoes() {
        const { atividade, modo, nivel } = estadoAtual;
        let questoes = [];
        const base = 10;
        switch (atividade) {
            case 'numeros': for (let i = Math.max(1, nivel.max - 9); i <= nivel.max; i++) { questoes.push(i); } break;
            case 'somas':
                if (nivel.op === 'aleatorio') {
                    for (let i = 0; i < base * 2; i++) {
                        const a = Math.ceil(Math.random() * 9);
                        const b = Math.ceil(Math.random() * (10 - a));
                        questoes.push(`${a} + ${b}`);
                    }
                } else { for (let i = 0; i <= base; i++) { questoes.push(`${i} + ${nivel.op}`); } }
                break;
            case 'subtracoes':
                 if (nivel.op === 'aleatorio') {
                    for (let i = 0; i < base * 2; i++) {
                        const a = Math.ceil(Math.random() * 9) + 1;
                        const b = Math.ceil(Math.random() * (a - 1));
                        questoes.push(`${a} - ${b}`);
                    }
                } else { for (let i = nivel.op; i <= base + nivel.op; i++) { questoes.push(`${i} - ${nivel.op}`); } }
                break;
        }
        if (modo === 'aleatorio') { questoes.sort(() => Math.random() - 0.5); }
        estadoAtual.questoes = questoes.slice(0, 15);
    }
    function mostrarQuestao() {
        if (estadoAtual.questaoAtual >= estadoAtual.questoes.length) { finalizarSessao(); return; }
        if (estadoAtual.atividade === 'somas' || estadoAtual.atividade === 'subtracoes') { flipInstruction.classList.add('visible'); } else { flipInstruction.classList.remove('visible'); }
        progressoSpan.textContent = `${estadoAtual.questaoAtual + 1} / ${estadoAtual.questoes.length}`;
        const questao = estadoAtual.questoes[estadoAtual.questaoAtual];
        cardText.textContent = questao;
        if (typeof questao === 'string') { try { cardAnswer.textContent = eval(questao); } catch (e) { cardAnswer.textContent = '?'; } }
        card.style.transition = 'none';
        cardContainer.style.transition = 'none';
        card.classList.remove('is-flipped');
        cardContainer.style.transform = 'translateX(0) rotate(0deg)';
        card.offsetHeight; 
        card.style.transition = 'transform 0.6s';
        cardContainer.style.transition = 'transform 0.4s ease';
    }
    function finalizarSessao() { resumoAcertosSpan.textContent = estadoAtual.acertos; resumoErrosSpan.textContent = estadoAtual.erros; navegarPara('tela-resumo'); }
    function resetarEstado() { estadoAtual = { atividade: null, modo: null, nivel: null, questoes: [], questaoAtual: 0, acertos: 0, erros: 0 }; }
    
    // Lógica de Botões (sem alterações)
    botoesMenu.forEach(btn => btn.addEventListener('click', () => { estadoAtual.atividade = btn.dataset.activity; modoTitulo.textContent = btn.textContent; navegarPara('menu-modo'); }));
    botoesModo.forEach(btn => btn.addEventListener('click', () => { estadoAtual.modo = btn.dataset.mode; nivelTitulo.textContent = modoTitulo.textContent; niveisContainer.innerHTML = ''; niveis[estadoAtual.atividade].forEach(nivel => { const btnNivel = document.createElement('button'); btnNivel.className = 'btn-nivel'; btnNivel.textContent = nivel.label; btnNivel.onclick = () => { estadoAtual.nivel = nivel; gerarQuestoes(); estadoAtual.questaoAtual = 0; estadoAtual.acertos = 0; estadoAtual.erros = 0; mostrarQuestao(); navegarPara('tela-atividade'); }; niveisContainer.appendChild(btnNivel); }); navegarPara('menu-nivel'); }));
    botoesVoltar.forEach(btn => btn.addEventListener('click', () => navegarPara(btn.dataset.target)));
    botoesVoltarMenuPrincipal.forEach(btn => btn.addEventListener('click', () => { resetarEstado(); navegarPara(btn.dataset.target); }));
    btnRecomecar.addEventListener('click', () => { estadoAtual.questaoAtual = 0; estadoAtual.acertos = 0; estadoAtual.erros = 0; if(estadoAtual.modo === 'aleatorio') { estadoAtual.questoes.sort(() => Math.random() - 0.5); } mostrarQuestao(); navegarPara('tela-atividade'); });


    // ############ LÓGICA DE GESTOS REESTRUTURADA ############

    let isDragging = false;
    let startX = 0;
    let deltaX = 0;
    let isClick = true; // A variável de controle 'isClick' está de volta.

    function handleDragStart(e) {
        isDragging = true;
        isClick = true; // Assume que a interação será um clique.
        startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        deltaX = 0;
        cardContainer.style.transition = 'none';
    }

    function handleDragMove(e) {
        if (!isDragging) return;
        e.preventDefault();

        const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        deltaX = currentX - startX;

        // Se o movimento for significativo, muda a intenção para 'arrasto'.
        if (Math.abs(deltaX) > 20) {
            isClick = false;
        }

        // Só aplica a transformação visual se for um arrasto, para evitar que o card "salte" num clique.
        if (!isClick) {
            const rotation = deltaX / 20;
            cardContainer.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
        }
    }

    function handleDragEnd() {
        if (!isDragging) return;
        isDragging = false;

        // SE A INTENÇÃO PERMANECEU 'CLIQUE'
        if (isClick && (estadoAtual.atividade === 'somas' || estadoAtual.atividade === 'subtracoes')) {
            card.classList.toggle('is-flipped');
        } 
        // SE A INTENÇÃO MUDOU PARA 'ARRASTO'
        else if (!isClick) {
            cardContainer.style.transition = 'transform 0.4s ease';
            // Verifica se foi um swipe válido
            if (Math.abs(deltaX) > 100) {
                const direcao = deltaX > 0 ? 'direita' : 'esquerda';
                registrarResposta(direcao);
            } else { // Ou se foi só um arrasto curto (volta ao centro)
                cardContainer.style.transform = 'translateX(0) rotate(0deg)';
            }
        }
    }
    
    function registrarResposta(direcao) {
        const acertou = direcao === 'direita';
        const moveX = acertou ? '500px' : '-500px';
        const rotate = acertou ? '30deg' : '-30deg';
        if (acertou) { estadoAtual.acertos++; feedbackAcerto.style.opacity = 1; } 
        else { estadoAtual.erros++; feedbackErro.style.opacity = 1; }
        cardContainer.style.transform = `translateX(${moveX}) rotate(${rotate})`;
        setTimeout(() => {
            feedbackAcerto.style.opacity = 0;
            feedbackErro.style.opacity = 0;
            estadoAtual.questaoAtual++;
            mostrarQuestao();
        }, 500);
    }
    
    // Event Listeners (mantendo as correções anteriores de escopo no 'document')
    cardContainer.addEventListener('mousedown', handleDragStart);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);

    cardContainer.addEventListener('touchstart', handleDragStart, { passive: false });
    document.addEventListener('touchmove', handleDragMove, { passive: false });
    document.addEventListener('touchend', handleDragEnd);

    
    cardContainer.addEventListener('click', () => {
        if (isClick && (estadoAtual.atividade === 'somas' || estadoAtual.atividade === 'subtracoes')) {
            card.classList.toggle('is-flipped');
        }        
    });
    navegarPara('menu-inicial');
});