const { ValidatorHelper, Builder } = require("validation-helpers");
const _ = require("lodash");
const moment = require("moment");
const constant = require("../../users/constant");

module.exports = req => {
  const obj = req.body;
  const error = {};

  const scheme = {
    doctorId: {
      value: req.params.doctorId,
      rules: new Builder().required().isMongoObjectId()
    },
    date: {
      value: obj.date,
      rules: new Builder().required().isDate().value
    },
    // "2010/10/20 1:00",
    dayOfDate: {
      value: moment(obj.date, "YYYY-MM-DD HH:mm")
        .format("ddd")
        .toLowerCase(),
      rules: new Builder().required().isMember(constant.dayOfWeek)
    }
  };

  Object.keys(scheme).forEach(key => {
    const ele = scheme[key];
    const { errors, isValid } = ValidatorHelper(ele.value, ele.rules);
    if (!isValid) error[key] = errors;
  });

  return { error: _.isEmpty(error) ? undefined : error };
};
