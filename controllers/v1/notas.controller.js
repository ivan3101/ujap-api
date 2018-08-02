const Notas = require('../../models/v1/notas.model');
const objectId = require('mongoose').Types.ObjectId;

module.exports.getNotas = async (req, res) => {
  const profesor = objectId(req.params.profesor);
  const materia = objectId(req.params.materia);
  const seccion = req.query.seccion;

  const notas = await Notas.findOne({
    profesor,
    materia,
    seccion
  }).populate('estudiantes.estudiante') ;

  res
    .status(200)
    .json(notas);
};

module.exports.CargarNotas = async (req, res) => {
  const profesor = objectId(req.params.profesor);
  const materia = objectId(req.params.materia);
  const seccion = req.query.seccion;
  const estudiantes = req.body.notas;
  for (let estudiante of estudiantes) {
    estudiante.estudiante = estudiante.estudiante._id;
  }
  await Notas.findOneAndUpdate({
      profesor,
      materia,
      seccion
  }, {
    estudiantes
  });
  res
    .status(203)
    .json()
};