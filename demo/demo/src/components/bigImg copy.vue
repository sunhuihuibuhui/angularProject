<template>
    <div class="bigImgBox" ref="maskBox" @mousedown="onmousedown" @mousemove="moveM">
            <img ref="resource" :style="{'top': top+'px' , 'left': left+'px', 'transform': 'translate('+disX+'px,'+disY+'px) scale('+size+')','transformOrigin':origin }" :src="srcPath" alt="加载失败" />
    </div>
</template>
<script>
// 切换缩放时定位有点不准，要调一下
export default {
    props: ['srcPath'],
    data () {
        return {
            top: 0,
            left:0,
            size: 1,
            origin:'0px 0px',
            imgMove:false,
            plusX:0, 
            plusY:0,
            subX:0,
            subY:0,
            disX:0,
            disY:0,
            tamp:0,
            tampX:0,
            tampY:0,
            isBig:false,
        }
    },
    mounted () {
        setTimeout(()=>{
            const imgW = this.$refs.resource.offsetWidth,imgH = this.$refs.resource.offsetHeight;
            if(imgW < imgH){// 图片窄
                // this.left = (this.$refs.maskBox.offsetWidth - imgW)/2;
            }else{//图片扁
                // this.top = (this.$refs.maskBox.offsetHeight - imgH)/2
            }
        },100)
        // 兼容火狐浏览器
        let mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? 'DOMMouseScroll' : 'mousewheel' // FF doesn't recognize mousewheel as of FF3.x
        this.$refs.maskBox.addEventListener(mousewheelevt, this.mWheel, false)
    },
    methods: {
        moveM(e){
            let ev = e || window.event
            // 防止内部滚动影响到外面滚动条
            ev.preventDefault()
            ev.stopPropagation()
            // console.log(ev)
            this.tamp =  ev.layerX+'px '+ev.layerY + 'px'
            this.tampX = ev.layerX
            this.tampY = ev.layerY
        },
        mWheel (e) {
            // 添加滚动效果
            let resource = this.$refs.resource
            let maskBox = this.$refs.maskBox
            resource.classList.add("transition");
            let ev = e || window.event
            // 防止内部滚动影响到外面滚动条
            ev.preventDefault()
            ev.stopPropagation()
            //  const { x: mouseX, y: mouseY } = ev;
            // this.origin = this.tamp

            var {
                transformOrigin,
                transform
            } = getComputedStyle(this.$refs.resource)
            var mx = 0; 
            var my = 0;
            var [ox, oy] = transformOrigin.match(/\d+(\.\d+)?/g)
            var dx = ox - mx
            var dy = oy - my
            // transform+=` translate(${-dx}px,${-dy}px) scale(2) translate(${dx}px,${dy}px)`
            // console.log(dx,dy)


            let dir = ev.detail ? ev.detail * (-120) : ev.wheelDelta
            this.size += dir / 2000

            // if(this.tampX-ox!=0&&this.tampY-oy!=0){
            //     this.disX = (ox-this.tampX)
            //     this.disY = (oy-this.tampY)
            // }else{
            //     this.disX = 0
            //     this.disY = 0
            // }
            let tamp = this.isBig

            if (dir > 0) {
                this.isBig = true
                // this.origin = ev.offsetX + 'px ' + ev.offsetY + 'px'
                // this.origin = ev.layerX+'px '+ev.layerY + 'px'
            } else {
                this.isBig = false
                // this.origin = ev.layerX+'px '+ev.layerY + 'px'
                if(this.size<1) {
                    return this.size = 1
                }
            }
            // 图片看上去的尺寸  resource.offsetWidth * this.size
            // console.log(resource.offsetWidth * this.size)
            // console.log(ev.layerX,ev.layerY,ev.clientX - maskBox.offsetTop)
            this.origin = ev.layerX+'px '+ev.layerY + 'px'
            // console.log(tamp == this.isBig)
            if(tamp !== this.isBig){//初次放大或缩小
                // console.log(ev.clientX - maskBox.offsetTop)
                // console.log(ev.clientY - maskBox.offsetLeft)
            

            }
            
            // this.$refs.resource.style.transformOrigin  = this.origin
        },
        // 鼠标在mask区域选中时可以操作，但是如果鼠标移动到之外的区域，就要取消，
        onmousedown (e) {
            let ev = e || window.event
            var wrapper = document.getElementById('app');
            // 按下鼠标清除过渡效果
            let resource = this.$refs.resource
            resource.classList.remove("transition");
            let that = this
            let isMove5 = false
            this.$refs.resource.onmousemove = function (el) {
                let ev = el || window.event
                if (Math.abs(ev.movementX) > 5 || Math.abs(ev.movementY) > 5) {
                    isMove5 = true
                }
                that.left += ev.movementX
                that.top += ev.movementY
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
.bigImgBox {
    width: 100%;
    height: 100%;
    position: relative;
}
.mask{
    position: absolute;
    background: red;
    width:230px;
    height: 185px;
    z-index: 1;
}
.bigImgBox img {
    width:100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    position: absolute;
}
.transition{
    transition: all 0.3s;
}
</style>