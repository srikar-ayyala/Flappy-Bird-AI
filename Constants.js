let birdCol = [200, 255, 50], birdRad = 20, mutationRate = 0.05;
let pipeWidth = 100, pipeSpace = 180, pipeDistanace = 250, pipeVelocity = -5, fluffVal = 100, pipesDel = 0;
let gravity = 1.2, paneSpeed = -5;
let birdPop, pipes;
let score = 0, highScore = 0;
const total = 150;
let player, gamePipes;
let gameButton, trainButton, pretrainedButton, homeButton;

let slider;

let gameSwitch = 0;
let tagboi = true;

let birdImg = [], pipeImg = [];


async function UseJsonNN() {
  let seeIf = await fetch("./bestBirdNN.json");
  let newNN = await seeIf.json();
  Match(player.birds[0].brain, newNN);
}

function Match(nn, newNN) {
  nn.input_nodes = newNN.input_nodes;
  nn.hidden_nodes = newNN.hidden_nodes;
  nn.output_nodes = newNN.out_nodes;

  nn.weights_ih.row = newNN.weights_ih.row;
  nn.weights_ih.cols = newNN.weights_ih.cols;
  nn.weights_ih.data = newNN.weights_ih.data;

  nn.weights_ho.rows = newNN.weights_ho.rows;
  nn.weights_ho.cols = newNN.weights_ho.cols;
  nn.weights_ho.data = newNN.weights_ho.data;

  nn.bias_h.rows = newNN.bias_h.rows;
  nn.bias_h.cols = newNN.bias_h.cols;
  nn.bias_h.data = newNN.bias_h.data;

  nn.bias_o.rows = newNN.bias_o.rows;
  nn.bias_o.cols = newNN.bias_o.cols;
  nn.bias_o.data = newNN.bias_o.data;
}
