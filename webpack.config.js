require('dotenv').load();

var Path = require('path');
var WebPack = require('webpack');
var HTMLPlugin = require('html-webpack-plugin');

var folders = {
    src: Path.resolve(__dirname, 'app'),
    dist: Path.resolve(__dirname, 'static')
};

module.exports = {
    target: 'web',
    context: folders.src,
    entry: [
        './index'
    ],
    output: {
        path: folders.dist,
        publicPath: 'http://localhost:3030/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.sass$/,
            loaders: ["style", "css", "sass"]
        },{
            test: /\.scss$/,
            loaders: ["style", "css", "sass"]
        },{
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
            loader: 'file'
        }]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new WebPack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new WebPack.optimize.OccurrenceOrderPlugin(),
        new HTMLPlugin({
            template: Path.resolve(folders.src, 'index.html'),
            filename: 'index.html',
            hash: false,
            inject: 'body'
        })
    ]
};

if (process.env.NODE_ENV === 'production') {
    module.exports.output.publicPath = '/static/';
    module.exports.devtool = 'source-map';
    module.exports.plugins.push(
        new WebPack.optimize.UglifyJsPlugin({
            compress : {
                unused: true,
                dead_code: true
            }
        })
    );
}

if (process.env.NODE_ENV === 'development') {
    module.exports.devtool = 'cheap-module-eval-source-map';
    module.exports.entry.unshift(
        'webpack-dev-server/client?http://localhost:3030/',
        'webpack/hot/dev-server'
    );
    module.exports.plugins.push(
        new WebPack.HotModuleReplacementPlugin()
    );
    module.exports.devServer = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        host: 'localhost',
        port: 3030,
        publicPath: 'http://localhost:3030/',
        contentBase: folders.src,
        hot: true,
        quiet: false,
        noInfo: false,
        lazy: false,
        historyApiFallback: true,
        stats: {
            colors: true
        }
    };
}
