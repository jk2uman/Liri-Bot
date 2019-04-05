require("dotenv").config();
//vars
var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
//var Spotify = require('spotify-web-api-node');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
//creates log.txt file
var filename = './';
//NPM module used to write output to console and log.txt simulatneously
var log = require('simple-node-logger').createSimpleFileLogger(filename);
log.setLevel('all');

var chalk = require('chalk');
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
            bandsInTown(secondaryCommand);
            break;

        case "spotify-this-song":
            songSpotify(secondaryCommand);
            break;

        case "movie-this":
            getMovie(secondaryCommand);
            break;

        case "do-what-it-says":
            whatItSays();
            break;
    }
 //Bands In Town

 function bandsInTown(secondaryCommand) {

if ("concert-this")
{
    var artist="";
    for (var i=3; i < process.argv.length; i++)
    {
        artist+=process.argv[i];
    }
}
else
{
    artist = secondaryCommand
}

var queryUrl = "https://rest.bandsintown.com/artists/"+ artist +"/events?app_id=codingbootcamp";

request(queryUrl, function(error, response, body) {

    if (!error && response.statusCode === 200) {
  
      var JS = JSON.parse(body);
      for (i = 0; i < JS.length; i++)
      {
        var dateTime = JS[i].datetime;
          var month = dateTime.substring(5,7);
          var year = dateTime.substring(0,4);
          var day = dateTime.substring(8,10);
          var dateForm = month + "/" + day + "/" + year
    
        display(chalk.blue("\n---------------------------------------------------\n"));
        display(chalk.green("Name: " + JS[i].venue.name));
        display(chalk.green("City: " + JS[i].venue.city));
        if (JS[i].venue.region !== "")
        {
          display(chalk.green("Country: " + JS[i].venue.region));
        }
        display(chalk.green("Country: " + JS[i].venue.country));
        display(chalk.green("Date: " + dateForm));
        display(chalk.blue("\n---------------------------------------------------\n"));
  
      }
    }
  });
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

