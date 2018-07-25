const mongoose = require('mongoose');

const HorarioSchema = mongoose.Schema({
  profesor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profesor',
    required: [true, 'El ID del profesor es requerido']
  },
  carrera: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Carrera',
  },
  bloque: [{
    dia: {
      type: String,
      required: [true, 'El dia es requerido'],
      enum: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
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
});

const MateriaSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  uc: {
    type: String,
    required: [true, 'La UC es requerida']
  },
  semestre: {
    type: String,
    required: [true, 'El semestre es requerido'],
    trim: true,
    enum: ['1ro', '2do', '3ro', '4to', '5to', '6to', '7mo', '8vo', '9no', '10mo']
  },
  horario: [HorarioSchema]
});

HorarioSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

MateriaSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Materia', MateriaSchema);