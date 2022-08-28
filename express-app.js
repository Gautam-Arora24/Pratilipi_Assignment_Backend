const cors = require('cors');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = async (app) => {

  app.use('/content', createProxyMiddleware({ target: 'http://localhost:3001/', changeOrigin: true }));
  app.use('/user', createProxyMiddleware({ target: 'http://localhost:3002/', changeOrigin: true }));
  app.use(bodyParser.json());
  app.use(cors());

};
