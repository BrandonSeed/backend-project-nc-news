const db = require('../db/connection')

function fetchTopics() {
    return db.query('SELECT * FROM topics;')
    .then((result) => {
        return result
    })
}

module.exports = fetchTopics