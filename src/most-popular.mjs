import fs from "fs";

// load the raw text dump of liked songs
const text = fs.readFileSync("liked-songs.json")

// convert to json object we can work with
const liked = JSON.parse(text)

const most_popular = liked
    .sort((a, b) => a.track.popularity - b.track.popularity)    // sort low to high
    .map(item => [item.track.name, item.track.popularity].join(":"))

console.log(most_popular.join("\n"))
