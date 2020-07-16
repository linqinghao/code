<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <el-button type="primary" @click="handleUpload">
      上传
      <i class="el-icon-upload el-icon--right"></i>
    </el-button>
    <div>
      <div>总进度</div>
      <el-progress :percentage="uploadPercentage"></el-progress>
    </div>
    <el-table :data="data">
      <el-table-column label="切片hash" align="center" prop="hash"></el-table-column>
      <el-table-column label="大小（KB）" align="center" width="120">
        <template v-slot="{ row }">{{ row.size | transformByte}}</template>
      </el-table-column>
      <el-table-column label="进度" align="center">
        <template v-slot="{ row }">
          <el-progress :percentage="row.percentage" color="#909399"></el-progress>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { request } from '../utils/request'
const SIZE = 10 * 1024 * 1024 // 切片大小

export default {
  filters: {
    transformByte(val) {
      return Number((val / 1024).toFixed(0))
    },
  },
  data() {
    return {
      // 上传的文件
      container: {
        file: null,
      },
      // 切片数据
      data: [],
    }
  },
  computed: {
    uploadPercentage() {
      if (!this.container.file || !this.data.length) return 0
      const loaded = this.data
        .map(item => item.size * item.percentage)
        .reduce((acc, cur) => acc + cur)
      return parseInt((loaded / this.container.file.size).toFixed(2))
    },
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
          index,
          size: file.size,
          percentage: 0,
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
        .map(({ chunk, hash, index }) => {
          const formData = new FormData()
          formData.append('chunk', chunk)
          formData.append('hash', hash)
          formData.append('fileName', this.container.file.name)
          return { formData, index }
        })
        .map(async ({ formData, index }) => {
          await request({
            url: 'http://localhost:3000/uploadSlice',
            data: formData,
            onProgress: this.createProgressHandle(this.data[index]),
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
    createProgressHandle(item) {
      return e => {
        item.percentage = parseInt(String((e.loaded / e.total) * 100))
      }
    },
  },
}
</script>