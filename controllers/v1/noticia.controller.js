const Noticia = require('../../models/v1/noticia.model');

module.exports.addNoticia = async (req, res) => {
  const noticia = Noticia(req.body);
  await noticia.save();
  res
    .status(201)
    .json({
      status: 'Exito',
      message: 'Noticia creada'
    });
};