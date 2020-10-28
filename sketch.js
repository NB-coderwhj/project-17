var monkey, monkey_running, monkey_still;
var banana, bananaImage, obstacle, obstacleImage
var bananaGroup, obstaclesGroup
var score
var ground
var gamestate;


function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  
  monkey_still = loadAnimation("sprite_0.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {

  createCanvas(600, 400);
  background("white");

  score = 0

  monkey = createSprite(60, 320, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("standing", monkey_still)
  monkey.scale = 0.18;

  ground = createSprite(300, 380, 600, 10);
  ground.velocityX = -4;

  obstaclesGroup = new Group();
  bananaGroup = new Group();

  spawnBananas();
  // bananaGroup.add(banana);

  spawnObstacles();
  //obstaclesGroup.add(obstacle);

  gamestate = "play"


}


function draw() {

  background("white");
  drawSprites();
  textSize(20);
  text("Score:" + score, 240, 50);
  monkey.setCollider("circle", 0, 0, 300)

  spawnObstacles();
  spawnBananas();
  
  obstacle.debug = true;
  obstacle.setCollider("circle", 0,0, 100);


  if (gamestate === "play") {

    ground.velocityX = -6;
    if (ground.x > 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space") && monkey.y > 300) {
      monkey.velocityY = -18;
    }

    monkey.velocityY = monkey.velocityY + 0.6;
    monkey.collide(ground);
    // monkey.collide(obstaclesGroup)


    if (obstaclesGroup.isTouching(monkey)) {
      gamestate = "end";
    }
    
    if(bananaGroup.isTouching(monkey)){
      score = score+1;
      bananaGroup.destroyEach();
    }


  } else if (gamestate === "end") {

    obstaclesGroup.setVelocityEach(0, 0);
    bananaGroup.setVelocityEach(0, 0);
    bananaGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    ground.setVelocity(0, 0);
    monkey.setVelocity(0, 0);
    monkey.changeAnimation("standing", monkey_still);
    
    textFont("Algerian");
    textSize (30)
    fill("black")
    text("GAME OVER", 200,200)
    
    if (keyDown("space")){
     monkey.changeAnimation("running", monkey_running);
      
      obstaclesGroup.destroyEach();
      bananaGroup.destroyEach();
      
      gamestate = "play";
    }
  }

}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    obstacle = createSprite(600, 340, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = random(0.1, 0.25);
    obstacle.velocityX = -4;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}

function spawnBananas() {
  if (frameCount % 300 === 0) {
    banana = createSprite(600, 200, 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.10;
    banana.velocityX = -2;
    banana.lifetime = 300;
    banana.y = Math.round(random(50, 300));
    bananaGroup.add(banana);
  }

}