const addFavoritesController = require('./AddFavoriteController')
const removeFavoritesController = require('./RemoveFavoriteController')
const getFavoritesController = require('./GetFavoritesController')

module.exports = {
    addFavorite : addFavoritesController,
    removeFavorite : removeFavoritesController,
    getFavorites : getFavoritesController
}