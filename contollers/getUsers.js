const fetchUsers = require("../models/fetchUsers")

function getUsers(req, res) {
    fetchUsers()
    .then((users) => {
        res.status(200).send({users})
    })
}

module.exports = getUsers