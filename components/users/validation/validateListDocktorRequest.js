const { ValidatorHelper, Builder } = require("validation-helpers");
const _ = require("lodash");
const constant = require("../constant");

module.exports = req => {
  const body = req.body;
  const error = {};
  const scheme = {
    clinic: {
      value: body.clinic,
      rules: new Builder()
        .required("Type must pass from date")
        .isMember(constant.clinics).value
    },
    specify: {
      value: body.specify,
      rules: new Builder()
        .required("Type must pass from date")
        .isMember(constant.specifications).value
    }
  };

  Object.keys(scheme).forEach(key => {
    const ele = scheme[key];
    const { errors, isValid } = ValidatorHelper(ele.value, ele.rules);
    if (!isValid) error[key] = errors;
  });

  return { error: _.isEmpty(error) ? undefined : error };
};
