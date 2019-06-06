const { login, checkLogin } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleUserRouter = (req, res) => {
    if(req.method === 'POST' && req.path === '/api/user/login'){
        return login(req.body.username, req.body.password).then(result => {
            if(result){
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
}

module.exports = handleUserRouter