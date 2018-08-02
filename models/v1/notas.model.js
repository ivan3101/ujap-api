const mongoose = require('mongoose');
const NotasSchema = mongoose.Schema({
  profesor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profesor'
  },
  materia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Materia'
  },
  seccion: String,
  estudiantes: [{
    estudiante: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario'
    },
    notas: []
  }]
}, {
  strict: false
});

module.exports = mongoose.model('Nota', NotasSchema);