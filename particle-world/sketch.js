let NUM_OF_PARTICLES = 3;
let MAX_OF_PARTICLES = 500;
let particles = [];

function setup() {
  createCanvas(800, 500);

  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  background(30);

  // Add new particles (with a cap)
  if (frameCount % 10 === 0 && particles.length < MAX_OF_PARTICLES) {
    particles.push(new Particle(random(width), random(height)));
  }

  // Update and display particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();

    // Remove if off screen
    if (particles[i].isGone) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dia = random(10, 20);
    this.color = random(100); // Using HSB like in class
    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-2, 2);
    this.isGone = false;
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // Bounce off walls (no energy loss)
    if (this.x < 0 || this.x > width) {
      this.xSpeed *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1;
    }

    // Mark as gone if offscreen too far (just for cleanup)
    if (this.x < -50 || this.x > width + 50 || this.y < -50 || this.y > height + 50) {
      this.isGone = true;
    }
  }

  display() {
    colorMode(HSB, 100);
    noStroke();
    fill(this.color, 80, 100);
    ellipse(this.x, this.y, this.dia);
  }
}
