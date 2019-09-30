const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
const UserModel = require("./userModel");

class UserService {
  static async findUserWithQuery(query) {
    const find = await UserModel.findOne(query);
    if (find) {
      return true;
    } else {
      return false;
    }
  }
  static async addingUser(document) {
    const error = { message: "error form database", statusCode: 500 };
    try {
      document.password = await bcrypt.hash(document.password, 4);
      const findOne = await UserModel.findUser({
        identityNumber: document.identityNumber
      });
      if (findOne) {
        return {
          error: { message: "this id is register befor ", statusCode: 400 }
        };
      }
      const result = await UserModel.addUser(document);
      const token = jwt.sign(
        {
          identityNumber: result.identityNumber,
          userType: result.userType,
          _id: result._id
        },
        config.get("jwtPrivateKey")
      );
      return {
        result: {
          token,
          userType: result.userType
        }
      };
    } catch (err) {
      return { error };
    }
  }

  static async signInUser(document) {
    const error = { message: "error form database", statusCode: 500 };
    try {
      const user = await UserModel.findUser({
        identityNumber: document.identityNumber
      });
      if (!user) {
        return {
          error: { message: "this id not is register befor ", statusCode: 400 }
        };
      }
      const valid = await bcrypt.compare(document.password, user.password);
      if (!valid) {
        return {
          error: { message: "password or id not correct", statusCode: 400 }
        };
      }
      const token = jwt.sign(
        {
          identityNumber: document.phone_number,
          userType: user.userType,
          _id: user._id
        },
        config.get("jwtPrivateKey")
      );
      return { result: { token, userType: user.userType } };
    } catch (err) {
      return { error };
    }
  }

  static async doctorsList(document) {
    const error = { message: "error form database", statusCode: 500 };
    try {
      const doctors = await UserModel.findUserswithQuery({
        clinic: document.clinic,
        specify: document.specify
      });
      const result = doctors.map(doctor => {
        return {
          id: doctor._id,
          fullName: doctor.fullName,
          imageUrl: config.get("host") + doctor.image,
          workingTime: doctor.workingTime
        };
      });
      return { result };
    } catch (err) {
      return { error };
    }
  }

  static async oneDoctor(doctorId) {
    const error = { message: "error form database", statusCode: 500 };
    try {
      const doctor = await UserModel.findUser({
        _id: mongoose.Types.ObjectId(doctorId)
      });
      const result = {
        id: doctor._id,
        fullName: doctor.fullName,
        imageUrl: config.get("host") + doctor.image,
        cost: doctor.cost,
        workingTime: doctor.workingTime
      };
      return { result };
    } catch (err) {
      return { error };
    }
  }

  static async addDiseaseForPatient(patientId, disease) {
    const error = { message: "server internal error", statusCode: 500 };
    try {
      await UserModel.updateUser(patientId, {
        $push: { patientHistory: disease }
      });
      return { result: "add disease success" };
    } catch (err) {
      return { error };
    }
  }
}

module.exports = UserService;
