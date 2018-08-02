const Papel = require('../../models/v1/papeles.model');
const objectId = require('mongoose').Types.ObjectId;

module.exports.getPapelesByStudent = async (req, res) => {
  const id = objectId(req.params.id);
  const papeles = await Papel.find({
    estudiante: id
  });
  res
    .status(200)
    .json(papeles);
};