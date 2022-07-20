const express = require('express');
const router = express.Router();
// Middlewares
const checkLogin = require('../../../middlewares/checkLogin.js');
// Models
const Project = require('../../../models/project_schema.js');
const Employee = require('../../../models/employee_schema');
const Status = require('../../../models/status_schema');

router.post('/', checkLogin, async (req, res) => {
  try {
    const cleckExistingProjects = await Project.find({
      active_status: true,
    });

    for (let i = 0; i < cleckExistingProjects.length; i++) {
      for (
        let j = 0;
        j < cleckExistingProjects[i].assign_members.length;
        j++
      ) {
        const findEmployeeNameById = await Employee.findById(
          cleckExistingProjects[i].assign_members[j]
            .assigned_employee_id,
          'name'
        );

        if (findEmployeeNameById) {
          cleckExistingProjects[i].assign_members[
            j
          ].assigned_employee_name = findEmployeeNameById.name;
        } else {
          cleckExistingProjects[i].assign_members[
            j
          ].assigned_employee_name = 'User Not Found';
        }
      }

      const findStatusTitleById = await Status.findById(
        cleckExistingProjects[i].current_status_id,
        'title'
      );
      cleckExistingProjects[i].project_status =
        findStatusTitleById.title;
    }

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
