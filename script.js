document.addEventListener('DOMContentLoaded', () => {
    // Registro do Service Worker para funcionamento offline
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => console.log('Service Worker registrado com sucesso:', registration))
                .catch(error => console.log('Falha ao registrar Service Worker:', error));
        });
    }

    // Seletores de elementos DOM
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
        somas: [
            { id: 'mais1', label: 'Somar +1', op: 1 },
            { id: 'mais2', label: 'Somar +2', op: 2 },
            { id: 'mais3', label: 'Somar +3', op: 3 },
            { id: 'aleatorio10', label: 'Aleatório até 10', op: 'aleatorio' }
        ],
        subtracoes: [
            { id: 'menos1', label: 'Subtrair -1', op: 1 },
            { id: 'menos2', label: 'Subtrair -2', op: 2 },
            { id: 'menos3', label: 'Subtrair -3', op: 3 },
            { id: 'aleatorio10', label: 'Aleatório até 10', op: 'aleatorio' }
        ]
    };

    function navegarPara(idTela) {
        telas.forEach(tela => tela.classList.remove('ativa'));
        document.getElementById(idTela).classList.add('ativa');
    }

    function gerarQuestoes() {
        const { atividade, modo, nivel } = estadoAtual;
        let questoes = [];
        const base = 10;
        switch (atividade) {
            case 'numeros':
                for (let i = nivel.max-10; i <= nivel.max; i++) { questoes.push(i); }
                break;
            case 'somas':
                if (nivel.op === 'aleatorio') {
                    for (let i = 0; i < base * 2; i++) {
                        const a = Math.ceil(Math.random() * 9);
                        const b = Math.ceil(Math.random() * (10 - a));
                        questoes.push(`${a} + ${b}`);
                    }
                } else {
                    for (let i = 0; i <= base; i++) { questoes.push(`${i} + ${nivel.op}`); }
                }
                break;
            case 'subtracoes':
                 if (nivel.op === 'aleatorio') {
                    for (let i = 0; i < base * 2; i++) {
                        const a = Math.ceil(Math.random() * 9) + 1;
                        const b = Math.ceil(Math.random() * (a - 1));
                        questoes.push(`${a} - ${b}`);
                    }
                } else {
                    for (let i = nivel.op; i <= base + nivel.op; i++) {
                        questoes.push(`${i} - ${nivel.op}`);
                    }
                }
                break;
        }
        if (modo === 'aleatorio') { questoes.sort(() => Math.random() - 0.5); }
        estadoAtual.questoes = questoes.slice(0, 15);
    }

    function mostrarQuestao() {
        if (estadoAtual.questaoAtual >= estadoAtual.questoes.length) {
            finalizarSessao();
            return;
        }
        if (estadoAtual.atividade === 'somas' || estadoAtual.atividade === 'subtracoes') {
            flipInstruction.classList.add('visible');
        } else {
            flipInstruction.classList.remove('visible');
        }
        progressoSpan.textContent = `${estadoAtual.questaoAtual + 1} / ${estadoAtual.questoes.length}`;
        const questao = estadoAtual.questoes[estadoAtual.questaoAtual];
        cardText.textContent = questao;
        if (typeof questao === 'string') {
            try { cardAnswer.textContent = eval(questao); } catch (e) { cardAnswer.textContent = '?'; }
        }
    
        // --- INÍCIO DA CORREÇÃO ---
        
        // 1. Desativa temporariamente as animações do cartão e do seu contêiner
        card.style.transition = 'none';
        cardContainer.style.transition = 'none';
        
        // 2. Reseta o estado visual instantaneamente (sem animar)
        card.classList.remove('is-flipped'); // Garante que a face da pergunta esteja para frente
        cardContainer.style.transform = 'translateX(0) rotate(0deg)'; // Garante que o cartão esteja no centro
    
        // 3. Força o navegador a aplicar as mudanças acima antes de continuar
        // É um pequeno truque para garantir que a reativação da animação aconteça depois
        card.offsetHeight; 
    
        // 4. Reativa as animações para as próximas interações do usuário (virar e arrastar)
        card.style.transition = 'transform 0.6s';
        cardContainer.style.transition = 'transform 0.4s ease';
    
        // --- FIM DA CORREÇÃO ---
    }
    function finalizarSessao() {
        resumoAcertosSpan.textContent = estadoAtual.acertos;
        resumoErrosSpan.textContent = estadoAtual.erros;
        navegarPara('tela-resumo');
    }
    
    function resetarEstado() {
        estadoAtual = {
            atividade: null, modo: null, nivel: null,
            questoes: [], questaoAtual: 0, acertos: 0, erros: 0
        };
    }

    botoesMenu.forEach(btn => {
        btn.addEventListener('click', () => {
            estadoAtual.atividade = btn.dataset.activity;
            modoTitulo.textContent = btn.textContent;
            navegarPara('menu-modo');
        });
    });

    botoesModo.forEach(btn => {
        btn.addEventListener('click', () => {
            estadoAtual.modo = btn.dataset.mode;
            nivelTitulo.textContent = modoTitulo.textContent;
            niveisContainer.innerHTML = '';
            niveis[estadoAtual.atividade].forEach(nivel => {
                const btnNivel = document.createElement('button');
                btnNivel.className = 'btn-nivel';
                btnNivel.textContent = nivel.label;
                btnNivel.onclick = () => {
                    estadoAtual.nivel = nivel;
                    gerarQuestoes();
                    estadoAtual.questaoAtual = 0; estadoAtual.acertos = 0; estadoAtual.erros = 0;
                    mostrarQuestao();
                    navegarPara('tela-atividade');
                };
                niveisContainer.appendChild(btnNivel);
            });
            navegarPara('menu-nivel');
        });
    });

    botoesVoltar.forEach(btn => btn.addEventListener('click', () => navegarPara(btn.dataset.target)));

    botoesVoltarMenuPrincipal.forEach(btn => {
        btn.addEventListener('click', () => {
            resetarEstado();
            navegarPara(btn.dataset.target);
        });
    });

    btnRecomecar.addEventListener('click', () => {
        estadoAtual.questaoAtual = 0; estadoAtual.acertos = 0; estadoAtual.erros = 0;
        if(estadoAtual.modo === 'aleatorio') { estadoAtual.questoes.sort(() => Math.random() - 0.5); }
        mostrarQuestao();
        navegarPara('tela-atividade');
    });

    let startX = 0, deltaX = 0, isDragging = false, isClick = true;

    function handleDragStart(e) {
        isDragging = true;
        isClick = true;
        startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        cardContainer.style.transition = 'none';
    }

    function handleDragMove(e) {
        if (!isDragging) return;
    
        // CORREÇÃO AQUI: Impede a ação padrão do navegador IMEDIATAMENTE.
        // Isso é crucial para um controle de gestos confiável no celular.
        e.preventDefault();
    
        const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        deltaX = currentX - startX;
    
        if (Math.abs(deltaX) > 15) {
            isClick = false;
        }
    
        // A lógica para mover o card visualmente continua a mesma
        if (!isClick) {
            const rotation = deltaX / 20;
            cardContainer.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
        }
    }

    function handleDragEnd() {
        if (!isDragging) return;
        isDragging = false;
        
        if (isClick && (estadoAtual.atividade === 'somas' || estadoAtual.atividade === 'subtracoes')) {
             card.classList.toggle('is-flipped');
        } 
        else if (!isClick) {
            cardContainer.style.transition = 'transform 0.4s ease';
            if (Math.abs(deltaX) > 100) {
                const direcao = deltaX > 0 ? 'direita' : 'esquerda';
                registrarResposta(direcao);
            } else {
                cardContainer.style.transform = 'translateX(0) rotate(0deg)';
            }
        }
        deltaX = 0;
    }

    function registrarResposta(direcao) {
        const acertou = direcao === 'direita';
        const moveX = acertou ? '500px' : '-500px';
        const rotate = acertou ? '30deg' : '-30deg';

        if (acertou) {
            estadoAtual.acertos++;
            feedbackAcerto.style.opacity = 1;
        } else {
            estadoAtual.erros++;
            feedbackErro.style.opacity = 1;
        }
        
        cardContainer.style.transform = `translateX(${moveX}) rotate(${rotate})`;

        setTimeout(() => {
            feedbackAcerto.style.opacity = 0;
            feedbackErro.style.opacity = 0;
            estadoAtual.questaoAtual++;
            mostrarQuestao();
        }, 500);
    }
    
    cardContainer.addEventListener('mousedown', handleDragStart);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);

    cardContainer.addEventListener('touchstart', handleDragStart, { passive: false });
    document.addEventListener('touchmove', handleDragMove, { passive: false });
    document.addEventListener('touchend', handleDragEnd);
    
    navegarPara('menu-inicial');
});