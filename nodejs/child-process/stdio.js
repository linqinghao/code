/**
 * 子进程的stdio继承父进程的stdio，即控制台，因此会输出到控制台
 */
const { spawn } = require('child_process')
const ls = spawn('ls', ['-lh', '/usr'], {
  stdio: [process.stdin, process.stdout, process.stderr],
})
