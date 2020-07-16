const http = require('http')
const server = http.createServer()
const controller = require('./controller')

server.on('request', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') {
    res.status = 200
    res.end()
    return
  }

  // 存储切片
  if (req.url === '/uploadSlice') {
    await controller.handleUploadSlice(req, res)
  }

  // 合并切片
  if (req.url === '/mergeSlice') {
    await controller.mergeSlice(req, res)
  }
})

server.listen(3000, () => console.log('服务正在监听3000端口'))
