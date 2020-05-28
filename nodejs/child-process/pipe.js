/**
 * pipe，只能通过父进程将它输出
 */
const { spawn } = require('child_process')
const ls = spawn('ls', ['-lh', '/usr'])

ls.stdout.on('data', function (data) {
  // 注意此时子进程的输出全都通过管道传递到父进程
  console.log(data)
})
