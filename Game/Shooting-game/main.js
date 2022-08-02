// 캔버스 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage, spaceShipImage, bulletImage, enemyImage, gameOverImage;

let spaceshipWidth = 60;

let spaceshipX = canvas.width / 2 - spaceshipWidth / 2;
let spaceshipY = canvas.height - spaceshipWidth;

let rightPressed,
  leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key === 37 || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === 39 || e.key === "ArrowLeft") {
    leftPressed = true;
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
  enemyImage.src = "/Game/Shooting-game/images/monster.png";

  gameOverImage = new Image();
  gameOverImage.src = "/Game/Shooting-game/images/gameover.png";
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  //   ctx.drawImage(spaceShipImage, spaceshipX, spaceshipY);

  ctx.beginPath();
  ctx.drawImage(spaceShipImage, spaceshipX, spaceshipY);

  if (rightPressed && spaceshipX < canvas.width - spaceshipWidth) {
    spaceshipX += 2;
  } else if (leftPressed && spaceshipX > 0) {
    spaceshipX -= 2;
  }
}

setInterval(render, 10);

function main() {
  render();
  requestAnimationFrame(main);
}

loadImage();
main();
