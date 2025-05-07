let mySound;
let mic;
let ps = 0;
 
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  mic = new p5.AudioIn();
  mic.start();
 
}

function draw() {
  background(0);
  let level = mic.getLevel();
  fill(255);
  // textSize(30);
  // text(level, width/2, height/2);
  let s = map(level,0,0.1, 0,width);
  s=lerp(ps,s,0.1);
  noFill();
  stroke(12)
  circle(width/2,height/2,s);
  ps = s;
}

function preload(){
mySound = loadSound("assets/song-long.mp3");
}
// function mousePressed(){
//   if (mySound.isPlaying()==false){
//     mySound.play();
//   }else{
//     mySound.pause();
//   }
// circle(mouseX, mouseY,100)
// }