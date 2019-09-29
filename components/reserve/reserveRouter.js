const express = require("express");
const reserveController = require("./reserveController");

const middlewareValidation = require("../../middlewares/middlewareValidation");
const middlewareAuth = require("../../middlewares/middlewareAuth");

const validatereserveRequest = require("./validation/validatereserveRequest");

const router = express.Router();

router.post(
  "/doctor/:doctorId",
  [middlewareAuth, middlewareValidation(validatereserveRequest)],
  reserveController.postReservation
);

router.get(
  "/doctor-patients",
  middlewareAuth,
  reserveController.getDoctorPatients
);

module.exports = { router };
