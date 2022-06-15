// initailization
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(express.json());

// connect to the Database
mongoose.connect(process.env.Mongo_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Conntected to Database"));



const showAllemployeesRouter = require("./routes/employee/user/show_all_employees");
const createNewemployeeRouter= require("./routes/employee/user/create_new_emplyee");

app.use("/routes/employee/user/showAllEmployees", showAllemployeesRouter);
app.use("/routes/employee/user/createNewEmployee", createNewemployeeRouter);

app.listen(process.env.PORT, () => console.log("Server Started"));
