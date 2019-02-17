const proxy = require('http-proxy-middleware');

module.exports = function (app) {

  const onProxyRes = function (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  };

  const optionsAllegroAuth = {
    target: 'https://allegro.pl',
    changeOrigin: true,
    onProxyRes: onProxyRes
  };

  const optionsAllegroApi = {
    target: 'https://api.allegro.pl',
    changeOrigin: true,
    onProxyRes: onProxyRes,
    pathRewrite: {'^/api': ''}
  };

  app.use([
    proxy('/auth', optionsAllegroAuth),
    proxy('/api', optionsAllegroApi)
  ]);
};
