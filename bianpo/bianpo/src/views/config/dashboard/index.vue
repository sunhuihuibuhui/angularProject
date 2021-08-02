<template>
  <div class="app-container">
    <el-row :gutter="15" type="flex" justify="center">
      <el-form
        ref="elForm"
        size="mini"
        :model="formData"
        label-suffix=":"
        label-width="100px"
      >
        <el-col :span="24">
          <el-form-item label="系统名称" prop="field105">
            <div style="display: flex">
              <config-upload
                :uploadData="{ file_type: 1 }"
                accept=".png"
                @handleUploadSuccess="handleUploadSuccess"
              >
              <el-button type="primary">点击上传</el-button>
            </config-upload>
              <img
                v-if="logoFile.fileName"
                style="height: 37px; margin: 0 10px"
                :src="logoFile.fileName"
              />
              <el-input
                v-model="formData.sysName"
                placeholder="请输入"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="首页轮播" prop="field109">
            <config-upload
              :uploadData="{ file_type: 2 }"
              accept=".jpg, .jpeg, .png, .gif"
              @handleUploadSuccess="handleUploadSuccess"
            >
              <el-button type="primary">点击上传</el-button>
            </config-upload>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item>
            <ul class="el-upload-list el-upload-list--picture-card banner-list">
              <li
                class="el-upload-list__item"
                v-for="img in bannerList"
                :key="img.id"
              >
                <img
                  :src="img.fileName"
                  alt=""
                  class="el-upload-list__item-thumbnail"
                />

                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview"
                    ><i
                      class="el-icon-zoom-in"
                      @click="previewBanner(img.fileName)"
                    ></i>
                  </span>
                  <span class="el-upload-list__item-delete"
                    ><i
                      class="el-icon-delete"
                      @click="delBanner(img.id)"
                    ></i></span
                ></span>
              </li>
            </ul>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="用户指南" prop="field110">
            <config-upload
              :uploadData="{ file_type: 3 }"
              accept=".pdf"
              @handleUploadSuccess="handleUploadSuccess"
            >
              <el-button type="primary">点击上传</el-button>
            </config-upload>
            <a target="_blank" :href="pdfFile.fileName">{{
              pdfFile.fileName
            }}</a>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="平台概况" prop="platformOverview">
            <el-input
              v-model="formData.platformOverview"
              type="textarea"
              placeholder="请输入平台概况"
              :autosize="{ minRows: 4, maxRows: 6 }"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-dialog :visible.sync="bannerVisible">
      <img width="100%" :src="bannerImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import {
  getInfo,
  editInfo,
  getFileInfo,
  delFile,
} from "@/api/config/dashboard";
import { getToken } from "@/utils/auth";
import configUpload from "../modules/upload";
export default {
  components: { configUpload },
  props: [],
  data() {
    return {
      formData: {
        sysName: undefined,
        platformOverview: undefined,
      },
      dataSetUrl: "",
      bannerList: [],
      logoFile: {},
      pdfFile: {},
      bannerVisible: false,
      bannerImageUrl: "",
    };
  },
  computed: {},
  watch: {},
  created() {
    getInfo().then((res) => {
      this.formData = res.data;
    });
    this.getFileList();
  },
  mounted() {},
  methods: {
    getFileList() {
      getFileInfo().then((res) => {
        this.bannerList = [];
        res.rows.forEach((el) => {
          if (el.fileType == 1) {
            this.logoFile = el;
          } else if (el.fileType == 3) {
            this.pdfFile = el;
          } else {
            this.bannerList.push(el);
          }
        });
        console.log(res.rows);
      });
    },
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        editInfo(this.formData).then((res) => {
          if (res.code == 200) {
            this.$message.success(res.msg);
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    },
    handleUploadSuccess(type) {
      const delId =
        type == 1 ? this.logoFile.id : type == 3 ? this.pdfFile.id : null;
      if (delId) {
        delFile(delId);
      }
      this.getFileList();
    },
    previewBanner(src) {
      this.bannerVisible = true;
      this.bannerImageUrl = src;
    },
    delBanner(id) {
      delFile(id).then((res) => {
        if (res.code == 200) {
          this.getFileList();
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.banner-list {
  width: 100%;
  height: 62px;
  display: flex;
  overflow-x: auto;
  .el-upload-list__item {
    width: 100px;
    height: 62px;
  }
  img {
    width: 100%;
    height: 100%;
    //object-fit: contain;
  }
}
</style>
