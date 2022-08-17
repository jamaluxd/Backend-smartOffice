const express = require('express');
const router = express.Router();
// Middlewares
const checkLogin = require('../../../middlewares/checkLogin.js');
// Models
const Project = require('../../../models/project_schema.js');
const Employee = require('../../../models/employee_schema');
const Status = require('../../../models/status_schema');
const Role = require('../../../models/role_schema');

router.post('/', checkLogin, async (req, res) => {
  try {
    const cleckExistingProjects = await Project.find({
      active_status: true,
    })
      .populate({ path: 'current_status_id', select: 'title' })
      .populate({
        path: 'assign_members.assigned_employee_id',
        select: 'name',
      })
      .populate({
        path: 'assign_members.assigned_project_role_id',
        select: 'title',
      });
    res.status(200).json({
      status: 200,
      message: 'Found',
      body: cleckExistingProjects,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
      body: null,
    });
  }
});

module.exports = router;
