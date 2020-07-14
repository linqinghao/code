<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <el-button type="primary" @click="hanleUpload">
      上传
      <i class="el-icon-upload el-icon--right"></i>
    </el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      container: {
        file: null,
      },
    }
  },
  methods: {
    handleFileChange(e) {
      let { files } = e.target;
      if (!files) return;
    },
    handleUpload() {},
  },
}
</script>