const webpackMockServer = require('webpack-mock-server');
const postcssModules = require('postcss-modules');
const AngularCompilerPlugin = require('@ngtools/webpack');

module.exports = (config, options) => {
    const scssRule = config.module.rules.find((x) => x.test.toString().includes('scss'));
    const postcssLoader = scssRule.use.find((x) => x.loader.match(/\w*postcss-loader\w*/));
    //const postcssLoader = scssRule.use.find((x) => x.loader === 'postcss-loader');

    postcssLoader.options.plugins = function () {
        let plugs = postcssLoader.options.plugins.apply(this, arguments);
        plugs.splice(plugs.length - 1, 0, postcssModules({ generateScopedName: '[hash:base64:5]' }));
        return plugs;
    };

    config.devServer = {
        ...config.devServer,
        before: (app) =>
            webpackMockServer.use(app, {
                tsConfigFileName: 'tsconfig.app.json',
            }),
    };

    config.module.rules.unshift({
        test: /\.html$/,
        use: [
            { loader: 'raw-loader' },
            {
                loader: 'posthtml-loader',
                options: {
                    config: {
                        path: './',
                        ctx: {
                            include: { ...options },
                            content: { ...options },
                        },
                    },
                },
            },
        ],
    });

    const index = config.plugins.findIndex((p) => p instanceof AngularCompilerPlugin.AngularCompilerPlugin);
    const oldOptions = config.plugins[index]._options;
    oldOptions.directTemplateLoading = false;
    config.plugins.splice(index);
    config.plugins.push(new AngularCompilerPlugin.AngularCompilerPlugin(oldOptions));

    return config;
};
