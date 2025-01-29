const db = require('../db/connection')

function deleteCommentPSQL(commentId) {
    return db.query(`
        DELETE FROM comments
        WHERE comment_id = $1`, [commentId])
}

module.exports = deleteCommentPSQL