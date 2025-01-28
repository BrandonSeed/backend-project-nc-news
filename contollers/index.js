const getApi = require('./getApi')
const getTopics = require('./getTopics')
const { getArticleById, getArticles } = require('./getArticles')
const { getCommentsByArticleId } = require('./getComments')


module.exports = { getApi, getTopics, getArticleById, getArticles, getCommentsByArticleId }