<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <el-button type="primary" @click="handleUpload" :disabled="uploadDisabled">
      上传
      <i class="el-icon-upload el-icon--right"></i>
    </el-button>
    <el-button @click="handleResume" v-if="status === Status.pause">恢复</el-button>
    <el-button type="primary" @click="handlePause" v-else :disabled="status != Status.uploading || !container.hash">暂停</el-button>
    <div>
      <div>计算文件 hash</div>
      <el-progress :percentage="hashPercentage"></el-progress>
      <div>总进度</div>
      <el-progress :percentage="fakeUploadPercentage"></el-progress>
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
const Status = {
  wait: "wait",
  pause: "pause",
  uploading: "uploading"
};
export default {
  filters: {
    transformByte(val) {
      return Number((val / 1024).toFixed(0))
    },
  },
  data() {
    return {
      Status,
      // 上传的文件
      container: {
        file: null,
      },
      // 切片数据
      data: [],
      worker: null,
      hash: null,
      requestList: [],
      hashPercentage: 0,
      fakeUploadPercentage: 0,
      status: Status.wait,
    }
  },
  computed: {
    uploadDisabled() {
      return (
        !this.container.file ||
        [Status.pause, Status.uploading].includes(this.status)
      );
    },
    uploadPercentage() {
      if (!this.container.file || !this.data.length) return 0
      const loaded = this.data
        .map(item => item.size * item.percentage)
        .reduce((acc, cur) => acc + cur)
      return parseInt((loaded / this.container.file.size).toFixed(2))
    },
  },
  watch: {
    uploadPercentage(now) {
      if (now > this.fakeUploadPercentage) {
        this.fakeUploadPercentage = now
      }
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
      this.status = Status.uploading
      const fileChunkList = this.createFileChunk(this.container.file)
      this.container.hash = await this.calculateHash(fileChunkList)

      const { shouldUpload, uploadedList } = await this.verifyUpload(
        this.container.file.name,
        this.container.hash
      )
      if (!shouldUpload) {
        this.$message.success('秒传成功')
        this.status = Status.wait
        return
      }
      console.log('uploadedList', uploadedList);
      this.data = fileChunkList.map(({ file }, index) => {
        return {
          fileHash: this.container.hash,
          chunk: file,
          index,
          size: file.size,
          percentage: uploadedList.includes(this.container.hash + '-' + index) ? 100 : 0,
          hash: this.container.hash + '-' + index,
        }
      })
      await this.uploadChunks(uploadedList)
    },
    handlePause() {
      this.status = Status.pause
      this.requestList.forEach(xhr => xhr?.abort())
      this.requestList = []
    },
    async handleResume() {
      this.status = Status.uploading
      const { uploadedList } = await this.verifyUpload(this.container.file.name, this.container.hash)
      await this.uploadChunks(uploadedList);
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
    async uploadChunks(uploadedList = []) {
      const requestList = this.data
        .filter(({hash}) => !uploadedList.includes(hash))
        .map(({ chunk, hash, index }) => {
          const formData = new FormData()
          formData.append('chunk', chunk)
          formData.append('hash', hash)
          formData.append('fileName', this.container.file.name)
          formData.append('fileHash', this.container.hash)
          return { formData, index }
        })
        .map(async ({ formData, index }) => {
          await request({
            url: 'http://localhost:3000/uploadSlice',
            data: formData,
            onProgress: this.createProgressHandle(this.data[index]),
            requestList: this.requestList,
          })
        })
      await Promise.all(requestList)
      if (uploadedList.length + requestList.length == this.data.length) {
        // 合并切片
        await this.mergeRequest()
      }
    },
    async mergeRequest() {
      await request({
        url: 'http://localhost:3000/mergeSlice',
        headers: {
          'content-type': 'application/json',
        },
        data: JSON.stringify({
          fileName: this.container.file.name,
          fileHash: this.container.hash,
          size: SIZE,
        }),
      })
      this.$message.success('上传成功')
      this.status = Status.wait
    },
    createProgressHandle(item) {
      return e => {
        item.percentage = parseInt(String((e.loaded / e.total) * 100))
      }
    },
    calculateHash(fileChunkList) {
      return new Promise(resolve => {
        this.container.worker = new Worker('/hash.js')
        this.container.worker.postMessage({ fileChunkList })
        this.container.worker.onmessage = e => {
          const { percentage, hash } = e.data
          this.hashPercentage = percentage
          if (hash) resolve(hash)
        }
      })
    },
    async verifyUpload(fileName, fileHash) {
      const { data } = await request({
        url: 'http://localhost:3000/verify',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          fileName,
          fileHash,
        }),
      })
      return JSON.parse(data)
    },
  },
}
</script>