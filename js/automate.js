var campoMinado = new CampoMinado();
let posicoesMinas = [];
let posicoesFechadas;

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

function analisar() {
    let tabuleiro = campoMinado.Tabuleiro(); //lembra de atualizá-lo.
}

document.getElementById('exibir-execucao').innerHTML += '----------- Início do jogo -----------';
document.getElementById('exibir-execucao').innerHTML += '<pre>' + campoMinado.Tabuleiro() + '</pre>';
