"use strict";
/*
Playground:{
    -score, 
    -restart button,
    f: renderInitPlace(width,hiegth),
    f:inScore(),
    f:gameCycle(snake, target)
}
Snake:
    
    f: move(x+),
    f: render,
    f: addListinerForKeys,
    f:checkForBump,
    f:checkForTargetHit,

Target:
    f:init,
    f:random,
    f:render,

gameCycle:

1. прорисовывается поле с счетом и всеми кнопками,
2. прорисовываем змейку 
   прорисовыем таргет так чтоб не попал в координаты змейки.
3. задается движение змейки. при этом она должна слушаться кнопочки.
3.1. проверяем не сообвадают ли координаты головы змейки с самой змейкой.
4. если координаты змейки === координтам таргета. 
5. добавляем хвостик.
5.1 добавляем score.
6. проверяем на максимальную длинну.
   делаем новый таргет.
*/

class Playground {
  score = 0;
  width = 400;
  hieght = 400;
  cellSize = 20;
  constructor(context, scoreBlock) {
    this.context = context;
    this.scoreBlock = scoreBlock;
  }
  refreshGame() {
    this.#drawScore();
  }
  #drawScore() {
    this.scoreBlock.innerHTML = score;
  }

  renderInputPlace(width, hiegth) {
    this.width = canvas.width;
    this.hiegth = canvas.hiegth;
  }
}

class Snake {
  constructor(context) {
    this.dx = 20;
    this.dy = 0;
    this.tails = [
      [200, 200],
      [200, 220],
    ];
    this.context = context;
  }
  render() {
    console.log("context", this.tails);
    this.tails.forEach(function (el, index) {
      if (index == 0) {
        this.context.fillStyle = "#ff4";
      } else {
        this.context.fillStyle = "#ff46";
      }
      this.context.fillRect(el[0], el[1], 20, 20);
    });
  }
}

class Target {
  x = 0;
  y = 0;
  constructor(context, x, y) {
    this.x = x;
    this.y = y;
    this.context = context;
  }
  renderTarget(context) {
    this.context.fillStyle = "#A00034";
    this.context.fillRect(target.x, target.y, 20, 20);
  }
  randomTarget(x, y) {
    this.x = this.#getRandomInt(0, 20) * 20;
    this.y = this.#getRandomInt(0, 20) * 20;
    while (checkTargetAndSnake(x, y)) {
      this.x = getRandomInt(0, 20) * 20;
      this.y = getRandomInt(0, 20) * 20;
    }
    this.target.x = x;
    this.target.y = y;
  }
  #getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

let canvas = document.getElementById("game-canvas");
let context = canvas.getContext("2d");
let scoreBlock = document.querySelector(".game-score .score-count");

const playground = new Playground(context, scoreBlock);

const snake = new Snake(context);
snake.render();

const target = new Target(context);
    target.renderTarget();
