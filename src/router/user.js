const { login, checkLogin } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleUserRouter = (req, res) => {
    if(req.method === 'POST' && req.path === '/api/user/login'){
        const loginRes = login(req.query.username, req.query.password)
        if(loginRes){
            return new SuccessModel('登录成功')
        }else{
            return new ErrorModel('用户名或密码错误')
        }
    }
    
    if(req.method === 'GET' && req.path === '/api/user/checkLogin'){
        const checkLoginRes = checkLogin(req.query.username, req.query.password)
        if(checkLoginRes){
            return new SuccessModel('登录成功')
        }else{
            return new ErrorModel('登录失败')
        }
    }
}

module.exports = handleUserRouter