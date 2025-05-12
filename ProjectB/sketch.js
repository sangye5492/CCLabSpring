let filenames = [
  "knockout.PNG",
  "knockout1.PNG",
  "knockout2.PNG",
  "knockout3.PNG",
  "knockout4.PNG",
  "knockout5.PNG",
  "knockout6.PNG",
  "knockout7.PNG",
  "knockout8.PNG",
  "knockout9.PNG",
  "knockout10.PNG",
  "knockout11.PNG",
];

let images = [];
let imagesY = [];
let imagesZ = [];
let pixelImages = [];
let s = 30; // keeping your original size
let zoomZ = 0;
let offsetX = 0;
let offsetY = 0;
let xcor = [];
let z;
let mysound;

function preload() {
  for (let name of filenames) {
    images.push(loadImage("assets/" + name)); // Image folder must be "assets"
  }
  mysound = loadSound("assets/sound.mp3");
}

function mousePressed() {
  if (mysound.isPlaying()==false) {
    mysound.play();
  }
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  //canvas.id
  canvas.parent("p5-canvas-container");

  let numRows = 3; // Set the number of rows
  let imagesPerRow = Math.ceil(images.length / numRows); // Number of images per row
  let rowHeight = 1500; // Vertical spacing between rows, adjust as needed

  for (let i = 0; i < images.length; i++) {
    images[i].loadPixels();
    
    // Calculate X and Z positions
    let posX = -5000 + (i % imagesPerRow) * 2000;  // x position based on row
    let posZ = -2500;
    
    // Calculate Y position based on the row
    let posY = (Math.floor(i / imagesPerRow) - 1) * rowHeight; // space between rows
    
    pixelImages.push(new PixelImage(images[i], posX, posY, posZ));
  }

  // ---- make the camera see further ----
  let fov = PI / 3; // field of view
  let aspect = width / height;
  let near = 1;
  let far = 10000; // <-- increase this for deeper scenes

  perspective(fov, aspect, near, far);
}


function draw() {
  background(0);
  //rotateX(PI); // flips it upright

  orbitControl();

  translate(0 - width / 2, -height / 2.5, zoomZ); // Scroll effect
  for (let pImg of pixelImages) {
    pImg.update();
    pImg.display();
  }
  console.log("z", z);

  drawAxes(1000); // draw the helper x, y, z axes
}

class PixelImage {
  constructor(img, posX, posY, posZ) {
    this.x = posX;
    this.y = posY;
    this.z = posZ;
    this.img = img;
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
    translate(-width / 2 + this.x, -height / 2 + this.y, this.z);

    for (let p of this.pixels) {
      let d = dist(mouseX, mouseY, p.x, p.y);
      //let z = map(d, 0, width*2, 0, 1000);
      // let z = 0;
      // if (mouseY <= height / 2 - 100) {
      //   z = map(p.b, 0, 255,  height - mouseY, 0);
      // } else if (mouseY >= height / 2 + 100) {
      //   z = map(p.b, 0, 255, 0, mouseY);
      // } else {
      //   z = lerp(z, -100, 0.1);
      // }
      let mapY = map(mouseY, 0, height, 0, PI, true);
      let cosVal = cos(mapY);
      let z = map(p.b, 0, 255, cosVal * height, 0);

      //  console.log(z, cosVal);
      push();
      translate(p.x, p.y, z);
      fill(p.r, p.g, p.b);
      noStroke();
      rect(0, 0, s, s);
      pop();
    }
    pop();
  }
  update() {
   if (mouseX > width / 2) {
   this.speedX = -20;
    } else {
      this.speedX = 20;
     }
     this.x = this.x + this.speedX;
  }
}

function drawAxes(length) {
  push();
  strokeWeight(4);

  // X axis - red
  stroke(255, 0, 0);
  line(0, 0, 0, length, 0, 0);

  // Y axis - green
  stroke(0, 255, 0);
  line(0, 0, 0, 0, length, 0);

  // Z axis - blue
  stroke(0, 0, 255);
  line(0, 0, 0, 0, 0, length);

  pop();
}