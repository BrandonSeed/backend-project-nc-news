const { fetchArticlesById, fetchArticles } = require("../models/fetchArticles")


function getArticleById(req, res, next) {
    const articleId = req.params.article_id
    fetchArticlesById(articleId)
    .then((article) => {
        res.status(200).send({article})
    })
    .catch((err) => {
        next(err)
    })
}

function getArticles(req, res, next) {
    fetchArticles()
    .then((articles) => {
        res.status(200).send({articles})
    })
}

module.exports = { getArticleById, getArticles }