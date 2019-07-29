const Redis = require('ioredis')

const redis = new Redis({
  host: 'localhost',
  port: '6379',
  reconnectOnError: err => /^READONLY/.test(err.message),
  retryStrategy: times => Math.min(times * 50, 2000),
})
redis.on('connect', () => {
  console.log('==================  redis connected  ==================')
})
redis.on('reconnecting', () => {
  console.log('==================  redis in reconnecting  ==================')
})
redis.on('error', ex => {
  console.log(
    '==================  redis error occurs while connecting  =================='
  )
  console.log(ex)
})


async function test() {
  // console.log(await redis.hexists('test', 'allin'));
  const a = new Map();
  a.set('loginStatus', '1');
  await redis.hset('test', 'allin', a);
  // await redis.hset('test', 'allin', { login: '1' });
  let data = await redis.hget('test', 'allin');
  // let parse = JSON.parse(data);
  console.log(typeof data);
  // console.log(typeof parse, parse.login);
}

test();

