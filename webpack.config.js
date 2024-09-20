const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
   entry: {
      'editor': './src/core/editor/index.js',
      'imageUploader': './src/core/imageUploader/index.js',
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
      publicPath: '/assets/images/'
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
      },
      {
         test: /\.(png|jpg|jpeg|gif|svg)$/,
         use: [
            {
               loader: 'url-loader',
               options: {
                  limit: 8192,
                  name: '[name].[ext]',
                  outputPath: 'assets/images',
                  publicPath: '/assets/images',
                  esModule: false,
               }
            }
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
      hot: true,
      publicPath: '/assets/images/'
   }
};
