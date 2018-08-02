const mongoose = require('mongoose');
const PapelSchema = mongoose.Schema({
  estudiante: mongoose.Schema.Types.ObjectId,
  nombre: String,
  estado: {
    type: String,
    default: 'No entregado'
  }
});

module.exports = mongoose.model('Papel', PapelSchema, 'papeles');