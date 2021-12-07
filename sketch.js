var trex, trex_running, edges;
var groundImage,ground,groundinvisivel;
var nuvem, nuvemimage;
var obstaculo,obstaculo1,obstaculo2,obstaculo3,obstaculo4,obstaculo5,obstaculo6;
var pontos ;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  nuvemimage = loadImage("cloud.png");
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
}


function setup(){
  createCanvas(600,200);
  
  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
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
}



function draw(){
  //definir a cor do plano de fundo 
  background("white");
  
//pontuação do jogo
text ("pontuação: "+pontos,300,50)

pontos=pontos+ Math.round(frameCount/100)
//velocidade do chão
ground.velocityX=-2;


  
//condiçao tela infinita
if (ground.x<0){
  ground.x=ground.width/2
}

  //pular quando tecla de espaço for pressionada
  if(keyDown("space")&&trex.y>140){
    trex.velocityY = -7;
  }
  
  trex.velocityY = trex.velocityY + 0.5;
  
 //impedir que o trex caia
  trex.collide(groundinvisivel);

  //criar nuvens
  criarnuvens();
  //criar obstaculos
  criarobstaculo();
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

}
}

function criarobstaculo (){
  if (frameCount  %60==0){
    obstaculo=createSprite(400,165,10,40);
    obstaculo.velocityX=-5
    
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

}
}