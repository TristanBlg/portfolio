const path                  = require('path')
const webpack               = require('webpack')
const dev                   = process.env.NODE_ENV === "dev"
const ExtractTextPlugin     = require("extract-text-webpack-plugin")
// const BabiliPlugin          = require("babili-webpack-plugin")

let cssLoaders = [
    { loader: 'css-loader', options: { importLoaders: 1, minimize: !dev } }
]
if(!dev) {
    cssLoaders.push({
        loader: 'postcss-loader',
        options: {
            plugins: (loader) => [
                require('autoprefixer')()
            ]
        }
    })
}

let config = {
    entry: {
        app: './src/App.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: dev ? 'cheap-module-eval-source-map' : false,
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: cssLoaders
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        ...cssLoaders,
                        'sass-loader'
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            disable: dev
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}

// if(!dev) {
//     config.plugins.push(new BabiliPlugin())
// }

module.exports = config