const { login, checkLogin } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { setRedis } = require('../db/redis')

const handleUserRouter = (req, res) => {
    if(req.method === 'GET' && req.path === '/api/user/login'){
        const { username, password } = req.query
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
    
    if(req.method === 'GET' && req.path === '/api/user/checkLogin'){
        return checkLogin(req.query.username, req.query.password).then(result => {
            if(result[0].username){
                return new SuccessModel({
                    data: result[0]
                })
            }else{
                return new ErrorModel('登录信息已失效')
            }
        }).catch(err => {
            return new ErrorModel('登录信息已失效')
        })
    }

    if(req.method === 'GET' && req.path === '/api/user/login-test'){
        if(req.session.username){
            return Promise.resolve(
                new SuccessModel()
            )
        }
        return Promise.resolve(
            new ErrorModel('登录信息已失效')
        )
    }
}

module.exports = handleUserRouter