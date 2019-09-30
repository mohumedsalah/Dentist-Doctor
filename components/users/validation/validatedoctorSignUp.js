const { ValidatorHelper, Builder } = require("validation-helpers");
const _ = require("lodash");
const util = require("util");
const validateWorkingDateObj = require("./validateWorkingDateObj");
const constant = require("../constant");

module.exports = req => {
  console.log("************************************");
  console.log(util.inspect(req, true, 100));
  req.query.image = !req.file ? null : req.file.path || null;
  req.query.workingTime = JSON.parse(req.query.workingTime) || null;
  const query = req.query;
  const error = {};
  const scheme = {
    fullName: {
      value: query.fullName,
      rules: new Builder()
        .required("Type must pass from date")
        .minLength(10)
        .maxLength(200).value
    },
    identityNumber: {
      value: query.identityNumber,
      rules: new Builder()
        .required("Type must pass from date")
        .minLength(12)
        .maxLength(12).value
    },
    password: {
      value: query.password,
      rules: new Builder()
        .required("Type must pass from date")
        .minLength(5)
        .maxLength(50).value
    },
    phone: {
      value: query.phone,
      rules: new Builder()
        .required("Type must pass from date")
        .minLength(10)
        .maxLength(15).value
    },
    image: {
      value: query.image,
      rules: new Builder().required("Type must pass from date").value
    },
    specify: {
      value: query.specify,
      rules: new Builder()
        .required("Type must pass from date")
        .isMember(constant.specifications).value
    },
    clinic: {
      value: query.clinic,
      rules: new Builder()
        .required("Type must pass from date")
        .isMember(constant.clinics).value
    },
    cost: {
      value: query.cost,
      rules: new Builder()
        .required("Type must pass from date")
        .isNumber()
        .min(50)
        .max(10000).value
    },
    workingTime: {
      value: query.workingTime,
      rules: new Builder().isArray(0, 7).value,
      workingTime: true
    }
  };

  Object.keys(scheme).forEach(key => {
    const ele = scheme[key];
    let { errors, isValid } = ValidatorHelper(ele.value, ele.rules);
    if (ele.workingTime) {
      ele.value.forEach(element => {
        const { error: err } = validateWorkingDateObj(element);
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
