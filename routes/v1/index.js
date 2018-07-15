const router = require('express').Router();
const userRoutes = require('./user');
const profesorRoutes = require('./profesor');

router
  .use('/usuarios', userRoutes)
  .use('/profesores', profesorRoutes)
;

module.exports = router;