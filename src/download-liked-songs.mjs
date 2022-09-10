import {fetch} from "../fetch.mjs"
import fs from "fs";
import readline from "readline"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter your Spotify token: ', (TOKEN) => {
    rl.close();

    async function get(url) {
        if (!url) {
            return [] // nothing to get
        }
        const result = await fetch(url, TOKEN.trim())
        return [...result.items, ...await get(result.next)]
    }

    // fetch all liked songs using spotify API
    get("https://api.spotify.com/v1/me/tracks?limit=50")
        .then(all => fs.writeFileSync("liked-songs.json", JSON.stringify(all, null, 2)))
        .catch(err => console.log(err.message))
});

