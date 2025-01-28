const { fetchCommentsByArticleId } = require('../models/fetchComments')

function getCommentsByArticleId(req, res, next) {
    const articleId = req.params.article_id
    fetchCommentsByArticleId(articleId)
    .then((comments) => {
        res.status(200).send({comments})
    })
}

module.exports = { getCommentsByArticleId }