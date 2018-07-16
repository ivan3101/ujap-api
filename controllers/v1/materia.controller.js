const Materia = require('../../models/v1/materia.model');

module.exports.addMateria = async (req, res) => {
  const materia = Materia(req.body);
  await materia.save();
  res
    .status(201)
    .json({
      status: 'Exito',
      message: 'Materia creada'
    })
};