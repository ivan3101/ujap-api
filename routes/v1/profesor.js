const router = require('express').Router();
const profesorController = require('../../controllers/v1/profesor.controller');
const materiaController = require('../../controllers/v1/materia.controller');
const handleAsyncException = require('../../errors/handle_async_exception');
const notasController = require('../../controllers/v1/notas.controller');

router
  .route('/registro')
  .post(handleAsyncException(profesorController.register));

router
  .route('/login')
  .post(handleAsyncException(profesorController.login));

router
  .route('/:id')
  .get(handleAsyncException(profesorController.getProfesorById));

router
  .route('/:id/materias/secciones')
  .get(handleAsyncException(materiaController.getSeccionesProfesor));

router
  .route('/:id/materias/secciones/:seccion')
  .get(handleAsyncException(materiaController.getMateriaBySeccionProfesor));

router
  .route('/:profesor/notas/:materia')
  .get(handleAsyncException(notasController.getNotas))
  .patch(handleAsyncException(notasController.CargarNotas));

module.exports = router;