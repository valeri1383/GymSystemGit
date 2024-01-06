const mongoose = require('mongoose')

const membershipSchema = new mongoose.Schema({

    type:{
        type:String,
        required:true
    },

    peakTime:{
        type:Boolean,
        default: false
    },

    offpeakTime:{
        type:Boolean,
        default: true
    },

    trainer:{
        type:Boolean,
        default: false
    },

    saunaAccess:{
        type:Boolean,
        default: false
    },

    poolAccess:{
        type:Boolean,
        default: false
    },

});

module.exports = mongoose.model('Membership', membershipSchema)

