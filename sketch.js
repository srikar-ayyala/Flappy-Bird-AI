function preload() {
	birdImg[0] = loadImage('./flappy0001.png');
	birdImg[1] = loadImage('./flappy0003.png');
	birdImg[2] = loadImage('./flappy0006.png');
	pipeImg[0] = loadImage('./flappy0004.png');
	pipeImg[1] = loadImage('./flappy0005.png');
}

function setup() {
	createCanvas(600, 700);
	birdPop = new BirdPop(total);
	player = new BirdPop(1);
	gameButton = new Press(width/2, 2*height/3 - 50, 150, 75, 2, 'Play');
	trainButton = new Press(width/2, 2*height/3 +50, 150, 75, 1, 'Train');
	pretrainedButton = new Press(width/2, 2*height/3 + 150, 175, 75, 3, 'Use Trained Model');
	homeButton = new Press(width-25, 0+25, 25, 25, 0, 'X');

	pipes = new Pipes();
	gamePipes = new Pipes();

	slider = createSlider(1, 500, 1);
}

function draw() {
	background(175, 200, 250);

	switch (gameSwitch) {
		case 0:

			MainMenu();

			break;
		case 1:
			// birdPop = new BirdPop(total);
			// pipes = new Pipes();
			TrainNN();
			Home();

			break;
		case 2:
			// player = new BirdPop(1);
			// pipes = new Pipes();
			PlayFlappy();
			Home();

			break;
		case 3:
			// player = new BirdPop(1);
			// gamePipes = new Pipes();
			UseJsonNN();
			UseModel();
			Home();
			break;
		default:

		print('ummmm.....');

	}
}

function Home() {
	homeButton.show();
}

function UseModel() {

for(let n = 0; n < slider.value(); n++){
	if(tagboi) player.think(gamePipes);
	player.move(gamePipes);
	if(player.birds[0].alive) gamePipes.move(player);
	else {
		score = 0;
		player = new BirdPop(1);
		gamePipes = new Pipes();
		UseJsonNN();
	}
	player.birds[0].UpdateScore(gamePipes);
}
	// background(200, 206, 250);
	player.show();
	gamePipes.show();
	ShowScore();
}

function MainMenu() {
	fill(0); textSize(40); textAlign(CENTER);
	text("Flappy Birds . ai", width/2, height/3);
	gameButton.show();
	trainButton.show();
	pretrainedButton.show();
}

function PlayFlappy() {
	// background(200, 206, 250);
	gamePipes.show();
	player.show();
	player.move(gamePipes);
	if(player.birds[0].alive) gamePipes.move(player);
	else {
		textSize(20); fill(0);
		text("dead :(", width/2, height/2-10);
		text("try again? >:)", width/2, height/2+10);
	}
	player.birds[0].UpdateScore(gamePipes);
	ShowScore();
}

function TrainNN() {
	// paneSpeed = paneSpeed - frameCount / 10


	// for(let bird of birdPop.birds){
	// 	bird.think(pipes);
	// 	bird.show(pipes);
	// 	bird.move(pipes);
	// 	if(bird.alive) birdCount++;
	// }
	for(let n = 0; n < slider.value(); n++){
		birdPop.think(pipes);
	birdPop.move(pipes);
	if(birdPop.birdCount > 0){
		pipes.move(birdPop);
	} else {
		// textSize(32);
		// fill(0);
		// text('Dead', width/2, height/2);
		// text('new game?', width/2, height/2+50);


		score = 0;
		paneSpeed = -5;
		pipesDel = 0;
		// bird = new Bird(width/3, height/2
		birdPop.Generate();
		pipes = new Pipes();

	}
}
	// background(200, 206, 250);
	pipes.show();
	birdPop.show();
	ShowGAFitness();
}

function keyPressed() {
	if(gameSwitch == 2) {
		if(key == ' ' || keyCode == UP_ARROW) {
			if(player.birds[0].alive){
				player.birds[0].flap(-15);
			} else {
				score = 0;
				player = new BirdPop(1);
				// player = new Bird(width/3, height/2);
				gamePipes = new Pipes();
				// maybe be other pipe
				player.birds[0].flap(-15);
			}
		}
	}
}

function ShowScore() {
	textSize(20); textAlign(LEFT); fill(100);
	text('score : '+ score, 0, 20);
	highScore = Math.max(highScore, score);
	text('high Score : '+ highScore, 0, 40);
}

function ShowGAFitness() {
	fill(0);
	textSize(16); textAlign(LEFT);
	text('generation: ' + birdPop.generation, 0, 16);
	text('Number alive: ' + birdPop.birdCount, 0, 16+16);
	text('bestFitness' + birdPop.bestFitness, 0, 16 + 16*2);
	// text('score : '+ score, 0, 20);
	// highScore = Math.max(highScore, score);
	// text('high Score : '+ highScore, 0, 40);
}

function mousePressed() {
if(gameSwitch == 0) {
	if(gameButton.checkTap()) {
		gameButton.t = 150;
	}
	if(trainButton.checkTap()) {
		trainButton.t = 150;
	}
	if(pretrainedButton.checkTap()) {
		pretrainedButton.t = 150;
	}
}
	if(gameSwitch != 0 && homeButton.checkTap()) {
		homeButton.t = 150;
	}
}

function mouseClicked() {
	if(gameSwitch == 0) {
	if(gameButton.checkTap()) {
		gameButton.t = 0;
		// print(gameButton.val);
		gameSwitch = gameButton.val;
		gamePipes = new Pipes();

	}
	if(trainButton.checkTap()) {
		trainButton.t = 0;
		// print(aiButton.val);
		gameSwitch = trainButton.val;
		pipes = new Pipes();
	}
	if(pretrainedButton.checkTap()) {
		pretrainedButton.t = 0;
		gameSwitch = pretrainedButton.val;
		pipes = new Pipes();
	}
}
	if(gameSwitch != 0 && homeButton.checkTap()) {
		homeButton.t = 0;
		gameSwitch = homeButton.val;
		slider.remove();
		setup();
	}
}

class Press{
	constructor(x, y, w, h, val, buttonText, t = 150) {
		this.x = x;
		this.y = y;
		this.h = h;
		this.w = w;
		this.val = val;
		this.t = 0;
		this.buttonText = buttonText;
	}

	show() {
		rectMode(CENTER);

		//actual
		// stroke()
		strokeWeight(2);
		fill(150, 220, 100);
		rect(this.x, this.y, this.w, this.h, 11);
		//tinted
		fill(150, 220, 100, this.t)
		rect(this.x, this.y, this.w, this.h, 11);
		fill(0); textSize(20); textAlign(CENTER);
		text(this.buttonText, this.x, this.y+7);
	}

	checkTap() {
		return (mouseX <= this.x + this.w/2 && mouseX >= this.x - this.w/2 && mouseY <= this.y + this.h/2 && mouseY >= this.y - this.h/2);
	}
}
