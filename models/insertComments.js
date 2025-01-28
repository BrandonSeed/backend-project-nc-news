const db = require('../db/connection')
const { checkExists } = require('../serverUtils')

function insertCommentsByArticleId(userRequest) {
    return checkExists('articles', 'article_id', userRequest.article_id)
    .then((exist) => {
        if (exist === false) {
            return Promise.reject({
                status: 404,
                msg: 'That ID has no article'
            })
        }
        else {
            return db.query(`INSERT INTO comments
                (body, article_id, author, votes)
                VALUES ($1, $2, $3, $4)
                RETURNING *`, 
                [userRequest.body, userRequest.article_id, userRequest.username, 0])
        }
    })
    .then((result) => {
        return result.rows[0]
    })
}

module.exports = { insertCommentsByArticleId }