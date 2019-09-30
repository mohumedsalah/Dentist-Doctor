const { ValidatorHelper, Builder } = require("validation-helpers");
const _ = require("lodash");

module.exports = ({ body, params }) => {
  const error = {};

  const scheme = {
    patientId: {
      value: params.patientId,
      rules: new Builder()
        .required("Type must pass from date")
        .isMongoObjectId().value
    },
    disease: {
      value: body.disease,
      rules: new Builder()
        .required("Type must pass from date")
        .minLength(5)
        .maxLength(200).value
    },
    date: {
      value: body.date,
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
