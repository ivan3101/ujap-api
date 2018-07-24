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

module.exports.getLastNoticias = async (req, res) => {
  const limit = 8;
  const noticias = await Noticia.find().limit(limit).sort('-fecha');
  res
    .status(200)
    .json(noticias);
};