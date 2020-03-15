const addFavoritesController = require('./AddFavoriteController')
const removeFavoritesController = require('./RemoveFavoriteController')
const checkFavoriteController = require('./CheckFavoriteController')

module.exports = {
    addFavorite : addFavoritesController,
    removeFavorite : removeFavoritesController,
    checkFavorite : checkFavoriteController
}