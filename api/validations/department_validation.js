const Joi = require("joi");

const departmentValidations = {
  createOrUpdateDepartmentValidator: {
    body: Joi.object({
      title: Joi.string().min(2).max(30).required(),
      active_status :Joi.boolean().required(),
      access_token: Joi.string().required(),
      
    }),
  },
};
module.exports = departmentValidations;
