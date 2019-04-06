// Use dotenv to read .env vars into Node
require("dotenv").config();
//vars
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');

var jsdom = require('jsdom');
const {JSDOM} = jsdom;
const {window} = new JSDOM();
const {document} = new JSDOM('').window;
global.document = document;

var $ = (jQuery = require('jquery')(window));

var users = process.argv[2];
var secondValue = process.argv[3];   
//choose which statement (userCommand) to switch to and execute
    switch (users) {
        case "concert-this":
        concertThis();
        break;
        case "spotify-this":
        spotifySong();
        break;
        case "movie-this":
        getMovie();
        break;
        case "do-what-it-says":
        whatItSays();
        break;
        default: 
        console.log("It Didn't Work")
    }
//Bands In Town
 function concertThis() {
     axios
        .get(
        "https://rest.bandsintown.com/artists/" + secondValue + "/events?app_id=codingbootcamp"
        )
     .then(function (response) {
         $.each(response.data, function(index, value) {
            console.log('Name of the venue', value.venue.name);
            console.log('Venue location', value.venue.country);
            console.log(
              'Date of the Event',
              moment(value.venue.datetime).format('MM-DD-YYYY')
            );
             console.log('\n');
        });
     })
     .catch(function(error) {
        console.log(error);
      });
  }
 //Spotify - command: spotify-this-song
 function spotifySong() {
     spotify
        .search({type: "track", query: secondValue})
        .then(function(response){
            if (response.tracks.items.length > 0) {
                $.each(response.tracks.items, function(index, value) {
                    $.each(value.artists, function(index, value) {
                        console.log("Artist ",value.name);
                    });
                    console.log("Song Name ", value.name);
                    console.log("spotify song url", value.external_url.spotify);
                    console.log("Album ", value.album.name);
                    console.log('\n');
                });
            } else {
                secondValue = "The Sign";
                songSpotify();
            }
        })
        .catch(function(err) {
          console.log(err);
        });
}

    
 //OMDB Movie - command: movie-this
 function getMovie() {
     var url = ("http://www.omdbapi.com/?i=" + secondValue + "&apikey=" + keys.omdb.key) 

    axios
    .get(url)
    .then(function(response) {
        console.log("Title: " + response.data.Title);
        console.log("Year Released: " + response.data.Year);
        console.log("IMDB rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Cast: " + response.data.Actors);

        $each(response.data.Ratings, function(index, value) {
            if (value.Source == 'Rotten Tomatoes') {
                console.log('Rotten Tomatoes Rating', value.Value);
            }
        });
    })        
    .catch(function(error) {
        console.log(error);
      });  
 }
//Function for command do-what-it-says; reads and splits random.txt file
//command: do-what-it-says
function whatItSays() {
    //Read random.txt file
    fs.readFile('random.txt', "utf8", function(err, data) {
        if (err) throw err;
        var readArray = data.split(",");
        
        secondValue = readArray[1];
        songSpotify();
    });
}
    
