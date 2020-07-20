const path = require('path')
const multiparty = require('multiparty')
const fse = require('fs-extra')
const { verify } = require('crypto')
const { strict } = require('assert')
const UPLOAD_DIR = path.resolve(__dirname, 'static') // 文件存储目录

const extractExt = filename =>
  filename.slice(filename.lastIndexOf('.'), filename.length)

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

const mergeFileChunk = async (filePath, fileHash, size) => {
  const chunkDir = path.resolve(UPLOAD_DIR, fileHash)
  const chunkPaths = await fse.readdir(chunkDir)
  console.log('chunkPaths:', chunkPaths)
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
  fse.rmdirSync(chunkDir) // 合并后删除保存切片的目录
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
      const [fileHash] = fields.fileHash
      const chunkDir = path.resolve(UPLOAD_DIR, fileHash)
      const filePath = path.resolve(
        UPLOAD_DIR,
        `${fileHash}${extractExt(fileName)}`
      )
      if (fse.existsSync(filePath)) {
        return res.end('file exist')
      }
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
    const { fileName, size, fileHash } = data
    const ext = extractExt(fileName)
    const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${ext}`)
    try {
      await mergeFileChunk(filePath, fileHash, size)
      res.end(JSON.stringify({ code: '0', msg: 'merge success!' }))
    } catch (err) {
      console.log(err.message)
      res.end(JSON.stringify({ code: '1', msg: 'merge fail!' }))
    }
  },
  async verifyUpload(req, res) {
    const data = await resolveRes(req)
    const { fileName, fileHash } = data
    const ext = extractExt(fileName)
    const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${ext}`)
    if (fse.existsSync(filePath)) {
      res.end(
        JSON.stringify({
          shouldUpload: false,
        })
      )
    } else {
      res.end(
        JSON.stringify({
          shouldUpload: true,
        })
      )
    }
  },
}
