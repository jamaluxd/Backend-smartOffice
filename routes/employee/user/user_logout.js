const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const cookie = require("cookie");
dotenv.config();

// Middlewares
const checkLogin = require("../../../middlewares/checkLogin.js");
// Models
const Employee = require("../../../models/employee/employee_schema");

router.post("/", checkLogin, async (req, res) => {
  try {
    // set "authorization" cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("authorization", "", {
        httpOnly: true,
        // secure: process.env.NODE_ENV !=="development",
        expires: new Date(0),
        // Priority: "high",
        // sameSite: "strict",
        // path: "/",
      })
    );
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
