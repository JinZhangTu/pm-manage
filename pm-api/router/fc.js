const express = require('express');
const router = express.Router();
const pool = require('../db.js');

// 查询所有房产信息
router.get('/fcList', function (req, res) {
    var page = req.query.page || 1;
    page = page - 0;
    var pageSize = req.query.pageSize;
    var sql = `select count(*) as totalCount from fc;
    select * from fc limit ${(page - 1) * pageSize}, ${pageSize}
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

// 查询所有带关键词用户信息
router.get('/fcList/keyword', function (req, res) {
    var page = req.query.page || 1;
    page = page - 0;
    var pageSize = req.query.pageSize;
    var keyword = req.query.keyword;
    var sql = `select count(*) as totalCount from fc;
    select * where userName like '%${keyword}%'  limit ${(page - 1) * pageSize}, ${pageSize}
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

// 查询单条房产信息
router.get('/fcDetail', function (req, res) {
    var id = req.query.id;
    var sql = `select * from fc where id=?`
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


module.exports = router;