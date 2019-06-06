const querystring = require('querystring')
const handleUserRouter = require('./src/router/user')
const handleBlogRouter = require('./src/router/blog')

const getPostData = req => {
    const promise = new Promise((resolve, reject) => {
        if(req.method !== 'POST' || req.headers['content-type'] !== 'application/json'){
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if(!postData){
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json')

    // 处理 path
    const url = req.url
    req.path = url.split('?')[0]

    // 解析 query
    req.query = querystring.parse(url.split('?')[1])

    getPostData(req)
    .then(postData => {
        req.body = postData

        // 处理blog路由
        let blogRes = handleBlogRouter(req, res)
        if(blogRes){
            blogRes.then(result => {
                res.end(
                    JSON.stringify(result)
                )
            }).catch(err => {
                res.writeHead(404, {'Content-type': 'text/plain'})
                res.write('404 Not Found')
                res.end()
            })
        }

        // 处理user路由
        let userRes = handleUserRouter(req, res)
        if(userRes){
            userRes.then(result => {
                res.end(
                    JSON.stringify(result)
                )
            }).catch(err => {
                res.writeHead(404, {'Content-type': 'text/plain'})
                res.write('404 Not Found')
                res.end()
            })
        }
    })
}

module.exports = serverHandle