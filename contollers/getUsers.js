const {fetchUsers, fetchUserByUsername} = require("../models/fetchUsers")

function getUsers(req, res) {
    fetchUsers()
    .then((users) => {
        res.status(200).send({users})
    })
}

function getUserByUsername(req, res, next) {
    fetchUserByUsername(req.params.username)
    .then((user) => {
        res.status(200).send({user})
    })
}

module.exports = { getUsers, getUserByUsername}