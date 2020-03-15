const express = require('express')
const router = express.Router()
const controller = require('./controllers/index')


router.get('/', function(req,res,next) {
    router.get('/favorite/:id', controller.checkFavorite)
    router.post('/favorite/:id', controller.addFavorite)
    router.delete('/favorite/:id', controller.removeFavorite)
})


module.exports = router