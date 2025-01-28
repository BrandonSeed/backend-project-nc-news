const express = require('express')
const app = express()
const { 
    getApi, 
    getTopics, 
    getArticleById, 
    getArticles,
    getCommentsByArticleId 
} = require('./contollers/index')
const { noEndpointError, requestErrors } = require('./serverErrors')

app.use(express.json()) // This is here because I will forget it later and I'll spend hours stuck


app.get('/api', getApi)

app.get('/api/topics', getTopics)

app.get('/api/articles/:article_id', getArticleById)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id/comments', getCommentsByArticleId)

app.get('/*', (req ,res, next) => {
    next({status: 404, msg: "That endpoint does not exist"})
})

app.use(noEndpointError)
app.use(requestErrors)

module.exports = app