<template>
  <div
    class="app-container"
    v-loading="loading"
    element-loading-text="研发中敬请期待！"
    element-loading-spinner="el-icon-magic-stick"
    element-loading-background="rgba(31, 46, 61)"
  ></div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
    };
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>