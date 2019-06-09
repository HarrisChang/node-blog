const { execSql, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = (username, password) => {
    username = escape(username)
    // 生成加密密码
    password = genPassword(password)
    password = escape(password)
    let sql = `select username, realname from users where username=${username} and password=${password}`
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