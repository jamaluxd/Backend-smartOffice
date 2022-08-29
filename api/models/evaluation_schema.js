const mongoose = require("mongoose");
const { option } = require('./evaluation_option_schema')

const EvaluationSchema = new mongoose.Schema({
    evaluator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee',
        required: true,
    },

    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee',
        required: true,
    },

    employee_autonomous: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'option',
        required: true,
    },

    employee_humble: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'option',
        required: true,
    },

    employee_passionate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'option',
        required: true,
    },

    employee_honest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'option',
        required: true,
    },

    employee_relible: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'option',
        required: true,
    },

    employee_creative: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'option',
        required: true,
    },

    employee_confident: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'option',
        required: true,
    },

    employee_eager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'option',
        required: true,
    },

    employee_positive: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'option',
        required: true,
    },

    //-----------------

    developing_part: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'option',
        required: true,
    },

    spoke_up: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'option',
        required: true,
    },

    activity_vocal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'option',
        required: true,
    },

    information_shared: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'option',
        required: true,
    },

    quick_share_issues: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'option',
        required: true,
    },

    helped_others: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'option',
        required: true,
    },

    skill_improved: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'option',
        required: true,
    },

    developing_on_schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'option',
        required: true,
    },

    leadership_ability: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'option',
        required: true,
    },

    punctional_employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'option',
        required: true,
    },

    frequently_dose_off: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'option',
        required: true,
    },

    hearts_someone: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'option',
        required: true,
    },

    unnecessary_talks: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'option',
        required: true,
    },

    unnecessary_activities: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'option',
        required: true,
    },

    keep_equipment_good: {
         type: mongoose.Schema.Types.ObjectId,
        ref: 'option',
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
    }

});

module.exports.Evaluation = mongoose.model("Evaluation", EvaluationSchema);