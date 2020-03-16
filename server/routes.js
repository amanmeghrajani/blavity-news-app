const express = require('express')
const router = express.Router()
const controller = require('./controllers/index')

router.get('/favorites', controller.getFavorites)
router.post('/favorites', controller.addFavorite)
router.delete('/favorites', controller.removeFavorite)

module.exports = router