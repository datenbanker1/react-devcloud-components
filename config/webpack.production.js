const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const path = require("path");

process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

module.exports = {
  entry: {
    index: "./src/index.js"
    // Block: "./src/components/Block"
    // Layouter: "./src/components/Layouter"
    // Router: "./src/components/Router"
    // Theme: "./src/components/Theme"
    // Authenticator: "./src/components/Authenticator.js"
  },
  mode: "production",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../build"),
    library: "[name]",
    libraryTarget: "umd"
  },
  externals: [
    "@material-ui/core",
    "@material-ui/lab",
    "@material-ui/core/styles",
    "@datenbanker/devcloud-client-lib",
    "@datenbanker/storage",
    "@fortawesome/fontawesome-svg-core",
    "@fortawesome/pro-light-svg-icons",
    "@fortawesome/react-fontawesome",
    "jss",
    "react",
    "react-dom",
    "react-router-dom",
    "color",
    "classnames"
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        loader: require.resolve("babel-loader"),
        exclude: /node_modules/,
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
    new BundleAnalyzerPlugin({
      analyzerMode: "static"
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
