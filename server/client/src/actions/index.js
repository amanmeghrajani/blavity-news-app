const localIpUrl = require('local-ip-url');
const apiUrl = "https://blavity-news.appspot.com/api/favorites"

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
    return (dispatch) => {
        dispatch(itemsIsLoading());
        
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
    return (dispatch) => {
    fetch(apiUrl, {
        method: "POST",
        body: {id: itemId}
    }).then(function(response) {
        dispatch()
    })
} 
}

export function revokeItemAsFavorite(itemId) {
    return (dispatch) => {
    console("revoke called")
    fetch(apiUrl, {
    method: "DELETE",
    body: {id: itemId}
    }).then(function(response) {
        dispatch()
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