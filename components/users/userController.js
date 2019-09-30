const util = require("util");
const userService = require("./userService");

exports.addDoctor = async (req, res) => {
  //console.log(util.inspect(req, true, 3));
  const { error, result } = await userService.addingUser({
    ...req.body,
    userType: "doctor"
  });
  if (!error) {
    console.log(result);
    return res.status(200).json({ result, code: 200, error: null });
  }
  return res
    .status(error.statusCode)
    .json({ result: null, code: error.statusCode, error: error.message });
};

exports.addPatient = async (req, res) => {
  const { error, result } = await userService.addingUser({
    ...req.body,
    userType: "patient"
  });
  if (!error) {
    console.log(result);
    return res.status(200).json({ result, code: 200, error: null });
  }
  return res
    .status(error.statusCode)
    .json({ result: null, code: error.statusCode, error: error.message });
};

exports.signIn = async (req, res) => {
  const { error, result } = await userService.signInUser(req.body);
  if (!error) {
    console.log(result);
    return res.status(200).json({ result, code: 200, error: null });
  }
  return res
    .status(error.statusCode)
    .json({ result: null, code: error.statusCode, error: error.message });
};

exports.getDoctorsList = async (req, res) => {
  const { error, result } = await userService.doctorsList(req.body);
  if (!error) {
    console.log(result);
    return res.status(200).json(result);
  }
  return res
    .status(error.statusCode)
    .json({ result: null, code: error.statusCode, error: error.message });
};

exports.getDoctor = async (req, res) => {
  const { error, result } = await userService.oneDoctor(req.params.doctorId);
  if (!error) {
    console.log(result);
    return res.status(200).json({ result, code: 200, error: null });
  }
  return res
    .status(error.statusCode)
    .json({ result: null, code: error.statusCode, error: error.message });
};

exports.addDisease = async (req, res) => {
  const { error, result } = await userService.addDiseaseForPatient(
    req.params.patientId,
    req.body
  );
  if (!error) {
    console.log(result);
    return res.status(200).json({ result, code: 200, error: null });
  }
  return res
    .status(error.statusCode)
    .json({ result: null, code: error.statusCode, error: error.message });
};

// exports.logIn = async (req, res) => {
//   const { error, result } = await userService.logInUser(req.body);
//   if (!error) {
//     return res.status(200).json(result);
//   }
//   return res.status(error.statusCode).json(error.message);
// };

// exports.addingStatus = async (req, res) => {
//   const { error, result } = await userService.logInUser(req.body);
//   if (!error) {
//     return res.status(200).json(result);
//   }
//   return res.status(error.statusCode).json(error.message);
// };
