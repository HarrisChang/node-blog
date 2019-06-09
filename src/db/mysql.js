const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

const connection = mysql.createConnection(MYSQL_CONF)
const execSql = (sql) => {
    const promise = new Promise((resolve, reject) => {
        connection.query(sql, (error, result) => {
            if(error){
                reject(error)
            }else{
                resolve(result)
            }
        })
    })
    return promise
}

module.exports = {
    execSql,
    escape: mysql.escape
}
