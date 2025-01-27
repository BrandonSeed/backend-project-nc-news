const db = require('../db/connection')

function fetchArticlesById(articleId) {
    return db.query(`SELECT * FROM articles 
        WHERE article_id = $1`, [articleId])
    .then((result) => {
        return result.rows[0]
    })
}

module.exports = { fetchArticlesById }