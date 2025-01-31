const db = require('../db/connection')

function fetchUsers() {
    return db.query(`SELECT * FROM users;`)
    .then((result) => {
        return result.rows
    })
}

function fetchUserByUsername(requestedUsername) {
    console.log(requestedUsername)
    return db.query(`
        SELECT * 
        FROM users 
        WHERE username = $1`, [requestedUsername])
    .then((result) => {
        return result.rows[0]
    })
}

module.exports = { fetchUsers , fetchUserByUsername}