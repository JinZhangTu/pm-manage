const express = require('express');
const router = express.Router();
const pool = require('../db.js')

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
    var password = req.body.password;
    console.log(userName);
    console.log(password);
    pool.query("select * from user where userName='" + userName + "'and password='" + password + "'", function (err, result) {
        var data = {
            code: 200,
            data: result,
            message: '登录成功！'
        };
        res.json(data)
    })
})

module.exports = router;