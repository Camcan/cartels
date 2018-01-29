const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const BUILD_DIR = path.resolve(__dirname, 'client/public');
const APP_DIR = path.resolve(__dirname, 'client/app');

const config = {
   entry: APP_DIR + '/index.jsx',
   output: {
      path: BUILD_DIR,
      filename: 'bundle.js'
   },
   module: {
      loaders: [
         {
            test: /\.(js|jsx)$/,
            include: APP_DIR,
            loader: 'babel-loader',
            query: {
               presets:['react','es2015', 'stage-0']
            }

         },
         {
            test: /\.json$/,
            loader: 'json-loader'
         },
         {
            test: /\.css$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
               fallback: 'style-loader',
               use: [
                  {
                     loader: 'css-loader',
                     options: {
                        modules: true,
                        localIdentName: '[name]__[local]___[hash:base64:5]'
                     }
                  },
                  'postcss-loader'
               ]
            })
         }
      ]
   },
   plugins: [
              new ExtractTextPlugin("style.css"),
              new webpack.DefinePlugin({ 
                 'process.env': {
                     'NODE_ENV': JSON.stringify('production')                 }
               }),
               new webpack.optimize.DedupePlugin(),
               new webpack.optimize.UglifyJsPlugin(), 
               new webpack.optimize.AggressiveMergingPlugin()
   ]
};

module.exports = config;
