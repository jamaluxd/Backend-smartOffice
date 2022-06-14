// initailization
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose.connect(process.env.Mongo_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Conntected to Database"));

app.use(express.json());

const employeeRouter = require("./routes/employee/user");

app.use("/routes/employee/user", employeeRouter);

app.listen(process.env.PORT, () => console.log("Server Started"));
