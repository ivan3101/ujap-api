const bluebird = require('bluebird');
const mongoose = require('mongoose');
const {mongoURI, dbUser, dbPassword} = require('./');

mongoose.connect(`mongodb://${dbUser}:${dbPassword}@${mongoURI}`, {
  promiseLibrary: bluebird
}).catch(err => console.log('No se pudo establecer conexión con MongoDB.', err));
mongoose.connection
  .on('connecting', () => console.log('Conectando a la base de datos...'))
  .on('connected', () => console.log('Conexión establecida con la base de datos'))
  .on('disconnecting', () => console.log('Desconectando de la base de datos...'))
  .on('disconnected', () => console.log('Desconectado de la base de datos'));

process
  .on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Conexión a la base de datos cerrada (SIGINT)');
      process.exit(0);
    })
  })
  .on('SIGTERM', () => {
    mongoose.connection.close(() => {
      console.log('Conexión a la base de datos cerrada (SIGTERM)');
      process.exit(0);
    })
  })
  .once('SIGUSR2', () => {
    mongoose.connection.close(() => {
      console.log('Conexión a la base de datos cerrada (SIGUSR2)');
      process.kill(process.pid, 'SIGUSR2');
    })
  });
