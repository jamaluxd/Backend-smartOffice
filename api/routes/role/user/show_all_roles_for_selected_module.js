const express = require("express");
const router = express.Router();

// Middlewares
const checkLogin = require("../../../middlewares/checkLogin.js");
// Models
const Role = require("../../../models/role_schema.js");

router.post("/", checkLogin, async (req, res) => {
  try {
    const ShowList = await Role.find({
      module_id: req.body.module_id,
    });

    if (ShowList != null) {
      res.status(200).json({
        status: 200,
        message: "List is found",
        body: ShowList,
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

