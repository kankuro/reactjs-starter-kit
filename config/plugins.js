const pluginsConfig = param => {
    const { glob, path, webpack, envMode, HtmlWebpackPlugin, MiniCssExtractPlugin, PurifyCSSPlugin, plugins } = param;

    const htmlWebpackPluginSettings = {
        template: './public/index.html',
        favicon: './public/favicon.ico',
        inject: 'body',
    };

    const plugin = [
        new MiniCssExtractPlugin({
            filename: plugins.cssExtractPlugin.filename,
            chunkFilename: plugins.cssExtractPlugin.chunkFilename,
        }),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'index.html')),
        }),
    ];

    if (envMode) {
        htmlWebpackPluginSettings.hash = true;
        plugin.push(new webpack.HotModuleReplacementPlugin());
        plugin.push(new HtmlWebpackPlugin(htmlWebpackPluginSettings));
    } else {
        htmlWebpackPluginSettings.minify = {
            removeComments: true,
            collapseWhitespace: true,
            removeEmptyAttributes: true,
        };

        plugin.push(new webpack.optimize.SideEffectsFlagPlugin());
        plugin.push(new HtmlWebpackPlugin(htmlWebpackPluginSettings));
        plugin.push(new webpack.HashedModuleIdsPlugin());
    }

    return plugin;
};

module.exports = pluginsConfig;
