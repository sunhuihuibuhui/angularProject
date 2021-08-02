<template>
  <el-upload
    :action="uploadUrl"
    :data="uploadData"
    :accept="accept"
    :show-file-list="false"
    :headers="headers"
    :on-success="handleUploadSuccess"
    :before-upload="handleBeforeUpload"
    :on-error="handleUploadError"
  >
    <slot></slot>
  </el-upload>
</template>

<script>
import { getToken } from "@/utils/auth";
export default {
  name: "configUpload",
  props: {
    uploadData: {
      type: Object,
      default: {},
    },
    accept: {
      type: String,
      default: "",
    },
    action: {
      type: String,
      default: "/dataset/file/addFile",
    },
  },
  data() {
    return {
      uploadUrl: "",
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    };
  },
  created() {
    this.uploadUrl = process.env.VUE_APP_BASE_API + this.action; // 上传地址
  },

  methods: {
    handleUploadSuccess(res) {
      if (this.uploadData.file_type) {
        this.$emit("handleUploadSuccess", this.uploadData.file_type);
      } else {
        this.$emit("handleUploadSuccess", res);
      }
      this.loading.close();
    },
    handleBeforeUpload(file) {
      if (!this.uploadData.file_type) this.uploadData.name = file.name;
      console.log(this.uploadData);
      this.loading = this.$loading({
        lock: true,
        text: "上传中",
        background: "rgba(0, 0, 0, 0.7)",
      });
    },
    handleUploadError() {
      this.$message({
        type: "error",
        message: "上传失败",
      });
      this.loading.close();
    },
  },
};
</script>
