const express = require("express");
const router = express.Router();
// const { validate, ValidationError, Joi } = require("express-validation");
//Validations
// const departmentValidations = require("../../../validations/department_validation");
// Middlewares
const checkLogin = require("../../../middlewares/checkLogin.js");
// Models
const Project = require("../../../models/project_schema.js");

router.post(
  "/",
  //   validate(departmentValidations.createOrUpdateDepartmentValidator),
  checkLogin,
  async (req, res) => {
    try {
      const updateList = await Project.updateOne(
        {
          "states.tasks": {
            $elemMatch: {
              _id: req.body.task_id,
            },
          },
        },
        {
          $push: {
            "states.$[].tasks.$[].assign_to": [
              {
                assign_date: new Date(),
                assigned_id: req.body.assigned_id,
                due_date: new Date(req.body.due_date),
                active_status: true,
              },
            ],
          },
        }
      );
      console.log(updateList);
      res.status(200).json({
        status: 200,
        message: "State added successfully",
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
