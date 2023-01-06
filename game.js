// Main js page for running hte game

import { update as updateSnake, draw as drawSnake, 
SNAKE_SPEED, getSnakeHead, snakeIntersection} from './snake.js'
import { update as updateFood, draw as drawFood} from './food.js'
import {outsideGrid} from './grid.js'

let lastRenderTime = 0;
let gameOver = false
const gameBoard = document.getElementById('game-board')

function main(currentTime){
    // if the gane is over restart
    if(gameOver) {
        if (confirm('you lost, ok to restart')) {
            window.location = '/'
        }
        return
    }
    // amnimate art set speed according to specifications
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime

    update()
    draw()
}

window.requestAnimationFrame(main);

// update the position of the food and snake
function update(){
    updateSnake()
    updateFood()
    checkForDeath()
}

// draws snake and food to screen
function draw(){
    gameBoard.innerHTML= ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

// did you loose?
function checkForDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}
