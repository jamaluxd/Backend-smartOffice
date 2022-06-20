const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  position: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  admin: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("employee", EmployeeSchema);
