const express = require('express')
const app = express()
const { getApi, getTopics, getArticleById } = require('./contollers/index')
const { noEndpointError } = require('./serverErrors')

app.use(express.json())


app.get('/api', getApi)

app.get('/api/topics', getTopics)

app.get('/api/articles/:article_id', getArticleById)

app.get('/*', (req ,res, next) => {
    next({status: 404, msg: "That endpoint does not exist"})
})

app.use(noEndpointError)

module.exports = app