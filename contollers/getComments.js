const deleteCommentPSQL = require('../models/deleteCommentPSQL')
const { fetchCommentsByArticleId } = require('../models/fetchComments')
const { insertCommentsByArticleId } = require('../models/insertComments')

function getCommentsByArticleId(req, res, next) {
    const articleId = req.params.article_id
    fetchCommentsByArticleId(articleId)
    .then((comments) => {
        res.status(200).send({comments})
    })
    .catch((err) => {
        next(err)
    })
}

function postCommentByArticleId(req, res, next) {
    const userRequest = {
        ...req.body,
        ...req.params
    }
    insertCommentsByArticleId(userRequest)
    .then((comment) => {
        res.status(201).send({comment})
    })
    .catch((err) => {
        next(err)
    })
}

function deleteCommentById(req, res, next) {
    const commentId = req.params.comment_id
    deleteCommentPSQL(commentId)
    .then(() => {
        res.status(204).send()
    })
}

module.exports = { getCommentsByArticleId, postCommentByArticleId, deleteCommentById }