const boom = require('boom');
const bluebird = require('bluebird');
const argon2 = require('argon2');
const mongoose = require('mongoose');
const ProfesorSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'El nombre de usuario es requerido'],
    trim: true
  },
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es requerido'],
    trim: true
  },
  cedula: {
    type: String,
    required: [true, 'La cedula es requerida'],
    trim: true
  },
  hashedPassword: String,
  email: {
    type: String,
    required: [true, 'El email requerido'],
    trim: true
  }
});

ProfesorSchema.methods.encryptPassword = function(password) {
  return argon2.hash(password, {
    type: argon2.argon2id
  });
};

ProfesorSchema.methods.checkPassword = function(password) {
  if (!password) throw boom.unauthorized('Nombre de usuario o contraseña incorrectos');
  return argon2.verify(this.hashedPassword, password);
};

ProfesorSchema.pre('save', function(next) {
  const email = this.constructor.findOne({
    'email': this.email
  });
  const username = this.constructor.findOne({
    'username': this.username
  });
  bluebird.all([email, username]).then(values => {
    if (values[0]) return next(boom.conflict('Ya esta registrado un usuario con ese correo electronico'));
    if (values[1]) return next(boom.conflict('Ya esta registrado un usuario con ese nombre de usuario'));
    return next();
  });
});

ProfesorSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.hashedPassword;
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Profesor', ProfesorSchema);