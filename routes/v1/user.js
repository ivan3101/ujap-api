const router = require('express').Router();
const userController = require('../../controllers/v1/user.controller');
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

module.exports = router;