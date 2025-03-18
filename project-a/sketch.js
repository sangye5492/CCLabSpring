/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let creatures = [];
let numCreatures = 10; // Number of coral creatures
let draggedCreature = 1;

function setup() {
  let canvas = createCanvas(800, 500);
   canvas.id ("p5-canvas");
  canvas.parent("p5-canvas-container");
  // createCanvas(400, 400);
  
  // Create multiple creatures at random positions on the ocean floor
  for (let i = 0; i < numCreatures; i++) {
    creatures.push(new CoralCreature(random(width), height - 20)); // Place on the ocean floor
  }
}

function draw() {
  // Simple green ocean background
  for (let i = 0; i < height; i++) {
    let g = map(i, 0, height, 180, 50);
    stroke(0, g, 80);
    line(0, i, width, i);
  }

  // Draw each coral creature
  for (let creature of creatures) {
    creature.update();
    creature.display();
  }
}

function mousePressed() {
  for (let creature of creatures) {
    if (dist(mouseX, mouseY, creature.x, creature.y) < 50) {
      creature.turnBlack();
      draggedCreature = creature;
      break;
    }
  }
}

function mouseDragged() {
  if (draggedCreature) {
    draggedCreature.x = constrain(mouseX, 0, width);
    draggedCreature.y = constrain(mouseY, 0, height);
  }
}

function mouseReleased() {
  if (draggedCreature) {
     draggedCreature = null;
  }
}

// CoralCreature class
class CoralCreature {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0; // Initial angle for tendril growth
    this.numTendrils = 5;
    this.originalColor1 = color(random(255), random(100, 200), random(100, 200)); // Random coral color
    this.originalColor2 = color(random(255), random(100, 200), random(100, 200)); // Random coral highlight color
    this.color1 = this.originalColor1;
    this.color2 = this.originalColor2;
    this.eyeSize = 10; // Size of the eyes
    this.isBlack = false;
  }

  update() {
    // Move away from the mouse if not being dragged
    if (this !== draggedCreature) {
      let d = dist(mouseX, mouseY, this.x, this.y);
      if (d < 150) {
        let dx = this.x - mouseX;
        let dy = this.y - mouseY;
        let step = 2;
        this.x += dx / d * step;
        this.y += dy / d * step;

        // Constrain position to stay within canvas bounds
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);
      }
    }
  }

  display() {
    for (let t = 0; t < this.numTendrils; t++) {
      let offset = map(t, 0, this.numTendrils, -PI / 6, PI / 6);

      push();
      translate(this.x, this.y);
      let sc = map(mouseY, 0, height, 1, 0.5);
      scale(sc);
      let angle = map(mouseX, 0, width, PI, 2 * PI);
      rotate(angle + offset);
      this.drawTendril();
      pop();
    }
    
    // Draw eyes
    this.drawEyes();
  }

  drawTendril() {
    noFill();
    let lineLength = 130;
    for (let i = 0; i <= lineLength; i += lineLength / 10) {
      let u = 10 * sin(frameCount * 0.05 - i);
      let s = map(i, 0, lineLength, 40, 5);
      fill(this.color1); // Current coral color
      noStroke();
      circle(u, -i, s);
    }

    push();
    scale(0.8);
    for (let i = 0; i <= lineLength; i += lineLength / 10) {
      let u = 10 * sin(frameCount * 0.05 - i);
      let s = map(i, 0, lineLength, 40, 5);
      fill(this.color2); // Current coral highlight color
      noStroke();
      circle(u - 30, -i, s);
    }
    pop();
  }

  drawEyes() {
    fill(255); // White for the eyeballs
    ellipse(this.x - 10, this.y - 5, this.eyeSize, this.eyeSize);
    ellipse(this.x + 10, this.y - 5, this.eyeSize, this.eyeSize);
    
    fill(0); // Black for the pupils
    let pupilSize = this.eyeSize / 2;
    ellipse(this.x - 10, this.y - 5, pupilSize, pupilSize);
    ellipse(this.x + 10, this.y - 5, pupilSize, pupilSize);
  }

  turnBlack() {
    this.color1 = color(0);
    this.color2 = color(0);
    
  
  }
}


