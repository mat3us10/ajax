//variaveis
var httpRequest; //variavel para o ajax funcionar
var vetor_de_jogadores = [];

//verifico a compatibilidade com os navegadores para se executar o ajax
if (window.XMLHttpRequest) {
    httpRequest = new XMLHttpRequest();
} else if (window.ActiveXObject) {
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
}

//referencio a funcao ao objeto quando acontecer alguma mudança no estado da requisicao
httpRequest.onreadystatechange = funcao_atualiza_dados;

function funcao_atualiza_dados() {
    document.getElementById("container").innerHTML = httpRequest.responseText;
}

//funcao para carregar a pagina home
function carregar_home() {
    httpRequest.open('GET', './arquivos/home.html', true);
    httpRequest.send(null);
    setTimeout(carregar_pontos, 50);
}

//funcao para carregar os pontos
function carregar_pontos() {
    if (vetor_de_jogadores.length == 0) {
        document.getElementById("pontuacoes_h1").innerHTML = "Nenhum jogador jogou recentemente";
    } else {
        document.getElementById("pontuacoes_h1").innerHTML = "Últimas pontuações";
        for (var i = 0; i <= vetor_de_jogadores.length; i++) {
            var conteudo = document.getElementById("lista_pontuacoes").innerHTML;
            if (i < 3) {
                document.getElementById("lista_pontuacoes").innerHTML = conteudo + '<li class="pontuacao_item item' + (i + 1) + '"' + ' onclick="carregar_login(0)" >' + vetor_de_jogadores[i].nome + ' ' + vetor_de_jogadores[i].pontos + '</li>';
            } else {
                console.log('entrou no else');
                document.getElementById("lista_pontuacoes").innerHTML = conteudo + '<li class="lista_pontuacao_item item_n" onclick="carregar_login(0)">' + vetor_de_jogadores[i].nome + '</li>';
            }
        }
    }
}
//funcao para carregar a pagina simulado
function carregar_simulado() {
    httpRequest.open('GET', './arquivos/lista_de_jogadores.html', true);
    httpRequest.send(null);
    setTimeout(carregar_jogadores, 50, [0]); //0 para iniciar jogo
}

//funcao para carregar os jogadores
function carregar_jogadores(parametro) {
    if (vetor_de_jogadores.length == 0) {
        document.getElementById("listagem_h1").innerHTML = 'Sem cadastro de jogadores';
    } else {
        document.getElementById("listagem_h1").innerHTML = 'Jogadores já cadastrados';
        if(parametro == 0){
            for (var i = 0; i <= vetor_de_jogadores.length; i++) {
                var conteudo = document.getElementById("lista_jogadores").innerHTML;
                if (i < 3) {
                    document.getElementById("lista_jogadores").innerHTML = conteudo + '<li class="lista_pontuacao_item item' + (i + 1) + '"' + ' onclick="carregar_login(0)" >' + vetor_de_jogadores[i].nome + '</li>';
                } else {
                    document.getElementById("lista_jogadores").innerHTML = conteudo + '<li class="lista_pontuacao_item item_n" onclick="carregar_login(0)">' + vetor_de_jogadores[i].nome + '</li>';
                }
            }
        }
        else if(parametro == 1){
            for (var i = 0; i <= vetor_de_jogadores.length; i++) {
                var conteudo = document.getElementById("lista_jogadores").innerHTML;
                if (i < 3) {
                    document.getElementById("lista_jogadores").innerHTML = conteudo + '<li class="lista_pontuacao_item item' + (i + 1) + '"' + ' onclick="carregar_login(1)" >' + vetor_de_jogadores[i].nome + '</li>';
                } else {
                    document.getElementById("lista_jogadores").innerHTML = conteudo + '<li class="lista_pontuacao_item item_n" onclick="carregar_login(1)">' + vetor_de_jogadores[i].nome + '</li>';
                }
            }
        }
    }
}

//funcao para carregar a pagina cadastro
function carregar_cadastro() {
    httpRequest.open('GET', './arquivos/cadastro_jogadores.html', true);
    httpRequest.send(null);
}

