const express = require("express");
const router = express.Router();

// Middlewares
const checkLogin = require("../../../middlewares/checkLogin.js");
const checkAdmin = require("../../../middlewares/checkIsAdmin.js");
// Models
const Department = require("../../../models/department_schema.js");

router.post("/", checkLogin, checkAdmin, async (req, res) => {
  try {
    const updateDepartment = await Department.findByIdAndUpdate(
      req.body.id,
      req.body
    );
    res.status(200).json({
      status: 200,
      message: "Department updated successfully",
      updateDesignation: updateDepartment,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});
module.exports = router;
