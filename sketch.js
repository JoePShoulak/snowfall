/**
 * // TODO: Make a full-weather p5js sketch that tries to make a sketch
 * tailored to any info we can get about the user without directly asking.
 * Maybe just location.
 */

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}

const randomFlake = () => new Snowflake(random(flakeImages));

const flakeRate = 0.4;
const tileSize = { x: 32, y: 32 };
let flakeTilesheet;
let flakeImages = [];
let snow = [];

function preload() {
  flakeTilesheet = loadImage("./assets/flakes32.png", cutTilesheet);
}

function cutTilesheet() {
  for (let x = 0; x < flakeTilesheet.width; x += tileSize.x) {
    for (let y = 0; y < flakeTilesheet.height; y += tileSize.y) {
      flakeImages.push(flakeTilesheet.get(x, y, tileSize.x, tileSize.y));
    }
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  imageMode(CENTER);
}

function draw() {
  background(20);
  snow.forEach((s) => s.update());
  snow = snow.filter((s) => s.pos.y < height + tileSize.y);
  if (random() < flakeRate) snow.push(randomFlake());
}
