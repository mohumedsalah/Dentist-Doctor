const userService = require("./userService");

exports.addDoctor = async (req, res) => {
  const { error, result } = await userService.addingUser({
    ...req.body,
    userType: "doctor"
  });
  if (!error) {
    console.log(result);
    return res.status(200).json(result);
  }
  return res.status(error.statusCode).json(error.message);
};

exports.addPatient = async (req, res) => {
  const { error, result } = await userService.addingUser({
    ...req.body,
    userType: "patient"
  });
  if (!error) {
    console.log(result);
    return res.status(200).json(result);
  }
  return res.status(error.statusCode).json(error.message);
};

exports.signIn = async (req, res) => {
  const { error, result } = await userService.signInUser(req.body);
  if (!error) {
    console.log(result);
    return res.status(200).json(result);
  }
  return res.status(error.statusCode).json(error.message);
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
