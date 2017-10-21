'use-strict';
// var list1 = [{ id: 'taqueria-cancún-san-francisco-5',
//     name: 'Taqueria Cancún',
//     image_url: 'https://s3-media2.fl.yelpcdn.com/bphoto/mj0hcBWZwIZ_ToD3UYfqLQ/o.jpg',
//     is_closed: false,
//     url: 'https://www.yelp.com/biz/taqueria-canc%C3%BAn-san-francisco-5?adjust_creative=AnqSWCHys3gAm-Kdv5c-qQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=AnqSWCHys3gAm-Kdv5c-qQ',
//     review_count: 1916,
//     categories: [ [Object] ],
//     rating: 4,
//     coordinates: { latitude: 37.76047, longitude: -122.41951 },
//     transactions: [],
//     price: '$',
//     location:
//      { address1: '2288 Mission St',
//        address2: '',
//        address3: '',
//        city: 'San Francisco',
//        zip_code: '94110',
//        country: 'US',
//        state: 'CA',
//        display_address: [Array] },
//     phone: '+14152529560',
//     display_phone: '(415) 252-9560',
//     distance: 1555.8516538919998 },
//     { id: 'loving-hut-san-francisco',
//       name: 'Loving Hut',
//       image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/C6m05cX-Qd5Lon6IKwWOLg/o.jpg',
//       is_closed: false,
//       url: 'https://www.yelp.com/biz/loving-hut-san-francisco?adjust_creative=AnqSWCHys3gAm-Kdv5c-qQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=AnqSWCHys3gAm-Kdv5c-qQ',
//       review_count: 560,
//       categories: [ [Object], [Object], [Object] ],
//       rating: 4,
//       coordinates: { latitude: 37.784308, longitude: -122.406015 },
//       transactions: [],
//       price: '$',
//       location:
//        { address1: '865 Market St',
//          address2: 'Ste 12',
//          address3: '',
//          city: 'San Francisco',
//          zip_code: '94103',
//          country: 'US',
//          state: 'CA',
//          display_address: [Array] },
//       phone: '+14159753888',
//       display_phone: '(415) 975-3888',
//       distance: 1409.501171104 } ]
//
// const yelp = require('yelp-fusion');

const yelp = require('yelp-fusion');

// var filterDistance = function(rList1, rList2){
//   var rList0 = rList1.slice();
//   for (var i = 0; i < rList1.length; i++){
//     rList0[i].count = 0;
//     var count = 0;
//     for (var j = 0; j < rList2.length; j++){
//       var distance = getDistanceFromLatLonInKm(rList1[i].coordinates.latitude, rList1[i].coordinates.longitude, rList2[j].coordinates.latitude, rList2[j].coordinates.longitude);
//       // console.log(distance);
//       if (distance < 1){
//         rList0[i].count++;
//       }
//     }
//   }
//   return rList0;
// }
// function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
//   var R = 6371; // Radius of the earth in km
//   var dLat = deg2rad(lat2-lat1);  // deg2rad below
//   var dLon = deg2rad(lon2-lon1);
//   var a =
//     Math.sin(dLat/2) * Math.sin(dLat/2) +
//     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//     Math.sin(dLon/2) * Math.sin(dLon/2)
//     ;
//   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//   var d = R * c; // Distance in km
//   return d;
// }
// function deg2rad(deg) {
//   return deg * (Math.PI/180)
// }

var isPopping = function(restaurantsList) {
    yelp.accessToken(process.env.CLIENT_ID, process.env.CLIENT_SECRET).then(response => {
        const client = yelp.client(response.jsonBody.access_token);
        return (client.search({
            term: 'bars, nightlife', // 'food, fastfood' for quickbit and 'food, dine-in for sitting'
            latitude: 37.771908,
            longitude: -122.409332,
            // price: 1,
            categories: '', // fastfood or anything else
            limit: 50,
            open_now: true,
            radius: 2000, // greater distance < 5000, smaller is < 1500
            attributes: ''
            // categories: 'Mexican'
        }).then(resp => {
            // console.log(response.jsonBody.businesses);
            // console.log(response.jsonBody.businesses.length)
            return resp.jsonBody.businesses;
        }));
    }).catch(e => {
        console.log(e);
    });
};

export default isPopping;
