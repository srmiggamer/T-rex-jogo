var trex, trex_running, edges;
var groundImage,ground,groundinvisivel;
var nuvem, nuvemimage;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  nuvemimage = loadImage("cloud.png");

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
}


function draw(){
  //definir a cor do plano de fundo 
  background("white");
  
//velocidade do chão
ground.velocityX=-2;


  
//condiçao tela infinita
if (ground.x<0){
  ground.x=ground.width/2
}

  //pular quando tecla de espaço for pressionada
  if(keyDown("space")&&trex.y>140){
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.5;
  
 //impedir que o trex caia
  trex.collide(groundinvisivel);

  //criar nuvens
  criarnuvens();
  console.log(frameCount)
  drawSprites();
}
function criarnuvens (){
  if (frameCount  %50==0){
  nuvem=createSprite(600,100,40,10);
  nuvem.addImage(nuvemimage);
  nuvem.y=Math.round(random(10,80));
  nuvem.velocityX= -4;
  nuvem.scale=0.5
nuvem.depth=trex.depth
  trex.depth=trex.depth+1
}
}