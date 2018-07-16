const router = require('express').Router();
const materiaController = require('../../controllers/v1/materia.controller');
const handleAsyncError = require('../../errors/handle_async_exception');

router
  .route('/')
  .post(handleAsyncError(materiaController.addMateria));

module.exports = router;