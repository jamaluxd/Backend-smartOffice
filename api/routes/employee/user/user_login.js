const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();

// Models
const Employee = require("../../../models/employee_schema");
const Department = require("../../../models/department_schema.js");
const Designation = require("../../../models/designation_schema.js");

router.post("/", async (req, res) => {
  try {
    const loginEmployee = await Employee.findOne({
      email: req.body.email,
    });
    if (loginEmployee != null) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        loginEmployee.password
      );
      if (isValidPassword) {
        // generate JWT token
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
        // set authorization cookie
        res.cookie("authorization", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 8,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
          path: "/",
        });

        const findDepartmentTitleById = await Department.findById(
          loginEmployee.department_id,
          "title"
        );
        loginEmployee.department = findDepartmentTitleById.title;

        const findDesignationTitleById = await Designation.findById(
          loginEmployee.designation_id,
          "title"
        );
        loginEmployee.designation = findDesignationTitleById.title;

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
