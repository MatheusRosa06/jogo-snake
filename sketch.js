let estado = "menu"
let skin = 1
let width = 800
let height = 800

//variaveis de game 
let cobra = [];
let direcaoX = 1;
let direcaoY = 0;
let tamanho = 50;

//comida posição
let comidaX;
let comidaY;

let podeVirar = true;
 

function setup() {
  createCanvas(width, height);

  cobra.push({x: 250, y: 200});
  cobra.push({x: 200, y: 200});
  cobra.push({x: 150, y: 200});

  gerarComida();
}

function draw() {
  background(15,15,15);
  //telas
  if (estado === "menu")
    TelaMenu ();
  else if (estado === "jogar")
    jogar();
  else if (estado === "config")
    config();
  else if (estado === "sobre")
    sobre();
  else if (estado === "gameover")
    gameOver ();
  
}
function mousePressed (){
  if (estado === "menu")
    MouseMenu();
  else if (estado === "config")
    MouseConfig();
  else if (estado === "gameover")
    MouseGameOver();
}

function TelaMenu (){
  //titulo
  stroke(255);
  strokeWeight(2);
  textAlign(CENTER)
  textSize(70)
  fill(255)
  text("SNAKE",width/8,height/6 - (height/10)/2,width - (width/4) ,height/5)
 
  
  fill(0,180,0)
  //cobra
for(let i=0; i<8; i++){
  rect(width/2 - width/8+ (i*25), height/16, 25, 25);
} 
  //jogar
  fill(0,255,120)
  rect(width/8,height/4,width - (width/4) ,height/5)
  textAlign(CENTER)
  textSize(70)
  fill("white")
  text("JOGAR",width/8,height/4 + (height/10)/2,width - (width/4) ,height/5)
  
  //config
  fill(0,255,120)
  rect(width/8,height/2,width - (width/4) ,height/5)
  textAlign(CENTER)
  textSize(70)
  fill("white")
  text("CONFIGURAÇÃO",width/8,height/2 + (height/10)/2,width - (width/4) ,height/5)
  
  //sobre
  fill(0,255,120)
  rect(width/8,height/4 + (height/2),width - (width/4) ,height/5)
  textAlign(CENTER)
  textSize(70)
  fill("white")
  text("SOBRE",width/8,height/4 + height/2 +(height/10)/2,width - (width/4) ,height/5)
  


}
  //mouse
