
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
    else if (err.code === '23502') {
        res.status(400).send({msg: 'Bad request, input invalid'})
    }
    else {
        next(err)
    }
}

function unknownErrors(err, req, res, next) {
    console.log(err)
}

module.exports = { noEndpointError, requestErrors, unknownErrors }