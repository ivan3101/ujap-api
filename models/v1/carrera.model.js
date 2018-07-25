const mongoose = require('mongoose');
const CarreraSchema = mongoose.Schema({
  nombre: String,
  ucTotales: String
});

module.exports = mongoose.model('Carrera', CarreraSchema);