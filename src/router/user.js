const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleUserRouter = (req, res) => {
    if(req.method === 'POST' && req.path === '/api/user/login'){
        return new SuccessModel('登录成功')
    }
    
    if(req.method === 'GET' && req.path === '/api/user/checkLogin'){
        return new ErrorModel('登录失败')
    }
}

module.exports = handleUserRouter