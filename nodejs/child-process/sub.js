// 子进程

process.on('message', msg => {
  console.log('subprocess receive msg: ', msg)
})

process.send({ msg: 'from subprocess'})

process.stdout.on('data', data => {
  console.log(data.toString())
})

process.stdout.write('hello');
process.stdout.end();