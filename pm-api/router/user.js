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
    if (req.url != '/checkLogin') {
        var token = req.headers.authorization;
        console.log(token);
        jwt.verify(token, 'xiaojia', function (error, decoded) {
            if (error) {
                res.json({
                    code: 400,
                    message: error.message
                });
                return
            } else {
                console.log(decoded)
                next();
            }
        })
    } else {
        next();
    }
});

// 用户登录
router.post('/checkLogin', function (req, res) {
    var userName = req.body.userName;
    var password = md5(req.body.password);
    const secret = 'xiaojia';
    pool.query("select userName,type from user where userName='" + userName + "'and password='" + password + "'", function (err, result) {
        if (err) {
            res.json({
                code: 400,
                message: "数据库操作异常！"
            });
            return;
        } else {
            if (result.length == 1) {
                var payload = {
                    name: result[0].userName,
                    admin: false
                }
                if (result[0].type === 'admin') payload.admin = true;
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
        }
    })
})

// 查询所有用户信息
router.get('/usersList', function (req, res) {
    var page = req.query.page || 1;
    page = page - 0;
    var pageSize = req.query.pageSize;
    var sql = `select count(*) as totalCount from user;
    select userName,type from user limit ${(page - 1) * pageSize}, ${pageSize}
    `
    pool.query(sql, function (err, result) {
        if (err) {
            res.json({
                code: 400,
                message: "数据库操作异常！"
            });
            return;
        } else {
            var totalCount = result[0][0].totalCount;
            res.json({
                code: 200,
                totalCount: totalCount,
                content: result[1],
                message: "success"
            });
        }
    })
})

// 

module.exports = router;