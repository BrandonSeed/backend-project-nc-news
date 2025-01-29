const db = require('../db/connection')
const { checkExists } = require('../serverUtils')


function updateArticle(userRequest) {
    return checkExists('articles', 'article_id', userRequest.article_id)
    .then((exist) => {
        if (exist === false) {
            return Promise.reject({
                status: 404,
                msg: 'That ID has no article'
            })
        }
        else {
            return db.query(`
                UPDATE articles 
                SET votes = votes + $1
                WHERE article_id = $2
                RETURNING *;`, [userRequest.inc_votes, userRequest.article_id])
        }
    })
    .then((result) => {
        return result.rows[0]
    })
}

module.exports = updateArticle