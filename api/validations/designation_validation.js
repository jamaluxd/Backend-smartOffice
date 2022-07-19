const Joi = require("joi");

const designationValidations = {
    createOrUpdateDesignationValidator: {
        body: Joi.object({
            title: Joi.string().min(2).max(30).required(),
            rank: Joi.number().required(),
            active_status: Joi.boolean().required(),
            access_token: Joi.string().required(),
        }),
    },

};
module.exports = designationValidations;