const { ValidatorHelper, Builder } = require("validation-helpers");
const _ = require("lodash");
const validateWorkingDateObj = require("./validateWorkingDateObj");
const constant = require("../constant");

module.exports = req => {
  req.body.image = !req.file ? null : req.file.path || null;
  req.body.workingTime = JSON.parse(req.body.workingTime) || null;
  const body = req.body;
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
    phone: {
      value: body.phone,
      rules: new Builder()
        .required("Type must pass from date")
        .minLength(10)
        .maxLength(15).value
    },
    image: {
      value: body.image,
      rules: new Builder().required("Type must pass from date").value
    },
    specify: {
      value: body.specify,
      rules: new Builder()
        .required("Type must pass from date")
        .isMember(constant.specifications).value
    },
    clinic: {
      value: body.clinic,
      rules: new Builder()
        .required("Type must pass from date")
        .isMember(constant.clinics).value
    },
    cost: {
      value: body.cost,
      rules: new Builder()
        .required("Type must pass from date")
        .isNumber()
        .min(50)
        .max(10000).value
    },
    workingTime: {
      value: body.workingTime,
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
