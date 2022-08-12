const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
// const multer = require('multer');
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './api/assets/employee_profile_images/');
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       ~~(Math.random() * 999999) +
//         '_' +
//         Date.now().toString() +
//         '_' +
//         file.originalname
//     );
//   },
// });
// const filefilter = (req, file, cb) => {
//   // reject a file
//   if (
//     file.mimetype === 'image/jepg' ||
//     file.mimetype === 'image/png'
//   ) {
//     cb(null, true);
//   }
//   // accept a file
//   else {
//     cb(null, false);
//   }
// };
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
//   filefilter: filefilter,
// });

const {
  validate,
  ValidationError,
  Joi,
} = require('express-validation');
//Validations
const employeeValidations = require('../../../validations/employee_validations.js');
// Middlewares
const checkLogin = require('../../../middlewares/checkLogin.js');
const checkAdmin = require('../../../middlewares/checkIsAdmin.js');
// Models
const Employee = require('../../../models/employee_schema');

router.post(
  '/',
  validate(employeeValidations.createOrUpdateEmployeeValidator),
  checkLogin,
  checkAdmin,
  // upload.single('employeeImage'),
  async (req, res) => {
    try {
      const cleckExistingEmployee = await Employee.findOne({
        email: req.body.email,
      });
      if (cleckExistingEmployee == null) {
        const hashedPassword = await bcrypt.hash(
          req.body.password,
          10
        );
        const employee = new Employee({
          name: req.body.name,
          department_id: req.body.department_id,
          designation_id: req.body.designation_id,
          email: req.body.email,
          contect_number: req.body.contect_number,
          address: req.body.address,
          description: req.body.description,
          password: hashedPassword,
          admin: req.body.admin,
          // image: req.file.path,
          active_status: true,
        });
        const newEmployee = await employee.save();
        res.status(200).json({
          status: 200,
          message: 'Employee added successfully',
          newEmployee: newEmployee,
        });
      } else {
        res.status(409).json({
          status: 409,
          message: 'Email already exist',
        });
      }
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: err.message,
      });
    }
  }
);

router.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }
  return res.status(500).json(err);
});

module.exports = router;
