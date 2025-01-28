const db = require('../db/connection')

function fetchArticlesById(articleId) {
    return db.query(`SELECT * FROM articles 
        WHERE article_id = $1`, [articleId])
    .then((result) => {
        if (result.rows.length === 0) {
            return Promise.reject({
                status: 404,
                msg: 'That ID has no article'
            })
        }
        else {
            return result.rows[0]
        }
    })
}

function fetchArticles() {
    return db.query(`SELECT articles.article_id, 
        articles.author, 
        articles.title, 
        articles.topic, 
        articles.created_at, 
        articles.votes, 
        articles.article_img_url, COUNT(comment_id) AS comment_count
        FROM articles
        LEFT JOIN comments
        ON comments.article_id = articles.article_id
        GROUP BY articles.article_id
        ORDER BY created_at DESC`)
    .then((result) => {
        return result.rows
    })
}

module.exports = { fetchArticlesById, fetchArticles }