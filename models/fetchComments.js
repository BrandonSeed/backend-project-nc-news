const db = require('../db/connection')
const { checkExists } = require('../serverUtils')

function fetchCommentsByArticleId(articleId) {
    return db.query(`
        SELECT * 
        FROM comments
        WHERE article_id = $1
        ORDER BY created_at DESC`, [articleId])
    .then((result) => {
        if (result.rows.length === 0) {
            return checkExists('articles', 'article_id', articleId)
            .then((exist) => {
                if (exist === false) {
                    return Promise.reject({
                        status: 404,
                        msg: 'That ID has no article'
                    })
                }
                else {
                    return result.rows
                }
            })
        }
        else {
            return result.rows
        }
    })
}

module.exports = { fetchCommentsByArticleId }