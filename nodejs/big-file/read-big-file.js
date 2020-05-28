const fs = require('fs')
const stream = require('stream')
const rs = fs.createReadStream('./test.js')
const ws = new stream.Writable({
  write(chunk, encoding, cb) {
    console.log(chunk.toString())
    cb && cb()
  }
})

let MAX_SIZE = 10 * 1024;
let buf = Buffer.alloc(10 * 1024, 0);
rs.on('data', (chunk) => {
  buf.concat(chunk)
  ws.write(buf)
})

rs.on('end', () => {
  ws.end()
  console.log('Read Done!')
})

rs.on('error', (err) => {
  console.error(err)
})
