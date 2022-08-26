const dotEnv  = require('dotenv');


dotEnv.config();

module.exports = {

  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
  USER_SERVICE: process.env.USER_SERVICE,
};

