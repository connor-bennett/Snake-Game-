import { onSnake, expandSnake} from './snake.js'
import { randomGridPosition} from './grid.js'

let food = getRandomFoodPosition()
const EXPANSION_RATE = 1;

// updates position of the food
export function update(){
    if( onSnake(food)){
        expandSnake(EXPANSION_RATE)
        food = getRandomFoodPosition()
    }
}

//  draws new position of the food
export function draw(gameBoard){
        const foodElement = document.createElement('div')
        foodElement.style.gridRowStart = food.y
        foodElement.style.gridColumnStart = food.x
        foodElement.classList.add('food')
        gameBoard.appendChild(foodElement)
    }

    //  generates psuedo random positon for food
    function getRandomFoodPosition (){
        let newFoodPosition
        while(newFoodPosition == null || onSnake(newFoodPosition)) {
            newFoodPosition = randomGridPosition()
        }
        return newFoodPosition
    }