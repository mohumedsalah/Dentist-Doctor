const mongoose = require("mongoose");
const constant = require("./constant");

const { Schema } = mongoose;
const reservationHistory = new Schema(
  {},
  {
    timestamps: true,
    autoIndex: true
  }
);

module.exports = mongoose.model("reservationHistory", reservationHistory);
