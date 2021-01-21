import webpackMockServer from 'webpack-mock-server';

export default webpackMockServer.add((app, helper) => {
    app.get('/health-check', (req, res) => {
        res.json('health');
    });
});
