/**
 * nodejs 处理大文件
 */

const fs = require('fs')
const stream = require('stream')
const readline = require('readline')

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
  console.log('drain')
  rs.resume() // 缓存区已清空 继续读取写入
})

// outStream.readable = true
// outStream.writeable = true
// let totalLine = 0;

// let rl = readline.createInterface({
//   input: inStream,
//   output: outStream
// })

// rl.on('line', function(line) {
//   totalLine += 1;
//   if (totalLine > 3) {
//     rl.close()
//     outStream.end()
//     return
//   }
//   outStream.write(line)
// })

// rl.on('close', function() {
//   console.log(totalLine)
// })

// outStream.on('error', (err) => {
//   console.error(err)
// })

// outStream.on('finish', () => {
//   console.error('write end')
// })

// let totalLen = 0;
// let str = '';

// inStream.on('data', (chunk) => {
//   totalLen += chunk.length;

//   wStream.write(chunk);
// })

// inStream.on('end', () => {
//   wStream.end();
//   console.log('finished!', totalLen)
// })

// inStream.on('error', (err) => {
//   console.error(err)
// })

// wStream.on('finish', () => {
//   console.log('write end！')
// })
