const http = require('http')
const PORT = process.env.port || 3000
const serverHandle = require('../app')

const server = http.createServer(serverHandle)
server.listen(PORT)
console.log(`server listening at: http://localhost:${PORT}`);
