const mongoose = require('mongoose');
const PagoSchema = mongoose.Schema({
  estudiante: mongoose.Schema.Types.ObjectId,
  giros: [{
    numero: String,
    cantidad: String,
    pago: Boolean
  }],
  periodo: String
});

module.exports = mongoose.model('Pago', PagoSchema);