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

// Routes
// Admin
const createNewEmployeeRouter = require("./api/routes/employee/admin/create_new_emplyee.js");
const updateEmployeeRouter = require("./api/routes/employee/admin/update_info_employee.js");
const createNewDesignationRouter = require("./api/routes/designation/admin/create_new_designation.js");
const createNewDepartmentRouter = require("./api/routes/department/admin/create_new_department.js");
const updateDesignationRouter = require("./api/routes/designation/admin/update_a_designation.js");
const updateDepartmentRouter = require("./api/routes/department/admin/update_a_department.js");
// User
const showAllemployeesRouter = require("./api/routes/employee/user/show_all_employees.js");
const userLoginRouter = require("./api/routes/employee/user/user_login.js");
const userLogoutRouter = require("./api/routes/employee/user/user_logout.js");
const showAllDesignationsRouter = require("./api/routes/designation/user/show_all_designations.js");
const showAllDepartmentsRouter = require("./api/routes/department/user/show_all_departments.js");
const viewEmployeeProfileRouter = require("./api/routes/employee/user/view_user_profile.js");

// API Links
// Admin
app.use("/routes/employee/admin/createNewEmployee", createNewEmployeeRouter);
app.use("/routes/employee/admin/updateEmployee", updateEmployeeRouter);
app.use(
  "/routes/designation/admin/createNewDesignation",
  createNewDesignationRouter
);
app.use(
  "/routes/department/admin/createNewDepartment",
  createNewDepartmentRouter
);
app.use("/routes/designation/admin/updateDesignation", updateDesignationRouter);
app.use("/routes/department/admin/updateDepartment", updateDepartmentRouter);
// User
app.use("/routes/employee/user/showAllEmployees", showAllemployeesRouter);
app.use("/routes/employee/user/userLogin", userLoginRouter);
app.use("/routes/employee/user/userLogout", userLogoutRouter);
app.use(
  "/routes/designation/user/showAllDesignations",
  showAllDesignationsRouter
);
app.use("/routes/department/user/showAllDepartments", showAllDepartmentsRouter);
app.use("/routes/employee/user/viewUserProfile", viewEmployeeProfileRouter);

app.listen(process.env.PORT, () => console.log("Server Started"));
