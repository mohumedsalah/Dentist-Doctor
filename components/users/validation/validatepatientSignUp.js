const { ValidatorHelper, Builder } = require("validation-helpers");
const _ = require("lodash");
const validatePatientHistoryObj = require("./validatePatientHistoryObj");

module.exports = ({ body }) => {
  const error = {};

  const scheme = {
    fullName: {
      value: body.fullName,
      rules: new Builder()
        .required("Type must pass from date")
        .minLength(10)
        .maxLength(200).value
    },
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
    },
    age: {
      value: body.age,
      rules: new Builder()
        .required("Type must pass from date")
        .isNumber()
        .min(1)
        .max(200).value
    },
    patientHistory: {
      value: body.patientHistory,
      rules: new Builder().isArray(0, 50).value,
      patientArray: true
    }
  };

  Object.keys(scheme).forEach(key => {
    const ele = scheme[key];
    let { errors, isValid } = ValidatorHelper(ele.value, ele.rules);
    if (ele.patientArray) {
      ele.value.forEach(element => {
        const { errors: err } = validatePatientHistoryObj(element);
        if (err) {
          errors.push(err);
          isValid = false;
        }
      });
    }
    if (!isValid) error[key] = errors;
  });

  return { error: _.isEmpty(error) ? undefined : error };
};
