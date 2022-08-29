const cors = require('cors');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = async (app) => {

  // Configurable cors options depending on your needs.
  const corsOptions= {
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

  // Some Cors Related Stuff.
  app.use(cors(corsOptions));
  app.use('/content', createProxyMiddleware({ target: 'http://localhost:3001/' }));
  app.use('/user', createProxyMiddleware({ target: 'http://localhost:3002/'  }));
  app.use(bodyParser.json());

};
