const moment = require("moment");
const _ = require("lodash");
const ReserveModel = require("./reserveModel");
const userModel = require("../users/userModel");

class ReserveService {
  static async madeReservation(doctorId, patientId, document) {
    const error = { message: "error form database", statusCode: 500 };
    try {
      const dt = moment(document.date, "YYYY-MM-DD HH:mm");
      if (dt.diff(moment()) < 0) {
        return {
          error: {
            message: "this is not comming data",
            statusCode: 404
          }
        };
      }
      const dayName = dt.format("ddd").toLowerCase();
      const hour = parseInt(dt.format("HH"), 10);
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
          $lte: dt.toDate(),
          $gte: dt.toDate()
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
        date: dt.toDate()
      });
      return { result: "your reservation is done success" };
      // find the timing in data base if found return resrved time else reserve success
    } catch (err) {
      return { error };
    }
  }

  static async doctorPatients(doctorId) {
    const error = { message: "error from database", statusCode: 500 };
    try {
      const patients = await ReserveModel.getAllReservewithInDoctor(doctorId);
      console.log(patients);
      const result = patients.map(p => {
        return {
          reservationId: p._id,
          PaientId: p.patient._id,
          fullName: p.patient.fullName,
          patientHistory: p.patient.patientHistory,
          age: p.patient.age,
          day: moment(p.date).format("ddd"),
          hour: moment(p.date).format("HH"),
          date: moment(p.date).format("MMMM Do YYYY, h:mm:ss a")
        };
      });
      return { result };
    } catch (err) {
      console.log(err);
      return { error };
    }
  }
}

module.exports = ReserveService;
