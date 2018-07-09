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

module.exports = mongoose.model('User', UserSchema);