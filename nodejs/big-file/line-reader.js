/**
 * read file line by line
 */
const fs = require('fs')

const inStream = fs.createReadStream('./big.file')
const outStream = fs.createWriteStream('./big2.file')

let str = ''
inStream.on('data', chunk => {
  let lines = (str + chunk).split(/\r?\n/g)
  str = lines.pop()
  for (let i = 0; i < lines.length; ++i) {
    // do something with `lines[i]`
    outStream.write(lines[i])
  }
})

inStream.on('error', err => {
  console.log(err)
  outStream.end()
})

inStream.on('end', () => {
  outStream.end()
})
