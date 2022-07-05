const Joi = require("joi");

const moduleValidations = {
    createOrUpdateModuleValidator: {
        body: Joi.object({
            title: Joi.string().min(2).max(30).required(),
            active_status: Joi.boolean().required(),
        }),
    },
};
module.exports = moduleValidations;