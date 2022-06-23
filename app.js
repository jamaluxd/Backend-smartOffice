// initailization
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser())

// connect to the Database
mongoose.connect(process.env.Mongo_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Conntected to Database"));

const showAllemployeesRouter = require("./routes/employee/user/show_all_employees");
const createNewemployeeRouter = require("./routes/employee/admin/create_new_emplyee");
const updateEmployeeRouter = require("./routes/employee/admin/update_info_employee");
const userLoginRouter = require("./routes/employee/user/user_login");
const userLogoutRouter = require("./routes/employee/user/user_logout");

app.use("/routes/employee/user/showAllEmployees", showAllemployeesRouter);
app.use("/routes/employee/admin/createNewEmployee", createNewemployeeRouter);
app.use("/routes/employee/admin/updateEmployee", updateEmployeeRouter);
app.use("/routes/employee/user/userLogin", userLoginRouter);
app.use("/routes/employee/user/userLogout", userLogoutRouter);

app.listen(process.env.PORT, () => console.log("Server Started"));
