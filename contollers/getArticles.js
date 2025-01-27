const { fetchArticlesById } = require("../models/fetchArticles")


function getArticleById(req, res) {
    const articleId = req.params.article_id
    fetchArticlesById(articleId)
    .then((article) => {
        res.status(200).send({article})
    })
}

module.exports = { getArticleById }