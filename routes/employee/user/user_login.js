const express = require("express");
const router = express.Router();

const Employee = require("../../../models/employee/user/user_login");

router.post("/", async (req, res) => {
  const employee = new Employee({
    email: req.body.email,
    password: req.body.password
  });
  try {
    const loginEmployee = await employee.save();
    res.status(200).json({
      code: 200,
      message: "Login successfully",
      loginEmployee: loginEmployee,
    });
  } catch (err) {
    res.status(400).json({
      code: 400,
      message: err.message,
    });
  }
});
module.exports = router;