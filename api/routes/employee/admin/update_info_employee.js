const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { validate, ValidationError, Joi } = require("express-validation");
//Validations
const employeeValidations = require("../../../validations/employee_validations.js");
// Middlewares
const checkLogin = require("../../../middlewares/checkLogin.js");
const checkAdmin = require("../../../middlewares/checkIsAdmin.js");
// Models
const Employee = require("../../../models/employee_schema");

router.post(
  "/",
  validate(employeeValidations.createOrUpdateEmployeeValidator),
  checkLogin,
  checkAdmin,
  async (req, res) => {
    try {
      const newEmployee = await Employee.findByIdAndUpdate(
        req.body.id,
        req.body
      );
      res.status(200).json({
        status: 200,
        message: "Employee updated successfully",
        newEmployee: newEmployee,
      });
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: err.message,
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
