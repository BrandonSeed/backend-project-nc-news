const { fetchArticlesById, fetchArticles } = require("../models/fetchArticles")
const insertArticle = require("../models/insertArticle")
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
    fetchArticles(req.query)
    .then((articles) => {
        res.status(200).send({articles})
    })
    .catch((err) => {
        next(err)
    })
}

function patchArticleById(req, res, next) {
    const userRequest = {
        ...req.body,
        ...req.params
    }
    if (userRequest.inc_votes === 0) {
        res.status(422).send({msg: 'No change in votes'})
    }
    updateArticle(userRequest)
    .then((article) => {
        res.status(200).send({article})
    })
    .catch((err) => {
        next(err)
    })
}

function postArticle(req, res, next) {
    insertArticle(req.body)
    .then((article) => {
        res.status(201).send({article})
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = { getArticleById, getArticles, patchArticleById, postArticle }