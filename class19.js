var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  ghost = createSprite(200,200,50,50)
  ghost.addImage("ghost",ghostImg)
  ghost.scale = 0.3;
}

function draw() {
  background(200);
  spawnDoors();
  if(tower.y > 400){
      tower.y = 300
    }


  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  ghost.velocityY = ghost.velocityY + 0.8
  if(keyDown("left_arrow")){
    ghost.x = ghost.x - 3;
  }
  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 3
  }
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
    ghost.destroy();
  }
  drawSprites();

  
}

function spawnDoors(){
  if (frameCount % 240 === 0){
    var door = createSprite(200,-50);
    door.addImage(doorImg)
    door.x = Math.round(random(120,400));
    door.velocityY = 1;
    door.lifeTime = 800;
    doorsGroup.add(door);
    var climber = createSprite(200,10)
    climber.addImage(climberImg);
    climber.x = door.x
    climber.velocityY = 1;
    climber.lifeTime = 800
    climbersGroup.add(climber);
    ghost.depth = door.depth
    ghost.depth += 1;
    invisibleBlock = createSprite(200,50)
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.debug = true
  }
}