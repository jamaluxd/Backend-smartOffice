const Joi = require("joi");

const designationValidations = {
  createOrUpdateDesignationValidator: {
    body: Joi.object({
      title: Joi.string().min(2).max(30).required(),
      rank: Joi.boolean().required(),
      active_status: Joi.boolean().required(),
    }),
  },
};
module.exports = designationValidations;
