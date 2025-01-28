const db = require('../db/connection')

function insertCommentsByArticleId(userRequest) {
    return db.query(`INSERT INTO comments
        (body, article_id, author, votes)
        VALUES ($1, $2, $3, $4)
        RETURNING *`, 
        [userRequest.body, userRequest.article_id, userRequest.username, 0])
    .then((result) => {
        return result.rows[0]
    })
}

module.exports = { insertCommentsByArticleId }