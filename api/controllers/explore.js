const twit = require('twit');
const twitterConfig = require('../config/twit-config')

class explore{

    constructor(){ }

    async getExploreTweets(req,res){
        var tweet= new twit(twitterConfig);

        var params = { 
        q: 'covid-19 since:2010-04-01 country:india', 
        count: 10,
        lang: 'en',
        result_type: "mixed"
        };

        await tweet.get('search/tweets', params , gotData)

        function gotData(err, data, response) {
            res.send(data.statuses);
        
            //   //favourite the extracted tweets
            // for(let i = 0; i < data.statuses.length; i++){
            //   // Get the tweet Id from the returned data
            //   let id = { id: data.statuses[i].id_str }
            
            //   // Try to Favorite the selected Tweet
            //   tweet.post('favorites/create', id, function(err, response){
            //     if(err){
            //       console.log(err[0].message);
            //     }
            //     else{
            //       let username = response.user.screen_name;
            //       let tweetId = response.id_str;
            //       console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
            //     }
            //   });
            // }
        }
    }
}

module.exports = new explore()