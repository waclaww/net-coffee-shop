const { createProxyMiddleware } = require('http-proxy-middleware');

const API_URL = 'http://localhost:3000'

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:3000',
            changeOrigin: true,
        })
    );
};
