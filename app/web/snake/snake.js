let dir = {
  DOWN: 3,
  LEFT: 2,
  UP: 1,
  RIGHT: 0
}

class Game {
  constructor(container) {
    this.container = container;
    this.gameState = 0;
    console.log("Created new game", this.container);

    this.player = new Snake(0, 0, dir.DOWN, this.container, this);
    this.apple = createVector(5, 6);
    this.randomizeApple();
  }

  update() {
    if(this.gameState == 1) {
      this.player.update();

      for(let t of this.player.tail) {
        if(this.player.head.equals(t.p)) {
          console.log("Overlap");
          this.gameState = 2;
          this.time = 0;
        }
      }

      if(this.player.head.x == this.apple.x && this.player.head.y == this.apple.y) {
        this.player.len++;
        do {
          this.randomizeApple();
        } while(this.appleIsOverlapping());
      }
    } else if(this.gameState == 2) {
      this.time += 1;
      if(this.time >= 10) {
        window.reloadWindow();
      }
    }
  }

  draw() {
    if(this.gameState == 1) {
      // Draw snake
      push();
      rectMode(CORNER);
      ellipseMode(CORNER);
      translate(-this.container.totalWidth/2, -this.container.totalHeight/2);
      // Draw Apple
      push();
      translate(this.apple.x * this.container.blockSize, this.apple.y * this.container.blockSize);
      //ellipse(0, 0, this.container.blockSize, this.container.blockSize);
      translate(this.container.blockSize / 2, this.container.blockSize / 2);
      textSize(this.container.blockSize - 5);
      textAlign(CENTER, CENTER);
      text('\u{1F34E}',0,0);
      pop();
      // Draw Player
      this.player.draw();

      pop();
    } else if(this.gameState == 2) {
      textSize(32);
      textAlign(CENTER, CENTER);
      noStroke();
      fill(100, 0, 100);
      push();
      translate(0, -150);
      text(`Final Score`, 0, 0);
      translate(0, 50);
      fill(100, 60, 100);
      text(`${this.player.len}`, 0, 0);
      pop();

      push();
      translate(0, 50);
      text("Game Over...", 0, 0);
      translate(0, 50);
      rectMode(CENTER);
      fill(0, 0, 51);
      rect(0,0,200,25);
      fill(100, 50, 100);
      let wid = map(this.time, 0, 10, 200, 0);
      rect(0,0,wid,25);
      pop();
    } else if(this.gameState == 0) {
      textSize(32);
      textAlign(CENTER, CENTER);
      fill(100, 0, 100);
      noStroke();
      text("Press SPACE to play!", 0, 0);
      textSize(64);
      text("\u{1F3AE}", 0, 100)
      text("\u{1F40D}", 0, -100)
    }
  }

  randomizeApple() {
    let newX = floor(random(this.container.gridWidth));
    let newY = floor(random(this.container.gridHeight));
    this.apple = createVector(newX, newY);
  }

  appleIsOverlapping() {
    if(this.apple.equals(this.player.head)) return true;
    for(let t of this.player.tail) {
      if(this.apple.equals(t.p)) {
        return true;
      }
    }
    return false;
  }
}

class Snake {
  constructor(x, y, dir, container, game) {
    this.head = createVector(x, y);
    this.dir = dir;
    this.lastDir = dir;
    this.len = 0;
    this.tail = [];
    this.container = container;
    this.game = game;
  }

  update() {
    let newTail = {
      p: createVector(this.head.x, this.head.y),
      in: this.lastDir,
      out: this.dir
    }

    this.tail.push(newTail);

    while(this.tail.length > this.len) {
      this.tail.shift();
    }

    switch(this.dir) {
      case 0:
        this.head.x += 1;
        break;
      case 1:
        this.head.y -= 1;
        break;
      case 2:
        this.head.x -= 1;
        break;
      case 3:
        this.head.y += 1;
        break;
    }

    this.lastDir = (this.dir + 2) % 4;

    if(this.head.y >= this.container.gridHeight) this.head.y = 0;
    if(this.head.y < 0) this.head.y = this.container.gridHeight-1;
    if(this.head.x >= this.container.gridWidth) this.head.x = 0;
    if(this.head.x < 0) this.head.x = this.container.gridWidth-1;
  }

  setDir(dir) {
    this.dir = dir;
    this.game.update();
  }

  draw() {
    let bs = this.container.blockSize;
    let m = 4;

    strokeWeight(1);
    rectMode(CORNERS);

    // Draw Tail
    for(let i = 0; i < this.tail.length; i++) {
      let t = this.tail[i];
      let hue = map(i, 0, this.tail.length, 0, 100);
      let c = color(hue, 60, 100)
      fill(c);
      stroke(c);
      push();
      translate(t.p.x * bs, t.p.y * bs);
      this.drawTailSeg(t.in, bs, m);
      this.drawTailSeg(t.out, bs, m);
      pop();
    }

    // Draw Head
    push();
    rectMode(CORNERS);
    noStroke();
    fill(0, 0, 100);
    translate(this.head.x * bs, this.head.y * bs);
    this.drawTailSeg((this.dir + 2) % 4, bs, m);
    // Draw eyes
    translate(bs/2, bs/2);
    if(this.dir % 2 == 1) {
      rotate(PI/2);
    }
    ellipseMode(CENTER);
    fill(0, 0, 0);
    ellipse(0, -(bs/4), 2, 2);
    ellipse(0, +(bs/4), 2, 2);
    pop();
  }

  drawTailSeg(dir, bs, m) {
    switch(dir) {
      case 0:
        rect(m, m, bs, bs-m);
        break;
      case 1:
        rect(m, 0, bs-m, bs-m);
        break;
      case 2:
        rect(0, m, bs-m, bs-m);
        break;
      case 3:
        rect(m, m, bs-m, bs);
        break;
    }
  }
}
