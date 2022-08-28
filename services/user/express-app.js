const cors  = require('cors');
const router = require('./route/index');
var bodyParser = require('body-parser');

module.exports = async (app) => {

  // Configurable cors options depending on your needs.
  const corsOptions= {
    origin: 'http://localhost:8080/',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  // Middlewares
  app.use(bodyParser.json());
  app.use(cors(corsOptions));
  app.use('/user', router);
};
