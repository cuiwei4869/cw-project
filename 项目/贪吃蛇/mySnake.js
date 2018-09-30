
var start = document.getElementById('startGame');
var stop = document.getElementById('stopGame');
var reload = document.getElementById('reloadGame');
var wrapper = document.getElementsByClassName('wrapper')[0];
var box = document.getElementsByClassName('box')[0];
var timer;
var key;
var direct = 'right';
var left = false;
var right = false;
var up = true;
var down = true;


game();
startGame();
function game() {
    direction = 'right';
    boxW = parseInt(getComputedStyle(box).width);
    boxH = parseInt(getComputedStyle(box).height);
    snakeBody = [[3, 1, 'head'], [2, 1, 'body'], [1, 1, 'body']];
    snake();
    food();

}

function snake() {
    for (var i = 0; i < snakeBody.length; i++) {
        var snake = document.createElement('div');
        snake.style.width = '30px';
        snake.style.height = '30px';
        snake.style.position = 'absolute';
        snake.style.borderRadius = '50%';
        snake.style.left = snakeBody[i][0] * 30 + 'px';
        snake.style.top = snakeBody[i][1] * 30 + 'px';
        snake.classList.add(snakeBody[i][2]);
        box.appendChild(snake).classList.add('snake');
    }
}
function food() {
    var food = document.createElement('div');
    food.style.width = '30px';
    food.style.height = '30px';
    food.style.backgroundColor = 'blue';
    food.style.position = 'absolute';
    food.style.borderRadius = '50%';
    foodX = Math.floor(Math.random() * (boxW / 30));
    foodY = Math.floor(Math.random() * (boxH / 30));
    food.style.left = foodX * 30 + 'px';
    food.style.top = foodY * 30 + 'px';
    box.appendChild(food).setAttribute('class', 'food');

}
function move() {
    for (var i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i][0] = snakeBody[i - 1][0];
        snakeBody[i][1] = snakeBody[i - 1][1];
    }
    document.onkeydown = function (e) {
        var code = e.keyCode;
        console.log(code);
        getDirectionCode(code);
    }
    switch (direct) {
        case 'right':
            snakeBody[0][0] += 1;
            break;
        case 'down':
            snakeBody[0][1] += 1;
            break;
        case 'left':
            snakeBody[0][0] -= 1;
            break;
        case 'up':
            snakeBody[0][1] -= 1;
            break;
            defaule:
            break;
    }
    removeClass('snake');
    snake();
    if (snakeBody[0][0] == foodX && snakeBody[0][1] == foodY) {
        var snakeEndX = snakeBody[snakeBody.length - 1][0];
        var snakeEndY = snakeBody[snakeBody.length - 1][1];
        switch (direct) {
            case 'right':
                snakeBody.push([snakeEndX - 1, snakeEndY, 'body']);
                break;
            case 'up':
                snakeBody.push([snakeEndX, snakeEndY + 1, 'body']);
                break;
            case 'left':
                snakeBody.push([snakeEndX + 1, snakeEndY, 'body']);
                break;
            case 'down':
                snakeBody.push([snakeEndX, snakeEndY - 1, 'body']);
                break;
            default:
                break;
        }
        removeClass('food');
        food();
    }
    if (snakeBody[0][0] < 0 || snakeBody[0][0] >= boxW / 30) {
        console.log(1);
        gameOver();
    }
    if (snakeBody[0][1] < 0 || snakeBody[0][1] >= boxH / 30) {
        gameOver();
        console.log(2);

    }
    for (var j = 1; j < snakeBody.length; j++) {
        if (snakeBody[0][0] == snakeBody[j][0] && snakeBody[0][1] == snakeBody[j][1]) {
            gameOver();
            console.log(3);
        }
    }
}
function gameOver() {
    clearInterval(timer);
    removeClass('food');
    removeClass('snake');
    snakeBody = [[3, 1, 'head'], [2, 1, 'body'], [1, 1, 'body']];
    snake();
    food();
    direct = 'right';
    left = false;
    down = true;
    right = false;
    up = true;
    alert('辣鸡！gameOver!草尼玛，你玩尼玛呢你！');
}
function removeClass(className) {
    var ele = document.getElementsByClassName(className);
    while (ele.length) {
        ele[0].parentElement.removeChild(ele[0]);
    }
}
function getDirectionCode(code) {
    switch (code) {
        case 37:
            if (left) {
                direct = 'left';
                left = false;
                right = false;
                up = true;
                down = true;
            }
            break;
        case 38:
            if (up) {
                direct = 'up';
                left = true;
                right = true;
                up = false;
                down = false;
            }
            break;
        case 39:
            if (right) {
                direct = 'right';
                left = false;
                right = false;
                up = true;
                down = true;
            }
            break;
        case 40:
            if (down) {
                direct = 'down';
                left = true;
                right = true;
                up = false;
                down = false;
            }
            break;
            defaule:
            break;
    }
}

function startGame() {
    start.onclick = function () {
        clearInterval(timer);
        timer = setInterval(function () {
            move();
        }, 300);
    }
    stop.onclick = function () {
        clearInterval(timer);
    }
    reload.onclick = function () {
        clearInterval(timer);
        removeClass('food');
        removeClass('snake');
        snakeBody = [[3, 1, 'head'], [2, 1, 'body'], [1, 1, 'body']];
        snake();
        food();
        direct = 'right';
        left = false;
        down = true;
        right = false;
        up = true;
        timer = setInterval(function () {
            move();
        }, 300);
    }
}


