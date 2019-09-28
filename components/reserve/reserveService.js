const moment = require("moment");
const _ = require("lodash");
const ReserveModel = require("/reserveModel");
const userModel = require("../users/userModel");

class ReserveService {
  static async madeReservation(doctorId, doument) {
    const error = { message: "error form database", statusCode: 500 };
    try {
      const dayName = moment(obj.date, "YYYY-MM-DD HH:mm")
        .format("ddd")
        .toLowerCase();
      const hour = parseInt(dt.format("HH"), 10);
      const doctor = await userModel.findUser({ _id: doctorId });
      const indexOfDay = _.findIndex(doctor.workingTime, el => {
        return el.day === dayName;
      });
      if (
        indexOfDay === -1 ||
        doctor.workingTime[indexOfDay].from > hour ||
        hour < doctor.workingTime[indexOfDay].to
      ) {
        return {
          error: {
            message: "this time not in doctor timing work",
            statusCode: 404
          }
        };
      }
      // find the timing in data base if found return resrved time else reserve success
    } catch (err) {
      return { error };
    }
  }
}

module.exports = ReserveService;
