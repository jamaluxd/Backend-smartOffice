const express = require('express');
// import alert from 'alert';
const router = express.Router();
const { Evaluation } = require('../../../models/evaluation_schema');
// Middlewares
const checkLogin = require('../../../middlewares/checkLogin');
// const checkAdmin = require('../../../middlewares/checkIsAdmin.js');

const createEvaluation = async (req, res, next) => {
    let evaluated_employees = await Evaluation.findOne({employee_id: req.body.employee_id});

    console.log("Evaluated employees are:----->>>>", evaluated_employees);
    
    if (evaluated_employees) {
        return res.status(404).send({
            "status": 404,
            "message": "This Employee already Evaluiated!",
            "evaluated_employees": evaluated_employees,
        });

    } else{
        req.body.created_at = new Date();
        req.body.evaluator_id = req.id;
        // console.log(req.id);
        const evaluated_data = new Evaluation(req.body);
        // console.log("Evaluated data are", evaluated_data);

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
    }

};

const showAllEvaluation = async (req, res) => {
    const id = req.id;
    console.log("Evaluator ID from token", id);
    const show_all_evaluated_data = await Evaluation.find({
        evaluator_id: id
    })
        // .populate("employee_id", "name")
        .populate({ path: 'employee_id', select: 'name' })
        //
        .populate({ path: 'employee_autonomous', select: 'title'})
        //
        .populate({ path: 'employee_humble', select: 'title'})
        //
        .populate({ path: 'employee_passionate', select: 'title'})
        //
        .populate({ path: 'employee_honest', select: 'title'})
        //
        .populate({ path: 'employee_relible', select: 'title' })
        //
        .populate({ path: 'employee_creative', select: 'title' })
        //
        .populate({ path: 'employee_confident', select: 'title' })
        //
        .populate({ path: 'employee_eager', select: 'title' })
        //
        .populate({ path: 'employee_positive', select: 'title' })
        //
        .populate({ path: 'developing_part', select: 'title' })
        //
        .populate({ path: 'spoke_up', select: 'title' })
        //
        .populate({ path: 'activity_vocal', select: 'title' })
        //
        .populate({ path: 'information_shared', select: 'title' })
        //
        .populate({ path: 'quick_share_issues', select: 'title' })
        //
        .populate({ path: 'helped_others', select: 'title' })
        //
        .populate({ path: 'skill_improved', select: 'title' })
        //
        .populate({ path: 'developing_on_schedule', select: 'title' })
        //
        .populate({ path: 'leadership_ability', select: 'title' })
        //
        .populate({ path: 'punctional_employee', select: 'title' })
        //
        .populate({ path: 'frequently_dose_off', select: 'title' })
        //
        .populate({ path: 'hearts_someone', select: 'title' })
        //
        .populate({ path: 'unnecessary_talks', select: 'title' })
        //
        .populate({ path: 'unnecessary_activities', select: 'title' })
        //
        .populate({ path: 'keep_equipment_good', select: 'title' })
        
    // console.log("Show all evaluated data", show_all_evaluated_data)

    // var json = [];
    // var tmp;
    // console.log("Length of all evaluated data are:", show_all_evaluated_data.length);
    // for (var i=0; i<show_all_evaluated_data.length; i++){

    // }
    //
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