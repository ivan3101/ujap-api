const router = require('express').Router();
const userController = require('../../controllers/v1/user.controller');
const historicoController = require('../../controllers/v1/historico.controller');
const handleAsyncException = require('../../errors/handle_async_exception');

router
  .route('/registro')
  .post(handleAsyncException(userController.register));

router
  .route('/login')
  .post(handleAsyncException(userController.login));

router
  .route('/:id')
  .get(handleAsyncException(userController.getUserById));

router
  .route('/:id/historico')
  .post(handleAsyncException(historicoController.addHistorico));

module.exports = router;