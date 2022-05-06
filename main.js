// const prompt = require('prompt-sync')();

const tabuleiro = {
    1: "", 2: "", 3: "",
    4: "", 5: "", 6: "",
    7: "", 8: "", 9: ""
};

const seletorPlayer = "X";

const seletorIA = "O";

function posicaoLivre(posicao) {
    return tabuleiro[posicao] === '';
}

function alguemVenceu() {
    return (tabuleiro[1] === tabuleiro[2] && tabuleiro[1] === tabuleiro[3] && tabuleiro[1] !== "") ||
        (tabuleiro[4] === tabuleiro[5] && tabuleiro[4] === tabuleiro[6] && tabuleiro[4] !== "") ||
        (tabuleiro[7] === tabuleiro[8] && tabuleiro[7] === tabuleiro[9] && tabuleiro[7] !== "") ||
        (tabuleiro[1] === tabuleiro[4] && tabuleiro[1] === tabuleiro[7] && tabuleiro[1] !== "") ||
        (tabuleiro[2] === tabuleiro[5] && tabuleiro[2] === tabuleiro[8] && tabuleiro[2] !== "") ||
        (tabuleiro[3] === tabuleiro[6] && tabuleiro[3] === tabuleiro[9] && tabuleiro[3] !== "") ||
        (tabuleiro[1] === tabuleiro[5] && tabuleiro[1] === tabuleiro[9] && tabuleiro[1] !== "") ||
        (tabuleiro[7] === tabuleiro[5] && tabuleiro[7] === tabuleiro[3] && tabuleiro[7] !== "")
}

function combinacaoVencedora(simbolo) {
    return (tabuleiro[1] === tabuleiro[2] && tabuleiro[1] === tabuleiro[3] && tabuleiro[1] === simbolo) ||
        (tabuleiro[4] === tabuleiro[5] && tabuleiro[4] === tabuleiro[6] && tabuleiro[4] === simbolo) ||
        (tabuleiro[7] === tabuleiro[8] && tabuleiro[7] === tabuleiro[9] && tabuleiro[7] === simbolo) ||
        (tabuleiro[1] === tabuleiro[4] && tabuleiro[1] === tabuleiro[7] && tabuleiro[1] === simbolo) ||
        (tabuleiro[2] === tabuleiro[5] && tabuleiro[2] === tabuleiro[8] && tabuleiro[2] === simbolo) ||
        (tabuleiro[3] === tabuleiro[6] && tabuleiro[3] === tabuleiro[9] && tabuleiro[3] === simbolo) ||
        (tabuleiro[1] === tabuleiro[5] && tabuleiro[1] === tabuleiro[9] && tabuleiro[1] === simbolo) ||
        (tabuleiro[7] === tabuleiro[5] && tabuleiro[7] === tabuleiro[3] && tabuleiro[7] === simbolo)
}

function jogoTerminado() {
    return !Object.keys(tabuleiro).some(posicaoLivre)
}

function empate() {
    return !alguemVenceu() && jogoTerminado();
}

function limparTabuleiro() {
    for (let key in tabuleiro) {
        tabuleiro[key] = "";
    }
}

function inserirSimbolo(simbolo, posicao) {
    if (jogoTerminado()) return;
    if (!posicaoLivre(posicao)) return;
    tabuleiro[posicao] = simbolo;
    if (empate()) {
        alert("O jogo empatou!!");
    }
    if (alguemVenceu()) {
        if (simbolo === seletorIA) {
            alert("Parabéns!! Você venceu!!")
        } else {
            alert("Que pena, você perdeu :(")
        }
        limparTabuleiro();
    }
}

function turnoDaIA() {
    let bestScore = -800;
    let bestMove = 0;
    const tab = Object.assign({}, tabuleiro);
    for (let key in tab) {
        if (tab[key] === "") {
            tab[key] = seletorIA;
            const score = minimax(tab, 0, false);
            if (score > bestScore) {
                bestScore = score;
                bestMove = key;
            }
        }
    }
    inserirSimbolo(seletorIA, bestMove);
}

function minimax(tab, depth, isMaximizing) {
    if (combinacaoVencedora(seletorIA)) return 1
    else if (combinacaoVencedora(seletorPlayer)) return -1
    else if (empate()) return 0
    if (isMaximizing) {
        let bestScore = -800
        for (let key in tab) {
            if (tab[key] === "") {
                tab[key] = seletorIA
                const score = minimax(tab, depth + 1, false)
                tab[key] = ""
                if (score > bestScore) {
                    bestScore = score
                }
            }
            return bestScore
        }
    } else {
        let bestScore = 800
        for (let key in tab) {
            if (tab[key] === "") {
                tab[key] = seletorPlayer
                const score = minimax(tab, depth + 1, true)
                tab[key] = ""
                if (score < bestScore) {
                    bestScore = score
                }
            }
        }
        return bestScore
    }
}

