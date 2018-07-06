'use strict';

const path = require('path');

module.exports = {
    entry: './src/index.js',

    context: path.resolve(__dirname),

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'etersoft-typos.js'
    },

    module: {
        rules: [
            { 
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader"
                }
            },
            { test: /\.css$/,   loader: "style-loader!css-loader"},
            { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, loader: 'url-loader?limit=100000' }
        ]
    },

    // devtool: 'source-map',
};
