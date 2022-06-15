const express = require("express");
const router = express.Router();

const Employee = require("../../../models/employee/user/create_new_employee");

// get all employee information:
router.post("/", (req, res) => {
    Employee.find({}, (err, data) => {
      if (!err) {
        res.send(data);
      } else {
        res.send({
          code: 400,
          message: err.message,
        });
      }
    });
  });







module.exports = router;
