var campoMinado = new CampoMinado();
let posicoesMinas = [];
let posicoesSeguras = [];

////Recebe o valor em indice da string e retorna a posição em linha e coluna////
function converteLinhaColuna(posicao) {
    let linha = parseInt(posicao / 11);
    let coluna = posicao - parseInt(posicao / 11) * 11;
    return [linha + 1, coluna + 1];
}

////procuraMinas encontra todas as minhas que podem ser encontrada na iteração atual////
function procuraMinas() {
    let tabuleiro = campoMinado.Tabuleiro();
    const redorAbstrato = [-12, -11, -10, -1, 0, +1, 10, 11, 12];

    ////////Procura minas focando em posições com j (1,2,3,4,5) de minas ao redor////////
    for (j = 1; j < 6; j++) {
        ////////Para cada j (ex: j =1) procura-se minas ao redor da posição i (caso i
        //seja igual ao número de minas que estamos focando (j))////////
        for (let i = 0; i < tabuleiro.length; i++) {
            if (tabuleiro[i] == j) {
                let posicao = i;
                let fechados = 0;
                let ultimasMinas = [];

                let redorConcreto = redorAbstrato.map((valor) => valor += posicao);
                for (valor of redorConcreto) {
                    if (valor >= 0) {
                        if (tabuleiro[valor] == "-") {
                            fechados += 1;
                            ultimasMinas.push(valor);
                        }
                    }
                }

                //Caso o numero de posições ao redor seja igual ao número no
                //qual estamos focando, todas essas posições possuem minas.
                if (fechados == j) {
                    for (valor of ultimasMinas) {
                        if (!posicoesMinas.includes(valor)) {
                            document.getElementById('exibir-execucao')
                                .innerHTML += '<br>Bomba encontrada: linha(' +
                                converteLinhaColuna(valor)[0] +
                                ') / coluna(' +
                                converteLinhaColuna(valor)[1] + ')';
                        }
                    }
                    posicoesMinas = posicoesMinas.concat(ultimasMinas);
                }
            }
        }
    }
    posicoesMinas = Array.from(new Set(posicoesMinas)); //retira posições repetidas
}

////procuraPosicoesSeguras procura e abre as posições que analisadas como seguras////
function procuraPosicoesSeguras() {
    let tabuleiro = campoMinado.Tabuleiro();
    const redorAbstrato = [-12, -11, -10, -1, 0, +1, 10, 11, 12];
    let analisar = [];
    let iteracoes = null;
    let indice = null;
    let numeroMinas = null;

    ////////Pega para analisar todas posições válidas ao redor de uma mina////////
    for (posicao of posicoesMinas) {
        let redorConcreto = redorAbstrato.map((valor) => valor += posicao);
        redorConcreto = redorConcreto.filter((valor) => valor > 0);
        redorConcreto = redorConcreto.filter((valor) => tabuleiro[valor] != "-");
        redorConcreto = redorConcreto.filter((valor) => tabuleiro[valor] != "\r");
        analisar = analisar.concat(redorConcreto);
    }

    ////////Para cada posição válida, abir as posições seguras ao seu redor////////
    analisar = Array.from(new Set(analisar)); // retirar posições repetidas
    iteracoes = analisar.length;
    for (let i = 0; i < iteracoes; i++) {
        indice = analisar.splice(0, 1)[0]; //pega a primeira posição do "analisar" e já a retira

        ////////verificar quantas minas existem ao redor do indice////////
        let redorConcreto = redorAbstrato.map((valor) => valor += indice);
        redorConcreto = redorConcreto.filter((valor) => valor > 0);
        redorConcreto = redorConcreto.filter((valor) => tabuleiro[valor] != "\r");
        numeroMinas = 0;
        for (posicao of redorConcreto) {
            if (posicoesMinas.includes(posicao)) {
                numeroMinas += 1;
            }
        }

        ////////verificar qual das posições ao redor de indice é segura para abrir////////
        if (numeroMinas == tabuleiro[indice]) {
            for (posicao of redorConcreto) {
                if (tabuleiro[posicao] == '-' && !(posicoesMinas.includes(posicao))) {
                    document.getElementById('exibir-execucao').innerHTML +=
                        '<br>Abrindo casa: linha(' + converteLinhaColuna(posicao)[0] +
                        ') / coluna(' + converteLinhaColuna(posicao)[1] + ')';

                    campoMinado.Abrir(converteLinhaColuna(posicao)[0], converteLinhaColuna(posicao)[1]);
                    tabuleiro = campoMinado.Tabuleiro();
                    document.getElementById('exibir-execucao').innerHTML += '<pre>' + campoMinado.Tabuleiro() + '</pre>';
                }
            }
        }

    }
}

////Responsável por chamar as funções "procuraMinas" e "procuraPosicoesSeguras"////
////repetidamente, até o status do jogo ser 1 (o que foi pedido pelo desafio)//// 
function jogar() {
    while (campoMinado.JogoStatus() == 0) {
        document.getElementById('exibir-execucao').innerHTML += '----------- Status: Jogo em aberto -----------';
        procuraMinas();
        document.getElementById('exibir-execucao').innerHTML += '<pre>' + campoMinado.Tabuleiro() + '</pre>';
        procuraPosicoesSeguras();
    }
    if (campoMinado.JogoStatus() == 1) {
        document.getElementById('exibir-execucao').innerHTML += '----------- Status: Vitoria -----------';
        document.getElementById('exibir-execucao').innerHTML += '<pre>' + campoMinado.Tabuleiro() + '</pre>';
    }
}

document.getElementById('exibir-execucao').innerHTML += '----------- Início do jogo -----------';
document.getElementById('exibir-execucao').innerHTML += '<pre>' + campoMinado.Tabuleiro() + '</pre>';
jogar();
