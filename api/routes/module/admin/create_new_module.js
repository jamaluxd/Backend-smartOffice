const express = require("express");
const router = express.Router();
const { validate, ValidationError, Joi } = require("express-validation");
//Validations
const moduleValidations = require("../../../validations/module_validation.js");
// Middlewares
const checkLogin = require("../../../middlewares/checkLogin.js");
const checkAdmin = require("../../../middlewares/checkIsAdmin.js");
// Models
const Module = require("../../../models/module_schema.js");

router.post(
    "/",
    validate(moduleValidations.createOrUpdateModuleValidator),
    checkLogin,
    checkAdmin,
    async(req, res) => {
        try {
            const cleckExistingTitle = await Module.findOne({
                title: req.body.title,
            });
            if (cleckExistingTitle == null) {
                const module = new Module({
                    title: req.body.title,
                    active_status: req.body.active_status,
                });
                const newModule = await module.save();
                res.status(200).json({
                    status: 200,
                    message: "Module added successfully",
                    body: newModule,
                });
            } else {
                res.status(409).json({
                    status: 409,
                    message: "Module already exist",
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