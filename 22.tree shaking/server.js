const express = require("express");
const app = express();
// express.static向外暴露静态资源
// maxAge 资源缓存的最大时间，单位ms
app.use(express.static("./dist",{ maxAge: 1000 * 3600 }));

app.listen(8686, e => {
  if (!e) {
    console.log("server success ! open:http://localhost:8686");
  }
});
