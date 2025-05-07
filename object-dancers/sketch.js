/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new Kitties(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class Kitties {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.startY = startY;
    this.jumpHeight = 100; // how high the cat jumps
    this.angle = 0; // angle for the jumping motion
    this.speed = 0.05; // speed of the jump
  }
  update() {
    // Update the angle to create a smooth jumping motion
    this.angle += this.speed;
    // Use sine wave to create the up-and-down movement
    this.y = this.startY + sin(this.angle) * this.jumpHeight;
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️
    // Draw the cat
    fill(255, 200, 100); // light orange color for the cat
    noStroke();
    
    // Head (circle)
    ellipse(0, -50, 100, 100);
    
    // Ears (triangles)
    triangle(-40, -100, -20, -140, 0, -100);
    triangle(40, -100, 20, -140, 0, -100);
    
    // Eyes (circles)
    fill(0);
    ellipse(-20, -60, 15, 15);
    ellipse(20, -60, 15, 15);
    
    // Mouth (line)
    stroke(0);
    line(-15, -40, 15, -40);
    
    // Body (rectangle)
    noStroke();
    fill(255, 200, 100);
    rect(-30, 0, 60, 80);
    
    // Legs (lines)
    stroke(0);
    strokeWeight(10);
    line(-30, 80, -50, 120);
    line(30, 80, 50, 120);
    
    // Tail (curve)
    noFill();
    stroke(255, 200, 100);
    strokeWeight(10);
    curve(50, 50, 30, 40, 80, 20, 100, 10);




    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    this.drawReferenceShapes()

    pop();
  }
  drawReferenceShapes() {
    // noFill();
    // stroke(255, 0, 0);
    // line(-5, 0, 5, 0);
    // line(0, -5, 0, 5);
    // stroke(255);
    // rect(-100, -100, 200, 200);
    // fill(255);
    // stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/