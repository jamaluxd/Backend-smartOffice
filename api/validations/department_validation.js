const Joi = require('joi');

const departmentValidations = {
  createDepartmentValidator: {
    body: Joi.object({
      title: Joi.string().min(2).max(30).required(),
      active_status: Joi.boolean().required(),
      access_token: Joi.string().required(),
    }),
  },
  updateDepartmentValidator: {
    body: Joi.object({
      id: Joi.string().required(),
      title: Joi.string().min(2).max(30).required(),
      active_status: Joi.boolean().required(),
      access_token: Joi.string().required(),
    }),
  },
};
module.exports = departmentValidations;
