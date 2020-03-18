import axios from 'axios';
import qs from 'qs';
const localIpUrl = require('local-ip-url');
const apiUrl = "https://blavity-news.appspot.com/api/favorites"
let lastUrl = ""



function itemsHasErrored(status) {
    return {
        type: 'ERROR',
        statusCode:status
    };
}

function itemsIsLoading() {
    return {
        type: 'LOADING',
    };
}

function itemsFetchDataSuccess(items) {
    return {
        type: 'SUCCESS',
        items: items
    };
}

export function itemsFetchData(url) {
    lastUrl = url
    console.log("called alspp")

    return (dispatch) => {
        dispatch(itemsIsLoading());
        console.log("called alsp")
        let postsPromise = fetch(url, {
            credentials: 'omit',
        }).then((posts) => posts.json())

        let favoritesPromise = fetch(apiUrl)
        .then((favoriteItems) => favoriteItems.json())
        
        Promise.all([postsPromise, favoritesPromise])
        .then((results) => {
            let postItems = results[0]
            let favoriteItems = results[1]
            postItems.articles.forEach(article => {
                   article.isFavorite = favoriteItems.data.includes(article.url)
                })                
            dispatch(itemsFetchDataSuccess(postItems))})
        .catch(() => {
            dispatch(itemsHasErrored())});
        };
}

export function markItemAsFavorite(itemId) {
    console.log(itemId)
    return (dispatch) => {
const data = {"id": itemId};
const options = {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data),
  url: apiUrl 
};
axios(options).then(function(response) {
        itemsFetchData(lastUrl)
    })
}

export function revokeItemAsFavorite(itemId) {
    return (dispatch) => {
        const data = {"id": itemId};
        const options = {
          method: 'DELETE',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          data: qs.stringify(data),
          url: apiUrl 
        };
        axios(options).then(function(response) {
                itemsFetchData(lastUrl)
            }).then(function(response) {
        itemsFetchData(lastUrl)
    })
}
}

export function changeCountry(countryName) {
    return {
        type: 'COUNTRY_CHANGED',
        countryName
    }
}

export function changeCategory(categoryName) {
    return {
        type: 'CATEGORY_CHANGED',
        categoryName
    }
}

export function changePage(activePage) {
    return {
        type: 'PAGE_CHANGED',
        activePage
    }
}
}