function MouseMenu (){
  
  if(mouseX > width/8 && mouseX < width - width/8 && 
     mouseY > height/4 && mouseY < height/4 + height/5)
    estado = "jogar"
  else if (mouseX > width/8 && mouseX < width - width/8 && 
        mouseY > height/4 + (height/4) && mouseY < height/4 + (height/4) + height/5)
    estado = "config"
  else if (mouseX > width/8 && mouseX < width - width/8 && 
     mouseY > height/4 + (height/2)&& mouseY < height/4 + (height/2) + height/5)
    estado = "sobre"

  
  
  
  
}
function desenharTabuleiro(){

  let inicioX = (width - 500) / 2;
  let inicioY = (height - 500) / 2;

  for(let y = 0; y < 10; y++){
    for(let x = 0; x < 10; x++){

      if((x+y)%2 === 0){
        fill(35,60,35);
      }else{
        fill(30,50,30);
      }

      rect(
        inicioX + x*50,
        inicioY + y*50,
        50,
        50
      );
    }
  }
}
function desenharCobraJogo(){

  let cor1;
  let cor2;
  let corCabeca;

  if(skin === 1){
    cor1 = color(0,180,0);
    cor2 = color(255,255,0);
    corCabeca = color(0,120,255);
  }

  if(skin === 1){
  
    cor1 = color(34,139,34);   
    cor2 =color(240,210,70);   
    corCabeca = color(40,90,180);    

}

  if(skin === 2){
  
    cor1 = color(220,70,60);  
    cor2 = color(40,40,40);     
    corCabeca = color(255,240,200);
  
}
  if(skin === 3){
  
  cor1 = color(80,170,255);    
  cor2 = color(240,250,255);   
  corCabeca = color(255,255,255);
  
}
  if(skin === 4){
  
  cor1 = color(255,120,200);   
  cor2 = color(180,240,255);  
  corCabeca = color(255,255,255);
  
}
  if(skin === 5){
  
  cor1 = color(30,100,30);     
  cor2 = color(140,220,120);   
  corCabeca = color(220,255,180);
  
}
  if(skin === 6){
  
  cor1 = color(170,30,20);     
  cor2 = color(255,180,50);    
  corCabeca = color(255,255,180);
  
}
  if(skin === 7){
  
  cor1 = color(50,20,120);     
  cor2 = color(180,120,255);  
  corCabeca = color(255,255,255);
 
}

  for(let i = 0; i < cobra.length; i++){

    if(i === 0){
      fill(corCabeca);
    }
    else if(i % 2 === 0){
      fill(cor1);
    }
    else{
      fill(cor2);
    }

    rect(cobra[i].x, cobra[i].y, tamanho, tamanho);
  }
}
function jogar(){

  background(20,25,20);

  desenharTabuleiro();

  fill("red");
  rect(comidaX, comidaY, tamanho, tamanho);

  if(frameCount % 10 === 0){
    moverCobra();
    verificarColisao();
  }

  desenharCobraJogo();

}
function moverCobra(){

  podeVirar = true;

  let cabeca = cobra[0];

  let novaCabeca = {
    x: cabeca.x + direcaoX * tamanho,
    y: cabeca.y + direcaoY * tamanho
  };

  let comeu =
    novaCabeca.x === comidaX &&
    novaCabeca.y === comidaY;

  cobra.unshift(novaCabeca);

  if(!comeu){
    cobra.pop();
  }else{
    gerarComida();
  }
}
  //controles
function keyPressed(){

  if(!podeVirar){
    return;
  }

  if(keyCode === UP_ARROW && direcaoY !== 1){
    direcaoX = 0;
    direcaoY = -1;
    podeVirar = false;
  }

  else if(keyCode === DOWN_ARROW && direcaoY !== -1){
    direcaoX = 0;
    direcaoY = 1;
    podeVirar = false;
  }

  else if(keyCode === LEFT_ARROW && direcaoX !== 1){
    direcaoX = -1;
    direcaoY = 0;
    podeVirar = false;
  }

  else if(keyCode === RIGHT_ARROW && direcaoX !== -1){
    direcaoX = 1;
    direcaoY = 0;
    podeVirar = false;
  }
}

function gerarComida(){

  let posicaoValida = false;

  while(!posicaoValida){

    comidaX = floor(random(10)) * tamanho + 150;
    comidaY = floor(random(10)) * tamanho + 150;

    posicaoValida = true;

    for(let c = 0; c < cobra.length; c++){

      if(
        cobra[c].x === comidaX &&
        cobra[c].y === comidaY
      ){
        posicaoValida = false;
        break;
      }

    }
  }
}
//config
function verificarColisao(){

  let cabeca = cobra[0];
  
  if (
  cabeca.x < 150 ||
  cabeca.x > 600 ||
  cabeca.y < 150 ||
  cabeca.y > 600
){
  estado = "gameover";
}

  for(let c = 1; c < cobra.length; c++){

    if(
      cabeca.x === cobra[c].x &&
      cabeca.y === cobra[c].y
    ){
      estado = "gameover";
      break;
    }

  }
}

