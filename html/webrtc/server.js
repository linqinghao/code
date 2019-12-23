const koaStatic = require('koa-static')
const Koa = require('koa')

const app = new Koa()
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)

app.use(koaStatic(__dirname + '/client'))

io.on('connection', socket => {
  socket.on('message', function(payload) {
    console.log(payload)
    io.emit('message', payload)
  })
})
server.listen(3000)
