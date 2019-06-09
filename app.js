const querystring = require('querystring')
const { setRedis, getRedis } = require('./src/db/redis')
const handleUserRouter = require('./src/router/user')
const handleBlogRouter = require('./src/router/blog')
const SESSION_DATA = {}

const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}

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

    // 解析 cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(element => {
        if(!element){
            return
        }
        const arr = element.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    })

    // 解析 session
    // let needSetCookie = false
    // let userId = req.cookie.userid
    // if(userId){
    //     if(!SESSION_DATA[userId]){
    //         SESSION_DATA[userId] = {}
    //     }
    // }else{
    //     needSetCookie = true
    //     userId = `${Date.now()}_${Math.random()}`
    //     SESSION_DATA[userId] = {}
    // }
    // req.session = SESSION_DATA[userId]

    // 使用 redis 解析 session
    let needSetCookie = false
    let userId = req.cookie.userid
    if(!userId){
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        setRedis(userId, {})
    }
    req.sessionId = userId
    getRedis(req.sessionId).then(sessionData => {
        if(sessionData == null){
            // 设置 redis 中的 session值
            setRedis(req.sessionId, {})
            // 设置 session 值
            req.session = {}
        }else{
            req.session = sessionData
        }

        return getPostData(req)
    })
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
                if(needSetCookie){
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
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