function config (){
  background(20,25,20);
  
  stroke(255);
  strokeWeight(2);
  textAlign(CENTER)
  textSize(70)
  fill(255)
  text("SKIN",width/8,height/6 - (height/10)/2,width - (width/4) ,height/5)
  
  
  
  //seta esquerda
  rect (width/8,height - (height/10)* 4,width/4 ,height/10)
  textSize(86)
  fill(0)
  text("<==" ,width/8,height - (height/10)* 4,width/4 ,height/10)
  
  //seta direita
  fill(255)
  rect (width/2 + width/8,height - (height/10)* 4,width/4 ,width/10)
  textSize(86)
  fill(0)
  text("==>" ,width/2 + width/8,height - (height/10)* 4,width/4 ,width/10)
  
  //voltar
  fill(255)
  rect(width/3,height - height/4,width/3,100)
  fill(0)
  text("voltar",width/3,height - height/4,width/3,100)
  
  
  
  //skins
  

  if(skin === 1){
  desenhaCobra(
    color(34,139,34),    
    color(240,210,70),   
    color(40,90,180)     
  );
}

  if(skin === 2){
  desenhaCobra(
    color(220,70,60),   
    color(40,40,40),     
    color(255,240,200) 
    )
}
  if(skin === 3){
  desenhaCobra(
    color(80,170,255),    
    color(240,250,255),   
    color(255,255,255)
  );
}
  if(skin === 4){
  desenhaCobra(
    color(255,120,200),   
    color(180,240,255),   
    color(255,255,255)
  );
}
  if(skin === 5){
  desenhaCobra(
    color(30,100,30),     
    color(140,220,120),   
    color(220,255,180)
  );
}
  if(skin === 6){
  desenhaCobra(
    color(170,30,20),     
    color(255,180,50),    
    color(255,255,180)
  );
}
  if(skin === 7){
  desenhaCobra(
    color(50,20,120),     
    color(180,120,255),  
    color(255,255,255)
  );
}
  

    
  fill("white")    
 
  

}
function desenhaCobra(cor1, cor2, corCabeca){

  for(let i=0; i<5; i++){
    for(let ii=0; ii<7; ii++){

      if(i % 2 === 0 && ii % 2 === 0){
        fill(cor1);
      } else {
        fill(cor2);
      }

      rect(width/3, height/3 +(ii*25), 25, 25);
      rect(width/3 + (i*25), height/3 +150, 25, 25);
      rect(width/3 + 100, height/3 +(ii*25), 25, 25);
      rect(width/3 + 100+ (i*25), height/3, 25, 25);
      rect(width/3 + 200, height/3 + (i*25), 25, 25);
    }
  }

  fill(corCabeca);
  rect(width/3 + 200, height/3 + 100, 25, 25);
}
  //config mouse
function MouseConfig () {
  // seta esquerda
  if(mouseX >  width/8 && mouseX < width/2 - width/8 &&
    mouseY > height -(height/10)* 4 && mouseY < height -(height/10)* 4 + width/10){
    if (skin > 1) {
      skin -=1
    }else{
      skin = 7
    }}
  // seta direita
  if(mouseX >  width/2 + width/8 && mouseX < width - width/8 &&
    mouseY > height -(height/10)* 4 && mouseY < height -(height/10)* 4 + width/10){
    if (skin < 7) {
      skin +=1
    }else{
      skin = 1
    }}
  //voltar
  if(mouseX > width/3 && mouseX < width-width/3 && 
     mouseY > height -height/4&& mouseY < height - height/8){
    estado = "menu"
  }

  
  
}

function sobre (){
  fill ("green")
  rect (100,100,100,100)
}
// tela game over
function gameOver(){

  background(20,20,20);

  textAlign(CENTER);

  fill("red");
  textSize(80);
  text("GAME OVER", width/2, 200);

  fill("white");
  textSize(40);
  text("Sua cobra morreu!", width/2, 300);

  // botão voltar
  fill(0,255,120);
  rect(width/3, 450, width/3, 100, 15);

  fill(255);
  textSize(40);
  text("MENU", width/2, 515);}

//mouse tela game over
function MouseGameOver(){

  if(
    mouseX > width/3 &&
    mouseX < width/3 + width/3 &&
    mouseY > 450 &&
    mouseY < 550
  ){

    reiniciarJogo()
    estado = "menu";
  }
}
function reiniciarJogo(){

  cobra = [];

  cobra.push({x: 250, y: 200});
  cobra.push({x: 200, y: 200});
  cobra.push({x: 150, y: 200});

  direcaoX = 1;
  direcaoY = 0;

  gerarComida();
}







