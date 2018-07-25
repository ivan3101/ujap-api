const User = require('../../models/v1/user.model');
const boom = require('boom');
const JwtSign = require('jsonwebtoken').sign;
const {secret} = require('../../config');
const Carrera = require('../../models/v1/carrera.model')

module.exports.register = async (req, res) => {
  const user = User(req.body);
  user.hashedPassword = await user.encryptPassword(req.body.password);
  await user.save();
  res
    .status(201)
    .json({
      status: 'Exito',
      message: 'Usuario creado'
    });
};

module.exports.login = async (req, res) => {
  const user = await User.findOne({
    'username': req.body.username
  }).populate('carrera');
  if (!user) throw boom.unauthorized('Nombre de usuario o contraseña incorrectos');
  if (await user.checkPassword(req.body.password)) {
    const token = await JwtSign(user.toJSON(), secret, {'expiresIn': '24h'});
    if (token) {
      return res
        .status(200)
        .json({
          'usuario': user,
          'token': token,
          'tipo': 'estudiante'
        })
    }
  } else {
    throw boom.unauthorized('Nombre de usuario o contraseña incorrectos');
  }
};

module.exports.getUserById = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (user) {
    res
      .status(200)
      .json(user)
  } else {
    throw boom.notFound('Usuario no encontrado')
  }
};