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
      .find({ doctorId })
      .populate("patient")
      .lear();
  }
}

module.exports = ReserveModel;
