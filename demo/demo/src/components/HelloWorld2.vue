<template>
  <div class="video">
    <video id="videoElement" controls width="400" height="400">xxx</video>
  </div>
</template>
<script>
const that = this
export default {
  data() {
    return {
      player:'',
    };
  },
  created(){
    console.log(flvjs)
  },
  mounted() {
    that.player = document.getElementById('videoElement')
    if (flvjs.isSupported()) {
      var flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url:'https://mister-ben.github.io/videojs-flvjs/bbb.flv'
      });
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load(); //加载
      flvPlayer.play();
    }
  },
};
</script>