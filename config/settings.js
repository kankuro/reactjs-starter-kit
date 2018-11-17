const settingsConfig = env => {
    const config = {
        mode: 'development',
        devtool: 'cheap-module-source-map',
        output: {
            fileName: '[name].bundle.js',
        },
        rules: {
            fontFilename: '[name].[ext]',
            imageFilename: '[name].[ext]',
        },
        plugins: {
            cssExtractPlugin: {
                filename: '[name].css',
                chunkFilename: '[id].css',
            },
        },
        devServer: {
            hot: true,
            port: 8000,
            open: true,
            overlay: true,
            compress: true,
            publicPath: '/',
            stats: 'errors-only',
            contentBase: './build',
        },
    };

    if (!env) {
        config.mode = 'production';
        config.devtool = 'source-map';
        config.output.fileName = '[name].[contenthash:12].js';
        config.rules.fontFileName = '[name].[ext]?[hash:12]';
        config.rules.imageFilename = '[name].[ext]?[hash:12]';
        config.plugins.cssExtractPlugin.filename = '[name].[hash:12].css';
        config.plugins.cssExtractPlugin.chunkFilename = '[name].[hash:12].css';
    }

    return config;
};

module.exports = settingsConfig;
