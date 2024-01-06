const express = require('express')
const router = express.Router()
const Membership = require('../models/membership_model')

router.get('/memberships', async(req, res) => {
    try{
            const memberships = await Membership.find()
            res.json(memberships)
    }catch(err){
        res.send('Error' + err)
    }
}) 

module.exports = router