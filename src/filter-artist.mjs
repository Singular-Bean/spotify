import fs from "fs";
import readline from "readline"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// load the raw text dump of liked songs
const text = fs.readFileSync("liked-songs.json")

// convert to json object we can work with
const liked = JSON.parse(text)

rl.question('Enter artist name: ', (artist) => {
    rl.close();

    const by_artist = liked
        .sort((a, b) => a.track.popularity - b.track.popularity)    // sort low to high
        .filter(entry => {
            return entry.track.artists.some(a => a.name === artist)
        })

    console.log(by_artist)
});

