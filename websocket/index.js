const ws = require('ws');

const wss = new ws.Server({ port: 7777 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(msg) {
    console.log('received: %s', msg);
    ws.send('something');
  })
})
