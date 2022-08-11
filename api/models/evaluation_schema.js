const mongoose = require("mongoose");

const EvaluationSchema = new mongoose.Schema({
    employee_id: {
        type: String,
        required: true,
    },

    employee_autonomous: {
        type: Number,
        required: true,
    },

    employee_humble: {
        type: Number,
        required: true,
    },

    employee_passionate: {
        type: Number,
        required: true,
    },

    employee_honest: {
        type: Number,
        required: true,
    },

    employee_relible: {
        type: Number,
        required: true,
    },

    employee_creative: {
        type: Number,
        required: true,
    },

    employee_confident: {
        type: Number,
        required: true,
    },

    employee_eager: {
        type: Number,
        required: true,
    },

    employee_positive: {
        type: Number,
        required: true,
    },

    //-----------------

    developing_part: {
        type: Number,
        required: true,
    },

    spoke_up: {
        type: Number,
        required: true,
    },

    activity_vocal: {
        type: Number,
        required: true,
    },

    information_shared: {
        type: Number,
        required: true,
    },

    quick_share_issues: {
        type: Number,
        required: true,
    },

    helped_others: {
        type: Number,
        required: true,
    },

    skill_improved: {
        type: Number,
        required: true,
    },

    developing_on_schedule: {
        type: Number,
        required: true,
    },

    leadership_ability: {
        type: Number,
        required: true,
    },

    punctional_employee: {
        type: Number,
        required: true,
    },

    frequently_dose_off: {
        type: Number,
        required: true,
    },

    hearts_someone: {
        type: Number,
        required: true,
    },

    unnecessary_talks: {
        type: Number,
        required: true,
    },

    unnecessary_activities: {
        type: Number,
        required: true,
    },

    keep_equipment_good: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
    }

});

module.exports.Evaluation = mongoose.model("Evaluation", EvaluationSchema);