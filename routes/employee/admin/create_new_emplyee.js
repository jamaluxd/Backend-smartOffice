const express = require("express");
const router = express.Router();

const Employee = require("../../../models/employee/user/create_new_employee");

router.post("/", async (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    position: req.body.position,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const newEmployee = await employee.save();
    res.status(200).json({
      code: 200,
      message: "Employee added successfully",
      newEmployee: newEmployee,
    });
  } catch (err) {
    res.status(400).json({
      code: 400,
      message: err.message,
    });
  }
});
module.exports = router;
