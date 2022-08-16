const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {
  validate,
  ValidationError,
  Joi,
} = require('express-validation');
//Validations
const employeeValidations = require('../../../validations/employee_validations.js');
// Middlewares
const checkLogin = require('../../../middlewares/checkLogin.js');
// Models
const Employee = require('../../../models/employee_schema');

router.post(
  '/',
  validate(employeeValidations.changePasswordValidator),
  checkLogin,
  async (req, res) => {
    try {
      const loginEmployee = await Employee.findById(req.id);
      if (loginEmployee != null) {
        const isValidPassword = await bcrypt.compare(
          req.body.old_password,
          loginEmployee.password
        );
        if (isValidPassword) {
          const hashedPassword = await bcrypt.hash(
            req.body.new_password,
            10
          );
          const newEmployee = await Employee.findByIdAndUpdate(
            req.id,
            {
              password: hashedPassword,
            }
          );
          res.status(200).json({
            status: 200,
            message: 'Password updated successfully',
            newEmployee: newEmployee,
          });
        }
      }
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
