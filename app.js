// initailization
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

dotenv.config();
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// connect to the Database
mongoose.connect(process.env.Mongo_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Conntected to Database"));

// Requires
// Admin
const createNewEmployeeRouter = require("./api/routes/employee/admin/create_new_emplyee.js");
const updateEmployeeRouter = require("./api/routes/employee/admin/update_info_employee.js");
const createNewDesignationRouter = require("./api/routes/designation/admin/create_new_designation.js");
const createNewDepartmentRouter = require("./api/routes/department/admin/create_new_department.js");
const updateDesignationRouter = require("./api/routes/designation/admin/update_a_designation.js");
const updateDepartmentRouter = require("./api/routes/department/admin/update_a_department.js");
const createNewModuleRouter = require("./api/routes/module/admin/create_new_module.js");
const createNewRoleRouter = require("./api/routes/role/admin/create_new_role.js");

// User
const showAllemployeesRouter = require("./api/routes/employee/user/show_all_employees.js");
const userLoginRouter = require("./api/routes/employee/user/user_login.js");
const userLogoutRouter = require("./api/routes/employee/user/user_logout.js");
const showAllDesignationsRouter = require("./api/routes/designation/user/show_all_designations.js");
const showAllDepartmentsRouter = require("./api/routes/department/user/show_all_departments.js");
const viewEmployeeProfileRouter = require("./api/routes/employee/user/view_user_profile.js");
const showAllModulesRouter = require("./api/routes/module/user/show_all_modules.js");
const showAllRolesForselectedModuleRouter = require("./api/routes/role/user/show_all_roles_for_selected_module.js");
const createNewProjectRouter = require("./api/routes/project/user/create_new_project.js");
const assignNewMemberRouter= require("./api/routes/project/user/assign_new_member.js");
const createNewStateRouter = require("./api/routes/project/user/create_new_state.js");
const createNewTaskRouter = require("./api/routes/project/user/create_new_task.js")
// API Links
// Admin
app.use(
  "/api/routes/employee/admin/createNewEmployee",
  createNewEmployeeRouter
);
app.use("/api/routes/employee/admin/updateEmployee", updateEmployeeRouter);
app.use(
  "/api/routes/designation/admin/createNewDesignation",
  createNewDesignationRouter
);
app.use(
  "/api/routes/department/admin/createNewDepartment",
  createNewDepartmentRouter
);
app.use(
  "/api/routes/designation/admin/updateDesignation",
  updateDesignationRouter
);
app.use(
  "/api/routes/department/admin/updateDepartment",
  updateDepartmentRouter
);
app.use("/api/routes/module/admin/createNewModule", createNewModuleRouter);
app.use("/api/routes/role/admin/createNewRole", createNewRoleRouter);

// User
app.use("/api/routes/employee/user/showAllEmployees", showAllemployeesRouter);
app.use("/api/routes/employee/user/userLogin", userLoginRouter);
app.use("/api/routes/employee/user/userLogout", userLogoutRouter);
app.use(
  "/api/routes/designation/user/showAllDesignations",
  showAllDesignationsRouter
);
app.use(
  "/api/routes/department/user/showAllDepartments",
  showAllDepartmentsRouter
);
app.use("/api/routes/employee/user/viewUserProfile", viewEmployeeProfileRouter);
app.use("/api/routes/module/user/showAllModules", showAllModulesRouter);
app.use(
  "/api/routes/role/user/showAllRolesForSelectedModule",
  showAllRolesForselectedModuleRouter
);
app.use("/api/routes/project/user/createNewProject", createNewProjectRouter);
app.use("/api/routes/project/user/assignNewMember", assignNewMemberRouter); 
app.use("/api/routes/project/user/createNewState", createNewStateRouter); 
app.use("/api/routes/project/user/createNewTask", createNewTaskRouter); 

app.listen(process.env.PORT, () =>
  console.log(`Server Started on Port:${process.env.PORT}`)
);
