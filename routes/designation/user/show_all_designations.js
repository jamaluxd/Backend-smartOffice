const express = require("express");
const router = express.Router();

// Middlewares
const checkLogin = require("../../../middlewares/checkLogin.js");
// Models
const Designation = require("../../../models/designation_schema.js");

router.post("/", checkLogin, async (req, res) => {
  try {
    const ShowDesignationList = await Designation.find();
    if (ShowDesignationList != null) {
      res.status(200).json({
        status: 200,
        message: "List is found",
        body: ShowDesignationList,
      });
    } else {
      res.status(409).json({
        status: 409,
        message: "No Designation found",
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
