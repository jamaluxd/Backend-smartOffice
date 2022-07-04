const mongoose = require("mongoose");

const ModuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  active_status: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("module", ModuleSchema);