const db = require('../db/connection')

function fetchArticlesById(articleId) {
    return db.query(`
        SELECT articles.*, COUNT(comment_id) AS comment_count
        FROM articles 
        LEFT JOIN comments 
        ON comments.article_id = articles.article_id
        WHERE articles.article_id = $1
        GROUP BY articles.article_id`, [articleId])
    .then((result) => {
        if (result.rows.length === 0) {
            return Promise.reject({
                status: 404,
                msg: 'That ID has no article'
            })
        }
        else {
            result.rows[0].comment_count = Number(result.rows[0].comment_count)
            return result.rows[0]
        }
    })
}

function fetchArticles(queries) {
    const sort_by = queries.sort_by || 'created_at'
    const order = queries.order || 'DESC'
    const queryValue = []
    const allowedSorts = ['author', 'title', 'topic', 'created_at', 'votes', 'comment_count', 'article_id', 'article_img_id']
    const allowedOrders = ['ASC', 'DESC']
    if (!allowedSorts.includes(sort_by)) {
        return Promise.reject({
            status: 404,
            msg: 'Invalid sort input'
        })
    }
    if (!allowedOrders.includes(order.toUpperCase())) {
        return Promise.reject({
            status: 404,
            msg: 'Invalid order input'
        })
    }
    let queryStr = `
        SELECT 
        articles.article_id, 
        articles.author, 
        articles.title, 
        articles.topic, 
        articles.created_at, 
        articles.votes, 
        articles.article_img_url, COUNT(comment_id) AS comment_count
        FROM articles
        LEFT JOIN comments
        ON comments.article_id = articles.article_id`
    if (queries.topic) {
        queryValue.push(queries.topic)
        queryStr += ` 
        WHERE articles.topic = $1`
    }
    return db.query(`${queryStr} 
        GROUP BY articles.article_id
        ORDER BY ${sort_by} ${order}`, queryValue)
    .then((result) => {
        result.rows.forEach((article) => {
            article.comment_count = Number(article.comment_count)
        })
        return result.rows
    })
}

module.exports = { fetchArticlesById, fetchArticles }