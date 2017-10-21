var express = require("express");
const router = express.Router();

// YOUR API ROUTES HERE
var ratings = function(restaurantsList) {
    const ratingsArray = [];
    for (let i = 0; i < restaurantsList.length; i++) {
        if (restaurantsList[i].rating >= 4 && restaurantsList[i].review_count > 100) {
            ratingsArray.push(restaurantsList[i]);
        }
    }
    return ratingsArray;
};

// SAMPLE ROUTE
router.use('/users', (req, res) => {
    res.json({ success: true });
});

router.use('/', (req, res) => {
    // res.json({success: req.query});
    // res.send({success: req.query});
    const yelp = require('yelp-fusion');

    yelp.accessToken(process.env.CLIENT_ID, process.env.CLIENT_SECRET).then(response => {
        const client = yelp.client(response.jsonBody.access_token);

        client.search({
            // term: 'food' + String(req.query.fast), // 'food, fastfood' for quickbit and 'food, dine-in for sitting'
            // latitude: Number(req.query.latitude),
            // longitude: Number(req.query.longitude),
            // price: Number(req.query.price),
            // categories: String(req.query.cuisine), // cuisine
            // limit: 50,
            // open_now: true,
            // radius: Number(req.query.distance), // greater distance < 5000, smaller is < 1500
            // attributes: ''
            // hello
            term: 'food, ' + req.query.fast, // 'food, fastfood' for quickbit and 'food, dine-in for sitting'
            latitude: req.query.latitude,
            longitude: req.query.longitude,
            price: req.query.price,
            categories: req.query.cuisine, // cuisine
            limit: 50,
            open_now: true,
            radius: req.query.distance, // greater distance < 5000, smaller is < 1500
            attributes: ''
        // categories: 'Mexican'
        }).then(resp => {
            // res.send(resp.jsonBody.businesses);
            // console.log(resp);
            res.send(ratings(resp.jsonBody.businesses));
            console.log(req.query);
        });
    }).catch(e => {
        console.log(e);
    });
});


module.exports = router;
