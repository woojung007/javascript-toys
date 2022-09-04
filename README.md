# Javascript-study

## 🚀 1. Shooting Game - Javascript로 슈팅게임 만들기

https://user-images.githubusercontent.com/99471927/188315527-f80702e9-b21a-4b29-bc5d-4fa41f139e32.mov

### [1] 게임 기본 설명
- 우주선을 좌우로 조작하여 총알을 쏴 하늘에서 떨어지는 적군을 물리친다.
- 적군을 하나씩 물리칠 때마다 스코어가 1점씩 올라가며 적군이 바닥에 닿게되면 게임은 종료된다.

### [2] 구현방법
#### [2-1] 게임 애니메이션 구현방법
- `Canvas API`를 사용하여 2D 그래픽을 조작하였다.
- 메인으로 실행되는 함수를 하나 만들어주고 전체적인 그림을 그려주는 `render 함수`를 실행해준다. 
- `main 함수` 안에서 `requestAnimationFrame()` 메서드를 사용해서 `main 함수`를 재귀적으로 불러주어 게임 애니메이션을 실행하였다. (setInterval보다 부드럽게 실행 가능)

```javascript
function main() {
  render();
  requestAnimationFrame(main);
}
```

#### [2-2] 우주선 조작하기
- `leftPressed`와 `rightPressed`를 `boolean(false)`값으로 초기 설정을 해준다.
- 왼쪽이나 오른쪽 키보드가 눌리면(`keyDown`) true를 주고 키보드가 다시 올라가면(`keyUp`) false값을 주도록 설정해준다.
- `leftPressed`와 `rightPressed` 값이 true일 때마다 우주선의 좌표값을 3씩 더해주거나 빼준다.
- 이때 우주선이 화면 밖으로 넘어가면 안되기 때문에 `우주선의 X좌표값의 조건`을 다음과 같이 주었다.

```javascript
  if (rightPressed && spaceshipX < canvas.width - spaceshipSize) {
    spaceshipX += 3;
  } else if (leftPressed && spaceshipX > 0) {
    spaceshipX -= 3;
  }
```
<br/>

#### [2-3] 총알 발사하기
- 총알을 담아줄 `빈 배열(bulletArr)`를 하나 만들어준 뒤 `총알(Bullet)`에 관련된 내용들을 함수로 만들어준다. 
- spacebar를 누를때마다 새로운 Bullet을 bulletArr에 push해서 `new Bullet`을 생성해준다.

```js
function Bullet() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.x = spaceshipX + 17;
    this.y = spaceshipY;
    this.alive = true;
    bulletArr.push(this);
  };
 }
```
<br/>


#### [2-4] 적군 랜덤으로 만들기

- 적군을 랜덤으로 나오게 하기 위해서 최솟값과 최댓값 사이에서 랜덤한 수를 만드는 함수(generateRandomValue)를 하나 만들어준다. 
이 함수는 매개변수로 최솟값과 최댓값을 받는데 이는 차레대로 캔버스의 시작과 끝을 의미한다.
```js
function generateRandomValue(min, max) {
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
}
```
- 총알(Bullet)과 마찬가지로 빈 배열과 Enemy 함수를 하나 만들어준다. 여기에서 적군(Enemy)의 x 값은 캔버스의 범위 안에서 움직여야 하므로 최솟값은 0이고 최댓값은 캔버스의 너비에서 직군의 크기를 뺀 값이라고 할 수 있다. 
- 어떠한 적군이라도 바닥에 닿았을 때 게임이 끝나도록(gameOver = true;) 하기 위해서 업데이트(update) 항목을 추가해준다. 이후 모든 update 항목들만 하나의 함수로 묶어서 한번에 실행해줄 것이다. 
- Enemy가 1초에 1개씩 생성되도록 setInterval을 사용해서 구현해준다. 

```js
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
```


#### [2-5] 적군이 총알을 맞았을 때 스코어 올리기
- 

<br/><br/>
## 2. Momentum - 바닐라 JS로 크롬 앱 만들기
[with. 노마드코더](https://nomadcoders.co/javascript-for-beginners/lobby)
- localStorage를 이용한 로그인 기능 구현
- setInterval을 사용한 시계 구현
- 랜덤한 명언 및 배경이미지 구현 (Math.floor, Math.random 사용)
- localStorage를 이용한 To-Do List 구현 (Create, Read, Delete)
- Weather Open-API(REST)를 이용하여 현재 위치 및 날씨 구현

<br/><br/>

## 3. 자바스크립트 : 실전 웹사이트 만들기
[with. 코딩알려주는 누나](https://codingnoona.thinkific.com/courses/2)

- 자바스크립트 이론 및 실습
- 최신 자바스크립트 기술(ES6 자바스크립트 최신 문법)
- 개발 환경 설정



### 3-1 랜덤 번호 맞추기 게임  
![random-number](https://user-images.githubusercontent.com/99471927/179057037-b3529c4e-fb41-449e-ab66-e959199edf41.gif)

- 리셋 기능 만들기
- 랜덤 번호 보여주기
- 유저가 입력한 값인지 알려주기 

### 3-2 TO-DO List
![todo-demo](https://user-images.githubusercontent.com/99471927/179057157-d1184e68-2b16-4e03-8e0d-efb302adef5b.gif)

- 아이템 추가, 삭제, 필터링하기

### 3-3 Times

![times2](https://user-images.githubusercontent.com/99471927/179064649-18b8be29-6370-45c4-aa43-1b7cbd0e8c87.gif)



- API 호출하기 (POSTMAN)
- Render하기
- 카테고리별 검색하기
- 키워드별 검색하기
- 코드 리팩토링
- 에러 핸들링
- 페이지네이션 만들기
- 클릭이벤트 설정하기


