const cp = require('child_process')

const n = cp.fork(`${__dirname}/sub.js`, {
  stdio: 'pipe'
});

n.on('message', msg => {
  console.log('父进程收到消息: ', msg)
})

n.on('error', err => {
  console.error(err)
})

n.send('Hello！')

n.stdout.on('data', (data) => {
  console.log(`接收到数据块 ${data}`);
});