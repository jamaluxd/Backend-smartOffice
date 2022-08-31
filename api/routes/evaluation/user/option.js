const express = require('express');
// const mongoose = require('mongoose')
const router = express.Router();
const Option  = require('../../../models/evaluation_option_schema');
const checkLogin = require('../../../middlewares/checkLogin');
// const checkAdmin = require('../../../middlewares/checkIsAdmin.js');


const showOption = async ( req, res ) => {
    const show_all_options = await Option.find();
    // console.log(show_all_options);
    res.send(show_all_options);
};

router.route('/showOptions')
      .post(checkLogin, showOption)


module.exports = router;