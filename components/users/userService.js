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

  //   static async logInUser(document) {
  //     const error = { message: "error form database", statusCode: 500 };
  //     try {
  //       const user = await UserModel.findOne({
  //         phone_number: document.phone_number
  //       });
  //       if (!user) {
  //         return {
  //           error: { message: "This Phone not register", statusCode: 400 }
  //         };
  //       }
  //       const ret = await bcrypt.compare(document.password, user.password);
  //       if (!ret) {
  //         return {
  //           error: {
  //             message: "Phone number of password not correct",
  //             statusCode: 400
  //           }
  //         };
  //       }
  //       const token = jwt.sign(
  //         {
  //           phone_number: document.phone_number,
  //           password: document.password
  //         },
  //         config.get("jwtPrivateKey")
  //       );
  //       return { result: { token } };
  //     } catch (err) {
  //       return { error };
  //     }
  //   }
  //   static async addingStatusToUser(document) {
  //     const error = { message: "error from database", statusCode: 500 };
  //     try {
  //       const user = await UserModel.findOne({
  //         phone_number: document.user.phone_number
  //       });
  //       if (!user) {
  //         return { error: { message: "error from database", statusCode: 500 } };
  //       }
  //       user.status = document.status;
  //       const result = await user.save();
  //       return { result: { status: result.status } };
  //     } catch (err) {
  //       console.log(err);
  //       return { error };
  //     }
  //   }
}

module.exports = UserService;
