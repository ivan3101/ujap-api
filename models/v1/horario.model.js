const mongoose = require('mongoose');
const HorarioSchema = mongoose.Schema({
  estudiante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true, 'El ID del estudiante es requerido']
  },
  periodo: {
    type: String,
    required: [true, 'El periodo es requerido'],
    trim: true
  },
  materias: [{
    materia: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Materia',
      required: [true, 'El ID de la materia es requerido']
    },
    profesor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profesor',
      required: [true, 'El ID del profesor es requerido']
    },
    bloques: [{
      dia: {
        type: String,
        required: [true, 'El dia es requerido'],
        trim: true
      },
      inicio: {
        type: Date,
        required: [true, 'La hora de inicio es requerida']
      },
      fin: {
        type: Date,
        required: [true, 'La hora de finalizacion es requerida']
      }
    }]
  }]
});

HorarioSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Horario', HorarioSchema);