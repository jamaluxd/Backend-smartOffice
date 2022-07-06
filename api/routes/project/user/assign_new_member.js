const express = require("express");
const router = express.Router();
// const { validate, ValidationError, Joi } = require("express-validation");
//Validations
// const departmentValidations = require("../../../validations/department_validation");
// Middlewares
const checkLogin = require("../../../middlewares/checkLogin.js");
const checkAdmin = require("../../../middlewares/checkIsAdmin.js");
// Models
const Project = require("../../../models/project_schema.js");

router.post(
  "/",
  //   validate(departmentValidations.createOrUpdateDepartmentValidator),
  checkLogin,
  checkAdmin,
  async (req, res) => {
    try {
      const updateAssignList = await Project.findByIdAndUpdate(
        req.body.project_id,
        {
          $push: {assign_to: [
            {
              assign_date: new Date(),
              assigned_employee_id: req.body.assigned_employee_id,
              assigned_project_role_id: req.body.assigned_project_role_id,
              active_status: true,
            },
          ],
        }}
      );
      res.status(200).json({
        status: 200,
        message: "Member added successfully",
        body: updateAssignList,
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
