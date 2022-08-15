// 캔버스 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);
let animation;

// ctx.clearRect(0, 0, canvas.width, canvas.height);

let backgroundImage,
  spaceShipImage,
  bulletImage,
  enemyImage,
  fireImage,
  gameOverImage;

let rightPressed,
  leftPressed = false;

let spaceshipSize = 60;
let spaceshipX = canvas.width / 2 - spaceshipSize / 2;
let spaceshipY = canvas.height - spaceshipSize;

let bulletArr = [];
let bulletSize = 25;
let bulletX;
let bulletY;

let enemyArr = [];
let enemySize = 50;
let enemy;
let enemyX;
let enemyY;

let isCrushed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key === 37 || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === 39 || e.key === "ArrowLeft") {
    leftPressed = true;
  }

  if (e.keyCode === 32 || e.code === "Space") {
    bulletArr.push([
      spaceshipX + bulletSize - 8,
      canvas.height - spaceshipSize,
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
  backgroundImage.src = "/Shooting-game/images/background.gif";

  spaceShipImage = new Image();
  spaceShipImage.src = "/Shooting-game/images/spaceship.png";

  bulletImage = new Image();
  bulletImage.src = "/Shooting-game/images/bullet.png";

  enemyImage = new Image();
  enemyImage.src = "/Shooting-game/images/enemy.png";

  fireImage = new Image();
  fireImage.src = "/Shooting-game/images/fire.png";

  gameOverImage = new Image();
  gameOverImage.src = "/Shooting-game/images/gameover.png";
}

function collisionDetection() {
  enemy = [Math.floor(Math.random() * 30000), 0];

  if (enemy[0] < canvas.width - enemySize) {
    enemyArr.push(enemy);
  }

  for (let i = 0; i < enemyArr.length; i++) {
    ctx.drawImage(enemyImage, enemyArr[i][0], (enemyArr[i][1] += 0.5), 50, 50);

    enemyX = enemyArr[i][0];
    enemyY = enemyArr[i][1];

    let yDiff = bulletY - (enemyY + enemySize);
    let xDiff = bulletX - (enemyX + enemySize / 2);

    if (yDiff < 0 && -10 < xDiff && xDiff < 0) {
      console.log("collision");
      // console.log("에너미 엑스좌표", enemyX, bulletX, enemyY, bulletY);
      ctx.drawImage(fireImage, enemyX, enemyY);
    }
  }

  if (enemyY === canvas.height - enemySize) {
    cancelAnimationFrame(animation);
  }
}

function render() {
  console.log(enemyX, bulletX);
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceShipImage, spaceshipX, spaceshipY);

  if (rightPressed && spaceshipX < canvas.width - spaceshipSize) {
    spaceshipX += 3;
  } else if (leftPressed && spaceshipX > 0) {
    spaceshipX -= 3;
  }

  for (let i = 0; i < bulletArr.length; i++) {
    bulletX = bulletArr[i][0];
    bulletY = bulletArr[i][1];
    ctx.drawImage(bulletImage, bulletArr[i][0], (bulletArr[i][1] -= 3), 25, 25);
  }

  collisionDetection();
}

function main() {
  render();
  animation = requestAnimationFrame(main);
}

loadImage();
main();
