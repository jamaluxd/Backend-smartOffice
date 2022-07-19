const Joi = require("joi");

const moduleValidations = {
    createModuleValidator: {
        body: Joi.object({
            title: Joi.string().min(2).max(30).required(),
            active_status: Joi.boolean().required(),
            access_token: Joi.string().required(),
        }),
    },
    updateModuleValidator: {
        body: Joi.object({
            id: Joi.string().min(24).max(24).required(),
            title: Joi.string().min(2).max(30).required(),
            active_status: Joi.boolean().required(),
            access_token: Joi.string().required(),
        }),
    },

    deleteModuleValidator: {
        body: Joi.object({
            id: Joi.string().min(24).max(24).required(),
            access_token: Joi.string().required(),
        }),
    },
};
module.exports = moduleValidations;