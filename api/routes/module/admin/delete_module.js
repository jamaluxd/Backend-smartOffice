const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { validate, ValidationError, Joi } = require("express-validation");
//Validations
const moduleValidations = require("../../../validations/module_validation.js");
// Middlewares
const checkLogin = require("../../../middlewares/checkLogin.js");
const checkAdmin = require("../../../middlewares/checkIsAdmin.js");
// Models
const Module = require("../../../models/module_schema");
const update = {
    active_status: false,
}


router.post(
    "/",
    validate(moduleValidations.deleteModuleValidator),
    checkLogin,
    checkAdmin,
    async(req, res) => {
        try {
            const newModule = await Module.findByIdAndUpdate(
                req.body.id,
                update,
            );

            res.status(200).json({
                status: 200,
                message: "Module deleted successfully",
                body: null,
            });
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