const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const Employee = require("../../../models/employee/employee_schema");

router.post("/", async (req, res) => {
  try {
    const cleckExistingEmployee = await Employee.findOne({
      email: req.body.email,
    });
    if (cleckExistingEmployee == null) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const employee = new Employee({
        name: req.body.name,
        position: req.body.position,
        email: req.body.email,
        password: hashedPassword,
      });
      const newEmployee = await employee.save();
      res.status(200).json({
        status: 200,
        message: "Employee added successfully",
        newEmployee: newEmployee,
      });
    } else {
      res.status(409 ).json({
        status: 409 ,
        message: "Email already exist",
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
