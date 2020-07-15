<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <el-button type="primary" @click="handleUpload">
      上传
      <i class="el-icon-upload el-icon--right"></i>
    </el-button>
  </div>
</template>

<script>
import { request } from '../utils/request'
const SIZE = 10 * 1024 * 1024 // 切片大小

export default {
  data() {
    return {
      container: {
        file: null,
      },
      data: [],
    }
  },
  methods: {
    handleFileChange(e) {
      let [file] = e.target.files
      if (!file) return
      this.container.file = file
    },
    async handleUpload() {
      if (!this.container.file) return
      const fileChunkList = this.createFileChunk(this.container.file)
      this.data = fileChunkList.map(({ file }, index) => {
        return {
          chunk: file,
          hash: this.container.file.name + '-' + index,
        }
      })
      await this.uploadChunks()
      // 合并切片
      await this.mergeRequest()
    },
    // 生成文件切片
    createFileChunk(file, size = SIZE) {
      const fileChunkList = []
      let total = 0
      while (total < file.size) {
        fileChunkList.push({ file: file.slice(total, total + size) })
        total += size
      }
      return fileChunkList
    },
    // 上传切片
    async uploadChunks() {
      const requestList = this.data
        .map(({ chunk, hash }) => {
          const formData = new FormData()
          formData.append('chunk', chunk)
          formData.append('hash', hash)
          formData.append('fileName', this.container.file.name)
          return { formData }
        })
        .map(async ({ formData }) => {
          request({
            url: 'http://localhost:3000/uploadSlice',
            data: formData,
          })
        })
      await Promise.all(requestList)
    },
    async mergeRequest() {
      await request({
        url: 'http://localhost:3000/mergeSlice',
        headers: {
          'content-type': 'application/json',
        },
        data: JSON.stringify({
          fileName: this.container.file.name,
          size: SIZE,
        }),
      })
    },
  },
}
</script>