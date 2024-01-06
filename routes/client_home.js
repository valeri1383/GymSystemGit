const express = require('express')
const router = express.Router()

router.get("/basic", (req, res ) => {
    res.render('basic_client')
})

router.get("/standart", (req, res ) => {
    res.render('standart_client')
})

router.get("/premium", (req, res ) => {
    res.render('premium_client')
})

router.get("/membership", (req, res ) => {
    res.render('membership_page')
})



module.exports = router