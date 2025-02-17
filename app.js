const express = require('express')
const app = express()
const { 
    getApi, 
    getTopics,
    deleteCommentById,
    getUsers,
} = require('./contollers/index')
const { noEndpointError, requestErrors, unknownErrors } = require('./serverErrors')
const { articleRouter, userRouter } = require('./routers/index')
const cors = require('cors')

app.use(cors())

app.use(express.json())


app.get('/api', getApi)

app.get('/api/topics', getTopics)

app.use('/api/users', userRouter)

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