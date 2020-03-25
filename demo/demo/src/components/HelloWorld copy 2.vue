<template>
  <div class="video">

    <object id="objSrc1" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0"  type="application/x-shockwave-flash" 
          data="static/video/Flvplayer.swf?file=https://mister-ben.github.io/videojs-flvjs/bbb.flv" height="700" width="100%" >
              <param name="movie" value="static/video/Flvplayer.swf">
              <param name="quality" value="high">
              <param name="allowFullScreen" value="true">
              <param name='allowScriptAccess' value='always'>
              <param name="wmode" value="transparent" />
              <param id="target1" name="FlashVars" value="vcastr_file=http://192.168.50.3:8006/media/videos/visys_2.flv">
          </object>
      
    <!-- <object id="MediaPlayer" classid="clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95" width="800" height="600" standby="Loading Windows Media Player components…" type="application/x-shockwave-flash" codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,4,7,1112">
    <param name="FileName" value="test.avi">
    <param name="AutoStart" value="true">
    <param name="ShowControls" value="true">
    <param name="BufferingTime" value="2">
    <param name="ShowStatusBar" value="true">
    <param name="AutoSize" value="true">
    <param name="InvokeURLs" value="false">
    <param name="AnimationatStart" value="1">
    <param name="TransparentatStart" value="1">
    <param name="Loop" value="1">
    <embed type="application/x-mplayer2" src="https://mister-ben.github.io/videojs-flvjs/bbb.flv" name="MediaPlayer" autostart="1" showstatusbar="1" showdisplay="1" showcontrols="1" loop="0" videoborder3d="0" pluginspage="http://www.microsoft.com/Windows/MediaPlayer/" width="800" height="600"></embed>
  </object> -->
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
      config: {
        id: 'vs',
        // url: 'http://vjs.zencdn.net/v/oceans.mp4'
        url: 'https://mister-ben.github.io/videojs-flvjs/bbb.flv',
        isLive: false,
        preloadTime: 30,
        minCachedTime: 5,
        cors: true
      },
      Player: null
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