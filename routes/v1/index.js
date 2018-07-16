const router = require('express').Router();
const userRoutes = require('./user');
const profesorRoutes = require('./profesor');
const materiaRoutes = require('./materia');

router
  .use('/usuarios', userRoutes)
  .use('/profesores', profesorRoutes)
  .use('/materias', materiaRoutes)
;

module.exports = router;