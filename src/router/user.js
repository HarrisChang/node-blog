const { login, checkLogin } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { setRedis } = require('../db/redis')

// 统一的登录验证函数
const loginCheck = req => {
    if(!req.session.username){
        return Promise.resolve(
            new ErrorModel('登录信息已失效')
        )
    }
}

const handleUserRouter = (req, res) => {
    if(req.method === 'POST' && req.path === '/api/user/login'){
        const { username, password } = req.body
        return login(username, password).then(data => {
            if(data.username){
                // 操作cookie
                req.session.username = data.username
                req.session.realname = data.realname
                // 同步到 redis中
                setRedis(req.sessionId, req.session)
                return new SuccessModel('登录成功')
            }else{
                return new ErrorModel('用户名或密码错误')
            }
        })
    }
    
}

module.exports = handleUserRouter