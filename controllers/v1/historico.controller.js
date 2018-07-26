const Historico = require('../../models/v1/historico.model');

module.exports.addHistorico = async (req, res) => {
  const id = req.params.id;
  const historico = Historico({
    estudiante: id,
    ...req.body
  });
  await historico.save();
  res
    .status(201)
    .json({
      status: 'Exito',
      message: 'Historico creado'
    })
};

module.exports.getHistorico = async (req, res) => {
  const id = req.params.id;
  const historico = await Historico.find({
    estudiante: id
  });
  res
    .status(200)
    .json(historico)
};