const reserveService = require("./reserveService");

exports.postReservation = async (req, res) => {
  const { error, result } = await reserveService.madeReservation(
    req.params.doctorId,
    req.body
  );
  if (!error) {
    console.log(result);
    return res.status(200).json(result);
  }
  return res.status(error.statusCode).json(error.message);
};
