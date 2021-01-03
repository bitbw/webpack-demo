const { resolve } = require("path");
module.exports = {
  //入口
  entry: "./src/index.js",
  //出口
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "dist")
  },
  //模式 development 、 production
  mode: "development",
  // loader
  module: {
    rules: [
      {
        test: /\.css$/,
        // 执行顺序由右到左 由下至上
        use: ["style-loader", "css-loader"]
      },
      {
        test:/\.less$/,
        use:[
          //转化为style
          "style-loader",
          // 处理css
          "css-loader",
          // 转化为css
          "less-loader"
        ]
      }
    ]
  },
  // plugins 插件 （数组）
  plugins: []
};
