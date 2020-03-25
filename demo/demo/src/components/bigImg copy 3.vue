<template>
    <div class="ImgContainer" ref="ImgContainer" @mousedown="onmousedown">
        <span></span>
        <img ref="resource" :style="{'width': imgW + 'px','height': imgH + 'px','top': top+'px' , 'left': left+'px', 'transform': 'translate('+disX+'px,'+disY+'px) scale('+size+')','transformOrigin':origin }" :src="srcPath" alt="加载失败" />
        <!-- <img id="oImg" ref="resource" :style="{'width': imgW + 'px','height': imgH + 'px','top': top+'px' , 'left': left+'px',}" :src="srcPath" alt="加载失败" /> -->
    </div>
</template>
<script>
// import js from 'flv.js'
// 探索改变图片尺寸版本
export default {
    props: ['srcPath'],
    data () {
        return {
            top: 0,
            left:0,
            size: 1,
            origin:'0px 0px',
            imgW:0,
            imgH:0,
            disX:0,
            disY:0,
            imgMove:false,
            resource:'',
            big:false,
        }
    },
    mounted () {
        setTimeout(()=>{
            this.resource = this.$refs.resource
            this.ImgContainer = this.$refs.ImgContainer
            this.imgW = this.ImgContainer.offsetWidth
            this.imgH = this.ImgContainer.offsetHeight
            this.resource.classList.remove("transition");
        },100)
        // 兼容火狐浏览器
        let mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? 'DOMMouseScroll' : 'mousewheel' // FF doesn't recognize mousewheel as of FF3.x
        this.$refs.resource.addEventListener(mousewheelevt, this.mWheel, false)
        // this.zoom('#drag');
    },
    methods: {

        mWheel (ev) {
            var ev = ev || window.event;
            var oImg = this.resource;
            var parentNode = oImg.parentNode

            let dir = ev.detail ? ev.detail * (-120) : ev.wheelDelta
            this.size += dir / 2000
            // console.log(this.big)

            if (dir > 0) {
                this.big = true
            } else {
                this.big = false
                if(this.size<1) {
                    // return this.size = 1
                }
            }
            this.origin = ev.layerX+'px '+ev.layerY + 'px'


            // console.log(this.size*(ev.clientX - this.ImgContainer.offsetLeft))
            // 因为滚轮事件写在了容器内，所以ev.client的坐标点只能是容器内的坐标
            // ol/nl = ow/nw  之前鼠标距离图片的距离/之前图片的宽度 = 当前鼠标距图片距离/当前图片宽
            //ev.clientX + 图片的left/ 未知数 = old width /600*this.size 

            // weizhishu = 600*this.size/this.imgW *ev.clientX + this.left 
            // 假设原图尺寸为600*600，鼠标点为图片内的200*200，容器的偏移量是50,50，图片的偏移量是0，0
            // 放大至图片尺寸为672*672，这时候，图片的偏移量应该是 -24，-24
            // -（672-600） * （200+0）/600
            // console.log(600*this.size,this.imgW) 
            // console.log(this.imgW)

            var ratioL = (ev.clientX - oImg.offsetLeft) / oImg.offsetWidth,
			ratioT = (ev.clientY - oImg.offsetTop) / oImg.offsetHeight,
			w = 600 * this.size,
			h = 600 * this.size,
			// l = ev.clientX - (w * ratioL),
            // t = ev.clientY - (h * ratioT);
            l = (ev.clientX-parentNode.offsetLeft+this.left)*600*this.size/this.imgW-(ev.clientX-parentNode.offsetLeft),
            t = (ev.clientY-parentNode.offsetTop+this.top)*600*this.size/this.imgH-(ev.clientY-parentNode.offsetTop)

            console.log(oImg.offsetLeft)
            // this.imgW = w
            // this.imgH = h;
            // this.left = -l
            // this.top = -t


        },
        // 步态系统的外层是wrapper
        onmousedown (e) {
            var oEvent = e || window.event;
            // 按下鼠标清除过渡效果
            let resource = this.$refs.resource
            resource.classList.remove("transition");

            // let ev = e || window.event
            var wrapper = document.getElementById('app');
            var oImg = document.getElementById('oImg'),
            oParent = oImg.parentNode,
			disX = oEvent.clientX - oImg.offsetLeft,
            disY = oEvent.clientY - oImg.offsetTop;
            
            
            let that = this
            let isMove5 = false
            this.$refs.resource.onmousemove = function (el) {
                let ev = el || window.event
                if (oParent.setCapture) {
					oParent.setCapture();
				}
				var oEvent = ev || window.event,
				l = oEvent.clientX - disX,
				t = oEvent.clientY - disY;
				oImg.style.left = l +'px';
				oImg.style.top = t +'px';
				oParent.onselectstart = function() {
					return false;
				}
                // if (Math.abs(ev.movementX) > 5 || Math.abs(ev.movementY) > 5) {
                //     isMove5 = true
                // }
                // that.left += ev.movementX
                // that.top += ev.movementY
            }
            // 鼠标在外层松开时，清除内部拖拽事件
            wrapper.onmouseup = function () { 
                
                that.$refs.resource.onmousemove = null
            }
            this.$refs.resource.onmouseup = function () {
                // 不兼容IE
                if (that.isIE() || that.isIE11()) {
                    this.$message.error('您的浏览器不支持图片缩放拖拽')
                }
                if (oParent.releaseCapture) {
					oParent.releaseCapture();
				}
				oParent.onselectstart = null;
                that.$refs.resource.onmousemove = null
                that.$refs.resource.onmouseup = null
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
.ImgContainer {
    width: 100%;
    height: 100%;
    position: relative;
}
.ImgContainer img {
    /* object-fit: contain;
    object-position: center; */
    position: absolute;
}
.ImgContainer span{
    position: absolute;
    top:202px;
    left:202px;
    border:2px solid black;
    z-index:4;

}
.transition{
    transition: all 0.3s;
}
</style>