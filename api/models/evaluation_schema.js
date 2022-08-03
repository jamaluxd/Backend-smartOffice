const mongoose = require("mongoose");

const EvaluationSchema = new mongoose.Schema({
    employee_id: {
        type: Number,
        required: true,
    },

    results: [{
        question: {
            type: Number,
            required: true,
        },

        answer: {
            type: Number,
            required: true,
        },
    }],
});

module.exports.Evaluation = mongoose.model("Evaluation", EvaluationSchema);