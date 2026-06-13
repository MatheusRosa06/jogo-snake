let estado = "menu"
let width = 800
let height = 800
function setup() {
  createCanvas(width, height);
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
  
}
function mousePressed (){
  if (estado === "menu")
    MouseMenu ();  
}

function TelaMenu (){
  //titulo
  stroke(255);
  strokeWeight(2);
  textAlign(CENTER)
  textSize(70)
  fill("white")
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
function jogar (){
  fill ("red")
  rect (100,100,100,100)
  
}
function config (){
  fill ("yellow")
  rect (100,100,100,100)
  
}
function sobre (){
  fill ("green")
  rect (100,100,100,100)
}








