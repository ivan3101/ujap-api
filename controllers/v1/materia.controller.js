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

module.exports.getSecciones = async (req, res) => {
  const carrera = objectId(req.query.carrera);
  const materias = await Materia.find({
    carrera
  }).select('horario');

  const secciones = [];

  for (let materia of materias){
    for (let horario of materia.horario) {
      const horarioObj = horario.toObject();
      if (!secciones.includes(horarioObj.seccion)) {
        secciones.push(horarioObj.seccion);
      }
    }
  }

  res
    .status(200)
    .json(secciones);
};

module.exports.getMateriaBySeccion = async (req, res) => {
  const seccion = req.params.seccion;
  const carrera = objectId(req.query.carrera);
  const materias = await Materia
    .find({
      carrera,
      'horario.seccion': seccion
    })
    .select('nombre horario');
  res
    .status(200)
    .json(materias);
};

module.exports.getSeccionesProfesor = async (req, res) => {
  const id = req.params.id;
  const materias = await Materia.find({
    'horario.profesor': objectId(id)
  }).select('horario');

  const secciones = [];
  const ids = [];

  for (let materia of materias){
    for (let horario of materia.horario) {
      const horarioObj = horario.toObject();
      if (!secciones.includes(horarioObj.seccion)) {
        ids.push(materia._id);
        secciones.push(horarioObj.seccion);
      }
    }
  }
console.log({
  ids,
  secciones
});
  res
    .status(200)
    .json({
      ids,
      secciones
    });
};

module.exports.getMateriaBySeccionProfesor = async (req, res) => {
  const seccion = req.params.seccion;
  const profesor = req.params.id;
  const materias = await Materia
    .find({
      'horario.profesor': objectId(profesor),
      'horario.seccion': seccion
    })
    .select('nombre horario');
  res
    .status(200)
    .json(materias);
};
