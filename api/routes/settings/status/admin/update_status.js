const express = require("express");
const router = express.Router();
const { validate, ValidationError, Joi } = require("express-validation");

//Validations
// const roleValidations = require("../../../validations/role_validation.js");
// Middlewares
const checkLogin = require("../../../../middlewares/checkLogin.js");
const checkAdmin = require("../../../../middlewares/checkIsAdmin.js");
// Models
const ModuleStatus = require("../../../../models/status_schema.js");

router.post(
    "/",
    // validate(roleValidations.updateRoleValidator),
    checkLogin,
    checkAdmin,
    async(req, res) => {
        try {
            const newRole = await ModuleStatus.findByIdAndUpdate(
                req.body.id,
                req.body
            );
            res.status(200).json({
                status: 200,
                message: "Status updated successfully",
                newRole: newRole,
            });
        } catch (err) {
            res.status(400).json({
                status: 400,
                message: err.message,
            });
        }
    }
);

// router.use((err, req, res, next) => {
//     if (err instanceof ValidationError) {
//         return res.status(err.statusCode).json(err);
//     }
//     return res.status(500).json(err);
// });

module.exports = router;