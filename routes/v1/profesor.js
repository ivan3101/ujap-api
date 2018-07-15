const router = require('express').Router();
const profesorController = require('../../controllers/v1/profesor.controller');
const handleAsyncException = require('../../errors/handle_async_exception');

router
  .route('/registro')
  .post(handleAsyncException(profesorController.register));

router
  .route('/login')
  .post(handleAsyncException(profesorController.login));

router
  .route('/:id')
  .get(handleAsyncException(profesorController.getProfesorById));

module.exports = router;