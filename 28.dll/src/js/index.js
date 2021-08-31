/** @format */

import '../assets/font/iconfont.css';
import '../assets/font/iconfont.js';
import '../css/a.css';
import '../css/b.less';

import(/* webpackChunkName: 'test66666' */ './test').then(({ mul, count }) => {
  console.log('Bowen: mul', mul(5, 4));
});
