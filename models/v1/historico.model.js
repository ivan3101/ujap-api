const mongoose = require('mongoose');
const HistoricoSchema = mongoose.Schema({
  estudiante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true, 'El id del estudiante es requerido']
  },
  materia: [{
    nombre: {
      type: String,
      required: [true, 'El nombre de la materia es requerido'],
      trim: true
    },
    nota: {
      type: String,
      required: [true, 'La nota es requerida']
    }
  }]
});

HistoricoSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Historico', HistoricoSchema);