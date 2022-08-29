const cors  = require('cors');
const router = require('./route/index');
var bodyParser = require('body-parser');

module.exports = async (app, io) => {

  // Configurable cors options depending on your needs.
  const corsOptions= {
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  // Middlewares
  app.use(bodyParser.json());
  app.use(cors(corsOptions));
  app.use((req, res, next)=>{
    req.io =io;
    next();
  });
  app.use('/user', router);
};
