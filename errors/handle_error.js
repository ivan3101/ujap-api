module.exports = (err, req, res, next) => {
  if (res.headersSent) return next(err);
  res
    .status(err.output.statusCode)
    .json({
      "error": err.output.payload.error,
      "message": err.output.payload.message
    });
};