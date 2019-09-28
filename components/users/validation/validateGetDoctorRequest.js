const { ValidatorHelper, Builder } = require("validation-helpers");
const _ = require("lodash");
const constant = require("../constant");

module.exports = req => {
  const body = req.params;
  const error = {};
  const scheme = {
    doctorId: {
      value: body.doctorId,
      rules: new Builder()
        .required("Type must pass from date")
        .isMongoObjectId().value
    }
  };

  Object.keys(scheme).forEach(key => {
    const ele = scheme[key];
    const { errors, isValid } = ValidatorHelper(ele.value, ele.rules);
    if (!isValid) error[key] = errors;
  });

  return { error: _.isEmpty(error) ? undefined : error };
};
