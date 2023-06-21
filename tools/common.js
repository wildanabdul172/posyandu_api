function ok(res, data) {
    return res.status(200).json(data);
}

function error(res, message, code) {

    return res.status(code).json({
        success: false,
        status : code,
        error : {
            message : message
        }
    });
}

module.exports = {
    ok,
    error
}