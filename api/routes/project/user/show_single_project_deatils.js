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
    const cleckExistingProjects = await Project.findById(
      req.body.project_id
    );

    for (
      let j = 0;
      j < cleckExistingProjects.assign_members.length;
      j++
    ) {
      const findEmployeeNameById = await Employee.findById(
        cleckExistingProjects.assign_members[j].assigned_employee_id,
        'name'
      );

      const findRoleTitleById = await Role.findById(
        cleckExistingProjects.assign_members[j]
          .assigned_project_role_id,
        'title'
      );

      cleckExistingProjects.assign_members[j].assigned_employee_name =
        findEmployeeNameById.name;

      cleckExistingProjects.assign_members[
        j
      ].assigned_project_role_title = findRoleTitleById.title;
    }

    const findStatusTitleById = await Status.findById(
      cleckExistingProjects.current_status_id,
      'title'
    );
    cleckExistingProjects.project_status = findStatusTitleById.title;

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
