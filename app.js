const request = require('request');
const axios = require('axios');
var express = require('express');
var cors = require("cors");
var https = require("https");
var SpotifyWebApi = require('spotify-web-api-node');
var geohash = require('ngeohash');
var app = express();
var server = https.createServer(app);
app.use(cors());
app.use('/',express.static('./public'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE ');
    res.header("Access-Control-Allow-Headers",'X-Requested-With,Content-Type')
    next();
});
var spotifyApi = new SpotifyWebApi({
  clientId: '4abbb9fb004449beb8764583f576cdbd',
  clientSecret: 'f637fcf1631c41e0af7f029cee9b02ea',
});


app.get('/Autocomplete',function(req,res){
   
    var keyword = req.query.keyword;
    var Url1 = "https://app.ticketmaster.com/discovery/v2/suggest?apikey=YHrOPA88gew8bEwvRxyNUd97UiZhaAoJ&keyword="+keyword;
    axios.get(Url1).then(function(response){
       // console.log("response")
    var result=response.data;
        
    res.send(result);
    });   
    
    
    
});

app.get('/lat', function(req, res){
    let location=req.query.LocationValue;
    let keyword = req.query.keyword;
    let option_segment_id = req.query.genre;
    let unit = req.query.distanceUnit;
    let radius = req.query.distanceValue;
    if(option_segment_id=="ALL")
        {
            option_segment_id="";
        }
    let Url= "https://maps.googleapis.com/maps/api/geocode/json?address="+location+"&key=AIzaSyBrjAE1L-oMF6OE_8fNRnV4im2sgcOtwmo";
    axios.get(Url).then(function(response){
    var result=response.data;
    var lat = result.results[0].geometry.location.lat;
    var lon = result.results[0].geometry.location.lng;
    var encoded=geohash.encode(lat, lon);
    var sortoptions = "date,asc"
    let Url1 = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=YHrOPA88gew8bEwvRxyNUd97UiZhaAoJ"+"&keyword="+keyword+"&segmentId="+option_segment_id+"&radius="+radius+"&unit="+unit+"&geoPoint="+encoded+"&sort="+sortoptions;
    axios.get(Url1).then(function(response){
    res.send(JSON.stringify(response.data));
    });    
    });   
});


app.get('/lat1', function(req, res){
    var sortoptions = "date,asc"
    let keyword = req.query.data.keyword;
    let option_segment_id = req.query.data.genre;
    let unit = req.query.data.distanceUnit;
    let radius = req.query.data.distanceValue;
    let lat = req.query.latlng.lat;
    let lon = req.query.latlng.lon;
    var encoded=geohash.encode(lat, lon);
    if(option_segment_id=="ALL")
        {
            option_segment_id="";
        }
    let Url1 = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=YHrOPA88gew8bEwvRxyNUd97UiZhaAoJ"+"&keyword="+keyword+"&segmentId="+option_segment_id+"&radius="+radius+"&unit="+unit+"&geoPoint="+encoded+"&sort="+sortoptions;
   
    axios.get(Url1).then(function(response){
    var result=response.data;
    res.send(JSON.stringify(response.data));
    });    
});   

app.get('/GooglePictures', function(req, res){

    var searchKey = req.query.Artistname;

  let Url1 = "https://www.googleapis.com/customsearch/v1?q="+searchKey+"&cx=0015790696203447869191:0znzpjn8uxi&imgSize=huge&imgType=news&num=9&searchType=image&key=AIzaSyBrjAE1L-oMF6OE_8fNRnV4im2sgcOtwmo"
 axios.get(Url1).then(function(response){
 var result=response.data;
res.send(JSON.stringify(response.data));
 });    
});

app.get('/Event', function(req, res){
    let ID = req.query.ID;
    let Url1 = "https://app.ticketmaster.com/discovery/v2/events/"+ID+"?apikey=YHrOPA88gew8bEwvRxyNUd97UiZhaAoJ";
    axios.get(Url1).then(function(response){
    var result=response.data;
    res.send(JSON.stringify(response.data));
    });    
}); 

app.get('/Venue', function(req, res){
    let venue = req.query.Venuename;
    let Url1 = "https://app.ticketmaster.com/discovery/v2/venues"+"?apikey=YHrOPA88gew8bEwvRxyNUd97UiZhaAoJ"+"&keyword="+venue;
    axios.get(Url1).then(function(response){
    res.send(JSON.stringify(response.data));
    });    
   
});


app.get('/UpcomingEvents', function(req, res){
    console.log("in upcoming Events")
    let venue=req.query.VenueName
    console.log(venue)
    let Url1 = "https://api.songkick.com/api/3.0/search/venues.json?query="+venue+"&apikey=vX9zno4TRytrie56";
    axios.get(Url1).then(function(response){
    let result=response.data;
    if(result.resultsPage.results.venue==undefined){
        console.log("inside if for the missing venue")
        res.send("0");
    }

        let id = result.resultsPage.results.venue[0].id;
    
    console.log(id)
    let Url2 = "https://api.songkick.com/api/3.0/venues/"+id+"/calendar.json?apikey=vX9zno4TRytrie56";
    console.log(Url2)
    axios.get(Url2).then(function(response){
        console.log(response.data)
        res.send(JSON.stringify(response.data));
    });  

   });    
   
});



app.get('/spotifymusic', function(req, res){
        console.log("in the spotifyMusic")
        let name = req.query.name;
        spotifyApi.searchArtists(name).then(
        function(data) {
            res.send(data)
              },
        function(err) {
                        console.log('Something went wrong..', err.message);
                        spotifyApi.clientCredentialsGrant().then(
                            function(data) {
                                    spotifyApi.setAccessToken(data.body['access_token']);
                                    spotifyApi.searchArtists(name).then(
                                        function(data) {
                                        res.send(data)
                                       },
                                        function(err) {
                                         console.log('Something went wrong again after retrieving an access token',err.code);
                                        });
           
                             },
                            function(err) {
                             console.log('Something went wrong when retrieving an access token',err.code);
                            } );
                    }
);
});


  

app.listen(3000);
module.exports=app;
