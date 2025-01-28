const db = require('../db/connection')
const { checkExists } = require('../serverUtils')

function fetchCommentsByArticleId(articleId) {
    return checkExists('articles', 'article_id', articleId)
    .then((exist) => {
        if (exist === false) {
            return Promise.reject({
                status: 404,
                msg: 'That ID has no article'
            })
        }
        else {
            return db.query(`
                SELECT * 
                FROM comments
                WHERE article_id = $1
                ORDER BY created_at DESC`, [articleId])
        }
    })
    .then((result) => {
        return result.rows
    })
}

module.exports = { fetchCommentsByArticleId }