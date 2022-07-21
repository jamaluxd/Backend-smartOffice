const express = require('express');
const { Evaluation } = require('../../models/evaluation_schema');
const router = express.Router();

const createEvaluation = async (req, res, next) => {
    const evaluated_data = new Evaluation(req.body);
    console.log("Evaluated data are", evaluated_data);

    try {
        await evaluated_data.save();
        return res.status(201).send("Evaluated successfully!");
    } catch (err) {
        return res.status(400).send("Sorry! Something went wrong!");
        next(err);
    }
};

const showAllEvaluation = async (req, res) => {
    const show_all_evaluated_data = await Evaluation.find().sort({employee_id: 1});
    res.send(show_all_evaluated_data);
};

const showEvaluationByEmployeeId = async (req, res) => {
    console.log("Request from body", req.params);
    const employee_id = req.params.id;
    console.log("Employees Id are",employee_id);

    try{
        const employee = await Evaluation.findById(employee_id);
        if(!employee) return res.status(404).send("Invalid employee Id");
        res.send(employee);

    } catch( err ) {
        return res.status(404).send("Id not found!", err);
    }
};

router.route('/')
    .post(createEvaluation)
    .get(showAllEvaluation)

router.route('/employeeId')
    .get(showEvaluationByEmployeeId)

module.exports = router;