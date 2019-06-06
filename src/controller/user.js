const { execSql } = require('../utils/db')

const login = (username, password) => {
    if(username === 'harris' && password === '123456'){
        return true
    }
    return false
}

const checkLogin = (username, password) => {
    let sql = `select username, realname from users where username='${username}' and \`password\`='${password}'`
    return execSql(sql)
}

module.exports = {
    login,
    checkLogin
}