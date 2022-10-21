let mutcount;
class Bird{
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.v = 0;
    this.a = gravity;

    this.brain = new NeuralNetwork(  4,  8,  1);

    // i could give it 5 input parameters so that i can change the pan speed and it know about it
    //so it would choose better to jump of not to jump in case of fast paneSpeed

    this.fitness = 0;
    // y, distance from closestPipe = x of cp, y of upper cp, y of lower cp
    // hidden
    // one output between 0, 1 giving whether to jump or not

    this.rad = birdRad;
    this.color = [random(255), random(255), random(255)];
    // print(this.color);
    this.alive = true;
    this.closestPipe = 0;
  }

  UpdateScore(pipes) {
    let i = 0;
    for(i = 0; i<pipes.pipesU.length; i++) {
      if(pipes.pipesU[i].x + pipes.pipeW > this.x) break;
    }
    // pipes.pipesU[i].col = [0];
    // print(this.closestPipe);
    if(this.closestPipe != i) {
      score++;
      // print(this.closestPipe, i);
      // this.fitness++;
      // this.fitness = pow(this.fitness, 1.5);
      // this.fitness = 1000 * log(frameCount);
    }
    this.closestPipe = i;
  }

  think(list) {
    if(!this.alive) return;
    let inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = list.pipesU[this.closestPipe].x / width;
    inputs[2] = list.pipesU[this.closestPipe].y / height;
    inputs[3] = list.pipesD[this.closestPipe].y / height;

    // print(inputs);
    let choice = this.brain.predict(inputs);
    if(choice[0] >= 0.5) {
      this.flap(-15);
    }
  }

  show() {
    imageMode(CENTER);
    // tint(this.color);
    if(this.alive) {
      if(this.v >= 0) image(birdImg[0], this.x, this.y, 2*this.rad+15, 2*this.rad+20);
      else image(birdImg[2], this.x, this.y, 2*this.rad+15, 2*this.rad+20)
    }
    else image(birdImg[1], this.x, this.y, 2*this.rad+15, 2*this.rad+20);
    strokeWeight(0);
    fill(this.color);
    circle(this.x-7, this.y, 15);
    // noTint();
  }

  collide(pipes){
    if(this.y + this.rad > height) {
      return true;
    }
    let i = 0;
    for(i = 0; i<pipes.pipesU.length; i++) {
      if(pipes.pipesU[i].x + pipes.pipeW > this.x) break;
    }
    // pipes.pipesU[i].col = [0];
    // print(this.closestPipe);
    if(this.closestPipe != i) {
      // print(this.closestPipe, i);
      this.fitness++;
      // this.fitness = pow(this.fitness, 1.5);
      // this.fitness = 1000 * log(frameCount);
    }
    this.closestPipe = i;
    if(this.x + this.rad >= pipes.pipesU[i].x) {

      // don't need to check the other case because then it would consider another i as nearest pipe
      if(this.y - this.rad <= pipes.pipesU[i].y || this.y + this.rad >= pipes.pipesD[i].y) return true;
    }
    return false;
  }

  flop() {
    if(this.y + this.rad > height) {
      this.y = height - this.rad;
      this.v = 0;
    }
  }

  move(pipes) {
    this.y += this.v; // y += dv / frame rate
    this.v += this.a;
    // if(this.alive) {
    //   this.fitness = pow((frameCount - lastDeathFrame), 2);
    // }
    if(!this.alive) {
      this.flop();
    }
    else if(this.collide(pipes)) {
  		this.death();
  	}
  }

  flap(v) {
    if(this.alive) {
      this.v = v;
    }
  }

  death() {
    // this.y = height;
    // this.v = 0;
    // this.color = [0];
    this.alive = false;
    // this.color = [200, 175, 50];
  }

  Birth() {
    let child = new Bird(width/3, height/2);
    child.brain = this.brain.copy();
    mutcount = 0;
    child.brain.mutate(this.func);
    mutcount = mutcount/40*500;
    // mutcount is purely for changing colors in a fun and accurate way
    child.color = [this.color[0]+random(-mutcount, mutcount), this.color[1]+random(-mutcount, mutcount), this.color[1]+random(-mutcount, mutcount)];
    return child
  }

  func(data) {
    let r = random(1);
    if(r < mutationRate) {
      mutcount++;
      return random(-1, 1);
    }
    return data;
  }

}

/*
++ fitness got it in 24 gen
log got in 32-45 ish
8 notes immediatly seems to be working better than 12, makes sense since it it pretty relativly simple math so 12 is just alot more paremerts
to f you up when no attended to more notes to attend to or it incereases the variane alot more for something that doesnt need a complicated shape
hence doesnt need to pay the cost of high varience with increased data or generation, ig here its just random changes so high varience doing good with
high data or generation isnt really correct;

increasing pan speed just makes it stupid cuz it goes so far pan speed is just weirdly high to be of any point

24, 1, literall still going ( 5000 )
52
31
12

*/
