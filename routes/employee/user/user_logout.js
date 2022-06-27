const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const cookie = require("cookie");
dotenv.config();

// Middlewares
const checkLogin = require("../../../middlewares/checkLogin.js");
// Models
const Employee = require("../../../models/employee_schema");

router.post("/", checkLogin, async (req, res) => {
  try {
    res.cookie("authorization", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    res.status(200).json({
      status: 200,
      message: "Loged Out",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

module.exports = router;
