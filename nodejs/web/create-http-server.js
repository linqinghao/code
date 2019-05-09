// craete a http server
const http = require('http')

const PORT = 9876

let server = http.createServer(function(req, res) {
  res.write('Hello Nodejs')
  res.end()
})

server.listen(PORT, function() {
  console.log(`[HttpServer][Start] runing at http://127.0.0.1:${PORT}/`)
})
