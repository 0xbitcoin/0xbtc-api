var webpack = require('webpack');
var path = require('path');





var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

var CleanWebpackPlugin = require('clean-webpack-plugin')


var CopyWebpackPlugin = require('copy-webpack-plugin');

var environment = process.env.NODE_ENV || 'development';



let pathsToClean = [
  'public'
]

// the clean options to use
let cleanOptions = {
  verbose:  true,
  dry:      false
}



var webpackPlugins = [
//  new CleanWebpackPlugin(pathsToClean, cleanOptions),

    new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),

        new CopyWebpackPlugin([
          {from:'assets/img',to:'assets/img'  }
          ], {
            concurrency: 1
          })


]



const routesData = {
  routes: [   ]
}




module.exports = {
    entry: ['./assets/javascripts/index.js' ],
    output: {
        path: path.resolve(__dirname, 'public'),
      //  filename: 'bundle.js',
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2016']
                        }
                    }
                ]
            },
           
            {
              test: /\.(png|jpg|gif)$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: '[path][name].[ext]',
                     publicPath: '/',
                  }
                }
              ]
            },

            {
              test: /\.(eot|woff|woff2|ttf|svg)(\?[\s\S]+)?$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: '[path][name].[ext]',
                     publicPath: '/',
                  }
                }
              ]
            },
        ]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
      }
    },
    plugins: webpackPlugins
};
