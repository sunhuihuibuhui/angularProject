<template>
  <div>
    <!-- <img src="../assets/1.jpg" alt @mousewheel="rollImg(this)" ref="bigImage">-->
    <!-- <div v-viewer>
      <img style='width:400px' src="../assets/2.jpg"/>
    </div>  -->
    <div class="helloBox">
      <bigImg :srcPath="url"/>
    </div>
  </div>
</template>
<script>
import bigImg from './View-pic-detail'
// import bigImg from './bigImg copy 2'
// import bigImg from './bigImg copy'
// import bigImg from './bigImg'
export default {
  data() {
    return {
      url: require('../assets/2.jpg'),
      isShow: false
      
    };
  },
  components:{ bigImg ,},
  created(){

  },
  mounted() {
  },
  methods:{
    showBigImage (url) {
      if (url) {
        this.url = url
        this.isShow = true
      }
    },


    rollImg() {
      /* 获取当前页面的缩放比
            若未设置zoom缩放比，则为默认100%，即1，原图大小
        */
      var zoom = parseInt(this.$refs.bigImage.style.zoom) || 100;
      /* event.wheelDelta 获取滚轮滚动值并将滚动值叠加给缩放比zoom
            wheelDelta统一为±120，其中正数表示为向上滚动，负数表示向下滚动
        */
      zoom += event.wheelDelta / 12;
      /* 最小范围 和 最大范围 的图片缩放尺度 */
      if (zoom >= 100 && zoom <250) {
        this.$refs.bigImage.style.zoom = zoom + "%";
      }
      return false;
    },
  }
};
</script>
<style>
.helloBox {
  /* width: 600px; */
  /* height: 600px; */
  overflow: hidden;
  background: pink;
  border:2px solid black;
}
</style>