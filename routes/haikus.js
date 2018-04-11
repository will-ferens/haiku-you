const express = require('express')
const router = express.Router()

const queries = require('../queries')



router.get('/haikus', (req, res, next) => {
    queries.list().then(haikus => {
        res.json({haikus})
    }).catch(next)
})

module.exports = router