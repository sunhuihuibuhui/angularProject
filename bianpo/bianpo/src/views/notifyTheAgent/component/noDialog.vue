<<<<<<< HEAD
<template>
  <div class="box-not">
    <el-dialog
      title="拒绝原因"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="textarea"
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleClick('cancel')">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleClick('determine')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      textarea: "",
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    dialogVisibleClick(type) {
      if (type === "cancel") {
        this.$emit("closepop");
        this.textarea = "";
      } else if (type === "determine") {
        this.$emit("determine", this.textarea);
        this.textarea = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// .box-not {
//   padding: 20px;
// }
=======
<template>
  <div class="box-not">
    <el-dialog
      title="拒绝原因"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="textarea"
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleClick('cancel')">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleClick('determine')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      textarea: "",
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    dialogVisibleClick(type) {
      if (type === "cancel") {
        this.$emit("closepop");
        this.textarea = "";
      } else if (type === "determine") {
        this.$emit("determine", this.textarea);
        this.textarea = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// .box-not {
//   padding: 20px;
// }
>>>>>>> d68bd52999a1e31b7a655be4532e0c6345f6d2d3
</style>