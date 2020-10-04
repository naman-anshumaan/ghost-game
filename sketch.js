var tower, towerImage
var door, doorImage, doorGroup
var climber, climberImage, climberGroup
var ghost, ghostImage
var invisibleBlock, invisibleBlockGroup
var gameState = "play"
var play
var end
var spookySound

function preload(){
  towerImage = loadImage("tower.png")
  doorImage = loadImage("door.png")
  climberImage = loadImage("climber.png")
  ghostImage = loadImage("ghost-standing.png")
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600, 600)
  
  spookySound.loop()
  
  tower = createSprite(300, 300)
  tower.addImage(towerImage)
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale = 0.3
  
  
  doorGroup = createGroup();
  invisibleBlockGroup = createGroup();
  climberGroup = createGroup();
  
}

function draw(){
  background(0);
  
  if(gameState === "play"){
    
    if(tower.y>400){
    
    tower.y = 300
  }
  
  if(keyDown("space")){
    ghost.velocityY = -5
    
  }
  if(keyDown("left_arrow")){
    ghost.x = ghost.x - 3;
  }
  
  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 3;
  }
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost)|| ghost.y > 600){
    ghost.destroy();
    
    gameState = "end"
  }
    
  ghost.velocityY = ghost.velocityY + 0.8
  
   spawnDoors()
    
    drawSprites();
  
  }
  
  
  
  
  
  if(gameState === "end"){
    stroke("yellow")
    fill("yellow")
    textSize(30)
    text("GAME OVER!!!", 230 , 250);
  }

}

function spawnDoors(){
  
  if(frameCount % 240 === 0){
    
   var door = createSprite(200, 50);
    door.addImage(doorImage);
    
    climber = createSprite(200, 70);
    climber.addImage(climberImage);
    
    invisibleBlock = createSprite(200, 70);
    invisibleBlock.width = climber.width
    invisibleBlock.height = 2
    invisibleBlock.debug = true;
    invisibleBlock.velocityY = 1;
    
  
   
    
    
    
    
    
    door.x = Math.round(random(120, 400));
     invisibleBlock.x = door.x;
    door.velocityY = 1;
    climber.x= door.x;
    climber.velocityY = 1;
    climber.lifetime = 600;
    door.lifetime = 600;
     doorGroup.add(door)
    
    door.depth = ghost.depth
    ghost.depth = ghost.depth + 1
    
    climberGroup.add(climber)
    
    invisibleBlockGroup.add(invisibleBlock)
  }
  
  
}
