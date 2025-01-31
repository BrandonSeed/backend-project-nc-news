const db = require('../db/connection')

function fetchUsers() {
    return db.query(`SELECT * FROM users;`)
    .then((result) => {
        return result.rows
    })
}

function fetchUserByUsername(requestedUsername) {
    return db.query(`
        SELECT * 
        FROM users 
        WHERE username = $1`, [requestedUsername])
    .then((result) => {
        if (result.rows.length === 0) { 
            return Promise.reject({
                status: 404,
                msg: "No user by that username"
            })
        }
        else{ 
            return result.rows[0]
        }
    })
}

module.exports = { fetchUsers , fetchUserByUsername}