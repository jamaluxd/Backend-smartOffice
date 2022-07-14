const express = require("express");
const router = express.Router();
const { validate, ValidationError, Joi } = require("express-validation");
//Validations
// const roleValidations = require("../../../../validations/role_validation");
// Middlewares
const checkLogin = require("../../../../middlewares/checkLogin.js");
const checkAdmin = require("../../../../middlewares/checkIsAdmin.js");
// Models
const ModuleStatus = require("../../../../models/status_schema.js");

router.post(
  "/",
  //   validate(roleValidations.createRoleValidator),
  checkLogin,
  checkAdmin,
  async (req, res) => {
    try {
      const cleckExistingTitle = await ModuleStatus.findOne({
        title: req.body.title,
        module_id: req.body.module_id,
      });

      if (cleckExistingTitle == null) {
        const moduleStatus = new ModuleStatus({
          title: req.body.title,
          module_id: req.body.module_id,
          active_status: true,
        });
        const newEntry = await moduleStatus.save();
        res.status(200).json({
          status: 200,
          message: "Status added successfully",
          body: newEntry,
        });
      } else {
        res.status(409).json({
          status: 409,
          message: "Status already exist",
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

// router.use((err, req, res, next) => {
//   if (err instanceof ValidationError) {
//     return res.status(err.statusCode).json(err);
//   }
//   return res.status(500).json(err);
// });

module.exports = router;
