document.addEventListener('DOMContentLoaded', () => {
    // Registro do Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/Lumon/service-worker.js')
                .then(registration => console.log('Service Worker registrado com sucesso:', registration))
                .catch(error => console.log('Falha ao registrar Service Worker:', error));
        });
    }

    // --- SELETORES DE ELEMENTOS ---
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
    
    // Novos seletores para a tela de intervalo customizado
    const sliderInicio = document.getElementById('slider-inicio');
    const sliderFim = document.getElementById('slider-fim');
    const sliderInicioValor = document.getElementById('slider-inicio-valor');
    const sliderFimValor = document.getElementById('slider-fim-valor');
    const btnIniciarCustomizado = document.getElementById('btn-iniciar-customizado');

    // Novos seletores para a tela de letras
    const botoesLetrasMenu = document.querySelectorAll('.btn-letras-menu');
    const btnIniciarPalavra = document.getElementById('btn-iniciar-palavra');
    const inputPalavra = document.getElementById('input-palavra');
    const btnIniciarIntervaloLetras = document.getElementById('btn-iniciar-intervalo-letras');
    const selectLetraInicio = document.getElementById('select-letra-inicio');
    const selectLetraFim = document.getElementById('select-letra-fim');

    // --- ESTADO DA APLICAÇÃO ---
    let estadoAtual = {
        atividade: null, modo: null, nivel: null,
        questoes: [], questaoAtual: 0, acertos: 0, erros: 0
    };

    const niveis = {
        numeros: [
            { id: 'ate10', label: 'Até 10', min: 1, max: 10 },
            { id: 'ate20', label: 'Até 20', min: 1, max: 20 },
            { id: 'ate30', label: 'Até 30', min: 1, max: 30 }
        ],
        somas: [ { id: 'mais1', label: 'Somar +1', op: 1 }, { id: 'mais2', label: 'Somar +2', op: 2 }, { id: 'mais3', label: 'Somar +3', op: 3 }, { id: 'aleatorio10', label: 'Aleatório até 10', op: 'aleatorio' }],
        subtracoes: [ { id: 'menos1', label: 'Subtrair -1', op: 1 }, { id: 'menos2', label: 'Subtrair -2', op: 2 }, { id: 'menos3', label: 'Subtrair -3', op: 3 }, { id: 'aleatorio10', label: 'Aleatório até 10', op: 'aleatorio' }],
        letras: [ { id: 'vogais', label: 'Vogais' }, { id: 'palavra', label: 'Palavra' }, { id: 'intervalo', label: 'Intervalo Customizado' }]
    };

    // --- PERSISTÊNCIA DE DADOS ---
    const STORAGE_KEY = 'lumon-last-settings';

    function saveLastUsedSettings() {
        const settingsToSave = {
            atividade: estadoAtual.atividade,
            modo: estadoAtual.modo,
            nivel: estadoAtual.nivel
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settingsToSave));
    }

    function loadLastUsedSettings() {
        const savedSettings = localStorage.getItem(STORAGE_KEY);
        return savedSettings ? JSON.parse(savedSettings) : null;
    }

    // --- LÓGICA DO JOGO ---
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
                // Lógica atualizada para usar min e max
                for (let i = nivel.min; i <= nivel.max; i++) {
                    questoes.push(i);
                }
                break;
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
            case 'letras':
                switch (nivel.id) {
                    case 'vogais':
                        questoes = ['A', 'E', 'I', 'O', 'U'];
                        break;
                    case 'palavra':
                        const palavra = inputPalavra.value.toUpperCase();
                        questoes = [...new Set(palavra.split(''))];
                        break;
                    case 'intervalo':
                        const inicio = selectLetraInicio.value.charCodeAt(0);
                        const fim = selectLetraFim.value.charCodeAt(0);
                        for (let i = inicio; i <= fim; i++) {
                            questoes.push(String.fromCharCode(i));
                        }
                        break;
                }
                break;
        }

        if (modo === 'aleatorio') {
            questoes.sort(() => Math.random() - 0.5);
        }
        estadoAtual.questoes = questoes.slice(0, 15); // Limita a 15 questões por sessão
    }

    function iniciarSessao() {
        saveLastUsedSettings();
        gerarQuestoes();
        estadoAtual.questaoAtual = 0;
        estadoAtual.acertos = 0;
        estadoAtual.erros = 0;
        mostrarQuestao();
        navegarPara('tela-atividade');
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
            try {
                cardAnswer.textContent = eval(questao);
            } catch (e) {
                cardAnswer.textContent = '?';
            }
        }
        card.style.transition = 'none';
        cardContainer.style.transition = 'none';
        card.classList.remove('is-flipped');
        cardContainer.style.transform = 'translateX(0) rotate(0deg)';
        card.offsetHeight;
        card.style.transition = 'transform 0.6s';
        cardContainer.style.transition = 'transform 0.4s ease';
    }

    function finalizarSessao() {
        resumoAcertosSpan.textContent = estadoAtual.acertos;
        resumoErrosSpan.textContent = estadoAtual.erros;
        navegarPara('tela-resumo');
    }

    function resetarEstado() {
        estadoAtual = { atividade: null, modo: null, nivel: null, questoes: [], questaoAtual: 0, acertos: 0, erros: 0 };
    }

    // --- LÓGICA DE NAVEGAÇÃO E BOTÕES ---
    botoesMenu.forEach(btn => btn.addEventListener('click', () => {
        estadoAtual.atividade = btn.dataset.activity;
        if (estadoAtual.atividade === 'letras') {
            navegarPara('menu-letras');
        } else {
            modoTitulo.textContent = btn.textContent;
            navegarPara('menu-modo');
        }
    }));

    botoesLetrasMenu.forEach(btn => btn.addEventListener('click', () => {
        estadoAtual.nivel = niveis.letras.find(n => n.id === btn.dataset.level);
        modoTitulo.textContent = 'Letras';
        navegarPara('menu-modo');
    }));

    botoesModo.forEach(btn => btn.addEventListener('click', () => {
        estadoAtual.modo = btn.dataset.mode;
        if (estadoAtual.atividade === 'letras') {
            if (estadoAtual.nivel.id === 'palavra') {
                navegarPara('tela-palavra');
            } else if (estadoAtual.nivel.id === 'intervalo') {
                popularIntervaloLetras();
                navegarPara('tela-intervalo-letras');
            } else {
                iniciarSessao();
            }
        } else {
            nivelTitulo.textContent = modoTitulo.textContent;
            niveisContainer.innerHTML = ''; // Limpa os botões anteriores

            // Adiciona botão para o último jogo salvo, se aplicável
            const lastSettings = loadLastUsedSettings();
            if (lastSettings && lastSettings.atividade === estadoAtual.atividade && lastSettings.modo === estadoAtual.modo) {
                const btnUltimoJogo = document.createElement('button');
                btnUltimoJogo.className = 'btn-nivel';
                btnUltimoJogo.textContent = `Último Jogo: ${lastSettings.nivel.label}`;
                btnUltimoJogo.style.backgroundColor = 'var(--cor-secundaria)';
                btnUltimoJogo.onclick = () => {
                    estadoAtual.nivel = lastSettings.nivel;
                    iniciarSessao();
                };
                niveisContainer.appendChild(btnUltimoJogo);
            }

            // Cria botões de nível padrão
            niveis[estadoAtual.atividade].forEach(nivel => {
                const btnNivel = document.createElement('button');
                btnNivel.className = 'btn-nivel';
                btnNivel.textContent = nivel.label;
                btnNivel.onclick = () => {
                    estadoAtual.nivel = nivel;
                    iniciarSessao();
                };
                niveisContainer.appendChild(btnNivel);
            });

            // Adiciona botão para intervalo customizado se a atividade for "números"
            if (estadoAtual.atividade === 'numeros') {
                const btnCustom = document.createElement('button');
                btnCustom.className = 'btn-nivel';
                btnCustom.textContent = 'Intervalo Customizado';
                btnCustom.style.backgroundColor = '#f5a623';
                btnCustom.onclick = () => navegarPara('tela-intervalo-customizado');
                niveisContainer.appendChild(btnCustom);
            }
            navegarPara('menu-nivel');
        }
    }));

    botoesVoltar.forEach(btn => btn.addEventListener('click', () => navegarPara(btn.dataset.target)));
    botoesVoltarMenuPrincipal.forEach(btn => btn.addEventListener('click', () => {
        resetarEstado();
        navegarPara(btn.dataset.target);
    }));

    btnRecomecar.addEventListener('click', () => {
        estadoAtual.questaoAtual = 0;
        estadoAtual.acertos = 0;
        estadoAtual.erros = 0;
        if (estadoAtual.modo === 'aleatorio') {
            estadoAtual.questoes.sort(() => Math.random() - 0.5);
        }
        mostrarQuestao();
        navegarPara('tela-atividade');
    });

    // --- LÓGICA DA TELA DE INTERVALO CUSTOMIZADO ---
    sliderInicio.addEventListener('input', () => {
        sliderInicioValor.textContent = sliderInicio.value;
        // Garante que o valor de início não ultrapasse o de fim
        if (parseInt(sliderInicio.value) > parseInt(sliderFim.value)) {
            sliderFim.value = sliderInicio.value;
            sliderFimValor.textContent = sliderFim.value;
        }
    });

    sliderFim.addEventListener('input', () => {
        sliderFimValor.textContent = sliderFim.value;
        // Garante que o valor de fim não seja menor que o de início
        if (parseInt(sliderFim.value) < parseInt(sliderInicio.value)) {
            sliderInicio.value = sliderFim.value;
            sliderInicioValor.textContent = sliderInicio.value;
        }
    });

    btnIniciarCustomizado.addEventListener('click', () => {
        const min = parseInt(sliderInicio.value);
        const max = parseInt(sliderFim.value);
        estadoAtual.nivel = {
            id: 'custom',
            label: `De ${min} a ${max}`,
            min: min,
            max: max
        };
        iniciarSessao();
    });

    function popularIntervaloLetras() {
        const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        selectLetraInicio.innerHTML = '';
        selectLetraFim.innerHTML = '';
        for (const letra of alfabeto) {
            const optionInicio = document.createElement('option');
            optionInicio.value = letra;
            optionInicio.textContent = letra;
            selectLetraInicio.appendChild(optionInicio);

            const optionFim = document.createElement('option');
            optionFim.value = letra;
            optionFim.textContent = letra;
            selectLetraFim.appendChild(optionFim);
        }
        selectLetraFim.value = 'Z';
    }

    btnIniciarPalavra.addEventListener('click', () => {
        if (inputPalavra.value) {
            iniciarSessao();
        }
    });

    btnIniciarIntervaloLetras.addEventListener('click', iniciarSessao);


    // --- LÓGICA DE GESTOS (SWIPE E FLIP) ---
    let isDragging = false;
    let startX = 0;
    let deltaX = 0;
    let isClick = true;

    function handleDragStart(e) {
        isDragging = true;
        isClick = true;
        startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        deltaX = 0;
        cardContainer.style.transition = 'none';
    }

    function handleDragMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        deltaX = currentX - startX;
        if (Math.abs(deltaX) > 20) {
            isClick = false;
        }
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
        } else if (!isClick) {
            cardContainer.style.transition = 'transform 0.4s ease';
            if (Math.abs(deltaX) > 100) {
                const direcao = deltaX > 0 ? 'direita' : 'esquerda';
                registrarResposta(direcao);
            } else {
                cardContainer.style.transform = 'translateX(0) rotate(0deg)';
            }
        }
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
    cardContainer.addEventListener('click', () => {
        if (isClick && (estadoAtual.atividade === 'somas' || estadoAtual.atividade === 'subtracoes')) {
            card.classList.toggle('is-flipped');
        }
    });

    // Inicia a aplicação
    navegarPara('menu-inicial');
});
