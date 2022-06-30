const express = require("express");
const router = express.Router();

// Middlewares
const checkLogin = require("../../../middlewares/checkLogin.js");
const checkAdmin = require("../../../middlewares/checkIsAdmin.js");
// Models
const Designation = require("../../../models/designation_schema");

router.post("/", checkLogin, checkAdmin, async (req, res) => {
  console.log(req.body);
  try {
    const cleckExistingTitle = await Designation.findOne({
      title: req.body.title,
    });
    if (cleckExistingTitle == null) {
      const designation = new Designation({
        title: req.body.title,
        rank: req.body.rank,
        active_status: req.body.active_status,
      });
      const newDesignation = await designation.save();
      res.status(200).json({
        status: 200,
        message: "Designation added successfully",
        newDesignation: newDesignation,
      });
    } else {
      res.status(409).json({
        status: 409,
        message: "Designation already exist",
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
