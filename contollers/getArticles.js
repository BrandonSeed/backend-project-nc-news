const { fetchArticlesById, fetchArticles } = require("../models/fetchArticles")
const updateArticle = require("../models/updateArticle")


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

function patchArticleById(req, res, next) {
    const userRequest = {
        ...req.body,
        ...req.params
    }
    updateArticle(userRequest)
    .then((article) => {
        res.status(200).send({article})
    })
}

module.exports = { getArticleById, getArticles, patchArticleById }