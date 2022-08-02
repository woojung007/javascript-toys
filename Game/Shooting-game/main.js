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

let bulletSize = 15;
let bulletX = spaceshipX + bulletSize + 1;
let bulletY = canvas.height - spaceshipSize;

let enemyX = Math.floor(Math.random() * 1000);
let enemyY = 10;

let spacePressed = [];

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key === 37 || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === 39 || e.key === "ArrowLeft") {
    leftPressed = true;
  }

  if (e.keyCode === 32 || e.code === "Space") {
    spacePressed.push([
      bulletImage,
      spaceshipX + bulletSize + 1,
      bulletY,
      25,
      25,
    ]);
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

  ctx.beginPath();
  ctx.drawImage(spaceShipImage, spaceshipX, spaceshipY);

  if (rightPressed && spaceshipX < canvas.width - spaceshipSize) {
    spaceshipX += 2;
  } else if (leftPressed && spaceshipX > 0) {
    spaceshipX -= 2;
  }

  //   ctx.drawImage(bulletImage, bulletX, (bulletY -= 3), 25, 25);
  for (let i = 0; i < spacePressed.length; i++) {
    ctx.drawImage(
      spacePressed[i][0],
      spacePressed[i][1],
      (spacePressed[i][2] -= 3),
      25,
      25
    );
  }
  let result = [];
  let enemy = [enemyImage, enemyX, (enemyY += 5), 40, 40];
  for (let i = 0; i < 100; i++) {
    result.push(enemy);
    ctx.drawImage(
      result[i][0],
      Math.floor(Math.random() * 1000),
      result[i][2],
      40,
      40
    );
  }
  console.log(result);
}

setInterval(render, 10);

function main() {
  render();
  requestAnimationFrame(main);
}

loadImage();
main();
