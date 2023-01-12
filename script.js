let qtdCartas;

const cartas = [
    "bobrossparrot",
    "explodyparrot",
    "fiestaparrot",
    "metalparrot",
    "revertitparrot",
    "tripletsparrot",
    "unicornparrot"
];

const baralho = [];

let primeiraCarta, segundaCarta;

function resetCartas(){
    primeiraCarta = undefined;
    segundaCarta = undefined;
}
function desvirarCartas(){
    primeiraCarta.classList.remove('virada');
    segundaCarta.classList.remove('virada');

    //resetar cartas;
    resetCartas();
}

function vizualizarConteudo(carta){
    
    if(carta.classList.contains('virada')){
        return;
    }

    if(primeiraCarta !== undefined && segundaCarta !== undefined){
        return;
    }

    if(primeiraCarta === undefined || segundaCarta === undefined){
        
        carta.classList.add('virada');

        if(primeiraCarta === undefined){
            primeiraCarta = carta;
        }else{
            if(segundaCarta === undefined){
                segundaCarta = carta;

                //comparar os conteúdos;
                if(primeiraCarta.innerHTML === segundaCarta.innerHTML){
                    resetCartas();
                }else{
                    //esperar 1s;
                    setTimeout(desvirarCartas, 1000);
                }
            }
        }
    }
}

function renderizarBaralho(){
    const tabuleiro = document.querySelector('.tabuleiro');

    for(let i = 0; i < baralho.length; i++){
        let cartaTemplate = `
            <li class="carta" onclick="vizualizarConteudo(this)">
                <div class='front-face face'>
                    <img src='imagens/front.png'>
                </div>
                <div class='back-face face'>
                    <img src='imagens/${baralho[i]}.gif'>
                </div>
            </li>  
        `;

        tabuleiro.innerHTML += cartaTemplate;
    }
}

function comparador() { 
	return Math.random() - 0.5; 
}

function iniciarJogo(){

    //criar o baralho
    for(let i = 0; i < (qtdCartas/2) ; i++ ){
        let carta = cartas[i];
        baralho.push(carta);
        baralho.push(carta);
    }

    //embaralhar esse baralho
    baralho.sort(comparador);

    //distribuir as cartas no tabuleiro
    renderizarBaralho()
}

function condicoesElementares(){
    if ((qtdCartas % 2 !== 0) || qtdCartas < 4 || qtdCartas > 14 || isNaN(qtdCartas)) {
        return true;
    }else{
        return false;
    }
}

function perguntarqtdCartas(){
    while(condicoesElementares()){
        qtdCartas = Number( prompt('Com quantas cartas você quer jogar?') );
    }

    iniciarJogo();

}
perguntarqtdCartas();