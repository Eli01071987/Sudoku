var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
      path: __dirname + '/public',
      filename: "game.js"
    },
    module: {
      loaders: [
        {
          test: /\.css$/, loader: "style-loader!css-loader"
        },
        {
          test: /\.tsx?$/, 
          loader: "ts-loader"
        },
        {
        test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'less-loader']
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('game.css'),
      new CopyWebpackPlugin([
        {
          from: 'css/**/*.css',
          to: __dirname + '/public/' + '[name].[ext]'
        },
        {
          from: 'node_modules/react/umd/react.development.js',
          to: __dirname + '/public/' + '[name].[ext]'
        },
        {
          from: 'node_modules/react-dom/umd/react-dom.development.js',
          to: __dirname + '/public/' + '[name].[ext]'
        }
      ], {})
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    externals: {
      "react": "React",
      "react-dom": "ReactDOM"
    },
    devServer: {
      contentBase: __dirname + '/public'
    }
};