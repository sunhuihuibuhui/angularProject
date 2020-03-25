<template>
    <div class="ImgContainer" ref="ImgContainer" @mousedown="onmousedown">
        <img id='drag' ref="resource" :style="{'width': imgW + 'px','height': imgH + 'px','top': top+'px' , 'left': left+'px',}" :src="srcPath" alt="加载失败" />
        <!-- <img id='drag' ref="resource"  :src="srcPath" alt="加载失败" /> -->
    </div>
</template>
<script>
// 探索改变图片尺寸版本
export default {
    props: ['srcPath'],
    data () {
        return {
            top: 0,
            left:0,
            size: 1,
            imgW:0,
            imgH:0,
            imgMove:false,
            resource:''
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

        zoom (selector, scale = 1, option = {}) {
            // 记录 Translate 的坐标值
            let prevTranslateMap = {
                x: 0,
                y: 0
            }
            let zoomDom = selector,
                mx, // 记录鼠标按下时的 x 坐标
                my, // 记录鼠标按下时的 y 坐标
                tLeft = prevTranslateMap.x, // 最后设置的 translateX 值
                tTop = prevTranslateMap.y, // 最后设置的 translateY 值
                newsetWidth, // 拖动容器最新的宽度
                newsetHeight, // 拖动容器最新的高度
                firstMoveFlag = false // 第一次移动标记，防止用户第一次按下和松开鼠标但并未移动，第二次移动时 dom 出现闪现的情况
            const { interval = 0.1, minScale = 0.5, maxScale = 3, slopOver = true, disabledZoom = false, disabledDrag = false } = option
            if (typeof selector === 'string') {
                zoomDom = document.querySelector(selector)
            }
            zoomDom.style.transformOrigin = '0 0';
            // 获取最初始的宽高
            const { width: initWidth, height: initHeight } = zoomDom.getBoundingClientRect()
            const pDom = zoomDom.parentElement;
            // 滚动事件兼容文章（https://www.zhangxinxu.com/wordpress/2013/04/js-mousewheel-dommousescroll-event/）
            !disabledZoom && zoomDom.addEventListener('mousewheel', ev => {
                const isZoomOut = ev.deltaY < 0; // 缩小
                // 鼠标坐标
                const { x: mouseX, y: mouseY } = ev;
                // 元素当前宽高
                const { height, width } = zoomDom.getBoundingClientRect();
                const { top: pTop, left: pLeft } = pDom.getBoundingClientRect()
                if (!isZoomOut) {
                    // 缩小
                    scale -= interval;
                    if (minScale && scale < minScale) {
                        scale = minScale
                    }
                } else {
                    // 放大
                    scale += interval;
                    if (maxScale && scale > maxScale) {
                        scale = maxScale
                    }
                }
                // 获取比例
                let yScale = (mouseY - pTop - prevTranslateMap.y) / height;
                let xScale = (mouseX - pLeft - prevTranslateMap.x) / width;
                // 放大后的宽高
                const ampWidth = initWidth * scale
                const ampHeight = initHeight * scale
                // 需要重新运算的 translate 坐标
                const y = yScale * (ampHeight - height)
                const x = xScale * (ampWidth - width)
                // 更新
                const translateY = prevTranslateMap.y - y
                const translateX = prevTranslateMap.x - x
                zoomDom.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
                // 记录这次的值
                prevTranslateMap = {
                    x: translateX,
                    y: translateY
                }
                ev.preventDefault()
            })
            // 鼠标按下去
            !disabledDrag && zoomDom.addEventListener('mousedown', mousedown);
            
            function mousedown(ev) {
                mx = ev.x;
                my = ev.y;
                const clientRect = zoomDom.getBoundingClientRect()
                newsetWidth = clientRect.width
                newsetHeight = clientRect.height
                // 鼠标移动
                document.addEventListener('mousemove', mousemove);
                // 鼠标松开
                document.addEventListener('mouseup', mouseup);
            }
            function mousemove(ev) {
                firstMoveFlag = true
                tTop = prevTranslateMap.y + (ev.y - my)
                tLeft = prevTranslateMap.x + (ev.x - mx)
                if (!slopOver) {
                    if (tTop < 0) tTop = 0
                    if (tLeft < 0) tLeft = 0
                    const rightBoundary = pDom.offsetWidth - newsetWidth // 右边边界
                    const bottomBoundary = pDom.offsetHeight - newsetHeight // 下边边界
                    if (tTop > bottomBoundary) tTop = bottomBoundary
                    if (tLeft > rightBoundary) tLeft = rightBoundary
                }
                // 设置样式
                zoomDom.style.cssText += `transform: translate(${tLeft}px, ${tTop}px) scale(${scale})`;
            }
            function mouseup() {
                if (firstMoveFlag) {
                prevTranslateMap = {
                    x: tLeft,
                    y: tTop
                }
                }
                document.removeEventListener('mousemove', mousemove);
                document.removeEventListener('mouseup', mouseup);
            }
        },
        testC(){
            // Hlong row,col,but;
            // HTuple str;
            // Herror error_num;
            // set_system("do_low_error","stderr");
            // set_check("~give_error");
            // error_num =get_mposition(WindowHandle,&row,&col,&but);
            // set_check("~give_error");
            // if (error_num  == H_MSG_TRUE)
            // {
            // set_tposition(WindowHandle,row,col);
            // str.Append(row).Append(",");
            // str.Append(col);

            // if(zDelta <0)
            // {
            // scale = 0.9;
            // }
            // else if(zDelta > 0)
            // {
            // scale =  1/0.9;
            // }
            // else
            // return FALSE ;
            // ImgCol1 = col - abs(col-ImgCol1)* scale;
            // ImgCol2 = col + abs(col-ImgCol2)* scale;
            // ImgRow1 = row - abs(row-ImgRow1)* scale;
            // ImgRow2 = row + abs(row - ImgRow2)* scale;
            // str.Append(",").Append(ImgRow1).Append(",").Append(ImgRow2).Append(",").Append(ImgCol1).Append(",").Append(ImgCol2);
            // set_part(WindowHandle,ImgRow1,ImgCol1,ImgRow2,ImgCol2);
            // clear_window(WindowHandle);
            // disp_image(Image,WindowHandle);
            // write_string(WindowHandle,str);

        },
        testTwo(){
            var img = document.createElement("img");
            img.src ="http://content.worldcarfans.co/2008/6/medium/9080606.002.1M.jpg";
            var canvas = window._canvas = new fabric.Canvas("imageCanvas");

            $(img).on('load',function(){
                image = new fabric.Image(img, {
                    centeredRotation: true,
                    centeredScaling: true,
                    top: 0,
                    left: 0
                });
                canvas.add(image);
            });

            function zoom(delta, target) {         
                var factor = 0.8;
                if (delta < 0) {
                    factor = 1/factor;
                }
                
                // Zoom into the image.
                image.setScaleX(image.getScaleX() * factor);
                image.setScaleY(image.getScaleY() * factor);
                // Calculate displacement of zooming position.
                var dx = (currentMouseX - image.getLeft()) * (factor - 1),
                    dy = (currentMouseY - image.getTop()) * (factor - 1);
                // Compensate for displacement.
                image.setLeft(image.getLeft() - dx);
                image.setTop(image.getTop() - dy);
                
                canvas.renderAll();
            }   

            $(canvas.wrapperEl).on("mousewheel", function (event) {
                var target = canvas.findTarget(event);
                if (target) {
                    var delta = event.originalEvent.wheelDelta / 120;
                    zoom(delta, target); 
                };
                event.preventDefault() && false;
            });

        },

        mWheel (e) {
            // 添加滚动效果
            let resource = this.$refs.resource
            let ImgContainer = this.$refs.ImgContainer
            resource.classList.add("transition");
            let ev = e || window.event
            // pageY 鼠标距离页面顶部的距离（计算滚动条上面的未显示区域
            // clientY 鼠标距离浏览器顶端的距离
            // console.log(ImgContainer.offsetLeft)
            
            // 防止内部滚动影响到外面滚动条
            ev.preventDefault()
            ev.stopPropagation()
            // console.log(ev)
            let dir = ev.detail ? ev.detail * (-120) : ev.wheelDelta
            if (dir < 0) {//缩小
                if(this.size<=1) {
                    // return this.size = 1
                }
            }
            this.size += dir / 2000
            // this.imgW = 400 * this.size
            // this.imgH = 400 * this.size

            // // 容器的尺寸和位置
            // let boxL = ImgContainer.offsetLeft,  boxT = ImgContainer.offsetTop;
            // let boxW = ImgContainer.offsetWidth, boxH = ImgContainer.offsetHeight;
            // let imgW = resource.offsetWidth, imgH = resource.offsetHeight
            // // 缩放前后的距离
            // let nx = ev.pageX-boxL,ny =  boxT-ev.pageY 

            
            // let l = -nx/boxW*(this.imgW-400),t = ny/boxH*(this.imgH-400)
            // this.left = l
            // this.top = t

            var ratioL = (this.clientX - oImg.offsetLeft) / oImg.offsetWidth,
			ratioT = (this.clientY - oImg.offsetTop) / oImg.offsetHeight,
			ratioDelta = !delta ? 1 + 0.1 : 1 - 0.1,
			w = parseInt(oImg.offsetWidth * ratioDelta),
			h = parseInt(oImg.offsetHeight * ratioDelta),
			l = Math.round(this.clientX - (w * ratioL)),
            t = Math.round(this.clientY - (h * ratioT));
            
			// with(oImg.style) {
			// 	width = w +'px';
			// 	height = h +'px';
			// 	left = l +'px';
			// 	top = t +'px';
			// }
            // console.log(ev.clientX-boxL)
            // 目前遇到了和copy一样的问题，下周一来了再解决
            // console.log(boxT,ev.clientY ,ny,ny/boxH,(this.imgH-400),this.top)
            

        },
        // 步态系统的外层是wrapper
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
.ImgContainer {
    width: 100%;
    height: 100%;
    position: relative;
}
.ImgContainer img {
    object-fit: contain;
    object-position: center;
    position: absolute;
}
.transition{
    transition: all 0.3s;
}
</style>