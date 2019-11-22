const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
module.exports = {
  devtool: 'eval-source-map',
  mode: 'development',
  entry: {
    // login: __dirname + '/src/login/index.tsx',
    index: __dirname + '/src/index.tsx'
  },
  output: {
    path: __dirname + '/public',
    filename: '[name][hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js)|(ts)|(tsx)|(jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
          // {
          //   loader: "ts-loader"
          // }
        ]
      },
      {
        test: /\.css$/,
        // exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new ManifestPlugin(),
    // new HtmlWebpackPlugin({
    //   title: 'login html',
    //   filename: 'login.html',
    //   template: 'src/login.html',
    //   excludeChunks: ['index'],
    //   hash: true
    // }),
    new HtmlWebpackPlugin({
      title: 'index html',
      filename: 'index.html',
      template: 'src/index.html',
      excludeChunks: ['login'],
      hash: true
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'async',
  //     minSize: 30000,
  //     minRemainingSize: 0,
  //     maxSize: 0,
  //     minChunks: 1,
  //     maxAsyncRequests: 6,
  //     maxInitialRequests: 4,
  //     automaticNameDelimiter: '~',
  //     automaticNameMaxLength: 30,
  //     cacheGroups: {
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10
  //       },
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true
  //       }
  //     }
  //   }
  // },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devServer: {
    contentBase: './public', //本地服务器所加载的页面所在的目录
    historyApiFallback: true, //不跳转
    inline: true //实时刷新
  }
};
