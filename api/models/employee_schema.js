const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    department_id: {
        type: String,
        required: true,
    },

    department: {
        type: String,
        required: false,
    },

    designation_id: {
        type: String,
        required: true,
    },

    designation: {
        type: String,
        required: false,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    contect_number: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: false,
    },

    password: {
        type: String,
        required: true,
    },

    admin: {
        type: Boolean,
        required: true,
    },

    active_status: {
        type: Boolean,
        required: true,
    },
});

module.exports = mongoose.model("employee", EmployeeSchema);