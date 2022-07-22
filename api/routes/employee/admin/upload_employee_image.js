const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './api/assets/employee_profile_images/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      ~~(Math.random() * 999999) +
        '_' +
        Date.now().toString() +
        '_' +
        file.originalname
    );
  },
});
const filefilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === 'image/jepg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  }
  // accept a file
  else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  filefilter: filefilter,
});

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
  //   validate(employeeValidations.createOrUpdateEmployeeValidator),
  checkLogin,
  checkAdmin,
  upload.single('employeeImage'),
  async (req, res) => {
    try {
      const uploadImage = await Employee.findByIdAndUpdate(
        req.body.id,
        {
          image: req.file.path,
        }
      );

      res.status(200).json({
        status: 200,
        message: 'Employee Image added successfully',
        body: uploadImage,
      });
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: err.message,
        body: null,
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
