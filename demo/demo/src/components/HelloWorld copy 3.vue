<template>
  <div class="video">

    <video-player  class="video-player vjs-custom-skin"
              ref="videoPlayer" :playsinline="true" :options="playerOptions">
          </video-player>
  </div>
</template>
<script>
const that = this
import Xgplayer from 'xgplayer-vue';
import 'xgplayer';
import FlvPlayer from 'xgplayer-flv';
export default {
  data() {
    return {
      playerOptions:{
        aspectRatio:'16:9',
        autoplay: true,//自动播放
        muted: true,// 默认情况下消除任何音频
        loop:true,//循环播放
        preload:'none',//自动下载
        playbackRates: [0.5, 1.0, 1.5, 2.0],//倍速播放
        sources: [{
            type:"video/mp4"||"video/ogg"||"video/webm",
            src:'http://192.168.50.3:8006/media/videos/3.mp4',
        }],
        notSupportedMessage: '此视频暂无法播放，请稍后再试', 
      }
    };
  },
  components:{
    Xgplayer
  },
  created(){
  },
  mounted() {
   
  },
  methods:{
  }
};
</script>