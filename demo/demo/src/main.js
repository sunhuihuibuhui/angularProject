// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'



import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999,
    title: false,
    "inline": false, 
    "button": false, 
    "navbar": false,
    "title": false,
    "toolbar": false,
    "tooltip": false, 
    "movable": true, 
    "zoomable": true, 
    "rotatable": false, 
    "scalable": true, 
    "transition": true,
    "fullscreen": true,
    "keyboard": true, 
  }
})

Vue.config.productionTip = false

// 视频播放插件
import videoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
Vue.use(videoPlayer )


// import Videojs from 'video.js'
// import 'video.js/dist/video-js.css'
// Vue.prototype.$video = Videojs
import Video from 'video.js'
import 'video.js/dist/video-js.css'
Vue.prototype.$video = Video

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
