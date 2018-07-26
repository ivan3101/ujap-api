const Pago = require('../../models/v1/pagos.model');

module.exports.getPagos = async (req, res) => {
  const estudiante = req.params.id;
  const periodo = req.query.periodo || '20181CR';
  const pago = await Pago.findOne({
    estudiante,
    periodo
  });
  res
    .status(200)
    .json(pago)
};