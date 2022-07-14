const clock = document.querySelector("h2#clock");
clock.innerText = "asdf";

const getClock = () => {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  clock.innerText = `${hours} : ${minutes} : ${seconds}`;
};

getClock();

// 언제마다 시작할지 - setInterval / 얼마나 기다릴지 - setTimeout
setInterval(getClock, 1000);
