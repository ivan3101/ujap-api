const router = require('express').Router();
const userController = require('../../controllers/v1/user.controller');
const historicoController = require('../../controllers/v1/historico.controller');
const articuloController = require('../../controllers/v1/articulo.controller');
const horarioController = require('../../controllers/v1/horario.controller');
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

router
  .route('/:id/horario')
  .get(handleAsyncException(horarioController.getHorarioByStudent))
  .post(handleAsyncException(horarioController.addHorario));

router
  .route('/:id/articulo')
  .get(handleAsyncException(articuloController.getArticulo))
  .post(handleAsyncException(articuloController.addArticulo));

module.exports = router;