import '../assets/font/iconfont.css';
import '../assets/font/iconfont.js';
import '../css/a.css';
import '../css/b.less';
import { mul } from './test.js';

const add = (x, y) => x + y;
console.log(add(2, 5));
console.log(add(2, 5));

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('定时器执行完了~');
    resolve();
  }, 1000);
});
console.log(mul(1, 2));
console.log(promise);
console.log(promise);
