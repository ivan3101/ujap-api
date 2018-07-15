const Profesor = require('../../models/v1/profesor.model');
const boom = require('boom');
const JwtSign = require('jsonwebtoken').sign;
const {secret} = require('../../config');

module.exports.register = async (req, res) => {
  const profesor = Profesor(req.body);
  profesor.hashedPassword = await profesor.encryptPassword(req.body.password);
  await profesor.save();
  res
    .status(201)
    .json({
      status: 'Successful',
      message: 'Profesor creado'
    });
};

module.exports.login = async (req, res) => {
  const profesor = await Profesor.findOne({
    'username': req.body.username
  });
  if (!profesor) throw boom.unauthorized('Nombre de usuario o contraseña incorrectos');
  if (await profesor.checkPassword(req.body.password)) {
    const token = await JwtSign(profesor.toJSON(), secret, {'expiresIn': '24h'});
    if (token) {
      return res
        .status(200)
        .json({
          'profesor': profesor,
          'token': token
        })
    }
  } else {
    throw boom.unauthorized('Nombre de usuario o contraseña incorrectos');
  }
};

module.exports.getProfesorById = async (req, res) => {
  const id = req.params.id;
  const profesor = await Profesor.findById(id);
  if (profesor) {
    res
      .status(200)
      .json(profesor)
  } else {
    throw boom.notFound('Profesor no encontrado')
  }
};