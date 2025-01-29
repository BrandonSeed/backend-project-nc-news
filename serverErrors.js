
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
    else if (err.code === '23502' || err.code === '23503') {
        res.status(400).send({msg: 'Bad request, input invalid'})
    }
    else {
        next(err)
    }
}

function unknownErrors(err, req, res, next) {
    res.status(400).send({msg: `Error code: ${err.code}, Errror detail: ${err.detail}`})
}

module.exports = { noEndpointError, requestErrors, unknownErrors }