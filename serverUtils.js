const format = require('pg-format')
const db = require('./db/connection')

async function checkExists(table, column, value) {
    const queryStr = format("SELECT * FROM %I WHERE %I = $1;", table, column)
    const dbResult = await db.query(queryStr, [value])
    if (dbResult.rows.length === 0) {
        return false
    }
    else {
        return true
    }
}

module.exports = { checkExists }