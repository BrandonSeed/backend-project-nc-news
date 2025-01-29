const db = require('../db/connection')
const { checkExists } = require('../serverUtils')

function deleteCommentPSQL(commentId) {
    return checkExists('comments', 'comment_id', commentId)
    .then((exist) => {
        if (exist === false) {
            return Promise.reject({
                status: 404,
                msg: 'That ID has no comment'
            })
        }
        else {
            return db.query(`
                DELETE FROM comments
                WHERE comment_id = $1`, [commentId])
        }
    })
}

module.exports = deleteCommentPSQL