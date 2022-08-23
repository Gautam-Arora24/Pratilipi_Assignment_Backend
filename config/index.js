const dotEnv  = require('dotenv');

dotEnv.config();

module.exports = {
  PORT: process.env.PORT,
};

