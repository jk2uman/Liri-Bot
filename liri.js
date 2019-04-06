// Use dotenv to read .env vars into Node
require("dotenv").config();
//vars
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var usersCommand = process.argv[2];
var secondaryCommand = process.argv[3];
//Switch command
function userCommand(usersCommand, secondaryCommand) {    
    //choose which statement (userCommand) to switch to and execute
    switch (usersCommand) {
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
        whatItSays(secondaryCommand);
        break;
        default: 
        console.log("It Didn't Work")
    }
}
userCommand(usersCommand, secondaryCommand);
//Bands In Town
 function concertThis() {
     axios.
        get("https://rest.bandsintown.com/artists/"+ secondaryCommand +"/events?app_id=codingbootcamp"
        )
     .then(function (response) {
         for (var i = 0; i < response.data.length; i++) {
             
             console.log("Venue Name: "+ response.data[i].venue.name);
             console.log("Venue Location: "+ response.data[i].venue.city + ", " + response.data[i].venue.country);
             console.log("Date of the Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
         }
         console.log('\n');
     });
} 
 //Spotify - command: spotify-this-song
 function songSpotify() {
     spotify
        .search({type: "track", query: secondaryCommand})
        .then(function(response){
            if (response.tracks.items.length > 0) {

            }
            console.log("Artist: " + usersSong[0].artists[0].name);
            console.log("Song Name: " + usersSong[0].name);
            console.log("Preview Link: " + usersSong[0].preview_url);
            console.log("Album: " + usersSong[0].album.name);
        });
}
    
 //OMDB Movie - command: movie-this
 function getMovie() {
     var url = ("http://www.omdbapi.com/?i=" + secondaryCommand + "&apikey=" + keys.omdb.key) 
// API key "http://www.omdbapi.com/?i=tt3896198&apikey=6fc1a4bf"
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

    });
 }

//Function for command do-what-it-says; reads and splits random.txt file
//command: do-what-it-says
function whatItSays() {
    //Read random.txt file
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) throw err;
        var readArray = data.split(",");
        
        secondaryCommand = readArray[1];
        songSpotify();
    });
}
    
