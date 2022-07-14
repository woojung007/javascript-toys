const images = [
  "background-01.jpeg",
  "background-02.jpeg",
  "background-03.jpeg",
];

const chosenImage = images[Math.floor(Math.random() * images.length)];
const bgImage = document.createElement("img");
bgImage.src = `img/${chosenImage}`;
document.body.appendChild(bgImage);
