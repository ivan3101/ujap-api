const router = require('express').Router();
const materiaController = require('../../controllers/v1/materia.controller');
const handleAsyncError = require('../../errors/handle_async_exception');

router
  .route('/')
  .post(handleAsyncError(materiaController.addMateria));

router
  .route('/secciones')
  .get(handleAsyncError(materiaController.getSecciones));

router
  .route('/secciones/:seccion')
  .get(handleAsyncError(materiaController.getMateriaBySeccion));

module.exports = router;