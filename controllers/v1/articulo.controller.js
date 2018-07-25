const Articulo = require('../../models/v1/articulo.model');
const boom = require('boom');

module.exports.addArticulo = async (req, res) => {
  const estudiante = req.params.id;
  const art = req.query.art;
  const articulo = await Articulo({
    ...req.body,
    estudiante,
    articulo: art
  });
  await articulo.save();
  res
    .status(201)
    .json({
      status: 'Successful',
      message: 'Peticion realizada con exito'
    })
};

module.exports.getArticulo = async (req, res) => {
  const estudiante = req.params.id;
  const artNumber = req.query.art;
  if (!artNumber) {
    boom.badRequest('Debe pasar el numero de articulo como parametro en la url');
  } else {
    const articulo = await Articulo.findOne({
      estudiante,
      articulo: artNumber,
      estado: 'En Proceso'
    });
    res
      .status(200)
      .json(articulo);
  }
};