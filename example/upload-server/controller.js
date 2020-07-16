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
  const chunkDir = path.resolve(UPLOAD_DIR, fileName)
  const chunkPaths = await fse.readdir(filePath)
  console.log('chunkPaths:', chunkPaths);
  chunkPaths.sort((a, b) => a.split('-')[1] - b.split('-')[1])
  await Promise.all(
    chunkPaths.map((chunkPath, index) =>
      pipeStream(
        path.resolve(filePath, chunkPath),
        // 指定位置创建可写流
        fse.createWriteStream(chunkDir, {
          start: index * size,
          end: (index + 1) * size,
        })
      )
    )
  )
  fse.rmdirSync(filePath) // 合并后删除保存切片的目录
}

module.exports = {
  async handleUploadSlice(req, res) {
    const mult = new multiparty.Form()
    mult.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err)
        res.status = 500
        res.end('process file chunk failed')
        return
      }
      
      const [chunk] = files.chunk
      const [hash] = fields.hash
      const [fileName] = fields.fileName
      const chunkDir = path.resolve(UPLOAD_DIR, `${fileName}-upload`)
      if (!fse.existsSync(chunkDir)) {
        await fse.mkdirs(chunkDir)
      }
      console.log(fields, chunkDir)
      await fse.move(chunk.path, `${chunkDir}/${hash}`)
      res.end('receive chunk')
    })
  },
  async mergeSlice(req, res) {
    let data = await resolveRes(req)
    const { fileName, size } = data
    const filePath = path.resolve(UPLOAD_DIR, `${fileName}-upload`)
    try {
      await mergeFileChunk(filePath, fileName, size)
      res.end(JSON.stringify({ code: '0', msg: 'merge success!' }))
    } catch (err) {
      console.log(err.message)
      res.end(JSON.stringify({ code: '1', msg: 'merge fail!' }))
    }
  }
}
