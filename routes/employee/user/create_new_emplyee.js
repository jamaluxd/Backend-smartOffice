const express = require("express");
const router = express.Router();

const Employee = require("../../../models/employee/user");

router.post("/", (req, res) => {
    const employee = new Employee({
      name: req.body.name,
      position: req.body.position,
      email: req.body.email,
    });
  
    employee.save((err, data) => {
      if (!err) {
        res.status(201).json({
          code: 200,
          message: "Employee added successfully",
          newEmployee: data,
        });
      } else {
        res.send({
          code: 400,
          message: err.message,
        });
      }
    });
  });
  module.exports = router;