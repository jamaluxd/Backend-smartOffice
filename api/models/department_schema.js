const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  active_status: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("department", DepartmentSchema);
