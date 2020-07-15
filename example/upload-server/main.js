const http = require('http')
const server = http.createServer()
const path = require('path')
const multiparty = require('multiparty')
const fse = require('fs-extra')
const UPLOAD_DIR = path.resolve(__dirname, 'static') // 文件存储目录

const resolveRes = req => {
  return new Promise(resolve => {
    let chunk = ''
    req.on('data', data => {
      chunk += data
    })
    req.on('end', () => {
      resolve(JSON.parse(chunk))
    })
  })
}

const pipeStream = (path, writeStream) => {
  console.log('path', path)
  return new Promise(resolve => {
    const rs = fse.createReadStream(path)
    rs.on('end', () => {
      fse.unlinkSync(path)
      resolve()
    })
    rs.pipe(writeStream)
  })
}

const mergeFileChunk = async (filePath, fileName, size) => {
  const chunkDir = filePath
  const chunkPaths = await fse
    .readdir(chunkDir)
    .catch(err => console.log('err: ', err))
  chunkPaths.sort((a, b) => a.split('-')[1] - b.split('-')[1])
  await Promise.all(
    chunkPaths.map((chunkPath, index) =>
      pipeStream(
        path.resolve(chunkDir, chunkPath),
        // 指定位置创建可写流
        fse.createWriteStream(filePath, {
          start: index * size,
          end: (index + 1) * size,
        })
      )
    )
  )
  fse.rmdirSync(chunkDir)
}

server.on('request', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') {
    res.status = 200
    res.end()
    return
  }

  // 存储切片
  if (req.url === '/uploadSlice') {
    const mult = new multiparty.Form()
    mult.parse(req, async (err, fields, files) => {
      console.log(fields, files)
      if (err) return
      const [chunk] = files.chunk
      const [hash] = fields.hash
      const [fileName] = fields.fileName
      const chunkDir = path.resolve(UPLOAD_DIR, fileName)
      if (!fse.existsSync(chunkDir)) {
        await fse.mkdirs(chunkDir)
      }
      await fse.move(chunk.path, `${chunkDir}/${hash}`)
      res.end('receive chunk')
    })
  }

  // 合并切片
  if (req.url === '/mergeSlice') {
    let data = await resolveRes(req)
    const { fileName, size } = data
    const filePath = path.resolve(UPLOAD_DIR, fileName)
    try {
      await mergeFileChunk(filePath, fileName, size)
      res.end(JSON.stringify({ code: '0', msg: 'merge success!' }))
    } catch (err) {
      console.log(err.message)
      res.end(JSON.stringify({ code: '1', msg: 'merge fail!' }))
    }
  }
})

server.listen(3000, () => console.log('服务正在监听3000端口'))
