const express = require('express')
const app = express()
const getApi = require('./contollers/getApi')
const { noEndpointError } = require('./serverErrors')

app.use(express.json())


app.get('/api', getApi)



app.get('/*', (req ,res, next) => {
    next({status: 404, msg: "That endpoint does not exist"})
})

app.use(noEndpointError)

module.exports = app