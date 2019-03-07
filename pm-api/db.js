var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'pm',
    multipleStatements: true
})

module.exports = pool;