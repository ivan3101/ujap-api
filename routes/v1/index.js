const router = require('express').Router();
const userRoutes = require('./user');
const profesorRoutes = require('./profesor');
const materiaRoutes = require('./materia');
const noticiaRoutes = require('./noticia');

router
  .use('/usuarios', userRoutes)
  .use('/profesores', profesorRoutes)
  .use('/materias', materiaRoutes)
  .use('/noticias', noticiaRoutes)
;

module.exports = router;