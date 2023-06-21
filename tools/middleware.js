const api = require("../tools/common");
var jwt = require('jsonwebtoken');

function authorization(req, res, next) {
    var token = req.headers['authorization'];
    var flag = true;
    console.log(token)
    if (token == null || token == '') {
        flag = false;
    }
    if (flag) {
        jwt.verify(token, "test",  function (err, decoded) {
            if (err) {
                api.error(res, "Token consistency error", "401");
            } else {
                return next();
            }
        });
    } else {
        api.error(res, "Token not provided", "401");
    }
}

module.exports = {
    authorization
}