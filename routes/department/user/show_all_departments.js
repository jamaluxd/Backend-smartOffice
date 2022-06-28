const express = require("express");
const router = express.Router();

// Middlewares
const checkLogin = require("../../../middlewares/checkLogin.js");
// Models
const Department = require("../../../models/department_schema.js");

router.post("/", checkLogin, async (req, res) => {
  try {
    const ShowDepartmentList = await Department.find();
    if (ShowDepartmentList != null) {
      res.status(200).json({
        status: 200,
        message: "List is found",
        body: ShowDepartmentList,
      });
    } else {
      res.status(409).json({
        status: 409,
        message: "No Department found",
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
