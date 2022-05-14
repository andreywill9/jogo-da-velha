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

function combinacaoVencedora(tabuleiro, simbolo) {
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

function empate(tabuleiro) {
    for (let key in tabuleiro) {
        if (tabuleiro[key] === "") return false;
    }
    return true;
}

function limparTabuleiro() {
    for (let key in tabuleiro) {
        tabuleiro[key] = "";
        document.getElementById(`posicao${key}`).innerText = '';
    }
}

function inserirSimbolo(simbolo, posicao) {
    if (jogoTerminado()) return;
    if (!posicaoLivre(posicao)) return;
    document.getElementById(`posicao${posicao}`).innerText = simbolo;
    if (empate(tabuleiro)) {
        alert("O jogo empatou!!");
        limparTabuleiro();
        return;
    }
    if (alguemVenceu()) {
        if (combinacaoVencedora(tabuleiro, seletorPlayer)) {
            alert("Parabéns!! Você venceu!!")
        } else {
            alert("Que pena, você perdeu :(")
        }
        limparTabuleiro();
        return;
    }
    if (simbolo === seletorPlayer) turnoDaIA();
}

function turnoDaIA() {
    if (jogoTerminado()) return;
    let bestScore = -800;
    let bestMove = 0;
    let tab = JSON.parse(JSON.stringify(tabuleiro));
    for (let key = 1; key < 10; key++) {
        if (tab[key] === "") {
            tab[key] = seletorIA;
            const score = minimax(tab, 0, false);
            tab[key] = "";
            if (score > bestScore) {
                bestScore = score;
                bestMove = key;
            }
        }
    }
    inserirSimbolo(seletorIA, bestMove);
}

function minimax(tabuleiro, depth, isMaximizing) {
    if (combinacaoVencedora(tabuleiro, seletorIA)) return 1
    else if (combinacaoVencedora(tabuleiro, seletorPlayer)) return -1
    else if (empate(tabuleiro)) return 0

    let bestScore;
    if (isMaximizing) {
        bestScore = -800;
        for (let key = 1; key < 10; key++) {
            if (tabuleiro[key] === "") {
                tabuleiro[key] = seletorIA;
                const score = minimax(tabuleiro, depth + 1, false);
                tabuleiro[key] = ""
                if (score > bestScore) {
                    bestScore = score;
                }
            }
        }
        return bestScore;
    } else {
        bestScore = 800;
        for (let key = 1; key < 10; key++) {
            if (tabuleiro[key] === "") {
                tabuleiro[key] = seletorPlayer;
                const score = minimax(tabuleiro, depth + 1, true)
                tabuleiro[key] = "";
                if (score < bestScore) {
                    bestScore = score
                }
            }
        }
        return bestScore
    }
}

