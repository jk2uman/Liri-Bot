require("dotenv").config()
exports.spotifykey = {
    id: process.env.Client_ID,
    secret:process.env.Client_SECRET
};

exports.omdb = {
    key: process.env.OMDB_KEY
};