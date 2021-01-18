const webpackMockServer = require('webpack-mock-server');

module.exports = {
    devServer: {
        before: webpackMockServer.use,
    },
};
