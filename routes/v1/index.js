const router = require('express').Router();
const userRoutes = require('./user');

router
  .use('/usuarios', userRoutes);

module.exports = router;