// 캔버스 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage, spaceShipImage, bulletImage, enemyImage, gameOverImage;

let rightPressed,
  leftPressed = false;

let spaceshipSize = 60;
let spaceshipX = canvas.width / 2 - spaceshipSize / 2;
let spaceshipY = canvas.height - spaceshipSize;

let bulletArr = [];

let bulletSize = 15;
let bulletX = spaceshipX + bulletSize + 1;
let bulletY = canvas.height - spaceshipSize;

let enemyArr = [];
let enemyY = 20;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key === 37 || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === 39 || e.key === "ArrowLeft") {
    leftPressed = true;
  }

  if (e.keyCode === 32 || e.code === "Space") {
    bulletArr.push([bulletImage, spaceshipX + bulletSize + 1, bulletY]);
  }
}

function keyUpHandler(e) {
  if (e.key === 37 || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === 39 || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = "/Game/Shooting-game/images/background.gif";

  spaceShipImage = new Image();
  spaceShipImage.src = "/Game/Shooting-game/images/spaceship.png";

  bulletImage = new Image();
  bulletImage.src = "/Game/Shooting-game/images/bullet.png";

  enemyImage = new Image();
  enemyImage.src = "/Game/Shooting-game/images/enemy.png";

  gameOverImage = new Image();
  gameOverImage.src = "/Game/Shooting-game/images/gameover.png";
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  ctx.drawImage(spaceShipImage, spaceshipX, spaceshipY);

  if (rightPressed && spaceshipX < canvas.width - spaceshipSize) {
    spaceshipX += 2;
  } else if (leftPressed && spaceshipX > 0) {
    spaceshipX -= 2;
  }

  //   ctx.drawImage(bulletImage, bulletX, (bulletY -= 3), 25, 25);
  for (let i = 0; i < bulletArr.length; i++) {
    ctx.drawImage(bulletImage, bulletArr[i][1], (bulletArr[i][2] -= 3), 25, 25);
  }

  let enemy = [Math.floor(Math.random() * 50000), enemyY];
  enemyArr.push(enemy);
  // console.log(enemyArr);

  for (let i = 0; i <= enemyArr.length; i++) {
    ctx.drawImage(enemyImage, enemyArr[i][0], (enemyArr[i][1] += 0.5), 50, 50);
  }
}

setInterval(render, 10);

function main() {
  render();
  requestAnimationFrame(main);
}

loadImage();
main();
