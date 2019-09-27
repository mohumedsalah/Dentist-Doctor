const { ValidatorHelper, Builder } = require("validation-helpers");
const _ = require("lodash");
const constant = require("../constant");

module.exports = obj => {
  const error = {};

  const scheme = {
    day: {
      value: obj.day,
      rules: new Builder().required().isMember(constant.dayOfWeek).value
    },
    from: {
      value: obj.from,
      rules: new Builder()
        .required("Type must pass from date")
        .isNumber()
        .min(0)
        .max(24).value
    },
    to: {
      value: obj.to,
      rules: new Builder()
        .required("Type must pass from date")
        .isNumber()
        .min(0)
        .max(24).value
    }
  };

  Object.keys(scheme).forEach(key => {
    const ele = scheme[key];
    const { errors, isValid } = ValidatorHelper(ele.value, ele.rules);
    if (!isValid) error[key] = errors;
  });

  return { error: _.isEmpty(error) ? undefined : error };
};
