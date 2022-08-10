const express = require('express');
const router = express.Router();
const {
  validate,
  ValidationError,
  Joi,
} = require('express-validation');
//Validations
const departmentValidations = require('../../../validations/department_validation');
// Middlewares
const checkLogin = require('../../../middlewares/checkLogin.js');
const checkAdmin = require('../../../middlewares/checkIsAdmin.js');
// Models
const Department = require('../../../models/department_schema.js');

router.post(
  '/',
  validate(departmentValidations.createDepartmentValidator),
  checkLogin,
  checkAdmin,
  async (req, res) => {
    console.log(req.body);
    try {
      const cleckExistingTitle = await Department.findOne({
        title: req.body.title,
      });
      if (cleckExistingTitle == null) {
        const department = new Department({
          title: req.body.title,
          rank: req.body.rank,
          active_status: req.body.active_status,
        });
        const newDepartment = await department.save();
        res.status(200).json({
          status: 200,
          message: 'Department added successfully',
          newDesignation: newDepartment,
        });
      } else {
        res.status(409).json({
          status: 409,
          message: 'Department already exist',
        });
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
