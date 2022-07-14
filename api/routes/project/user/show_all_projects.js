const express = require("express");
const router = express.Router();
// Middlewares
const checkLogin = require("../../../middlewares/checkLogin.js");
// Models
const Project = require("../../../models/project_schema.js");

router.post(
  "/",
  checkLogin,
  async (req, res) => {
    try {
      const cleckExistingProjects = await Project.find({
        active_status: true,
      });
      res.status(200).json({
        status: 200,
        message: err.message,
        body: cleckExistingProjects,
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

module.exports = router;
