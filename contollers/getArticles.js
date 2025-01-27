const { fetchArticlesById } = require("../models/fetchArticles")


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

module.exports = { getArticleById }