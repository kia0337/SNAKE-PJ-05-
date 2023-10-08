let score = 0;

const setup = {
  step: 0,
  maxStep: 10,
  cellSize: 20,
  targetSize: 20,
};

const snake = {
  dx: setup.cellSize,
  dy: 0,
  tails: [
    [200, 200],
    [200, 220],
  ],
};

let target = {
  x: 0,
  y: 0,
};

let canvas = document.getElementById("game-canvas");
let context = canvas.getContext("2d");
let scoreBlock = document.querySelector(".game-score .score-count");

function move() {
  //   console.log(snake.tails[0][1] + snake.dy, snake.tails[0][1], snake.dy);
  let newHead = [snake.tails[0][0] + snake.dx, snake.tails[0][1] + snake.dy];
  snake.tails.pop();
  snake.tails.unshift(newHead);
}

function renderSnake() {
  //   console.log(snake.tails);

  snake.tails.forEach(function (el, index) {
    if (index == 0) {
      context.fillStyle = "#ff4";
    } else {
      context.fillStyle = "#ff46";
    }
    context.fillRect(el[0], el[1], 20, 20);
  });
}

randomTarget();
function renderTarget() {
  console.log(target.x, target.y);
  context.fillStyle = "#A00034";
  context.fillRect(target.x, target.y, 20, 20);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomTarget() {
  let x = getRandomInt(0, 20) * 20;
  let y = getRandomInt(0, 20) * 20;
  while (checkTargetAndSnake(x, y)) {
    x = getRandomInt(0, 20) * 20;
    y = getRandomInt(0, 20) * 20;
  }
  target.x = x;
  target.y = y;
}

function checkTargetAndSnake(x, y) {
  for (let i = 0; i < snake.tails.length; i++) {
    if (snake.tails[i][0] == x && snake.tails[i][1] == y) {
      return true;
    }
  }
  return false;
}

function play(event) {
  if (event == null) {
    return;
  } else if (event.key === "ArrowUp" && snake.dy === 0) {
    snake.dy = -setup.cellSize;
    snake.dx = 0;
  } else if (event.key === "ArrowLeft" && snake.dx === 0) {
    snake.dx = -setup.cellSize;
    snake.dy = 0;
  } else if (event.key === "ArrowDown" && snake.dy === 0) {
    snake.dy = setup.cellSize;
    snake.dx = 0;
  } else if (event.key === "ArrowRight" && snake.dx === 0) {
    snake.dx = setup.cellSize;
    snake.dy = 0;
  }
}

function goingAbroad() {
  console.log("ккординаты змеи", snake.tails[0][0], snake.tails[0][1]);
  if (snake.tails[0][0] >= canvas.width) {
    snake.tails[0][0] = 0;
  } else if (snake.tails[0][0] < 0) {
    snake.tails[0][0] = canvas.width - setup.cellSize;
  }

  if (snake.tails[0][1] < 0) {
    snake.tails[0][1] = canvas.height - setup.cellSize;
  } else if (snake.tails[0][1] >= canvas.height) {
    snake.tails[0][1] = 0;
  }
}

function checkForBump() {
  for (let i = 1; i < snake.tails.length; i++) {
    if (
      snake.tails[0][0] == snake.tails[i][0] &&
      snake.tails[0][1] == snake.tails[i][1]
    ) {
      clearInterval(gameCycle);
      refreshGame();
    }
  }
}

function checkForTargetHit() {
  console.log(snake.tails[0][0], target.x, snake.tails[0][1], target.y);
  if (snake.tails[0][0] == target.x && snake.tails[0][1] == target.y) {
    score++;
    inBestScore();
    let oneNewTail = [target.x + snake.dx, target.y + snake.dy];
    snake.tails.unshift(oneNewTail);
    randomTarget();
  }
}

function inBestScore() {
  if (typeof Storage !== undefined) {
    let bestScore = localStorage.getItem("bestScore");
    {
      if (bestScore) {
        if (score > parseInt(bestScore)) {
          localStorage.setItem("bestScore", score.toString());
        }
      } else {
        localStorage.setItem("bestScore", score.toString());
      }
    }
  } else {
    console.log("Браузер не поддерживает losalStorage");
  }
}

function refreshGame() {
  score = 0;
  drawScore();
  snake.tails[0][0] = 200;
  snake.tails[0][1] = 200;
  snake.tails = [
    [200, 200],
    [200, 220],
  ];
  snake.dx = setup.cellSize;
  snake.dy = 0;
  randomTarget();
  gameCycle();
}

function drawScore() {
  scoreBlock.innerHTML = score;
}

// move();
// play();
// renderSnake();
// renderTarget();

addEventListener("keydown", play);

let buttonRefresh = document.getElementById("button");
buttonRefresh.addEventListener("click", refreshGame);

function gameCycle() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawScore();
  renderSnake();
  renderTarget();
  move();
  goingAbroad();
  checkForTargetHit();
  checkForBump();

  console.log("cycle");
}

setInterval(function () {
  gameCycle();
}, 300);
