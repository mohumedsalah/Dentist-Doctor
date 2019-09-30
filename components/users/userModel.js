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

  static updateUser(userId, query) {
    return UserSchema.updateOne({ _id: userId }, query);
  }
}

module.exports = UserModel;
