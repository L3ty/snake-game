import {
  update as updateSnake,
  draw as drawSnake,
  SnakeSpeed,
  getSnakeHead,
  snakeInterSection,
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";

const board = document.getElementById("board");
const playerElement = document.getElementById("player");
const scoreElement = document.getElementById("score");

let lastRender = 0;
let gameOver = false;

requestAnimationFrame(main);

playerElement.innerText = `Player: ${new URLSearchParams(
  window.location.search
).get("name")}`;

const score = {
  value: 0,
  increase() {
    this.value = this.value + 1;
    scoreElement.innerText = `Score: ${this.value}`;
  },
};

function main(currentTime) {
  if (gameOver) {
    if (confirm("GAME OVER!")) {
      window.location.reload();
    }
    return;
  }
  requestAnimationFrame(main);
  const secondsRender = (currentTime - lastRender) / 1000;
  if (secondsRender < 1 / SnakeSpeed) return;

  lastRender = currentTime;

  update();
  draw();
}

function update() {
  updateSnake();
  updateFood(score);
  checkDeath();
}

function draw() {
  board.innerHTML = "";
  drawSnake(board);
  drawFood(board);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeInterSection();
}
