const { execSql } = require('../db/mysql')

const login = (username, password) => {

    let sql = `select username, realname from users where username='${username}' and password='${password}'`
    return execSql(sql).then(data => {
        return data[0] || {}
    })
}

const checkLogin = (username, password) => {
    let sql = `select username, realname from users where username='${username}' and \`password\`='${password}'`
    return execSql(sql)
}

module.exports = {
    login,
    checkLogin
}