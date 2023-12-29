const mysql = require('mysql2/promise');
const mysqlpool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Chinu1997#',
    database:'chinmaya_db'
})


module.exports=mysqlpool;