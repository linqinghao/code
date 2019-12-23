const koaStatic = require('koa-static')

const app = require('koa')()
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)

app.use(koaStatic(__dirname + '/client'))

io.on('connection', socket => {
  socket.on('message', function(payload) {
    io.emit(payload)
  })
})
server.listen(3000)
