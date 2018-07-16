const Historico = require('../../models/v1/historico.model');

module.exports.addHistorico = async (req, res) => {
  const id = req.params.id;
  const historico = Historico({
    estudiante: id,
    materia: req.body.materia
  });
  await historico.save();
  res
    .status(201)
    .json({
      status: 'Exito',
      message: 'Historico creado'
    })
};