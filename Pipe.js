class Pipes{
  constructor() {
    this.pipeVel = pipeVelocity;
    this.pipeDist = pipeDistanace;
    this.pipeW = pipeWidth;
    this.pipeS = pipeSpace;
    this.pipesU = [];
    this.pipesD = [];
    this.n = (width/(this.pipeDist + this.pipeW))|0;
    this.n++;
    for(let i = 0; i<this.n; i++) {
      let y = random(20, height-fluffVal-pipeSpace);
      let pipe = new Pipe(width + 30 + i*(this.pipeW + this.pipeDist), y, "up");
      this.pipesU.push(pipe);
      pipe = new Pipe(width + 30 + i*(this.pipeW + this.pipeDist), y+this.pipeS, "down");
      this.pipesD.push(pipe);
    }
  }

  addPair(width, y) {
    let x = this.pipesU[this.pipesU.length-1].x
    let pipe = new Pipe(x + this.pipeDist + this.pipeW, y, "up");
    this.pipesU.push(pipe);
    let pipe2 = new Pipe(x + this.pipeDist + this.pipeW, y+this.pipeS, "down");
    this.pipesD.push(pipe2);
  }
  remove(bP) {
    // print(pipes)
    this.pipesD.splice(0, 1);
    this.pipesU.splice(0, 1);
    pipesDel++;
    bP.DecClosestPipe();
  }
  update(bP){
    if(this.pipesU[0].x <= -this.pipeW) {
      this.remove(bP);
      let y = random(20, height-fluffVal-pipeSpace);
      this.addPair(width, y);
    }
  }
  move(bP) {
    if(bP.birdCount <= 0) return;
    for(let i = 0; i<this.pipesD.length; i++){
      this.pipesD[i].x += paneSpeed;
      this.pipesU[i].x += paneSpeed;
    }

    this.update(bP);
  }
  show() {
    rectMode(CORNER);
    for(let pipe of this.pipesD) pipe.show();
    for(let pipe of this.pipesU) pipe.show();
  }

}



class Pipe {
  constructor(x, y, dir = "up") {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.col = [100, 220, 50];
  }

  show() {
    strokeWeight(3);
    fill(this.col);
    imageMode(CORNER);
    if(this.dir == "up") {
      image(pipeImg[1], this.x-6, this.y-500, pipeWidth+6, 500);
      // image(pipeImg[1], this.x, this.y-500, pipeWidth, 500);
      // rect(this.x, 0, pipeWidth, this.y);
    } else{
      image(pipeImg[0], this.x-6, this.y, pipeWidth+6, 500);
      // rect(this.x, this.y, pipeWidth, height-this.y);
    }
  }

}
