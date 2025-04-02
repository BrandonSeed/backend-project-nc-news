const db = require('../db/connection')

function insertArticle(userRequest) {
    return db.query(`INSERT INTO articles
        (title, topic, author, body, article_img_url)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
    [userRequest.title, userRequest.topic, userRequest.author, userRequest.body, userRequest.article_img_url ? userRequest.article_img_url : `https://c8.alamy.com/comp/E9WHM2/3d-render-of-a-little-person-looking-at-a-question-mark-symbol-through-E9WHM2.jpg`]) 
    .then((result) => {
        return { ...result.rows[0], comment_count: 0 }
    })
}

module.exports = insertArticle