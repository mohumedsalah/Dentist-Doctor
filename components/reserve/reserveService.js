const ReserveModel = require("/reserveModel");

class ReserveService {
  static async madeReservation(doctorId, doument) {
    const error = { message: "error form database", statusCode: 500 };
    try {
    } catch (err) {
      return { error };
    }
  }
}

module.exports = ReserveService;
