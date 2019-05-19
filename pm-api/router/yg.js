const express = require('express');
const router = express.Router();
const pool = require('../db.js');

// 查询所有员工信息
router.get('/ygList', function (req, res) {
    var page = req.query.page || 1;
    page = page - 0;
    var pageSize = req.query.pageSize;
    var type = req.query.type;
    var sql = `select count(*) as totalCount from yg;
    select * from yg where type=? limit ${(page - 1) * pageSize}, ${pageSize}
    `
    pool.query(sql, [type], function (err, result) {
        if (err) {
            res.json({
                code: 400,
                message: "服务器响应失败！"
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

// 查询单条员工信息
router.get('/ygDetail', function (req, res) {
    var id = req.query.id;
    var sql = `select * from yg where id=?`
    var data = [id];
    pool.query(sql, data, function (err, result) {
        if (err) {
            res.json({
                code: 400,
                message: "服务器响应失败！"
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

// 删除员工信息
router.delete('/ygDelete', function (req, res) {
    var id = req.body.id;
    var sql = `delete from yg where id=?`
    var data = [id];
    pool.query(sql, data, function (err, result) {
        if (err) {
            res.json({
                code: 400,
                message: "服务器响应失败！"
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

// 修改员工信息
router.post('/ygUpdate', function (req, res) {
    var yg_id = req.body.yg_id;
    var name = req.body.name;
    var date = req.body.date;
    date = date.substring(0, 10);
    date = date.replace(/-/g, '/');
    date = new Date(date);
    var last_modified_by = req.body.last_modified_by;
    var id = req.body.id;
    var sql = `update yg set yg_id=?,name=?,date=?,last_modified_by=?,last_modified_date=? where
    id = ?`
    var data = [yg_id, name, date, last_modified_by, new Date(), id]
    pool.query(sql, data, function (err, result) {
        if (err) {
            res.json({
                code: 400,
                message: "服务器响应失败！"
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

// 新增员工信息
router.post('/ygInsert', function (req, res) {
    var sql = `insert into yg (yg_id,type,name,date,created_by,created_date) value(?,?,?,?,?,?)`
    var yg_id = req.body.yg_id;
    var type = req.body.type;
    var name = req.body.name;
    var date = req.body.date;
    date = date.substring(0, 10);
    date = date.replace(/-/g, '/');
    date = new Date(date);
    var created_by = req.body.created_by;
    var data = [yg_id, type, name, date, created_by, new Date()];
    pool.query(sql, data, function (err, result) {
        if (err) {
            res.json({
                code: 400,
                message: "服务器响应失败！"
            });
            return;
        } else {
            res.json({
                code: 200,
                message: "新增成功！"
            });
        }
    })
})
module.exports = router;