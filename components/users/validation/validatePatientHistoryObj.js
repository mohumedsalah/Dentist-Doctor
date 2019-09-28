const { ValidatorHelper, Builder } = require("validation-helpers");
const _ = require("lodash");

module.exports = obj => {
  const error = {};

  const scheme = {
    disease: {
      value: obj.disease,
      rules: new Builder()
        .required("Type must pass from date")
        .minLength(5)
        .maxLength(200).value
    },
    date: {
      value: obj.date,
      rules: new Builder().required("Type must pass from date").value
    }
  };

  Object.keys(scheme).forEach(key => {
    const ele = scheme[key];
    const { errors, isValid } = ValidatorHelper(ele.value, ele.rules);
    if (!isValid) error[key] = errors;
  });

  return { error: _.isEmpty(error) ? undefined : error };
};
