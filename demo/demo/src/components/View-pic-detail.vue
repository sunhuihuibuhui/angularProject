<template>
    <div class="bigImgBox" ref="maskBox" @mousedown="onmousedown">
        <img class='transition' ref="source" :src="srcPath" alt="加载失败" id='source'
            :style="{'width': imgW + 'px' ,'height': imgH + 'px','top': top + 'px', 'left': left + 'px'}"/>
    </div>
</template>
<script>
export default {
    props: ['srcPath'],
    data () {
        return {
            imgW: 0,
            imgH: 0,
            top: 0,
            left: 0,
            source:''
        }
    },
    mounted () {
        this.source = document.querySelector('#source')
        this.imgW = this.$refs.maskBox.offsetWidth
        this.imgH = this.$refs.maskBox.offsetHeight
        // 兼容火狐浏览器
        let mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? 'DOMMouseScroll' : 'mousewheel' // FF doesn't recognize mousewheel as of FF3.x
        this.$refs.source.addEventListener(mousewheelevt, this.mWheel, false)
    },
    methods: {
        mWheel (ev) {
            let source = this.$refs.source
            let parentDom = this.$refs.maskBox
            // source.classList.add("transition");
            var oEvent = ev || window.event,
            delta = oEvent.detail ? oEvent.detail > 0 : oEvent.wheelDelta < 0;
            var ratioL = (oEvent.clientX - source.offsetLeft) / source.offsetWidth,
            ratioT = (oEvent.clientY - source.offsetTop) / source.offsetHeight,
            ratioDelta = !delta ? 1 + 0.1 : 1 - 0.1,
            w = parseInt(source.offsetWidth * ratioDelta),
            h = parseInt(source.offsetHeight * ratioDelta),
            l = Math.round(oEvent.clientX - (w * ratioL)),
            t = Math.round(oEvent.clientY - (h * ratioT));
            this.imgW = w;
            this.imgH = h;
            this.left = l;
            this.top = t;
            // console.log(oEvent.clientX , source.offsetLeft , parentDom.offsetLeft)
            console.log(oEvent)
            
            // 防止内部滚动影响到外面滚动条
            oEvent.preventDefault()
            oEvent.stopPropagation()
        },
        onmousedown (e) {
            this.$refs.source.classList.remove("transition");
            var wrapper = document.getElementById('app');
            this.$refs.source.onmousemove = (el)=>{
                let ev = el || window.event
                ev.preventDefault()
                this.left += ev.movementX
                this.top += ev.movementY
            }
            // 鼠标在外层松开时，清除内部拖拽事件
            wrapper.onmouseup = ()=>{ 
                this.$refs.source.onmousemove = null
            }
            this.$refs.source.onmouseup = ()=>{
                // 不兼容IE
                if (this.isIE() || this.isIE11()) {
                    this.$message.error('您的浏览器不支持图片缩放拖拽')
                }
                this.$refs.source.onmousemove = null
                this.$refs.source.onmouseup = null
            }
            // 阻止默认
            if (e.preventDefault) {
                e.preventDefault()
            } else {
                return false
            }
        },
        isIE () {
            if (!!window.ActiveXObject || 'ActiveXObject' in window) {
                return true
            } else {
                return false
            }
        },
        isIE11 () {
            if ((/Trident\/7\./).test(navigator.userAgent)) {
                return true
            } else {
                return false
            }
        }
    },
}
</script>
<style>
.bigImgBox {
    width: 646px;
    height: 967px;
    /* position: relative; */
}

.bigImgBox img {
    width:100%;
    height: 100%;
    /* object-fit: contain; */
    /* object-position: center; */
    position: absolute;
    left: 0;
    top: 0;
}

.transition{
    transition: all 0.3s;
}

</style>