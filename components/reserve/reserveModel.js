const reserveSchema = require("./reserveSchema");

class ReserveModel {
  static getReserve(query) {
    return reserveSchema.findOne(query).lean();
  }

  static createReserve(document) {
    return reserveSchema.create(document);
  }

  static getAllReservewithInDoctor(doctorId) {
    return reserveSchema
      .find({ doctor: doctorId })
      .sort({ date: -1 })
      .populate("patient")
      .lean();
  }
}

module.exports = ReserveModel;
