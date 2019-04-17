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

// 修改房产信息
router.post('/fcEdit', function (req, res) {
    var lh = req.body.lh;
    var dy = req.body.dy;
    var mh = req.body.mh;
    var jg = req.body.jg;
    var mj = req.body.mj;
    var sc = req.body.sc;
    var last_modified_by = req.body.last_modified_by;
    var id = req.body.id;
    var sql = `update fc set lh=?,dy=?,mh=?,jg=?,mj=?,sc=?,last_modified_by=?,last_modified_date=? where
    id = ?`
    var data = [lh, dy, mh, jg, mj, sc, last_modified_by, new Date(), id]
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

// 删除房产信息
router.delete('/fcDelete', function (req, res) {
    var id = req.body.id;
    var sql = `delete from fc where id=?`
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