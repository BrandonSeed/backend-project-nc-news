const getApi = require('./getApi')
const getTopics = require('./getTopics')
const { getArticleById, getArticles, patchArticleById } = require('./getArticles')
const { getCommentsByArticleId, postCommentByArticleId, deleteCommentById } = require('./getComments')
const {getUsers, getUserByUsername} = require('./getUsers')


module.exports = 
{ 
    getApi, 
    getTopics, 
    getArticleById, 
    getArticles, 
    getCommentsByArticleId, 
    postCommentByArticleId,
    patchArticleById,
    deleteCommentById,
    getUsers,
    getUserByUsername
 }