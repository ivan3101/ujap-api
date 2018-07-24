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

module.exports.getHorarioByStudent = async (req, res) => {
  const id = req.params.id;
  const horario = await Horario
    .findOne({
      estudiante: id,
      periodo: '20181CR'
    })
    .populate('materias.materia')
    .populate('materias.profesor');
  res
    .status(200)
    .json(horario);
};