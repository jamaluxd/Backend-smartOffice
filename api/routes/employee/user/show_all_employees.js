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
    const ShowEmployeeList = await Employee.find({},{
      
    });

    for (let i = 0; i < ShowEmployeeList.length; i++) {
      const findDepartmentNameById = await Department.findById(
        ShowEmployeeList[i].department_id,
        "title"
      );
      ShowEmployeeList[i].department = findDepartmentNameById.title;
      const findDesignationNameById = await Designation.findById(
        ShowEmployeeList[i].designation_id,
        "title"
      );
      ShowEmployeeList[i].designation = findDesignationNameById.title;
    }

    if (ShowEmployeeList != null) {
      res.status(200).json({
        status: 200,
        message: "List is found",
        body: ShowEmployeeList,
      });
    } else {
      res.status(409).json({
        status: 409,
        message: "Users not found",
        body: ShowEmployeeList,
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
