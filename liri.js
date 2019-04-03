require("dotenv").config();
//vars
var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
var Concert = require("concert");
//var Spotify = require('spotify-web-api-node');
var Spotify = require(' https://api.spotify.com');
//creates log.txt file
var filename = './';
//NPM module used to write output to console and log.txt simulatneously
var log = require('simple-node-logger').createSimpleFileLogger(filename);
log.setLevel('all');

//argv[2] chooses users actions; argv[3] is input parameter, ie; movie title
var usersCommand = process.argv[2];
var secondaryCommand = process.argv[3];

//concatenate multiple words in 2nd user argument
for (var i = 4; i < process.argv.length; i++) {
    secondaryCommand += '+' + process.argv[i];
}

//Switch command
function mySwitch() {

    //choose which statement (userCommand) to switch to and execute
    switch (usersCommand) {

        case "concert-this":
            concertGo();
            break;

        case "spotify-this-song":
            songSpotify();
            break;

        case "movie-this":
            getMovie();
            break;

        case "do-what-it-says":
            whatItSays();
            break;
    }
 //Spotify - command: spotify-this-song
 function songSpotify(trackName) {
     var trackName = process.argv[4];
     
 }
 //OMDB Movie - command: movie-this
 function getMovie() {
    var movieName = secondaryCommand;
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var body = JSON.parse(body);

            //Simultaneously output to console and log.txt via NPM simple-node-logger
            logOutput('================ Movie Info ================');
            logOutput("Title: " + body.Title);
            logOutput("Release Year: " + body.Year);
            logOutput("IMdB Rating: " + body.imdbRating);
            logOutput("Country: " + body.Country);
            logOutput("Language: " + body.Language);
            logOutput("Plot: " + body.Plot);
            logOutput("Actors: " + body.Actors);
            logOutput("Rotten Tomatoes Rating: " + body.Ratings[2].Value);
            logOutput("Rotten Tomatoes URL: " + body.tomatoURL);
            logOutput('==================THE END=================');

        } else {
            //else - throw error
            console.log("Error occurred.")
        }
        //Response if user does not type in a movie title
        if (movieName === "Mr. Nobody") {
            console.log("-----------------------");
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!");
        }
    });
}

//Function for command do-what-it-says; reads and splits random.txt file
//command: do-what-it-says
function whatItSays() {
    //Read random.txt file
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (!error);
        console.log(data.toString());
        //split text with comma delimiter
        var cmds = data.toString().split(',');
    });
}



}   //Closes mySwitch func - Everything except the call must be within this scope

//Call mySwitch function
mySwitch(userCommand);

