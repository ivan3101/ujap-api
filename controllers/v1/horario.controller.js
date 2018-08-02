const Horario = require('../../models/v1/horario.model');
const Notas = require('../../models/v1/notas.model');

module.exports.addHorario = async (req, res) => {
  const id = req.params.id;
  const periodo = req.query.periodo || '20181CR';
  const horario = Horario({
    estudiante: id,
    periodo,
    ...req.body
  });
  await horario.save();
  for (let materia of req.body.materias) {
    const nota = await Notas.findOne({
      materia: materia.materia,
      seccion: materia.seccion
    });
    if (!!nota) {
      nota.estudiantes = [...nota.estudiantes, {
        estudiante: id,
        notas: []
      }];
      await nota.save();
    } else {
      const newNota = await Notas({
        profesor: materia.profesor,
        materia: materia.materia,
        seccion: materia.seccion,
        estudiantes: [{
          estudiante: id,
          notas: ['', '', '', '', '']
        }]
      });
      await newNota.save();
    }
  }
  res
    .status(201)
    .json({
      status: 'Exito',
      message: 'Horario creado'
    })
};

module.exports.modifyHorario = async (req, res) => {
  const id = req.params.id;
  const periodo = req.query.periodo || '20181CR';
  const tipo = req.query.tipo;
  await Horario.findOneAndUpdate({
    estudiante: id,
    periodo
  }, {
    materias: req.body.materias,
    modificado: tipo === 'acr',
    retiroAdm: tipo === 'retiro'
  });
  res
    .status(204)
    .json()
};

module.exports.getHorarioByStudent = async (req, res) => {
  const id = req.params.id;
  const periodo = req.query.periodo || '20181CR';
  const horario = await Horario
    .findOne({
      estudiante: id,
      periodo
    })
    .populate('materias.materia')
    .populate('materias.profesor');
  res
    .status(200)
    .json(horario);
};