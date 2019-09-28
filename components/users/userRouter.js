const express = require("express");
const userController = require("./userController");

const middlewareValidation = require("../../middlewares/middlewareValidation");
var multer = require("multer");
const middlewareAuth = require("../../middlewares/middlewareAuth");
const validatedoctorSignUp = require("./validation/validatedoctorSignUp");
const validatepatientSignUp = require("./validation/validatepatientSignUp");
const validateSignIn = require("./validation/validateSignIn");
const validateListDocktorRequest = require("./validation/validateListDocktorRequest");
const validateGetDoctorRequest = require("./validation/validateGetDoctorRequest");

var upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post(
  "/register-doctor",
  upload.single("image"),
  middlewareValidation(validatedoctorSignUp),
  userController.addDoctor
);

router.post(
  "/register-patient",
  middlewareValidation(validatepatientSignUp),
  userController.addPatient
);

router.post(
  "/login",
  middlewareValidation(validateSignIn),
  userController.signIn
);

router.get(
  "/doctors",
  [middlewareAuth, middlewareValidation(validateListDocktorRequest)],
  userController.getDoctorsList
);

router.get(
  "/doctor-info/:doctorId",
  [middlewareAuth, middlewareValidation(validateGetDoctorRequest)],
  userController.getDoctor
);

// router.post(
//   '/log-in',
//   middlewareValidation(validateLoginRequest),
//   userController.logIn
// );

// router.post(
//   '/adding-status',
//   [middlewareValidation(validationOfAddingStatus), middlewareAuth],
//   userController.addingStatus
// );

module.exports = { router };
