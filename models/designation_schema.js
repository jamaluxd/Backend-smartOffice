const mongoose = require("mongoose");

const DesignationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  rank: {
    type: Number,
    required: true,
  },

  active_status: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("designation", DesignationSchema);
