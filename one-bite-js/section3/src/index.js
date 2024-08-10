// commonjs 방식
// const { add, sub } = require("./math");

// esmodule 방식 -> 확장자 필수!! 🚨
import mul, { add, sub } from "./math.js";

console.log(add(1, 2));
console.log(sub(1, 2));
console.log(mul(1, 2));
