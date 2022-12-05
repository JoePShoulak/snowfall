class Snowflake {
  static gravity = new p5.Vector(0, 0.01);

  static spinRate = 1 / 500;
  static noiseSeedMax = 10;

  static randSize(min, max, smallPref = 1) {
    return random() ** smallPref * (max - min) + min;
  }

  constructor(image) {
    this.pos = createVector(random(width), -100);
    this.vel = createVector();
    this.acc = createVector();

    this.startAngle = random(TWO_PI);
    this.angle = this.startAngle;
    this.seed = random(Snowflake.noiseSeedMax);

    this.image = image;
    this.image.loadPixels();

    this.mass =
      32 ** 2 / this.image.pixels.reduce((acc, val) => acc + (val > 0.5));
  }

  get spinTime() {
    return frameCount * Snowflake.spinRate;
  }

  get wind() {
    return new createVector(map(noise(this.seed), 0, 1, -0.001, 0.001), 0);
  }

  applyForce(force) {
    const f = force.copy().div(this.mass);
    this.acc.add(f);
  }

  update() {
    this.applyForce(Snowflake.gravity);
    this.applyForce(this.wind);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.angle = this.startAngle + TWO_PI * noise(this.seed + this.spinTime);

    this.draw();
  }

  draw() {
    push();
    translate(this.pos);
    rotate(this.angle);
    image(this.image, 0, 0);
    pop();
  }
}
