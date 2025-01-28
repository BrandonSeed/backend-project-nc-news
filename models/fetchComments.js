const db = require('../db/connection')

function fetchCommentsByArticleId(articleId) {
    return db.query(`
        SELECT * 
        FROM comments
        WHERE article_id = $1`, [articleId])
    .then((result) => {
        return result.rows
    })
}

module.exports = { fetchCommentsByArticleId }