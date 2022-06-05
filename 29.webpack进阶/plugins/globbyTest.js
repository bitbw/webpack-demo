
// globby@11.0.1
const globby = require('globby');
// globby@13.x.x 需要使用 esmodule 形式导入  需要改变项目  "type": "module", 比较麻烦
// import { globby } from 'globby';

(async () => {
  let files = await globby('./public',{
      ignore:["*/index.html"]
  });
  console.log('Bowen ~ file: globbyTest.js ~ line 6 ~ files', files);
})();
