const express = require('express');
const expressApp = require('./express-app');
const { databaseConnection } = require('./database/index');
const { PORT } = require('./config');

const StartServer = async () => {

  const app = express();

  await databaseConnection();
  await expressApp(app);

  app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
  })
    .on('error', (err) => {
      console.log(err);
      process.exit();
    });
};

StartServer();
