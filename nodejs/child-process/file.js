/**
 * stdio绑定到文件描述符fd，它代表文件node.log，因此会输出到该文件
 */

const fs = require('fs')
const { spawn } = require('child_process')
const fd = fs.openSync('./dir.log', 'w+')
const ws = fs.createWriteStream('./dir.log', {
  flags: 'a',
  fd: fd,
})

const ls = spawn('ls', ['-lh', '/usr'], {
  stdio: [process.stdin, ws, ws],
})
