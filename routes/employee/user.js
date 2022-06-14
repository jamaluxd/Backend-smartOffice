const express = require('express');
const router = express.Router();

const User =  require('../../models/employee/user');

// get all

router.get('/', async (req, res) => {
    

    User.find({}, (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            res.send({
                "message": err.message
            });
        }
    })

})

router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        dept: req.body.dept,
        cgpa: req.body.cgpa
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})
module.exports = router;