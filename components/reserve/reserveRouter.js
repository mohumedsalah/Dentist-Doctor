const express = require("express");
const reserveController = require("./reserveController");

const middlewareValidation = require("../../middlewares/middlewareValidation");
const middlewareAuth = require("../../middlewares/middlewareAuth");

const validatereserveRequest = require("./validation/validatereserveRequest");
const validateGetDoctorRequest = require("../users/validation/validateGetDoctorRequest");

const router = express.Router();

router.post(
  "/reserve-doctor/:doctorId",
  [
    middlewareAuth,
    middlewareValidation(validatereserveRequest),
    middlewareValidation(validateGetDoctorRequest)
  ],
  reserveController.postReservation
);

module.exports = { router };
