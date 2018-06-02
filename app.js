/* THIS FILE CONTAINS A SAMPLE SERVERSIDE SERVER TO RUN YELP API */
const express       = require('express');
const yelp         = require('yelp-fusion');
const bodyParser    = require('body-parser');

const app = express()

const client = yelp.client('eJQDGA8rJmZccilGqYYQi50XL3mgD6Hl4BSBGzSLdahjnSY5YeQaRzaQ8B_H40SXSFn4cercom0G9AyCDAob3xLP8YxMZAcbclDcoUth0ElFuvjxjLmOW4_2ecMQW3Yx');



app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    client.search({
        term:'restaurants',
        location: 'sausalito, ca'
      })
      .then(response => {
        let businesses = response.jsonBody['businesses'];
        
        // FILTER THE RESTUARANT TO SAUSALITO, CA
        let sausalitoRestaurants = businesses.filter((business) => {
            return business.location.city = 'sausalito';
        });
        let result = [];

        sausalitoRestaurants.forEach(( restaurant ) => {
            result.push({
                name: restaurant.name,
                position: {
                    lat: restaurant.coordinates.latitude,
                    lng: restaurant.coordinates.longitude
                },
                rating: restaurant.rating,
                address: restaurant.location.address1,
                image: restaurant.image_url

            });
        })
        res.send(result);
    
      }).catch(e => {
        console.log(e);
      });
  
})




app.listen(3333, () => {
    console.log('server is runing on 3333')
})