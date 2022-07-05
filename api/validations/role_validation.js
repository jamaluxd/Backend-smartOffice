const Joi = require("joi");

const roleValidations = {
    createOrUpdateRoleValidator: {
        body: Joi.object({
            title: Joi.string().min(2).max(30).required(),
            module_id: Joi.string().required(),
            active_status: Joi.boolean().required(),
        }),
    },
};
module.exports = roleValidations;