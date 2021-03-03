import '../assets/font/iconfont.css';
import '../assets/font/iconfont.js';
import '../css/a.css';
import '../css/b.less';

document.querySelector('.btn1').addEventListener('click', async (e) => {
  const { mul, count } = await import(/* webpackChunkName: 'test' */ './test');
  console.log(mul(1, 2));
});
const add = (x, y) => x + y;
console.log(add(2, 5));

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('定时器执行完了~');
    resolve();
  }, 1000);
});
console.log(promise);
console.log(promise);
