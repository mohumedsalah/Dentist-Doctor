const mongoose = require("mongoose");
const constant = require("./constant");

const { Schema } = mongoose;
const reservationHistory = new Schema(
  {
    doctorId: {
      type: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      required: true
    },
    patientId: {
      type: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      required: true
    },
    data: {
      type: Date
    }
  },
  {
    timestamps: true,
    autoIndex: true
  }
);

module.exports = mongoose.model("reservationHistory", reservationHistory);
