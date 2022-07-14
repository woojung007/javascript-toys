const loginForm = document.getElementById("login-form");
// const loginInput = document.querySelector("#login-form input"); 로 바꿔서 쓸 수 있음
const loginInput = loginForm.querySelector("input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

// if~else를 이용한 로그인 유효성 검사
// HTML에서 이를 대체하는 기능이 있음(required, maxlength)

//   const username = loginInput.value;
//   if (!username) {
//     alert("Please write your name.");
//   } else if (username.length > 15) {
//     alert("Your name is too long.");
//   }

const paintGreetings = (username) => {
  greeting.innerText = `Hello ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
};

const onLoginSubmit = (event) => {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintGreetings(username);
};

const savedUsername = localStorage.getItem(USERNAME_KEY);
console.log("savedUsername", savedUsername);

if (!savedUsername) {
  // show the form
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  // show the greetings
  paintGreetings(savedUsername);
}
