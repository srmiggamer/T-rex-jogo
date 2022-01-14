var PLAY=1;
var FIM=0;
var estadojogo=PLAY;


var trex, trex_running, edges,trex_assustado;
var groundImage,ground,groundinvisivel;
var nuvem, nuvemimage, groupnuvem;
var obstaculo,obstaculo1,obstaculo2,obstaculo3,obstaculo4,obstaculo5,obstaculo6, groupobstaculo;
var pontos ;
var game_over, reiniciar, game_over_img, reiniciar_img;

var som_pular,som_morrer,som_pontos;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_assustado = loadAnimation("trex_collided.png")
  groundImage = loadImage("ground2.png");
  nuvemimage = loadImage("cloud.png"); 
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
  reiniciar_img = loadImage("restart.png");
  game_over_img = loadImage("gameOver.png");

  som_pular = loadSound("jump.mp3");
  som_morrer = loadSound("die.mp3");
  som_pontos = loadSound("checkPoint.mp3")
}


function setup(){
  createCanvas(600,200);
  
  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("stop",trex_assustado)
  edges = createEdgeSprites();
  
  //criando o chão do jogo
ground=createSprite(200,180,400,20)
ground.addImage("ground",groundImage)
ground.x=ground.width/2

  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50

  //criando o châo invisivel
groundinvisivel =createSprite(200,190,400,10);
groundinvisivel.visible=false
pontos=0
 
//raio de colisão
 trex.setCollider("circle",0,0,40)

 
//criando grupo

groupnuvem = new Group();
groupobstaculo = new Group();

//criando sprite game over e restart

reiniciar=createSprite(300,170)
reiniciar.addImage(reiniciar_img)

game_over=createSprite(300,120)
game_over.addImage(game_over_img)

reiniciar.scale = 0.5
game_over.scale = 0.5

reiniciar.visible = false
game_over.visible = false
}



function draw(){
  //definir a cor do plano de fundo 
  background("white");
  
//pontuação do jogo
text ("pontuação: "+pontos,300,50)

if (estadojogo==PLAY){
  
  //velocidade do chão
  ground.velocityX=-(5+pontos / 100);
  
  //pontuação
  pontos=pontos+ Math.round(getFrameRate()/60)
  
  //som para pontuação 
  if (pontos % 100 == 0 && pontos>0){
    som_pontos.play()
  }

  //condiçao tela infinita
if (ground.x<0){
  ground.x=ground.width/2
}

  //pular quando tecla de espaço for pressionada
  if(keyDown("space")&&trex.y>140){
    trex.velocityY = -7;
  
  som_pular.play();
  
  }
  
  trex.velocityY = trex.velocityY + 0.5;
  
 

  //criar nuvens
  criarnuvens();
  //criar obstaculos
  criarobstaculo();

if(groupobstaculo.isTouching(trex)){
  estadojogo = FIM;

  som_morrer.play();

}
}

else if (estadojogo==FIM){

  //restart e game over aparece no final 
  reiniciar.visible = true
  game_over.visible = true



  trex.velocityY=0
  trex.changeAnimation("stop",trex_assustado);
  ground.velocityX=0
 //nuvem e objeto parada
  groupobstaculo.setLifetimeEach(-1)
  groupnuvem.setLifetimeEach(-1)
  groupobstaculo.setVelocityXEach(0);
  groupnuvem.setVelocityXEach(0);
  
  if(mousePressedOver(reiniciar)){
    reset()
  }
  
}

//impedir que o trex caia
trex.collide(groundinvisivel);




  

  drawSprites();
}
function criarnuvens (){
  if (frameCount  %50==0){
  nuvem=createSprite(600,100,40,10);
  nuvem.addImage(nuvemimage);
  nuvem.y=Math.round(random(10,80));
  nuvem.velocityX= -4;
  nuvem.scale=0.5
  // profundidade das nuvens
  nuvem.depth=trex.depth
  trex.depth=trex.depth+1
  // tempo de vida das nuvens
  nuvem.lifetime = 200;

  groupnuvem.add(nuvem);
  
}
}

function criarobstaculo (){
  if (frameCount  %60==0){
    obstaculo=createSprite(650,165,10,40);
    obstaculo.velocityX=-(5+pontos / 100)
    
    //gerar obstaculos aleatorios
    var num=Math.round(random(1,6));
   
    switch (num){
   case 1: obstaculo.addImage(obstaculo1)
   break
   case 2: obstaculo.addImage(obstaculo2)
   break
   case 3: obstaculo.addImage(obstaculo3)
   break
   case 4: obstaculo.addImage(obstaculo4)
   break
   case 5: obstaculo.addImage(obstaculo5)
   break
   case 6: obstaculo.addImage(obstaculo6)
   break
 default : break 
}
//mudar o tamanho do obstaculo 
obstaculo.scale=0.5
obstaculo.lifetime=200

groupobstaculo.add(obstaculo);

}
}

function reset() {
estadojogo=PLAY

reiniciar.visible = false
game_over.visible = false

groupobstaculo.destroyEach()
groupnuvem.destroyEach()

pontos=0

trex.changeAnimation("running", trex_running);
}










