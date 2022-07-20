const express = require('express');
const { Evaluation } = require('../../models/evaluation_schema');
const router = express.Router();

const createEvaluation = async (req, res) => {
    const evaluated_data = new Evaluation(req.body);

    try{
        await evaluated_data.save();
        return res.status(201).send("Evaluated successfully!");
    } catch (err) {
        return res.status(400).send("Sorry! Something went wrong!");
    }
};

router.route('/')
    .post(createEvaluation);


module.exports = router;