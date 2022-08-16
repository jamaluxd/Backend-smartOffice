// initailization
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  '/api/assets/employee_profile_images',
  express.static('./api/assets/employee_profile_images/')
);

// Requires
// Admin
const createNewEmployeeRouter = require('./api/routes/employee/admin/create_new_emplyee.js');
const updateEmployeeRouter = require('./api/routes/employee/admin/update_info_employee.js');
const createNewDesignationRouter = require('./api/routes/designation/admin/create_new_designation.js');
const createNewDepartmentRouter = require('./api/routes/department/admin/create_new_department.js');
const updateDesignationRouter = require('./api/routes/designation/admin/update_a_designation.js');
const updateDepartmentRouter = require('./api/routes/department/admin/update_a_department.js');
const createNewModuleRouter = require('./api/routes/module/admin/create_new_module.js');
const createNewRoleRouter = require('./api/routes/role/admin/create_new_role.js');
const updateModuleRouter = require('./api/routes/module/admin/update_module.js');
const updateRoleRouter = require('./api/routes/role/admin/update_role.js');
const deleteRoleRouter = require('./api/routes/role/admin/delete_role.js');
const deleteModuleRouter = require('./api/routes/module/admin/delete_module.js');
const createStatusRouter = require('./api/routes/settings/status/admin/create_new_status.js');
const updateStatusRouter = require('./api/routes/settings/status/admin/update_status.js');
const deleteStatusRouter = require('./api/routes/settings/status/admin/detete_status.js');
const deleteAnEmployeeRouter = require('./api/routes/employee/admin/delete_an_employee.js');
const uploadEmployeeImageRouter = require('./api/routes/employee/admin/upload_employee_image.js');
// User
const showAllemployeesRouter = require('./api/routes/employee/user/show_all_employees.js');
const userLoginRouter = require('./api/routes/employee/user/user_login.js');
const userLogoutRouter = require('./api/routes/employee/user/user_logout.js');
const showAllDesignationsRouter = require('./api/routes/designation/user/show_all_designations.js');
const showAllDepartmentsRouter = require('./api/routes/department/user/show_all_departments.js');
const viewEmployeeProfileRouter = require('./api/routes/employee/user/view_user_profile.js');
const showAllModulesRouter = require('./api/routes/module/user/show_all_modules.js');
const showAllRolesForSelectedModuleRouter = require('./api/routes/role/user/show_all_roles_for_selected_module.js');
const createNewProjectRouter = require('./api/routes/project/user/create_new_project.js');
const assignNewMemberRouter = require('./api/routes/project/user/assign_new_member.js');
const createNewStateRouter = require('./api/routes/project/user/create_new_state.js');
const createNewTaskRouter = require('./api/routes/project/user/create_new_task.js');
const assignTaskRouter = require('./api/routes/project/user/assign_task_to_the_members.js');
const showAllStatusesForSelectedModuleRouter = require('./api/routes/settings/status/user/show_all_statuses_for_selected_module.js');
const showAllProjectsRouter = require('./api/routes/project/user/show_all_projects.js');
const moveTaskFromStateToStateRouter = require('./api/routes/project/user/move_task_from_state_to_state.js');
const showSingleProjectDetailsRouter = require('./api/routes/project/user/show_single_project_deatils.js');
const deleteProjectRouter = require('./api/routes/project/user/delete_project.js');
const updateProjectBasicInfoRouter = require('./api/routes/project/user/project_update_basic_info.js');
// Evaluation
const postEvaluation = require('./api/routes/evaluation/user/post_evaluation.js');
//

// API Links
// Admin
app.use(
  '/api/routes/employee/admin/createNewEmployee',
  createNewEmployeeRouter
);
app.use(
  '/api/routes/employee/admin/updateEmployee',
  updateEmployeeRouter
);
app.use(
  '/api/routes/designation/admin/createNewDesignation',
  createNewDesignationRouter
);
app.use(
  '/api/routes/department/admin/createNewDepartment',
  createNewDepartmentRouter
);
app.use(
  '/api/routes/designation/admin/updateDesignation',
  updateDesignationRouter
);
app.use(
  '/api/routes/department/admin/updateDepartment',
  updateDepartmentRouter
);
app.use(
  '/api/routes/module/admin/createNewModule',
  createNewModuleRouter
);
app.use('/api/routes/role/admin/createNewRole', createNewRoleRouter);
app.use('/api/routes/module/admin/updateModule', updateModuleRouter);
app.use('/api/routes/role/admin/updateRole', updateRoleRouter);
app.use('/api/routes/role/admin/deleteRole', deleteRoleRouter);
app.use('/api/routes/module/admin/deleteModule', deleteModuleRouter);
app.use(
  '/api/routes/settings/status/admin/createStatus',
  createStatusRouter
);
app.use(
  '/api/routes/settings/status/admin/updateStatus',
  updateStatusRouter
);
app.use(
  '/api/routes/settings/status/admin/deleteStatus',
  deleteStatusRouter
);
app.use(
  '/api/routes/employee/admin/deleteAnEmployee',
  deleteAnEmployeeRouter
);
app.use(
  '/api/routes/employee/admin/uploadEmployeeImage',
  uploadEmployeeImageRouter
);

// User
app.use(
  '/api/routes/employee/user/showAllEmployees',
  showAllemployeesRouter
);
app.use('/api/routes/employee/user/userLogin', userLoginRouter);
app.use('/api/routes/employee/user/userLogout', userLogoutRouter);
app.use(
  '/api/routes/designation/user/showAllDesignations',
  showAllDesignationsRouter
);
app.use(
  '/api/routes/department/user/showAllDepartments',
  showAllDepartmentsRouter
);
app.use(
  '/api/routes/employee/user/viewUserProfile',
  viewEmployeeProfileRouter
);
app.use(
  '/api/routes/module/user/showAllModules',
  showAllModulesRouter
);
app.use(
  '/api/routes/role/user/showAllRolesForSelectedModule',
  showAllRolesForSelectedModuleRouter
);
app.use(
  '/api/routes/project/user/createNewProject',
  createNewProjectRouter
);
app.use(
  '/api/routes/project/user/assignNewMember',
  assignNewMemberRouter
);
app.use(
  '/api/routes/project/user/createNewState',
  createNewStateRouter
);
app.use(
  '/api/routes/project/user/createNewTask',
  createNewTaskRouter
);
app.use('/api/routes/project/user/assignTask', assignTaskRouter);

app.use(
  '/api/routes/settings/status/user/showAllStatusesForSelectedModule',
  showAllStatusesForSelectedModuleRouter
);
app.use(
  '/api/routes/project/user/showAllProjects',
  showAllProjectsRouter
);
app.use(
  '/api/routes/project/user/moveTaskFromStateToState',
  moveTaskFromStateToStateRouter
);
app.use(
  '/api/routes/project/user/showSingleProjectDetails',
  showSingleProjectDetailsRouter
);

app.use(
  '/api/routes/project/user/deleteProject',
  deleteProjectRouter
);

app.use(
  '/api/routes/project/user/updateProjectBasicInfo',
  updateProjectBasicInfoRouter
);

// Evaluation
app.use('/api/routes/evaluation/user/createEvaluation', postEvaluation);
//

module.exports = app;
