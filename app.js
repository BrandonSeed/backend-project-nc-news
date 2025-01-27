const express = require('express')
const app = express()
const getApi = require('./contollers/getApi')

app.get('/api', getApi)



module.exports = app