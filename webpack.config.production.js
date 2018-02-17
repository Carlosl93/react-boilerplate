const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const port = process.env.PORT || 3000;

module.exports = {
    entry: ['react-hot-loader/patch', './src/index.js'],
    output: {
        filename: 'static/[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devtool: 'source-map',
    module: {
        rules: [

            // First Rule
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },

            // Second Rule
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,

                                // Allows to configure how many loaders 
                                // before css-loader should 
                                // be applied to @import(ed) resources
                                importLoaders: 1,

                                camelCase: true,

                                // Create source maps for CSS files
                                sourceMap: true
                            }
                        },
                        {
                            // PostCSS will run before css-loader and will 
                            // minify and autoprefix our CSS rules.
                            // We are also telling it to only use the last 2 
                            // versions of the browsers when autoprefixing
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    ctx: {
                                        autoprefixer: {
                                            browsers: 'last 2 versions'
                                        }
                                    }
                                }
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),

        // Minify and uglify our production bundles, creating 
        // source maps and removing comments
        new UglifyJsPlugin({
            sourceMap: true,
            uglifyOptions: {
                output: {
                    comments: false
                }
            }
        }),
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            favicon: 'public/favicon.ico'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor'],
            minChunks: Infinity
        }),
        new ExtractTextPlugin({
            filename: 'styles/styles.[contenthash].css',
            allChunks: true
        })
    ],
    devServer: {
        host: 'localhost',
        port: port,
        historyApiFallback: true,
        open: true,
        hot: true
    }
};