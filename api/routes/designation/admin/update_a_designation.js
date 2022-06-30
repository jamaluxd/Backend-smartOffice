const express = require("express");
const router = express.Router();

// Middlewares
const checkLogin = require("../../../middlewares/checkLogin.js");
const checkAdmin = require("../../../middlewares/checkIsAdmin.js");
// Models
const Designation = require("../../../models/designation_schema");

router.post("/", checkLogin, checkAdmin, async (req, res) => {
  try {
    const updateDesignation = await Designation.findByIdAndUpdate(
      req.body.id,
      req.body
    );
    res.status(200).json({
      status: 200,
      message: "Designation updated successfully",
      updateDesignation: updateDesignation,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});
module.exports = router;
