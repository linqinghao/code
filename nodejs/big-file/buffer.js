// let buffer1 = Buffer.from('hello');
// let buffer2 = Buffer.from(" buffer");
// let buffer3 = Buffer.from("!");

// console.log(Buffer.concat([buffer1, buffer2, buffer3]).toString());


// let buf = Buffer.from([1, 2, 3])
// console.log(buf.toJSON())


let buf1 = Buffer.from('helloouoooo');
let buf2 = Buffer.from('buffer');

let buf = Buffer.concat([buf1, buf2])

const MAX_SIZE = 8

let cache = [];

console.log(buf.length)

if (buf.length >= MAX_SIZE) {
  const len = buf.length
  const count = Math.floor(len / MAX_SIZE)
  for (let i = 0; i < count; i++) {
    let newBuf = Buffer.alloc(MAX_SIZE)
    buf.copy(newBuf, 0, i * MAX_SIZE, (i + 1) * MAX_SIZE);
    cache.push(newBuf)
  }
  console.log(count)
  buf = buf.slice(count * MAX_SIZE)
}

console.log(buf.toString())

cache.forEach(i => console.log(i.toString()))



