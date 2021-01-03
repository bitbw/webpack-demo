/*
 * webpack 初体验
 * webpack --entry  ./src/index.js -o ./dist --mode=development #开发模式
 * webpack --entry  ./src/index.js -o ./dist --mode=production #生产模式
 * @LastEditTime: 2021-01-03 13:52:21
 */
import data from "./data.json";

console.log(data);
function add(a, b) {
  return a + b;
}
console.log(add(1, 2));
