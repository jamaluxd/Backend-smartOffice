const Joi = require("joi");

const moduleValidations = {
    createModuleValidator: {
        body: Joi.object({
            title: Joi.string().min(2).max(30).required(),
            active_status: Joi.boolean().required(),
        }),
    },
    updateModuleValidator: {
        body: Joi.object({
            id: Joi.string().min(24).max(24).required(),
            title: Joi.string().min(2).max(30).required(),
            active_status: Joi.boolean().required(),
        }),
    },

    deleteModuleValidator: {
        body: Joi.object({
            id: Joi.string().min(24).max(24).required(),
        }),
    },
};
module.exports = moduleValidations;