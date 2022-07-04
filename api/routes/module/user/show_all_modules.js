const express = require("express");
const router = express.Router();

// Middlewares
const checkLogin = require("../../../middlewares/checkLogin.js");
// Models
const Module = require("../../../models/module_schema.js");

router.post("/", checkLogin, async (req, res) => {
  try {
    const ShowModuleList = await Module.find();
    if (ShowModuleList != null) {
      res.status(200).json({
        status: 200,
        message: "List is found",
        body: ShowModuleList,
      });
    } else {
      res.status(409).json({
        status: 409,
        message: "No Module found",
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