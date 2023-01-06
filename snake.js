import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 8

const snakeBody = [{x: 11, y: 11}]

let newSegments = 0


// udate snakes position and size
export function update(){
    addSegements()
    const inputDirection = getInputDirection()
    for(let i = snakeBody.length - 2; i >= 0; i--){
        snakeBody[i + 1]= {...snakeBody[i]}
    }
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

// draw snake according to new size and position
export function draw(gameBoard){
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })
}

// grows the snake
export function expandSnake(amount) {
    newSegments += amount
}

// use this to help check the position of the snake to the food
export function onSnake(position, {ignoreHead = false} = {}){
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false 
        return equalPositions(segment, position)
    })
}

// is the head intersecting the body
export function snakeIntersection(){
    return onSnake(snakeBody[0], {ignoreHead: true })
}

// used to help run the onSnake func and check positioning
function equalPositions(pos1, pos2){
    return pos1.x === pos2.x && pos1.y === pos2.y
}

// push new node to snake body
function addSegements(){
    for (let i =0; i < newSegments; i++){
        snakeBody.push({...snakeBody[snakeBody.length -1 ]})
    }

    newSegments = 0
}

//  returns head node
export function getSnakeHead(){
    return snakeBody[0]
}