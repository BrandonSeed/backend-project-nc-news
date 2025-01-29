const getApi = require('./getApi')
const getTopics = require('./getTopics')
const { getArticleById, getArticles, patchArticleById } = require('./getArticles')
const { getCommentsByArticleId, postCommentByArticleId } = require('./getComments')


module.exports = 
{ 
    getApi, 
    getTopics, 
    getArticleById, 
    getArticles, 
    getCommentsByArticleId, 
    postCommentByArticleId,
    patchArticleById
 }