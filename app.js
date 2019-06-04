const querystring = require('querystring')
const handleUserRouter = require('./src/router/user')

const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json')

    const method = req.method
    // 处理 path
    const url = req.url
    req.path = url.split('?')[0]

    // 解析 query
    req.query = querystring.parse(url.split('?')[1])

    let userRes = handleUserRouter(req, res)
    if(userRes){
        res.end(
            JSON.stringify(userRes)
        )
        return
    } 

    res.writeHead(404, {'Content-type': 'text/plain'})
    res.write('404 Not Found')
    res.end()
}

module.exports = serverHandle