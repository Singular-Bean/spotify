const [, , command] = process.argv

const module = import(`./src/${command}.mjs`)
    .catch(err => console.log("Failed to load command: " + command, err.message))

