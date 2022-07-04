const mongoose = require("mongoose");

const TaskAssignedSchema = new mongoose.Schema({
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
  active_status: {
    type: Boolean,
    required: true,
  },
  asign_to: {
    type: TaskAssignedSchema,
    required: false,
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
  active_status: {
    type: Boolean,
    required: true,
  },
  tasks: {
    type: TaskSchema,
    required: true,
  },
});

const ProjectAssignSchema = new mongoose.Schema({
  assign_date: {
    type: Date,
    required: true,
  },
  assigned_employee_id: {
    type: String,
    required: true,
  },
  assigned_project_role_id: {
    type: String,
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
  description: {
    type: String,
    required: true,
  },
  current_version: {
    type: String,
    required: true,
  },
  current_status: {
    type: String,
    required: true,
  },
  schedule_link: {
    type: String,
    required: true,
  },
  git_link: {
    type: String,
    required: true,
  },
  create_date: {
    type: Date,
    required: true,
  },
  active_status: {
    type: Boolean,
    required: true,
  },
  assign_to: {
    type: ProjectAssignSchema,
    required: true,
  },
  states: {
    type: StateSchema,
    required: true,
  },
});

module.exports = mongoose.model("project", ProjectSchema);
