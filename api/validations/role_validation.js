const Joi = require("joi");

const roleValidations = {
    createRoleValidator: {
        body: Joi.object({
            title: Joi.string().min(2).max(30).required(),
            module_id: Joi.string().required(),
            active_status: Joi.boolean().required(),
        }),
    },

    updateRoleValidator: {
        body: Joi.object({
            id: Joi.string().min(24).max(24).required(),
            title: Joi.string().min(2).max(30).required(),
            module_id: Joi.string().required(),
            active_status: Joi.boolean().required(),
        }),
    },

    deleteRoleValidator: {
        body: Joi.object({
            id: Joi.string().min(24).max(24).required(),
        }),
    },
};
module.exports = roleValidations;