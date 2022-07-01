const Joi = require("joi");

const employeeValidations = {
  createOrUpdateEmployeeValidator: {
    body: Joi.object({
      name: Joi.string().min(2).max(30).required(),
      department_id: Joi.string().required(),
      designation_id: Joi.string().required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "jp"] },
        })
        .required(),
      password: Joi.string()
        .min(8)
        .pattern(
          new RegExp(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
          )
        )
        .required(),
      admin: Joi.boolean().required(),
      active_status :Joi.boolean().required(),
    }),
  },
};
module.exports = employeeValidations;
