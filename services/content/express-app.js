const bodyParser = require('body-parser');
const cors  = require('cors');
const router = require('./route/index');

module.exports = async (app) => {

  // Configurable cors options depending on your needs.
  const corsOptions= {
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

  // Middlewares
  app.use(bodyParser.json());
  app.use(cors(corsOptions));
  app.use('/content', router);
};
