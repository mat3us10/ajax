//variaveis
var httpRequest; //variavel para o ajax funcionar
var jogador;
var vetor_de_jogadores = [];

//verifico a compatibilidade com os navegadores para se executar o ajax
if (window.XMLHttpRequest){
    httpRequest = new XMLHttpRequest();
}
else if(window.ActiveXObject){
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
}

//referencio a funcao ao objeto quando acontecer alguma mudança no estado da requisicao
httpRequest.onreadystatechange = funcao_atualiza_dados;

function funcao_atualiza_dados(){
    document.getElementById("container").innerHTML = httpRequest.responseText;
}

//funcao para carregar a pagina home
function carregar_home(){
    httpRequest.open('GET', './arquivos/home.html', true);
    httpRequest.send(null);
    setTimeout(carregar_pontos, 50);
}

//funcao para carregar os pontos
function carregar_pontos(){
    if(vetor_de_jogadores.length == 0){
        document.getElementById("pontuacoes_h1").innerHTML = "Nenhum jogador jogou recentemente";
    }
    else{
        document.getElementById("pontuacoes_h1").innerHTML = "Últimas pontuações";
    }
}