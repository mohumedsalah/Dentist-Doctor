const { ValidatorHelper, Builder } = require("validation-helpers");
const _ = require("lodash");

module.exports = req => {
  const body = req.body;
  const error = {};
  const scheme = {
    identityNumber: {
      value: body.identityNumber,
      rules: new Builder()
        .required("Type must pass from date")
        .minLength(12)
        .maxLength(12).value
    },
    password: {
      value: body.password,
      rules: new Builder()
        .required("Type must pass from date")
        .minLength(5)
        .maxLength(50).value
    }
  };

  Object.keys(scheme).forEach(key => {
    const ele = scheme[key];
    const { errors, isValid } = ValidatorHelper(ele.value, ele.rules);
    if (!isValid) error[key] = errors;
  });

  return { error: _.isEmpty(error) ? undefined : error };
};
