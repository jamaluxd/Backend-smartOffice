const express = require('express');
const router = express.Router();
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
  validate(employeeValidations.updateOwnEmployeeInfoValidator),
  checkLogin,
  async (req, res) => {
    try {
      const newEmployee = await Employee.findByIdAndUpdate(
        req.id,
        {
          name: req.body.name,
          email: req.body.email,
          contect_number: req.body.contect_number,
          address: req.body.address,
          description: req.body.description,
        }
      );
      res.status(200).json({
        status: 200,
        message: 'Employee updated successfully',
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
