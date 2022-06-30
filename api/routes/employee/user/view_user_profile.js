const express = require("express");
const router = express.Router();

// Middlewares
const checkLogin = require("../../../middlewares/checkLogin.js");
// Models
const Employee = require("../../../models/employee_schema.js");
const Department = require("../../../models/department_schema.js");
const Designation = require("../../../models/designation_schema.js");

router.post("/", checkLogin, async (req, res) => {
  try {
    const ViewEmployeeProfile = await Employee.findById(req.body.id);

    if (ViewEmployeeProfile != null) {
      const findDepartmentTitleById = await Department.findById(
        ViewEmployeeProfile.department_id,
        "title"
      );
      ViewEmployeeProfile.department = findDepartmentTitleById.title;

      const findDesignationTitleById = await Designation.findById(
        ViewEmployeeProfile.designation_id,
        "title"
      );
      ViewEmployeeProfile.designation = findDesignationTitleById.title;
      
      res.status(200).json({
        status: 200,
        message: "User has found",
        body: ViewEmployeeProfile,
      });
    } else {
      res.status(409).json({
        status: 409,
        message: "User not found",
        body: null,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

module.exports = router;
