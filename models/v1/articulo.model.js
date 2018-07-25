const mongoose = require('mongoose');
const ArtSchema = mongoose.Schema({
  estudiante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true, 'El ID del estudiante es requerido']
  },
  estado: {
    type: String,
    default: 'En Proceso',
    enum: ['En Proceso', 'Finalizada']
  },
  articulo: {
    type: String,
    required: [true, 'El articulo es requerido']
  },
  fecha: {
    type: Date,
    default: Date()
  }
}, {strict: false});

ArtSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Articulo', ArtSchema);