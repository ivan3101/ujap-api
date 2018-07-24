const argon2 = require('argon2');
const boom = require('boom');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const UserSchema = mongoose.Schema({
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
  },
  carrera: {
    type: String,
    required: [true, 'La carrera es requerida'],
    trim: true
  },
  semestre: {
    type: String,
    required: [true, 'El semestre es requerido'],
    trim: true,
    enum: ['1ro', '2do', '3ro', '4to', '5to', '6to', '7mo', '8vo', '9no', '10mo']
  },
  promedio: {
    type: String,
    default: '0',
    trim: true
  },
  uc: {
    type: String,
    default: '0',
    trim: true
  },
  estado: {
    type: String,
    default: 'Activo',
    enum: ['Activo', 'No activo'],
    trim: true
  },
  beca: {
    type: String,
    default: 'Sin Beca',
    enum: ['Sin Beca', '50%', '75%', '100%'],
    trim: true
  },
  cohorte: {
    type: String,
    required: [true, 'El cohorte es requerido'],
    trim: true
  }
});

UserSchema.methods.encryptPassword = function(password) {
  return argon2.hash(password, {
    type: argon2.argon2id
  });
};

UserSchema.methods.checkPassword = function(password) {
  if (!password) throw boom.unauthorized('Nombre de usuario o contraseña incorrectos');
  return argon2.verify(this.hashedPassword, password);
};

UserSchema.pre('save', function(next) {
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

UserSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.hashedPassword;
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Usuario', UserSchema);