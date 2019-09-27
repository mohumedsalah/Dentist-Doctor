const mongoose = require("mongoose");
const constant = require("./constant");

const { Schema } = mongoose;
const user = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 200
    },
    identityNumber: {
      type: String,
      required: true,
      unique: true,
      minlength: 12,
      maxlength: 12
    },
    password: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      min: 1,
      max: 200
    },
    patientHistory: {
      type: [
        {
          disease: String,
          date: String
        }
      ]
    },
    phone: {
      type: String,
      min: 10,
      max: 15
    },
    cost: {
      type: Number,
      min: 50,
      max: 10000
    },
    image: String,
    specify: { type: String, enum: constant.specifications },
    clinic: { type: String, enum: constant.clinics },
    userType: {
      type: String,
      enum: constant.userType
    },
    workingTime: [
      {
        day: { type: String, enum: constant.dayOfWeek },
        from: { type: Number, min: 0, max: 24 },
        to: { type: Number, min: 0, max: 24 }
      }
    ]
  },
  {
    timestamps: true,
    autoIndex: true
  }
);

module.exports = mongoose.model("user", user);
