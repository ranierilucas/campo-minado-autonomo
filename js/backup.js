function procuraMinas() {
    let tabuleiro = campoMinado.Tabuleiro();
    const redorAbstrato = [-12, -11, -10, -1, 0, +1, 10, 11, 12];

    for (j = 1; j < 6; j++) {
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

                if (fechados == j) {
                    posicoesMinas = posicoesMinas.concat(ultimasMinas);
                }
            }
        }
        console.log("-------------------------- FIM DO J = " + j + " --------------------------")
    }
    posicoesMinas = Array.from(new Set(posicoesMinas));
    console.log(posicoesMinas);
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
        console.log("INDICE: " + indice); // posição a ser analisada

        //verificar se ao redor de indice já existe uma mina
        let redorConcreto = redorAbstrato.map((valor) => valor += indice);
        redorConcreto = redorConcreto.filter((valor) => valor > 0);
        redorConcreto = redorConcreto.filter((valor) => tabuleiro[valor] != "\r");
        numeroMinas = 0;
        console.log("Redor: " + redorConcreto);
        //ATÉ AQUI ESTÁ CORRETO 
        for (posicao of redorConcreto) {
            if (posicoesMinas.includes(posicao)) {
                numeroMinas += 1;
            }
        }

        //verifica se a posição (indice) é segura para abrir.
        if (numeroMinas == tabuleiro[indice]) {

            for (posicao of redorConcreto) {
                if (tabuleiro[posicao] == '-' && !(posicoesMinas.includes(posicao))) {
                    console.log("Abrirei o indice " + posicao + ": linha " +
                        converteLinhaColuna(posicao)[0] + ", coluna " +
                        converteLinhaColuna(posicao)[1]);
                    campoMinado.Abrir(converteLinhaColuna(posicao)[0], converteLinhaColuna(posicao)[1]);
                    tabuleiro = campoMinado.Tabuleiro();
                    document.getElementById('exibir-execucao').innerHTML += '<pre>' + campoMinado.Tabuleiro() + '</pre>';
                }
            }
        }

    }

    // } while (analisar != [])
}