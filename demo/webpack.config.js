const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './src/index.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/'
   },
   devServer: {
      static: {
         directory: path.resolve(__dirname, 'dist')
      },
      port: 8080,
      hot: true,
      historyApiFallback: true
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env', '@babel/preset-react']
               }
            }
         },
         {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
         }
      ]
   },
   resolve: {
      extensions: ['.js', '.jsx'],
      modules: [path.resolve(__dirname, 'node_modules'), 'node_modules']
   },
   plugins: [
      new MiniCssExtractPlugin({
         filename: 'styles.css'
      }),
      new HtmlWebpackPlugin({
         template: './public/index.html'
      })
   ],
   mode: 'development'
};
