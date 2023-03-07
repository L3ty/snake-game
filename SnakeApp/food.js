import { radomGridPosition } from "./grid.js";
import { onSnake, expandSnake } from "./snake.js";


let food = getRadomFoodPosition();


const ExpansionRate = 1;


export function update(score) {
  if (onSnake(food)) {
    expandSnake(ExpansionRate);
    food = getRadomFoodPosition();
    score.increase()
    console.log(score)
    document.getElementById('score').innerHtml = `${score.value}`
  }
}


export function draw(board) {
  const foodElement = document.createElement("div");
  foodElement.style.gridColumnStart = food.x;
  foodElement.style.gridRowStart = food.y;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

function getRadomFoodPosition() {
  let newFoodPosition;

  
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = radomGridPosition();
  }
  return newFoodPosition;
}
