const fetchTopics = require("../models/fecthTopics")


function getTopics(req, res) {
    fetchTopics()
    .then((topicData) => {
        res.status(200).send({topics: topicData})
    })
}

module.exports = getTopics