const mongoose = require('mongoose')
const  Schema = mongoose.Schema;

const clientSchema = new Schema({

    name:{
        type:String,
        required:true
    },

    surname:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    membership:{
        type:String,
        required: false
    },

    classes:{
        type:String,
        required: false
    },
},{timestamps:true}

);

module.exports = mongoose.model('Client', clientSchema)

