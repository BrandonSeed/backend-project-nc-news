const db = require('../db/connection')


function updateArticle(userRequest) {
    return db.query(`
        UPDATE articles 
        SET votes = votes + $1
        WHERE article_id = $2
        RETURNING *;`, [userRequest.inc_votes, userRequest.article_id])
    .then((result) => {
        return result.rows[0]
    })
}

module.exports = updateArticle