const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();

// Models
const Employee = require("../../../models/employee_schema");

router.post("/", async (req, res) => {
  try {
    const loginEmployee = await Employee.findOne({
      email: req.body.email,
    });
    // console.log(loginEmployee);
    if (loginEmployee != null) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        loginEmployee.password
      );
      if (isValidPassword) {
        // generate token
        const token = jwt.sign(
          {
            id: loginEmployee._id,
            admin: loginEmployee.admin,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "9h",
          }
        );

        res.cookie("authorization", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
          path: "/",
        });

        res.status(200).json({
          status: 200,
          access_token: token,
          message: "Login successfully",
          body: loginEmployee,
        });
      } else {
        res.status(401).json({
          status: 401,
          message: "Authentication Failed!!!",
          body: [],
        });
      }
    } else {
      res.status(401).json({
        status: 401,
        message: "Authentication Failed!!!",
        body: [],
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
