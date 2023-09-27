let score = 0;


const setup = {
    step:0,
    maxStep:10,
    cellSize: 20,
    targetSize: 20,
};

const snake = {
    x: 200,
    y: 200,
    dx:setup.cellSize,
    dy:0,
    tails:[],
    maxTails:2,
};

let target = {
    x:0,
    y:0,
};


let canvas = document.getElementById("game-canvas");
let context = canvas.getContext("2d");
let scoreBlock = document.querySelector(".game-score .score-count");
drawScore();
// context.fillStyle = "#ff46";
// context.fillRect( 200, 200, 20, 20 );

function gameEngine(){
    requestAnimationFrame(gameEngine);
    if(++setup.step < setup.maxStep){
        return;
    }
    setup.step = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    drowSnake();
    drowTarget();
    };

requestAnimationFrame(gameEngine);

function drowSnake (){
    snake.x += snake.dx;
    snake.y += snake.dy;
    
    goingAbord();

    snake.tails.unshift({x:snake.x, y: snake.y,});
    if(snake.tails.length > snake.maxTails){
        snake.tails.pop();
    };
    snake.tails.forEach(function(el, index){
        if (index == 0){
        context.fillStyle = "#ff4";
        } else {
            context.fillStyle = "#ff46"
        };
        context.fillRect( el.x, el.y, setup.sizeCell, setup.sizeCell );
        if (el.x === target.x && el.y === target.y){
            snake.maxTails++;
            inScore();
            randomTarget();
        };
            for (let i = index + 1; i < snake.tails.length; i++){
                if(el.x == snake.tails[i].x && el.y == snake.tails[i].y){
                    refreshGame();
                };
            };
        });
    };


function goingAbord(){
    if (snake.x < 0){
        snake.x = canvas.width - setup.cellSize;
    } else if (snake.x >= canvas.width){
        snake.x = 0;
    }

    if (snake.y < 0){
        snake.y = canvas.height - setup.cellSize;
    } else if (snake.y >= canvas.height){
        snake.y = 0;
    }
};


function drawScore() {
	scoreBlock.innerHTML = score;
};


function refreshGame (){
    score = 0;
    drawScore();
    snake.x = 200;
    snake.y = 200;
    snake.tails = [];
    snake.maxTails = 2;
    snake.dx = setup.cellSize;
    snake.dy = 0;
    randomTarget();
};

function drowTarget(){
	context.beginPath();
	context.fillStyle = "#A00034";
	context.arc( target.x + (setup.sizeCell / 2 ), target.y + (setup.sizeCell / 2 ), setup.sizeCell, 0, 2 * Math.PI );
	context.fill();
};

function randomTarget(){
	target.x = getRandomInt( 0, canvas.width / setup.sizeCell ) * setup.sizeCell;
	target.y = getRandomInt( 0, canvas.height / setup.sizeCell ) * setup.sizeCell;
};

function inScore(){
    score++;
    drawScore();
};

function getRandomInt(min, max) {
	return Math.floor( Math.random() * (max - min) + min );
}

document.addEventListener("keyDown", function (play) {
	if ( play.witch === 38 && snake.dy === 0 ) {
		snake.dy = -setup.sizeCell;
		snake.dx = 0;
	} else if ( play.witch === 37 && snake.dx === 0 ) {
		snake.dx = -setup.sizeCell;
		snake.dy = 0;
	} else if (play.witch === 40 && snake.dy === 0 ) {
		snake.dy = setup.sizeCell;
		snake.dx = 0;
	} else if ( play.witch === 39 && snake.dx === 0 ) {
		snake.dx = setup.sizeCell;
		snake.dy = 0;
	};
});

let btn = document.getElementById("button");
btn.addEventListener("click",refreshGame ());

