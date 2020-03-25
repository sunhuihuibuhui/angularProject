<template>
  <div>
    
      <div>
        <video ref="viodeRef" id="video2"
            class="video-js vjs-default-skin vjs-big-play-centered"
            controls
            preload="auto"
            width="640"
            height="264"
            poster="http://static.qiakr.com/app/full_res.jpg">
          <!--type="application/x-mpegURL"-->
          <source :src="playOptions.source[0].src" >
          <p class="vjs-no-js">不支持播放</p>
        </video>
      </div>

  </div>
</template>

<script>
  import videojs from  'video.js/dist/video.min'
  import 'video.js/dist/video-js.min.css'
  import 'videojs-flash/dist/videojs-flash';

    export default {
        name: 'Videojs',
      data () {
        return {
            playOptions:{
              autoplay: false, // 自动播放
              controls: true, // 是否显示控制栏
              notSupportedMessage: '此视频暂无法播放，检查相机状态是否正常或请查看是否安装flash',//无法播放时显示的信息
              techOrder: ['flash', 'html5'],// 兼容顺序
              sourceOrder: true,
              flash: {
                swf: '../../../static/VideoJS.swf'   //如果是本地视频  需要相应的videoJS.swf文件
              },
              source:[{
                // type:"video/mp4"||"video/ogg"||"video/webm",
                type: 'rtmp/flv',
                src:require('../assets/0.mp4')
              }],
              poster:'', //播放器 默认图片
//              controlBar: {                     // 配置控制栏
//                timeDivider: false, // 时间分割线
//                durationDisplay: false, // 总时间
//                progressControl: true, // 进度条
//                customControlSpacer: true, // 未知
//                fullscreenToggle: true // 全屏
//              },

            },
          myPlayer:''
        }
      },
      created(){
        console.log(flvjs)
      },

      mounted () {
        return
      //切换src的方法：
      //---(一定要在load里面添加上url，然后执行play函数，play函数执行后会自动执行ready,loadedmetadata,timeupdate等函数)
     	 _this.myPlayer.off('timeupdate'); //移除timeupdate事件
            _this.myPlayer.reset(); //重置 video
            
            _this.myPlayer.src([                     
              {
                type: 'rtmp/mp4',
                src: _this.currentSrc
              },
            ]);
            _this.myPlayer.load( _this.currentSrc);
            _this.myPlayer.play();
       //-----------------------------------------------------------------------end
       
	    const _this = this;
          _this.myPlayer = videojs('video2',_this.playOptions,function () {
            //--------methods
            this.load();
            this.play();
            //this.pause();//暂停

            //------events    绑定事件用on    移除事件用off
            this.on('loadstart',function () {
              console.log('loadstart------------')
            });
            this.on('loadedmetadata',function () {
              console.log('loadedmetadata---视频源数据加载完成----')
            });
            this.on('loadeddata',function () {
              console.log('loadeddata---渲染播放画面----');//autoPlay必须为false
            });
            this.on('progress',function () {
              console.log('progress-------加载过程----')
            });
            this.on('timeupdate',function () {
              const curTime = this.currentTime();
//              console.log('timeupdate-------------',curTime);
            })
            this.off('timeupdate',function () {
              console.log('off----------')
            })

          });

      },
      
      methods:{

      },
      beforeDestroy(){
          const videoDom = this.$refs.viodeRef;  //不能用document 获取节点
          videojs(videoDom).dispose();  //销毁video实例，避免出现节点不存在 但是flash一直在执行，报 this.el.......is not function
      }
    }
</script>

<style scope>

</style>