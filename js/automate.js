var campoMinado = new CampoMinado();
let posicoesMinas = [];
let posicoesSeguras = [];
let posicoesFechadas = []; //"-"

function procuraMinas() {
    let tabuleiro = campoMinado.Tabuleiro();
    const redorAbstrato = [-12, -11, -10, -1, 0, +1, 10, 11, 12];

    //Procura minas focando em posições com j (1,2,3,4,5) de minas ao redor
    for (j = 1; j < 6; j++) {
        //Para cada j (ex: j =1) procura-se minas ao redor da posição i (caso i
        //seja igual ao número de minas que estamos focando (j))
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
                console.log(fechados);
                console.log("ENCERROU POSICAO " + i + "\r\n");

                //Caso o numero de posições ao redor seja igual ao número no
                //qual estmaos focando, todas essas posições possuem minas.
                if (fechados == j) {
                    posicoesMinas = posicoesMinas.concat(ultimasMinas);
                }
            }
        }
        console.log("-------------------------- FIM DO J = " + j + " --------------------------")
    }
    posicoesMinas = Array.from(new Set(posicoesMinas)); //retira posições repetidas
    console.log(posicoesMinas);
}

function converteLinhaColuna(posicao) {
    let linha = parseInt(posicao / 11);
    let coluna = posicao - parseInt(posicao / 11) * 11;

    return [linha + 1, coluna + 1];
}

function procuraPosicoesSeguras() {
    let tabuleiro = campoMinado.Tabuleiro();
    const redorAbstrato = [-12, -11, -10, -1, 0, +1, 10, 11, 12];
    let analisar = [];
    let iteracoes = null;
    let indice = null;
    let numeroMinas = null;

    // do {
    for (posicao of posicoesMinas) {
        let redorConcreto = redorAbstrato.map((valor) => valor += posicao);
        redorConcreto = redorConcreto.filter((valor) => valor > 0);
        redorConcreto = redorConcreto.filter((valor) => tabuleiro[valor] != "-");
        redorConcreto = redorConcreto.filter((valor) => tabuleiro[valor] != "\r");
        analisar = analisar.concat(redorConcreto);
    }

    console.log(analisar);
    iteracoes = analisar.length;
    for (let i = 0; i < iteracoes; i++) {
        //pega a primeira posição do analisar e já a retira
        indice = analisar.splice(0, 1)[0];
        console.log("INDICE: " + indice);

        //verificar se ao redor de indice já existe uma mina
        let redorConcreto = redorAbstrato.map((valor) => valor += indice);
        redorConcreto = redorConcreto.filter((valor) => valor > 0);
        redorConcreto = redorConcreto.filter((valor) => tabuleiro[valor] != "\r");
        numeroMinas = 0;
        console.log("Redor: " + redorConcreto);
        for (posicao of redorConcreto) {
            if (posicoesMinas.includes(posicao)) {
                numeroMinas += 1;
            }
        }

        //verifica se a posição (indice) é segura para abrir.
        if (numeroMinas == tabuleiro[indice]) {
            analisar.push(indice); // já analisa nessa mesma iteração do while
            iteracoes += 1;
            // campoMinado.Abrir(converteLinhaColuna(indice)[0], converteLinhaColuna(indice)[1]);
            // OBS: não esquece de atualizar o tabuleiro (instanciar de novo)
            console.log("Abrirei o indice " + indice + ": linha" +
                converteLinhaColuna(indice)[0] + ", coluna " +
                converteLinhaColuna(indice)[1]);
        }

    }

    // } while (analisar != [])
}

function jogar() {
    // let tabuleiro = campoMinado.Tabuleiro(); //lembra de atualizá-lo.
    while (campoMinado.JogoStatus() == 0) {
        procuraMinas();
        // procuraPosicoesSeguras();
    }
}

document.getElementById('exibir-execucao').innerHTML += '----------- Início do jogo -----------';
document.getElementById('exibir-execucao').innerHTML += '<pre>' + campoMinado.Tabuleiro() + '</pre>';
