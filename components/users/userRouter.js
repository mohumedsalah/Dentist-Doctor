const express = require("express");
const userController = require("./userController");

const middlewareValidation = require("../../middlewares/middlewareValidation");
var multer = require("multer");
const middlewareAuth = require("../../middlewares/middlewareAuth");
const validatedoctorSignUp = require("./validation/validatedoctorSignUp");
const validatepatientSignUp = require("./validation/validatepatientSignUp");
const validateSignIn = require("./validation/validateSignIn");

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
