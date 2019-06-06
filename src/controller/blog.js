const { execSql } = require('../utils/db')

const getList = (pageIndex, pageSize, keyword, userId) => {
    let sql = `select * from blogs where 1=1 `
    if(keyword){
        sql += `and title like '%${keyword}%' `
    }
    if(userId){
        sql += `and userId='${userId}' `
    }
    sql += `order by createtime desc`
    return execSql(sql)
}

const getDetail = id => {
    let sql = `select * from blogs where id='${id}'`
    return execSql(sql)
}

module.exports = {
    getList,
    getDetail
}