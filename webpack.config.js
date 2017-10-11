const path                  = require('path')
const UglifyJSPlugin        = require('uglifyjs-webpack-plugin')
const dev                   = process.env.NODE_ENV === "dev"
const ExtractTextPlugin     = require("extract-text-webpack-plugin")

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
    watch: dev,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: dev ? 'cheap-module-eval-source-map' : false,
    module: {
        rules: [
            {
                test: /\.js$/,
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
    ]
}

if(!dev) {
    config.plugins.push(new UglifyJSPlugin({
        sourceMap: false
    }))
}

module.exports = config