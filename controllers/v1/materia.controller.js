const Materia = require('../../models/v1/materia.model');
const objectId = require('mongoose').Types.ObjectId;

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

module.exports.getMateriasDisponibles = async (req, res) => {
  const semestre = req.query.semestre;
  const carrera = req.query.carrera;
  const materias = await Materia
    .find({
      semestre,
      carrera: objectId(carrera)
    })
    .populate('horario.profesor');
  res
    .status(200)
    .json(materias);
};