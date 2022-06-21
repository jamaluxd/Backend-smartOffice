const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// Middlewares
const checkLogin = require("../../../middlewares/checkLogin.js");
const checkAdmin = require("../../../middlewares/checkIsAdmin");

// Models
const Employee = require("../../../models/employee/employee_schema");

router.post("/:id", checkLogin, checkAdmin, async (req, res) => {
  try {
    const newEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json({
      status: 200,
      message: "Employee updated successfully",
      newEmployee: newEmployee,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});
module.exports = router;
