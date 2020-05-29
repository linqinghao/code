/**
 * pipe，只能通过父进程将它输出
 */
const { spawn } = require('child_process')
const ls = spawn('ls', ['-lh', '/usr'])

ls.stdout.on('data', function (data) {
  // 注意此时子进程的输出全都通过管道传递到父进程
  console.log(`stdout: ${data}`)
})

ls.on('close', (code) => {
  console.log(`子进程使用代码 ${code} 关闭所有 stdio`)
})

ls.on('exit', (code) => {
  console.log(`子进程使用代码 ${code} 退出`)
})