<template>
  <el-dialog
    :visible.sync="addRoleVisible"
    v-on="$listeners"
    @open="onOpen"
    @close="onClose"
    title="新增模版角色"
  >
    <el-form
      ref="elForm"
      :model="formData"
      :rules="rules"
      size="medium"
      label-width="100px"
    >
      <el-form-item label="用户类型" prop="field101">
        <el-select
          v-model="formData.field101"
          placeholder="请选择用户类型"
          clearable
          :style="{ width: '100%' }"
        >
          <el-option
            v-for="(item, index) in field101Options"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色" prop="field103">
        <el-input
          v-model="formData.field103"
          placeholder="请输入角色名称"
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
      <el-form-item label="" prop="field105">
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  inheritAttrs: false,
  name: "addRole",
  components: {},
  props: ["addRoleVisible"],
  data() {
    return {
      formData: {
        field101: undefined,
        field103: undefined,
        field104: undefined,
        field105: undefined,
      },
      rules: {
        field101: [
          {
            required: true,
            message: "请选择空间类型",
            trigger: "change",
          },
        ],
        field103: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: "blur",
          },
        ],
        field104: [
          {
            required: true,
            message: "请输入备注",
            trigger: "blur",
          },
        ],
      },
      field101Options: [
        {
          label: "平台全局用户",
          value: 1,
        },
        {
          label: "数据集用户",
          value: 2,
        },
      ],
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
        this.$emit("close");
      });
    },
  },
};
</script>
<style>
</style>
