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
    if (req.url != '/checkLogin' && req.url != '/userRegister') {
        var token = req.headers.authorization;
        jwt.verify(token, 'xiaojia', function (error, decoded) {
            if (error) {
                res.json({
                    code: 400,
                    message: error.message
                });
                return
            } else {
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
    pool.query("select userName,type,status from user where userName='" + userName + "'and password='" + password + "'", function (err, result) {
        if (err) {
            res.json({
                code: 400,
                message: "数据库操作异常！"
            });
            return;
        } else {
            if (result.length == 1) {
                if (result[0].status == 1) {
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
                        content: payload,
                        token: token,
                        message: '登录成功！'
                    };
                    res.json(data);
                } else {
                    res.json({
                        message: '账户未激活'
                    })
                }
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

//用户注册
router.post('/userRegister', function (req, res) {
    var sql = `insert into user (userName,password,type,status,created_by,created_date) value(?,?,?,?,?,?)`
    var userName = req.body.userName;
    var password = md5(req.body.password);
    var created_by = req.body.created_by;
    var data = [userName, password, 'user', 1, created_by, new Date()];
    pool.query("select * from user where userName='" + userName + "'", function (err, result) {
        if (err) {
            res.json({
                code: 400,
                message: "数据库操作异常！"
            });
            return;
        } else {
            if (result.length > 0) {
                res.json({
                    code: 401,
                    message: "该用户已存在！"
                })
            } else {
                pool.query(sql, data, function (err, result) {
                    if (err) {
                        res.json({
                            code: 400,
                            message: "数据库操作异常！"
                        });
                        return;
                    } else {
                        res.json({
                            code: 200,
                            message: "注册成功！"
                        });
                    }
                })
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
    select id,userName,type,status,created_by,created_date,last_modified_by,last_modified_date from user limit ${(page - 1) * pageSize}, ${pageSize}
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

// 查询单条用户信息
router.get('/userDetail', function (req, res) {
    var id = req.query.id;
    var sql = `select id,userName,type,status,created_by,created_date,last_modified_by,last_modified_date from user where id=?`
    pool.query(sql, [id], function (err, result) {
        if (err) {
            res.json({
                code: 400,
                message: "数据库操作异常！"
            });
            return;
        } else {
            res.json({
                code: 200,
                content: result,
                message: "success"
            });
        }
    })
})

// 查询所有带关键词用户信息
router.get('/usersList/keyword', function (req, res) {
    var page = req.query.page || 1;
    page = page - 0;
    var pageSize = req.query.pageSize;
    var keyword = req.query.keyword;
    var sql = `select count(*) as totalCount from user;
    select id,userName,type,status from user where userName like '%${keyword}%'  limit ${(page - 1) * pageSize}, ${pageSize}
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

// 修改用户信息
router.post('/userEdit', function (req, res) {
    var userName = req.body.userName;
    var type = req.body.type;
    var status = req.body.status;
    var last_modified_by = req.body.last_modified_by;
    var id = req.body.id;
    var sql = `update user set userName=?,type=?,status=?,last_modified_by=?,last_modified_date=? where
    id = ?`
    var data = [userName, type, status, last_modified_by, new Date(), id]
    pool.query(sql, data, function (err, result) {
        if (err) {
            res.json({
                code: 400,
                message: "数据库操作异常！"
            });
            return;
        } else {
            res.json({
                code: 200,
                message: "更新成功！"
            });
        }
    })
})

// 转换用户状态(将用户status置为0（未激活状态）))
router.post('/userSP', function (req, res) {
    var sql = `update user set status=? where id=?`;
    var status = req.body.status;
    var id = req.body.id;
    var data = [status, id];
    pool.query(sql, data, function (err, result) {
        if (err) {
            res.json({
                code: 400,
                message: '数据库操作异常'
            })
        } else {
            res.json({
                code: 200,
                message: status == 0 ? '停用成功' : '启用成功'
            })
        }
    })
})

// 删除用户信息
router.delete('/userDelete', function (req, res) {
    var id = req.body.id;
    var sql = `delete from user where id=?`
    var data = [id];
    pool.query(sql, data, function (err, result) {
        if (err) {
            res.json({
                code: 400,
                message: "数据库操作异常！"
            });
            return;
        } else {
            res.json({
                code: 200,
                message: "删除成功！"
            });
        }
    })

})

module.exports = router;