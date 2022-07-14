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
      const findOnMemberList = await Project.findOne({
        assign_to: {
          $elemMatch: {
            assigned_employee_id: req.body.assigned_id,
          },
        },
      });

      if (findOnMemberList) {
        const updateList = await Project.updateOne(
          {
            "states.tasks": {
              $elemMatch: {
                _id: req.body.task_id,
              },
            },
          },
          {
            $set: {
              "states.$.tasks.$[task].assign_to": {
                assign_date: new Date(),
                assigned_id: req.body.assigned_id,
                due_date: new Date(req.body.due_date),
                active_status: true,
              },
            },
          },
          {
            arrayFilters: [{ "task._id": req.body.task_id }],
          }
        );
        res.status(200).json({
          status: 200,
          message: "Task assigned successfully",
          body: updateList,
        });
      } else {
        res.status(200).json({
          status: 200,
          message: "Employee doesn't added as Project Member",
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
