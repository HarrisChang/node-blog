const handleUserRouter = (req, res) => {
    if(req.method === 'POST' && req.path === '/api/user/login'){
        return {
            errorCode: 0,
            message: '登录成功'
        }
    }
    
    if(req.method === 'GET' && req.path === '/api/user/checkLogin'){
        return {
            errorCode: -1,
            message: '检验登录'
        }
    }
}

module.exports = handleUserRouter