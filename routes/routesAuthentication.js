var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/Auth.controller');
var auth = require('../tools/middleware');
const api = require("../tools/common");

//User Authentication and authorization
router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);
router.post('/auth/loginAdmin', AuthController.loginAdmin);

router.get('/auth/check-token', auth.authorization, function (req, res) {
    api.ok(res, 'Token Provided')
})

module.exports = router;
