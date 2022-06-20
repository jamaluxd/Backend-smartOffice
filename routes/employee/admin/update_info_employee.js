const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// Middlewares
const checkLogin = require("../../../middlewares/checkLogin.js");

// Models
const Employee = require("../../../models/employee/employee_schema");

router.post("/:id", checkLogin, async (req, res) => {
  // console.log(req.params.id);
  let updateId = req.params.id;
  try {
    const cleckExistingEmployee = await Employee.findOne({
      _id: updateId,
    });
    console.log(cleckExistingEmployee);
    if (cleckExistingEmployee != null) {
      const employee = new Employee({
        name: cleckExistingEmployee.name,
        position: cleckExistingEmployee.position,
        email: cleckExistingEmployee.email,
        admin: cleckExistingEmployee.admin,
      });
      if (
        req.body.name != cleckExistingEmployee.name &&
        req.body.name != null &&
        req.body.name != undefined
      ) {
        employee.name = req.body.name;
      }
      if (
        req.body.position != cleckExistingEmployee.position &&
        req.body.position != null &&
        req.body.position != undefined
      ) {
        employee.position = req.body.position;
      }
      if (
        req.body.email != cleckExistingEmployee.email &&
        req.body.email != null &&
        req.body.email != undefined
      ) {
        employee.email = req.body.email;
      }
      if (
        req.body.admin != cleckExistingEmployee.admin &&
        req.body.admin != null &&
        req.body.admin != undefined
      ) {
        employee.admin = req.body.admin;
      }
      // console.log(req.params.id);
      const newEmployee = await Employee.updateOne(
        {
          _id: updateId,
        },
        { $set: employee }
      );
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
