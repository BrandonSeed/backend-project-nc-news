
function noEndpointError(err, req, res, next) {
    if (err.status === 404) {
        res.status(404).send({msg: err.msg})
    }
    else {
        next(err)
    }
}

function requestErrors(err, req, res, next) {
    if (err.code === '22P02') {
        res.status(400).send({msg: 'Bad request'})
    }
}

module.exports = { noEndpointError, requestErrors }