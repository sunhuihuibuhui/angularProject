<template>
  <el-dialog
    :visible.sync="addDataVisible"
    v-on="$listeners"
    @open="onOpen"
    @close="onClose"
    title="新增元数据模板"
  >
    <el-form
      ref="elForm"
      :model="formData"
      :rules="rules"
      size="medium"
      label-width="100px"
    >
      <el-form-item label="模板名称" prop="name">
        <el-input
          v-model="formData.name"
          placeholder="请输入模板名称"
          clearable
          :style="{ width: '100%' }"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="学科" prop="topics">
        <el-input
          v-model="formData.topics"
          placeholder="请输入学科名称"
          clearable
          :style="{ width: '100%' }"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="formData.field104"
          type="textarea"
          placeholder="请输入备注"
          :autosize="{ minRows: 4, maxRows: 4 }"
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { add } from "@/api/metadata";
import store from "@/store";
export default {
  inheritAttrs: false,
  name: "addData",
  components: {},
  props: ["addDataVisible"],
  data() {
    return {
      formData: {
        name: undefined,
        topics: undefined,
        userId: store.getters.userId,
        // field104: undefined,
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入模板名称",
            trigger: "change",
          },
        ],
        topics: [
          {
            required: true,
            message: "请输入学科名称",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onOpen() {},
    onClose() {
      this.$refs["elForm"].resetFields();
      this.$emit("close");
    },
    handelConfirm() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        var params = new FormData();
        for (var k in this.formData) {
          params.append(k, this.formData[k])
        }
        add(params).then((res) => {
          if (res.code == 200) {
            this.$emit("close", true);
          } else {
          }
        });
      });
    },
  },
};
</script>
<style>
</style>
