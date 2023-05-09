const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename:"static/js/[contenthash].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        //excludes: "node_modules",
        use: [
          "style-loader",
          "css-loader",
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(jpe?g|png|gif|webp)/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize:10*1024 //超过这个配置就会转为base64
          }
        },
        generator: {
          filename:"static/img/[contenthash][ext]"
        }
      }
    ]
  }
  
}