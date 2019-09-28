// const mongoose = require('mongoose');
const UserSchema = require("./userSchema");

//const { ObjectId } = mongoose.Types;

class UserModel {
  static addUser(document) {
    return UserSchema.create(document);
  }

  static findUser(document) {
    return UserSchema.findOne(document).lean();
  }

  static findUserswithQuery(query) {
    return UserSchema.find(query).lean();
  }
}

module.exports = UserModel;
