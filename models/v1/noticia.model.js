const mongoose = require('mongoose');
const NoticiaSchema = mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El titulo es requerido'],
    trim: true
  },
  cuerpo: {
    type: String,
    required: [true, 'El cuerpo es requerido'],
    trim: true
  },
  fecha: {
    type: Date,
    default: Date()
  }
});

NoticiaSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Noticia', NoticiaSchema);