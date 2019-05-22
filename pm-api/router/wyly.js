const express = require('express');
const router = express.Router();
const pool = require('../db.js');

// 查询所有物业留言信息
router.get('/wylyList', function (req, res) {
    var type = req.query.type;
    var sql = `select count(*) as totalCount from wyly where type=?;
    select * from wyly where type=?
    `
    var data = [type, type];
    pool.query(sql, data, function (err, result) {
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

// 查询某用户所有物业留言信息
router.get('/wylyList-user', function (req, res) {
    var type = req.query.type;
    var ly_id = req.query.ly_id;
    var sql = `select count(*) as totalCount from wyly where ly_id=? and type=?;
    select * from wyly where ly_id=? and type=?
    `
    var data = [ly_id, type, ly_id, type];
    pool.query(sql, data, function (err, result) {
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

// 查询单条物业留言信息
router.get('/wylyDetail', function (req, res) {
    var id = req.query.id;
    var sql = `select * from wyly where id=?`
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

// 删除物业留言信息
router.delete('/wylyDelete', function (req, res) {
    var id = req.body.id;
    var sql = `delete from wyly where id=?`
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

// 修改物业留言
router.post('/wylyUpdate', function (req, res) {
    var content = req.body.content;
    var last_modified_by = req.body.last_modified_by;
    var id = req.body.id;
    var sql = `update wyly set content=?,status=?,last_modified_by=?,last_modified_date=? where
    id = ?`
    var data = [content, 1, last_modified_by, new Date(), id]
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

// 新增物业留言
router.post('/wylyInsert', function (req, res) {
    var sql = `insert into wyly (ly_id,type,content,status,created_by,created_date) value(?,?,?,?,?,?)`
    var ly_id = req.body.ly_id;
    var type = req.body.type;
    var content = req.body.content;
    var created_by = req.body.created_by;
    var data = [ly_id, type, content, 0, created_by, new Date()];
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