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
      const cleckExistingTitle = await Project.findOne({
        _id: "62c403ef44691dfaf44a254a",
        states: []
      });
      if (cleckExistingTitle == null) {
        const project = new Project({
            states:[]
       
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