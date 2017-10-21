'use strict';
var isPopping = require("./popping");
const yelp = require('yelp-fusion');

yelp.accessToken(process.env.CLIENT_ID, process.env.CLIENT_SECRET).then(response => {
    const client = yelp.client(response.jsonBody.access_token);

    client.search({
        term: 'food', // 'food, fastfood' for quickbit and 'food, dine-in for sitting'
        latitude: 37.771908,
        longitude: -122.409332,
        price: 1,
        categories: '', // fastfood or anything else
        limit: 50,
        open_now: true,
        radius: 2000, // greater distance < 5000, smaller is < 1500
        attributes: ''
    // categories: 'Mexican'
    }).then(resp => {
        // for (var i = 0; i < response.jsonBody.businesses.length; i++){
        //   console.log(response.jsonBody.businesses[i].categories);
        // }
        // console.log(response.jsonBody.businesses);
        // console.log(ratings(response.jsonBody.businesses));
        // let list = ratings(response.jsonBody.businesses);
        // isPopping(response.jsonBody.businesses).then(result => {
        // });
    });
}).catch(e => {
    console.log(e);
});


var ratings = function(restaurantsList) {
    const ratingsArray = [];
    for (let i = 0; i < restaurantsList.length; i++) {
        if (restaurantsList[i].rating >= 4 && restaurantsList[i].review_count > 100) {
            ratingsArray.push(restaurantsList[i]);
        }
    }
    return ratingsArray;
};


// Parameters needed:
// (from props) --
// -> price ($, $$, $$$, $$$$) --
// -> lat, lon --
// -> Cuisine (different types) --
// -> poppin by reviews ( > 150)
//
// (automatic)
// -> open now --
// -> radius --
// -> ratings --
