const fetchApi = require('../models/fecthApi')

function getApi(req, res) {
    fetchApi().then((result) => {
        console.log(result)
        res.status(200).send({endpoints: result})
    })
}


module.exports = getApi