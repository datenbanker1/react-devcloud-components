// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;
const path = require("path");

process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

module.exports = {
  entry: {
    main: "./src/dev/index.js"
  },
  mode: "development",
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "../public"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        loader: require.resolve("babel-loader"),
        options: {
          // @remove-on-eject-begin
          babelrc: false,
          presets: [require.resolve("babel-preset-react-app")],
          // @remove-on-eject-end
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true
        }
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin({
    //   analyzerMode: "static"
    // })
  ],
  devServer: {
    contentBase: "public",
    compress: true,
    historyApiFallback: true,
    overlay: true,
    open: true,
    port: 3000
  }
};
