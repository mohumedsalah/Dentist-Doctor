const { ValidatorHelper, Builder } = require("validation-helpers");
const _ = require("lodash");
const constant = require("../../users/constant");

module.exports = req => {
  const obj = req.body;
  const error = {};

  const scheme = {
    day: {
      value: obj.day,
      rules: new Builder().required().isMember(constant.dayOfWeek).value
    },
    hour: {
      value: obj.from,
      rules: new Builder()
        .required("Type must pass from date")
        .isNumber()
        .min(9)
        .max(19).value
    }
  };

  Object.keys(scheme).forEach(key => {
    const ele = scheme[key];
    const { errors, isValid } = ValidatorHelper(ele.value, ele.rules);
    if (!isValid) error[key] = errors;
  });

  return { error: _.isEmpty(error) ? undefined : error };
};
