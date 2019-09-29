const moment = require("moment");
const _ = require("lodash");
const ReserveModel = require("./reserveModel");
const userModel = require("../users/userModel");

class ReserveService {
  static async madeReservation(doctorId, patientId, document) {
    const error = { message: "error form database", statusCode: 500 };
    try {
      const dayName = moment(document.date, "YYYY-MM-DD HH:mm")
        .format("ddd")
        .toLowerCase();
      const hour = parseInt(
        moment(document.date, "YYYY-MM-DD HH:mm").format("HH"),
        10
      );
      const doctor = await userModel.findUser({ _id: doctorId });
      const indexOfDay = _.findIndex(doctor.workingTime, el => {
        return el.day === dayName;
      });
      if (
        indexOfDay === -1 ||
        doctor.workingTime[indexOfDay].from > hour ||
        hour > doctor.workingTime[indexOfDay].to
      ) {
        return {
          error: {
            message: "this time not in doctor timing work",
            statusCode: 404
          }
        };
      }
      const patientReseration = await ReserveModel.getReserve({
        patient: patientId,
        data: {
          $gte: moment().toDate()
        }
      });
      // need to adding logic of future date
      if (patientReseration) {
        return {
          error: {
            message: "you have reservation not comming yet",
            statusCode: 404
          }
        };
      }
      const reserve = await ReserveModel.getReserve({
        doctor: doctorId,
        date: {
          $lte: moment(document.date, "YYYY-MM-DD HH:mm").toDate(),
          $gte: moment(document.date, "YYYY-MM-DD HH:mm").toDate()
        }
      });
      if (reserve) {
        return {
          error: {
            message: "this time is taken already",
            statusCode: 404
          }
        };
      }
      await ReserveModel.createReserve({
        doctor: doctorId,
        patient: patientId,
        date: moment(document.date, "YYYY-MM-DD HH:mm").toDate()
      });
      return { result: "your reservation is done success" };
      // find the timing in data base if found return resrved time else reserve success
    } catch (err) {
      return { error };
    }
  }
}

module.exports = ReserveService;