//funcao para carregar os dados e criar os novos jogadores
function enviar_dados() {
    let user_name = document.getElementById('user_name').value;
    let user_password = document.getElementById('user_password').value;
    let user_mail = document.getElementById('user_mail').value;
    if (user_name.length == 0 || user_password == 0) {} else {
        let jogador = {
            'nome': user_name,
            'senha': user_password,
            'email': user_mail,
            'pontos': 0
        };
        vetor_de_jogadores.push(jogador);
    }
    setTimeout(carregar_home, 50);
}

//funcao para carregar o jogo
function carregar_jogo() {

}

//funcao para carregar a lista de jogadores
function carregar_lista_jogadores() {
    httpRequest.open('GET', './arquivos/listagem_jogadores.html', true);
    httpRequest.send(null);
    setTimeout(carregar_jogadores, 50, [1]); //1 para carregar o login
}

//funcao para carregar o arquivo login.html
function carregar_login(parametro) {
    httpRequest.open('GET', './arquivos/login.html', true);
    httpRequest.send(null);
    setTimeout(() => {
     if(parametro == 0){
         document.getElementById('form').innerHTML ='<form id="input_form" class="formulario" method="GET">'+
         '<input class="input_cadastro" id="user_mail" type="text" placeholder="digite o seu e-mail">'+
         '<input class="input_cadastro" id="user_password" type="password" placeholder="digite sua senha">'+
         '<input class="button_cadastro" onclick="login(1)" value="entrar">'+
     '</form>'
     }
     else if (parametro == 1){
        document.getElementById('form').innerHTML ='<form id="input_form" class="formulario" method="GET">'+
        '<input class="input_cadastro" id="user_mail" type="text" placeholder="digite o seu e-mail">'+
        '<input class="input_cadastro" id="user_password" type="password" placeholder="digite sua senha">'+
        '<input class="button_cadastro" onclick="login(0)" value="entrar">'+
    '</form>'     }   
    }, 50)
}

//funcao para fazer o login
function login(parametro) {
    let user_mail = document.getElementById('user_mail').value;
    let user_password = document.getElementById('user_password').value;
    if (user_mail.length == 0 || user_password == 0) {
    } else {
        if(parametro == 0){
        for (var i = 0; i < vetor_de_jogadores.length; i++) {
            if (vetor_de_jogadores[i].email == user_mail && vetor_de_jogadores[i].senha == user_password) {
                carregar_edicao(i);
            } 
            else {
                document.getElementById('status').innerHTML = '<div id="error">dados incorretos</div>';
            }
        }
    }
    else if (parametro == 1) {
        carregar_jogo();
    }
    }
}

//funcao para carregar a edicao de dados
function carregar_edicao(indice) {
    document.getElementById('login_h1').innerHTML = 'Edicao de dados';
    document.getElementById('input_form').innerHTML = '<input class="input_cadastro" id="user_name" type="text" placeholder="novo nome">' +
     '<input class="input_cadastro" id="user_password" type="text" placeholder="nova senha">'+
     '<input class="input_cadastro" id="user_mail" type="text" placeholder="novo email">'+
     '<input class="button_cadastro" onclick="editar_dados('+ indice + ')" value="editar">' + 
     '<input id="delete" onclick="deletar_jogador('+ indice + ')" value="deletar">';
}

//funcao para editar os dados
function editar_dados(indice) {
    let user_name = document.getElementById('user_name').value;
    let user_password = document.getElementById('user_password').value;
    let user_mail = document.getElementById('user_mail').value;
    if (user_name.length == 0 || user_password.length == 0 || user_mail.length == 0) {
        document.getElementById('status').innerHTML = '<div id="error">dados invalidos</div>';
    } else {
        vetor_de_jogadores[indice].nome = user_name;
        vetor_de_jogadores[indice].senha = user_password;
        vetor_de_jogadores[indice].email = user_mail;
        document.getElementById('status').innerHTML = '<div id="correct">dados atualizados</div>';
    }
}

//funcao para deletar um jogador
function deletar_jogador(indice) {
    vetor_de_jogadores.pop(indice);
    document.getElementById('status').innerHTML = '<div id="correct">jogador deletado</div>';
}