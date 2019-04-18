const express = require('express');
const router = express.Router();
const pool = require('../db.js');

// 查询所有业主信息
router.get('/yzList', function (req, res) {
    var page = req.query.page || 1;
    page = page - 0;
    var pageSize = req.query.pageSize;
    var sql = `select count(*) as totalCount from yz;
    select * from yz limit ${(page - 1) * pageSize}, ${pageSize}
    `
    pool.query(sql, function (err, result) {
        if (err) {
            res.json({
                code: 400,
                message: "服务器相应失败！"
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

// 查询单条业主信息
router.get('/yzDetail', function (req, res) {
    var id = req.query.id;
    var sql = `select * from yz where id=?`
    var data = [id];
    pool.query(sql, data, function (err, result) {
        if (err) {
            res.json({
                code: 400,
                message: "服务器相应失败！"
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

// 修改业主信息
router.post('/yzEdit', function (req, res) {
    var name = req.body.name;
    var sex = req.body.sex;
    var IDcard = req.body.IDcard;
    var telphone = req.body.telphone;
    var last_modified_by = req.body.last_modified_by;
    var id = req.body.id;
    var sql = `update yz set name=?,sex=?,IDcard=?,telphone=?,last_modified_by=?,last_modified_date=? where
    id = ?`
    var data = [name, sex, IDcard, telphone, last_modified_by, new Date(), id]
    console.log(data);
    pool.query(sql, data, function (err, result) {
        if (err) {
            res.json({
                code: 400,
                message: "服务器相应失败！"
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

// 删除业主信息
router.delete('/yzDelete', function (req, res) {
    var id = req.body.id;
    var sql = `delete from yz where id=?`
    var data = [id];
    pool.query(sql, data, function (err, result) {
        if (err) {
            res.json({
                code: 400,
                message: "服务器相应失败！"
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

// 新增业主信息
router.post('/yzInsert', function (req, res) {
    var sql = `insert into yz (name,sex,IDcard,telphone,created_by,created_date) value(?,?,?,?,?,?)`
    var name = req.body.name;
    var sex = req.body.sex;
    var IDcard = req.body.IDcard;
    var telphone = req.body.telphone;
    var created_by = req.body.created_by;
    var data = [name, sex, IDcard, telphone, created_by, new Date()];
    pool.query(sql, data, function (err, result) {
        if (err) {
            res.json({
                code: 400,
                message: "服务器相应失败！"
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