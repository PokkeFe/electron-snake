let voffset = document.getElementById("menubar").offsetHeight;
let $width = document.body.clientWidth;
let $height = document.body.clientHeight - voffset;

let snakeContainer = {
  blockSize: 40,
  gridWidth: 10,
  gridHeight: 10,
}

function setBlockSize(newSize) {
  snakeContainer.blockSize = newSize;
  snakeContainer.totalWidth = snakeContainer.blockSize * snakeContainer.gridWidth;
  snakeContainer.totalHeight = snakeContainer.blockSize * snakeContainer.gridHeight;
}

let game;
let fCount = 1;

let i = 0, changerate = 0.1;
let offset = 100;

function setup() {
  createCanvas($width, $height);
  colorMode(HSB, 100);
  frameRate(60);
  setBlockSize(40);

  game = new Game(snakeContainer);
}

function windowResized() {
  $width = document.body.clientWidth;
  $height = document.body.clientHeight - voffset;
  resizeCanvas($width, $height);

  dynamicBlockSize();
}

function dynamicBlockSize() {
  let min = (height > width) ? width : height;
  let bs = Math.floor((min - 100)/(snakeContainer.gridWidth));
  let maxBs = 80;
  let minBs = 40;
  if(bs > maxBs) bs = maxBs;
  if(bs < minBs) bs = minBs;
  setBlockSize(bs);
}

function keyPressed() {
  if(!game) return;

  if(keyCode === RIGHT_ARROW) {
    game.player.setDir(0);
    fCount = 1;
  }
  if(keyCode === UP_ARROW) {
    game.player.setDir(1);
    fCount = 1;
  }
  if(keyCode === LEFT_ARROW) {
    game.player.setDir(2);
    fCount = 1;
  }
  if(keyCode === DOWN_ARROW) {
    game.player.setDir(3);
    fCount = 1;
  }
  if(keyCode === 32) {
    if(game.gameState == 0) {
      game.gameState = 1;
    }
  }
}

function draw() {
  background(65, 10, 10);

  // DRAW CONTAINER

  stroke(0, 0, 40);
  fill(0, 0, 30);
  strokeWeight(5);
  push();
  translate(width/2, height/2);
  rectMode(CENTER);
  rect(0, 0, snakeContainer.totalWidth + 5, snakeContainer.totalHeight + 5);

  if(fCount % 60 == 0) {
    // Tick
    game.update();
  }
  game.draw();

  pop();

  fCount++;
}
