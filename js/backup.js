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