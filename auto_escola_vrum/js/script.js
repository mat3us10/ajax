//variaveis
var httpRequest; //variavel para o ajax funcionar
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
        for(var i = 0; i <= vetor_de_jogadores.length; i++){
            var conteudo = document.getElementById("lista_pontuacoes").innerHTML;
            if(i < 3){
                document.getElementById("lista_pontuacoes").innerHTML = conteudo + '<li class="pontuacao_item item'+ (i + 1) +'"' + '>' + vetor_de_jogadores[i].nome + ' ' + vetor_de_jogadores[i].pontos + '</li>';
            }
            else{
                document.getElementById("lista_pontuacoes").innerHTML = conteudo + '<li class="pontuacao_item item_n>' + vetor_de_jogadores[i].nome + ' ' + vetor_de_jogadores[i].pontos + '</li>';
            }
        }
    }
}
//funcao para carregar a pagina simulado
function carregar_simulado(){
    httpRequest.open('GET', './arquivos/lista_de_jogadores.html', true);
    httpRequest.send(null);
    setTimeout(carregar_jogadores, 50);
}

//funcao para carregar os jogadores
function carregar_jogadores(){
    if(vetor_de_jogadores.length == 0){
        document.getElementById("listagem_h1").innerHTML = 'Sem cadastro de jogadores';
    }
    else{
        document.getElementById("listagem_h1").innerHTML = 'Jogadores já cadastrados';
        for(var i = 0; i <= vetor_de_jogadores.length; i++){
            var conteudo = document.getElementById("lista_jogadores").innerHTML;
            if(i < 3){
                document.getElementById("lista_jogadores").innerHTML = conteudo + '<li class="lista_pontuacao_item item'+ (i + 1) +'"' + ' onclick="carregar_jogo()" >' + vetor_de_jogadores[i].nome + '</li>';
            }
            else{
                document.getElementById("lista_jogadores").innerHTML = conteudo + '<li class="lista_pontuacao_item item_n" onclick="carregar_jogo()">' + vetor_de_jogadores[i].nome + '</li>';
            }
        }
    }
}


//funcao para carregar a pagina cadastro
function carregar_cadastro(){
    httpRequest.open('GET', './arquivos/cadastro_jogadores.html', true);
    httpRequest.send(null);
}

//funcao para carregar os dados e criar os novos jogadores
function enviar_dados(){
    var nome_pessoa = document.getElementById('input_cadastro').value;
    if(nome_pessoa.length = 0){

    }
    else{
        let jogador = {
            'nome': nome_pessoa,
            'pontos': 0
        };
        vetor_de_jogadores.push(jogador);
    }
    carregar_home();
}

//funcao para carregar o jogo
function carregar_jogo(){

}



