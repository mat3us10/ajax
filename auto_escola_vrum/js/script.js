//variaveis
var httpRequest; //variavel para o ajax funcionar
var jogador;
var vetor_de_jogadores = [];
jogador = {
    'nome': 'Mateus',
    'pontos' : 20
};
vetor_de_jogadores[0] = jogador;
jogador = {
    'nome': 'Geraldo',
    'pontos' : 40
};
vetor_de_jogadores[1] = jogador;
jogador = {
    'nome': 'Outro Nick',
    'pontos' : 200
};
vetor_de_jogadores[2] = jogador;
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
        for(var i = 0; i <= vetor_de_jogadores.length; i++){
            var conteudo = document.getElementById("lista_pontuacoes").innerHTML;
            document.getElementById("lista_pontuacoes").innerHTML = conteudo + '<li class="pontuacao_item item'+ (i + 1) +'"' + '>' + vetor_de_jogadores[i].nome + ' ' + vetor_de_jogadores[i].pontos + '</li>';
        }
    }
}