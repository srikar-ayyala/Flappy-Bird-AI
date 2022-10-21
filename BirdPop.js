class BirdPop {
  constructor(size) {
    this.birds = [];
    for(let i = 0; i < size; i++) this.birds[i] = new Bird(width/3, height/2);
    this.generation = 1;
    this.bestFitness = 0;
  }

  Generate() {
    this.bestFitness = 0;
    let nextGen = [];
    for(let i = 0; i < this.birds.length; i++) {
      let parent1 = this.PickOne();
      let child = parent1.Birth();
      nextGen.push(child);
    }
    this.birds = nextGen;
    this.generation++;
    this.birdCount = 0;
  }

  PickOne() {
    let sum = 0;
    for(let bird of this.birds) {
      sum += bird.fitness;
    }
    for(let i = 0; i < this.birds.length; i++) {
      this.birds[i].fitness = this.birds[i].fitness / sum;
    }
    let index  = 0;
    let r = random(1);
    while(r > 0) {
      r = r - this.birds[index].fitness;
      index++;
    }
    index--;

    return this.birds[index];
  }

  DecClosestPipe() {
    for(let bird of this.birds) {
      bird.closestPipe--;
    }
  }

  move(pipes) {
    this.birdCount = 0;
    for(let bird of this.birds) {
      bird.move(pipes);
      this.bestFitness = Math.max(this.bestFitness, bird.fitness);
      if(bird.alive) this.birdCount++;
    }
  }
  show() {
    for(let bird of this.birds) {
      bird.show();
    }
  }
  think(pipes) {
    for(let bird of this.birds) bird.think(pipes);
  }

}
