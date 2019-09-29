const mongoose = require("mongoose");

const { Schema } = mongoose;
const reservationHistory = new Schema(
  {
    doctor: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    patient: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    date: {
      required: true,
      type: Date
    }
  },
  {
    timestamps: true,
    autoIndex: true
  }
);

module.exports = mongoose.model("reservationHistory", reservationHistory);
