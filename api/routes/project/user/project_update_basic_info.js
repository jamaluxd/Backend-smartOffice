const express = require('express');
const router = express.Router();
// const { validate, ValidationError, Joi } = require("express-validation");
//Validations
// const departmentValidations = require("../../../validations/department_validation");
// Middlewares
const checkLogin = require('../../../middlewares/checkLogin.js');
const checkAdmin = require('../../../middlewares/checkIsAdmin.js');
// Models
const Project = require('../../../models/project_schema.js');

router.post(
  '/',
  //   validate(departmentValidations.createOrUpdateDepartmentValidator),
  checkLogin,
  async (req, res) => {
    try {
      const updateList = await Project.findByIdAndUpdate(
        req.body.project_id,
        {
          $set: {
            title: req.body.title,
            description: req.body.description,
            current_version: req.body.current_version,
            current_status_id: req.body.current_status_id,
            schedule_link: req.body.schedule_link,
            git_link: req.body.git_link,
          },
        }
      );

      res.status(200).json({
        status: 200,
        message: 'Project Updated successfully',
        body: updateList,
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

// router.use((err, req, res, next) => {
//   if (err instanceof ValidationError) {
//     return res.status(err.statusCode).json(err);
//   }
//   return res.status(500).json(err);
// });

module.exports = router;
