const express = require('express')
const app = express()
const { 
    getApi, 
    getTopics,
    deleteCommentById,
    getUsers,
} = require('./contollers/index')
const { noEndpointError, requestErrors, unknownErrors } = require('./serverErrors')
const { articleRouter } = require('./routers/index')


app.use(express.json())


app.get('/api', getApi)

app.get('/api/topics', getTopics)

app.get('/api/users', getUsers)

app.use('/api/articles', articleRouter)

app.delete('/api/comments/:comment_id', deleteCommentById)

app.get('/*', (req ,res, next) => {
    next({status: 404, msg: "That endpoint does not exist"})
})
app.post('/*', (req ,res, next) => {
    next({status: 404, msg: "That endpoint does not exist"})
})
app.patch('/*', (req ,res, next) => {
    next({status: 404, msg: "That endpoint does not exist"})
})
app.delete('/*', (req ,res, next) => {
    next({status: 404, msg: "That endpoint does not exist"})
})

app.use(noEndpointError)
app.use(requestErrors)
app.use(unknownErrors)

module.exports = app