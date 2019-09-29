const reserveService = require("./reserveService");

exports.postReservation = async (req, res) => {
  const { error, result } = await reserveService.madeReservation(
    req.params.doctorId,
    req.user._id,
    req.body
  );
  if (!error) {
    console.log(result);
    return res.status(200).json({ result, error: null, code: 200 });
  }
  return res
    .status(error.statusCode)
    .json({ error: error.message, code: error.statusCode, result: null });
};
