const express = require('express');
const expressApp = require('./express-app');
const app = express();
const { createServer } = require('http');
const { Server } = require('socket.io');
const { databaseConnection } = require('./database/index');


const { PORT } = require('./config');

const StartServer = async () => {

  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  await databaseConnection();
  await expressApp(app, io);


  io.on('connection', function() {
    console.log('Successfully made a socket connection 🚀');
  });

  httpServer.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
  })
    .on('error', (err) => {
      console.log(err);
      process.exit();
    });
};

StartServer();
