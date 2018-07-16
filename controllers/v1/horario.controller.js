const Horario = require('../../models/v1/horario.model');

module.exports.addHorario = async (req, res) => {
  const id = req.params.id;
  const horario = Horario({
    estudiante: id,
    ...req.body
  });
  await horario.save();
  res
    .status(201)
    .json({
      status: 'Exito',
      message: 'Horario creado'
    })
};