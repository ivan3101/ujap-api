const router = require('express').Router();
const noticiaController = require('../../controllers/v1/noticia.controller');
const handleAsyncError = require('../../errors/handle_async_exception');

router
  .route('/')
  .get(handleAsyncError(noticiaController.getLastNoticias))
  .post(handleAsyncError(noticiaController.addNoticia));


module.exports = router;