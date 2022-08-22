const express = require('express');
const { Evaluation } = require('../../../models/evaluation_schema');
const router = express.Router();
// Middlewares
const checkLogin = require('../../../middlewares/checkLogin');
// const checkAdmin = require('../../../middlewares/checkIsAdmin.js');

const createEvaluation = async (req, res, next) => {
    req.body.created_at = new Date();
    req.body.evaluator_id = req.id;
    console.log(req.id);
    const evaluated_data = new Evaluation(req.body);
    console.log("Evaluated data are", evaluated_data);

    try {
        await evaluated_data.save();
        return res.status(201).send({
            "status": 201,
            "message": "Evaluated successfully!",
            "body": evaluated_data
        });
    } catch (err) {
        return res.status(400).send("Sorry! Something went wrong!");
        next(err);
    }
};

const showAllEvaluation = async (req, res) => {
    const id = req.id;
    console.log("Evaluator ID from token",id);
    const show_all_evaluated_data = await Evaluation.find({
        // evaluator_id : id
    })
    // .populate("employee_id", "name")
    .populate({ path: 'employee_id', select: 'name' });
    res.send(show_all_evaluated_data);
    // console.log(show_all_evaluated_data);
};

// Show evaluation by employee ID
//
// const showEvaluationByEvaluatorId = async (req, res) => {
//     const evaluator_id = req.id;
//     console.log(`Evaluator id are: ${evaluator_id}`);

//     try {
//         const evaluator = await Evaluation.findById(evaluator_id);
//         if (!evaluator) return res.status(404).send("Invalid evaluator Id");
//         res.send(evaluator);

//     } catch (err) {
//         return res.status(404).send("Id not found!", err);
//     }
// };

// evaluator_id comes from database and req.id comes from token

// Show evaluation by employee ID
//
// const showEvaluationByEmployeeId = async (req, res) => {
//     const employee_id = req.params.id;
//     console.log(`Employee id are: ${employee_id}`);

//     try {
//         const employee = await Evaluation.findById(employee_id);
//         if (!employee) return res.status(404).send("Invalid employee Id");
//         res.send(employee);

//     } catch (err) {
//         return res.status(404).send("Id not found!", err);
//     }
// };


// Update evaluation
//
// const updateEvaluationByEmployeeId = async (req, res) => {
//     const id = req.params.id;
//     const updateData = req.body;

//     try {
//         const employee = await Evaluation.findByIdAndUpdate(id, updateData, { new: true, useFindAndModify: false });
//         if (!employee) return res.status(404).send("Id not found for update!");
//         res.send(employee);

//     } catch (err) {
//         return res.status(404).send("Id not found!", err);
//     }
// }


//Delete evaluation
// const deleteEvaluationByEmployeeId = async (req, res) => {
//     const id = req.params.id;

//     try {
//         employee = await Evaluation.findByIdAndDelete(id);
//         if (!employee) return res.status(404).send('Id not found for delete!');
//         res.send(employee);

//     } catch (err) {
//         return res.status(404).send('Id not found!');
//     }
// };

router.route('/')
    .post(checkLogin, createEvaluation)
    

    router.route('/showData')
    .post(checkLogin, showAllEvaluation)


// router for show evaluation by id, update evaluation and delete evaluation    
// router.route('/:id')
//     .get(showEvaluationByEvaluatorId)
//     .put(updateEvaluationByEmployeeId)
//     .delete(deleteEvaluationByEmployeeId)


module.exports = router;