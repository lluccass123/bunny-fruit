const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var fruitConstraint;
var fruit;
var backgroundimage;
var cutButton, button;
var melon, melonimage;
var rabbit, rabbitimage;
var blink;
var eat;
var sad;

function preload(){
  backgroundimage = loadImage("background.png");
  //cutButton = loadImage("cut_button.png");
  melonimage = loadImage("melon.png");
  rabbitimage = loadImage("Rabbit-01.png");
  eatani = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sadani = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  blinkani = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  blinkani.playing = true;
  eatani.playing = true;
  eatani.looping = false;
  sadani.playing = true;
  sadani.looping = false;
}
function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  blinkani.frameDelay = 20;
  eatani.frameDelay = 20;
  button = createImg('cut_button.png');
  button.position(200,30);
  button.size(50,50);
  button.mouseClicked(drop);
 
  ground = new Ground(250,690,600,20);
  rope = new Rope(6,{x:245,y:30});
  
  fruit = Bodies.circle(250,350,20);
  Matter.Composite.add(rope.body,fruit)
  fruitConstraint = new Link(rope,fruit);
  
  rabbit = createSprite(300,590,100,100);
  rabbit.addImage(rabbitimage);
  rabbit.scale = 0.3;
  rabbit.addAnimation('blinking',blinkani);
  rabbit.addAnimation('sad',sadani);
  rabbit.addAnimation('eating',eatani);
  rabbit.changeAnimation('blinking');
  
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}

function draw() 
{
  background(51);
  image(backgroundimage,0,0,500,700);
  push();
  imageMode(CENTER);
  if (fruit != null){
    image(melonimage,fruit.position.x,fruit.position.y,70,70);
  }
  pop();
  ground.show();
  rope.show();
  //ellipse(fruit.position.x,fruit.position.y,30,30);
  Engine.update(engine);
  if (collide(fruit,rabbit) == true){
    rabbit.changeAnimation('eating');
  }
  if (collide(fruit,ground.body) == true){
    rabbit.changeAnimation('sad');
  }
  drawSprites();
}

function drop(){
  rope.break();
  fruitConstraint.detach();
  fruitConstraint = null;

}

function collide(body,sprite){
  if (body != null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if (d<=80){
      World.remove(engine.world,fruit);
      fruit = null;
      return true;
      
    }
    else {
      return false;
    }
  }
}
