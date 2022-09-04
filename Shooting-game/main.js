// 캔버스 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);
let animation;

let backgroundImage,
  spaceShipImage,
  bulletImage,
  enemyImage,
  fireImage,
  gameOverImage;

let gameOver = false;
let score = 0;

let rightPressed,
  leftPressed = false;

// 우주선 세팅
let spaceshipSize = 60;
let spaceshipX = canvas.width / 2 - spaceshipSize / 2;
let spaceshipY = canvas.height - spaceshipSize;

let bulletArr = [];

function Bullet() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.x = spaceshipX + 17;
    this.y = spaceshipY;
    this.alive = true;
    bulletArr.push(this);
  };

  this.checkHit = function () {
    for (let i = 0; i < enemyArr.length; i++) {
      if (
        this.y <= enemyArr[i].y &&
        this.x >= enemyArr[i].x &&
        this.x <= enemyArr[i].x + 60
      ) {
        score++;
        this.alive = false;
        this.fire = true;
        enemyArr.splice(i, 1);
      }
    }
  };
}

function createBullet() {
  let b = new Bullet();
  b.init();
}

function generateRandomValue(min, max) {
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
}

let enemyArr = [];

function Enemy() {
  this.x = 0;
  this.y = 0;
  this.size = 50;

  this.init = function () {
    this.x = generateRandomValue(0, canvas.width - 60);
    this.y = 0;
    enemyArr.push(this);
  };
  this.update = function () {
    if (this.y >= canvas.height - 50) {
      gameOver = true;
    }
  };
}

function createEnemy() {
  const interval = setInterval(function () {
    let e = new Enemy();
    e.init();
  }, 1000);
}

let isCrushed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = true;
  } else if (e.keyCode === 37) {
    leftPressed = true;
  }

  if (e.keyCode === 32) {
    createBullet();
  }
}

function keyUpHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = false;
  } else if (e.keyCode === 37) {
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
  gameOverImage.src = "/Shooting-game/images/gameOver.png";
}

function update() {
  for (let i = 0; i < bulletArr.length; i++) {
    if (bulletArr[i].alive) {
      bulletArr[i].checkHit();
    }
  }

  for (let i = 0; i < enemyArr.length; i++) {
    enemyArr[i].update();
  }
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceShipImage, spaceshipX, spaceshipY);
  ctx.fillText(`Score : ${score}`, 20, 20);
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";

  if (rightPressed && spaceshipX < canvas.width - spaceshipSize) {
    spaceshipX += 3;
  } else if (leftPressed && spaceshipX > 0) {
    spaceshipX -= 3;
  }

  for (let i = 0; i < bulletArr.length; i++) {
    if (bulletArr[i].alive) {
      ctx.drawImage(bulletImage, bulletArr[i].x, (bulletArr[i].y -= 7), 25, 25);
    }
    if (bulletArr[i].fire) {
      ctx.drawImage(fireImage, bulletArr[i].x - 10, bulletArr[i].y);
      setTimeout(function () {
        bulletArr[i].fire = false;
      }, 100);
    }
  }

  for (let i = 0; i < enemyArr.length; i++) {
    ctx.drawImage(enemyImage, enemyArr[i].x, (enemyArr[i].y += 1), 50, 50);
  }
}

function main() {
  if (!gameOver) {
    update();
    render();
    animation = requestAnimationFrame(main);
  } else {
    ctx.drawImage(gameOverImage, 10, 100, 380, 300);
  }
}

loadImage();
createEnemy();
main();
