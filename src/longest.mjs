import fs from "fs";

// load the raw text dump of liked songs
const text = fs.readFileSync("liked-songs.json")

// convert to json object we can work with
const liked = JSON.parse(text)

const longest = liked
    .sort((a, b) => a.track.duration_ms - b.track.duration_ms)    // sort low to high
    .map(item => {
        const mins=Math.floor(item.track.duration_ms / 60000)
        const secs=Math.round(item.track.duration_ms % 60000 / 1000)
        const len=`${mins}m${secs}s`
        return [item.track.name, len].join(" : ");
    })

console.log(longest.join("\n"))
