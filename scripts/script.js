function start(){
    $("#inicio").hide();
    $("#fundo").append("<div id='pinto' class='anima1'></div>");
    $("#fundo").append("<div id='placar'></div>");
    $("#fundo").append("<div id='vidas'></div>");
    $("#fundo").append("<div id='serpente' class='anima2'></div>")
    $("#fundo").append("<div id='gaviao' class='anima3'></div>")

    var fimdoJogo = false;
    var isjump = false;
    var point = 0;
    var vidaAtual = 3;
    var jogo = {};
    var speed = 3;
    var TECLA = {
        espace: 32,
        A: 65
    }
    jogo.pressionou = [];

    // usuario pressionou alguma tecla?
    $(document).keydown(function(e){
        jogo.pressionou[e.which] = true;
    });
    $(document).keyup(function(e){
        jogo.pressionou[e.which] = false;
    });

    //loop do jogo

    jogo.timer = setInterval(loop, 20);

    function loop(){
     jump();
     moveserpente();
     movegaviao();
     colisao();
    
     vidas();
    }
    function jump(){
        if (jogo.pressionou[TECLA.espace]){
        document.getElementById("pinto").style.cssText = 'transition: all 0.3s  ease-out;'; 
        document.getElementById("pinto").style.bottom = "+150px";
        setTimeout(function(){document.getElementById("pinto").style.bottom = "0px";},500);
        } 
    }
    function moveserpente(){
        posicaoX = parseInt($("#serpente").css("left"));
        $("#serpente").css("left", posicaoX-speed);
        if(posicaoX<=0){
            $("#serpente").css("left", 1000);
        }
    }
    function movegaviao(){
        posicaoX = parseInt($("#gaviao").css("left"));
        $("#gaviao").css("left", posicaoX - 5);
        if(posicaoX <= 0 ){
            $("#gaviao").css("left", 950);
        }
        
    }
    function colisao(){
        var colisao1 = ($("#pinto").collision($("#serpente")));
        var colisao2 = ($("#pinto").collision($("#gaviao")));


        if(colisao1.length>0){
            vidaAtual--;
            serpenteX = parseInt($("#serpente").css("left"));
            serpenteY = parseInt($("#serpente").css("bottom"));
            $("#serpente").remove();
            reposiciona();
        }
        if(colisao2.length>0){
            vidaAtual--;
            gaviaoX = parseInt($("#gaviao").css("left"));
            gaviaoY = parseInt($("#gaviao").css("bottom"));
            $("#gaviao").remove();
            reposiciona2();
            
        }
    }

    function reposiciona(){
        var tempoColisao = window.setInterval(reposiciona1, 3000);
            function reposiciona1() {
                window.clearInterval(tempoColisao);
                tempoColisao = null;
                if(fimdoJogo == false){
                    $("#fundo").append("<div id='serpente' class='anima2'></div>")
                }
            }
    }
    function reposiciona2(){
        var tempoColisao = window.setInterval(reposicionag, 3000);
            function reposicionag() {
                window.clearInterval(tempoColisao);
                tempoColisao = null;
                if(fimdoJogo == false){
                    $("#fundo").append("<div id='gaviao' class='anima3'></div>")
                }
            }
    }


function vidas(){
    if(vidaAtual ==3 ){
        
    }
    if(vidaAtual ==2 ){

    }
    if(vidaAtual ==1 ){

    }
    if(vidaAtual == 0){
        gameOver();
    }
}
    // fim de jogo
    function gameOver(){
        fimdejogo = true;

        window.clearInterval(jogo.timer);
        jogo.timer=null;

        $("#fundo").append("<div id='fim'></div>");
        $("#fim").html("<h1>Game Over</h1><p>voce perdeu <br> Sua pontuação foi (fazer contador para botar aqui) <br> <button id='reiniciar' onclick='reinicia()'>Reiniciar</p>")
        $("#pinto").remove();
    $("#serpente").remove();
    $("#gaviao").remove();
    }

    
}
function reinicia(){
    
    $("#fim").remove();
    start();
}