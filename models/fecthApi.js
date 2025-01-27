const fs = require('fs/promises')

function fetchApi() {
    return fs.readFile(__dirname + '/../endpoints.json', 'utf-8')
    .then((result) => {
        return JSON.parse(result)
    })
}

module.exports = fetchApi