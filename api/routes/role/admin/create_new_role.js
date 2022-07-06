const express = require("express");
const router = express.Router();
const { validate, ValidationError, Joi } = require("express-validation");
//Validations
const roleValidations = require("../../../validations/role_validation.js");
// Middlewares
const checkLogin = require("../../../middlewares/checkLogin.js");
const checkAdmin = require("../../../middlewares/checkIsAdmin.js");
// Models
const Role = require("../../../models/role_schema.js");

router.post(
    "/",
    validate(roleValidations.createRoleValidator),
    checkLogin,
    checkAdmin,
    async(req, res) => {
        try {
            const cleckExistingTitle = await Role.findOne({
                
            },{
                title: req.body.title,
                module_id: req.body.module_id,
            });
            if (cleckExistingTitle == null) {
                const role = new Role({
                    title: req.body.title,
                    module_id: req.body.module_id,
                    active_status: req.body.active_status,
                });
                const newRole = await role.save();
                res.status(200).json({
                    status: 200,
                    message: "Role added successfully",
                    body: newRole,
                });
            } else {
                res.status(409).json({
                    status: 409,
                    message: "Role already exist",
                    body: null,
                });
            }
        } catch (err) {
            res.status(400).json({
                status: 400,
                message: err.message,
                body: null,
            });
        }
    }
);

router.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err);
    }
    return res.status(500).json(err);
});

module.exports = router;