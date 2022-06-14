const mongoose  = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    dept:{
        type: String,
        required: true
    },

    cgpa:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('user', userSchema)