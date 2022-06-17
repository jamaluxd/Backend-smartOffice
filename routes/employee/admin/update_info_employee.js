const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// Middlewares
const checkLogin = require("../../../middlewares/checkLogin.js");

// Models
const Employee = require("../../../models/employee/employee_schema");

router.post("/", checkLogin, async (req, res) => {
  try {
    const cleckExistingEmployee = await Employee.findOne({
      email: req.body.email,
    });
    if (cleckExistingEmployee != null) {
      const employee = new Employee({
        name: cleckExistingEmployee.name,
        position: cleckExistingEmployee.position,
        email: cleckExistingEmployee.email,
      });

      if (req.body.name != cleckExistingEmployee.name) {
        employee.name = req.body.name;
      }
      if (req.body.position != cleckExistingEmployee.position) {
        employee.position = req.body.position;
      }

      const newEmployee = await employee.updateOne();
      res.status(200).json({
        status: 200,
        message: "Employee updated successfully",
        newEmployee: newEmployee,
      });
    } else {
      res.status(409).json({
        status: 409,
        message: "Email doesn't exist",
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
