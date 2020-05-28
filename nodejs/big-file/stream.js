const fs = require('fs')

const rs = fs.createReadStream('./big.file')
const ws = fs.createWriteStream('./big2.file')
rs.setEncoding('utf-8') // 设置编码格式
rs.on('data', chunk => {
  let flag = ws.write(chunk) // 写入数据
  if (!flag) {
    // 如果缓存区已满暂停读取
    rs.pause()
  }
})

ws.on('drain', () => {
  rs.resume() // 缓存区已清空 继续读取写入
})
