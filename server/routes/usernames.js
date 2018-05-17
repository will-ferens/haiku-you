const express = require('express')
const router = express.Router()

const queries = require('../queries')

router.get('/', (req, res, next) => {
    queries.list().then(usernames => {
        res.json({usernames})
    }).catch(next)
})

router.get("/:id", (request, response, next) => {
    queries.read(request.params.id).then(haiku => {
        haiku
            ? response.json({haiku})
            : response.status(404).json({message: 'Not found'})
    }).catch(next)
});

router.post("/", (request, response, next) => {
    queries.create(request.body).then(haiku => {
        response.status(201).json({haiku: haiku})
    }).catch(next)
});

router.delete("/:id", (request, response, next) => {
    queries.delete(request.params.id).then(() => {
        response.status(204).json({deleted: true})
    }).catch(next)
})

router.put("/:id", (request, response, next) => {
    queries.update(request.params.id, request.body).then(haiku => {
        response.json({haiku: haiku[0]})
    }).catch(next)
})
module.exports = router
