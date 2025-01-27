const db = require('../db/connection')

function fetchArticlesById(articleId) {
    return db.query(`SELECT * FROM articles 
        WHERE article_id = $1`, [articleId])
    .then((result) => {
        if (result.rows.length === 0) {
            return Promise.reject({
                status: 404,
                msg: 'That ID has no article'
            })
        }
        else {
            return result.rows[0]
        }
    })
}

module.exports = { fetchArticlesById }