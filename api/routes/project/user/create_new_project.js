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
  async (req, res) => {
    try {
      const cleckExistingTitle = await Project.findOne({
        title: req.body.title,
      });
      if (cleckExistingTitle == null) {
        const project = new Project({
          title: req.body.title,
          description: req.body.description,
          current_version: req.body.current_version,
          current_status: req.body.current_status,
          schedule_link: req.body.schedule_link,
          git_link: req.body.git_link,
          create_date: new Date(),
          active_status: true,
          assign_to: [
            {
              assign_date: new Date(),
              assigned_employee_id: req.id,
              assigned_project_role_id: "62c4fb8eed37f91d9b71a2b7",
              active_status: true,
            },
          ],
          states: [
            {
              title: "To Do",
              create_date: new Date(),
              active_status: true,
              tasks: [],
            },
            {
              title: "Test",
              create_date: new Date(),
              active_status: true,
              tasks: [],
            },
            {
              title: "Done",
              create_date: new Date(),
              active_status: true,
              tasks: [],
            }, 
          ],
        });
        const newProject = await project.save();
        res.status(200).json({
          status: 200,
          message: "Project added successfully",
          body: newProject,
        });
      } else {
        res.status(409).json({
          status: 409,
          message: "Project name already exist",
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
