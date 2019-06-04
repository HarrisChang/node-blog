const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json')
    
    res.writeHead(404, {'Content-type': 'text/plain'})
    res.write('404 Not Found')
    res.end()
}

module.exports = serverHandle