const mongoose = require("mongoose");

const OptionSchema = new mongoose.Schema({
    point: {
        type: Number,
        require: true
    },
    title: {
        type: String,
        require: true
    },
});

module.exports = mongoose.model("option", OptionSchema);