 
 let filenames = [
  "camera.png",
  "knockout.PNG",
  "knockout2.PNG",
  "knockout3.PNG",
  "knockout4.PNG",
  "knockout5.PNG",
  "knockout6.PNG",
  "knockout7.PNG",
  "knockout8.PNG",
  "knockout9.PNG",
  "knockout10.PNG"
];

let images = [];
let pixelImages = [];
let s = 20; // keeping your original size
let zoomZ = 0;

function preload() {
  for (let name of filenames) {
    images.push(loadImage("assets/" + name)); // Image folder must be "assets"
  }
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('p5-canvas-container');

  for (let i = 0; i < images.length; i++) {
    images[i].loadPixels();
    let zOffset = -i * 400;
    pixelImages.push(new PixelImage(images[i], zOffset, i*1000, 0));
  }
}

function draw() {
  background(0);
  //rotateX(PI); // flips it upright
  translate(0-width/2, -height/2, zoomZ); // Scroll effect
  for (let pImg of pixelImages) {
    pImg.update();
    pImg.display();
  }

}

class PixelImage {
  constructor(img, zOffset, posX, posY) {
    this.x = posX;
    this.y = posY;
    this.img = img;
    this.zOffset = zOffset;
    this.pixels = [];
    this.speedX = 0;

    for (let x = 0; x < img.width; x += s) {
      for (let y = 0; y < img.height; y += s) {
        let i = (x + y * img.width) * 4;
        let r = img.pixels[i + 0];
        let g = img.pixels[i + 1];
        let b = img.pixels[i + 2];
        this.pixels.push({ x, y, r, g, b });
        
      }
    }
  }

  display() {
    push();
    translate(-width / 2+this.x, -height / 2+this.y, this.zOffset);
    for (let p of this.pixels) {
      let d = dist(mouseX, mouseY, p.x, p.y);
      //let z = map(d, 0, width*2, 0, 1000);
      let z = map(p.b, 0, 255, mouseY, 0);
      push();
      translate(p.x, p.y, z);
      fill(p.r, p.g, p.b);
      noStroke();
      rect(0, 0, s, s);
      pop();
    }
    pop();
  }
  update(){
    if(mouseX > width/2){
      this.speedX = -10;
    }else{
      this.speedX = 10;
    }
    this.x = this.x + this.speedX;
  }
}
 