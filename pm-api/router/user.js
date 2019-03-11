const express = require('express');
const router = express.Router();
const pool = require('../db.js');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

//获取对应网站的地址
router.all('*', function (req, res, next) {
    /*处理浏览器同源策略问题*/
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

router.post('/checkLogin', function (req, res) {
    var userName = req.body.userName;
    var password = md5(req.body.password);
    const secret = 'xiaojia';
    pool.query("select * from user where userName='" + userName + "'and password='" + password + "'", function (err, result) {
        if (result.length == 1) {
            var payload = {
                name: result[0].userName,
                admin: false
            }
            if (result[0].type === 'admin') payload.admin = true;
            console.log(payload);
            const token = jwt.sign(payload, secret, {
                expiresIn: '1day'
            })
            var data = {
                code: 200,
                data: payload,
                token: token,
                message: '登录成功！'
            };
            res.json(data);
        } else if (result.length < 1) {
            var data = {
                code: 401,
                message: '账号或密码有误！'
            }
            res.json(data);
        } else {
            var data = {
                code: 402,
                message: '账户异常！'
            }
            res.json(data);
        }
    })
})

module.exports = router;