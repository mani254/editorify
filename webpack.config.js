const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
   entry: {
      'editor': './src/core/editor/index.js',
      'calendar': './src/core/calendar/index.js',
      'main': './src/index.js'
   },
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: (pathData) => {
         return pathData.chunk.name === 'main'
            ? 'index.js'
            : `${pathData.chunk.name}/${pathData.chunk.name}.js`;
      },
      library: 'editorify',
      libraryTarget: 'umd',
      globalObject: 'this',
   },

   module: {
      rules: [{
         test: /\.js?$/,
         exclude: /node_modules/,
         use: {
            loader: 'babel-loader'
         }
      },
      {
         test: /\.jsx?$/,
         exclude: /node_modules/,
         use: {
            loader: 'babel-loader'
         }
      },
      {
         test: /\.css$/,
         use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
         ]
      }
      ]
   },
   resolve: {
      extensions: ['.js', '.jsx']
   },
   externals: {
      react: 'react',
      'react-dom': 'react-dom'
   },
   plugins: [
      new MiniCssExtractPlugin({
         filename: (pathData) => {
            return pathData.chunk.name === 'main'
               ? 'styles.css'
               : `${pathData.chunk.name}/${pathData.chunk.name}.css`;
         },
      }),
      new CleanWebpackPlugin(),
   ],
   mode: 'development',
   devServer: {
      static: path.resolve(__dirname, 'dist'),
      hot: true
   }
};
