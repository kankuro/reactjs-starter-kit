const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssNano = require('cssnano');
const PurifyCSSPlugin = require('purifycss-webpack');

const configSettings = require('./config/settings');
const pluginSettings = require('./config/plugins');

const envMode = process.env.NODE_ENV !== 'production';

const settings = configSettings(envMode);
const plugins = pluginSettings({
    glob,
    path,
    webpack,
    envMode,
    HtmlWebpackPlugin,
    MiniCssExtractPlugin,
    PurifyCSSPlugin,
    plugins: settings.plugins,
});

const config = {
    entry: {
        app: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: settings.output.fileName,
    },
    mode: settings.mode,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {
                            failOnWarning: false,
                            failOnError: true,
                            quiet: true,
                        },
                    },
                ],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                include: path.resolve(__dirname, './src/assets/sass'),
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: settings.rules.imageFilename,
                            outputPath: 'images/',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65,
                            },
                            optipng: {
                                optimizationLevel: 7,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: settings.rules.fontFilename,
                            outputPath: 'fonts/',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [path.resolve('./src'), 'node_modules'],
    },
    devtool: settings.devtool,
    devServer: settings.devServer,
    plugins,
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    reuseExistingChunk: true,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        },
    },
};

if (!envMode) {
    config.optimization.minimizer = [
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true,
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.s?css$/g,
            canPrint: true,
            cssProcessor: cssNano,
            cssProcessorOptions: {
                sourcemap: true,
                map: {
                    inline: false,
                },
                preset: [
                    'default',
                    {
                        discardComments: { removeAll: true },
                    },
                ],
            },
        }),
    ];
}

module.exports = config;
