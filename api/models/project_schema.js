const mongoose = require("mongoose");

const AssignedSchema = new mongoose.Schema({
  assign_date: {
    type: Date,
    required: true,
  },
  assigned_id: {
    type: String,
    required: true,
  },
  due_date: {
    type: Date,
    required: true,
  },
  active_status: {
    type: Boolean,
    required: true,
  },
});

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  create_date: {
    type: Date,
    required: true,
  },
  asign_to: {
    type: AssignedSchema,
    required: false,
  },

  active_status: {
    type: Boolean,
    required: true,
  },
});

const StateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  create_date: {
    type: Date,
    required: true,
  },
  tasks: {
    type: TaskSchema,
    required: true,
  },
  active_status: {
    type: Boolean,
    required: true,
  },
});

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  create_date: {
    type: Date,
    required: true,
  },
  states: {
    type: StateSchema,
    required: true,
  },
  active_status: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("project", ProjectSchema);
