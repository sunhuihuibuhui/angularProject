/*绑定事件*/
function addEvent(obj, sType, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(sType, fn, false);
	} else {
		obj.attachEvent('on' + sType, fn);
	}
};
// 移除事件
function removeEvent(obj, sType, fn) {
	if (obj.removeEventListener) {
		obj.removeEventListener(sType, fn, false);
	} else {
		obj.detachEvent('on' + sType, fn);
	}
};
// 阻止冒泡
function prEvent(ev) {
	var oEvent = ev || window.event;
	if (oEvent.preventDefault) {
		oEvent.preventDefault();
	}
	return oEvent;
}

/*添加滑轮事件*/
function addWheelEvent(obj, callback) {
	if (window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
		addEvent(obj, 'DOMMouseScroll', wheel);
	} else {
		addEvent(obj, 'mousewheel', wheel);
	}
	function wheel(ev) {
		var oEvent = prEvent(ev),
		delta = oEvent.detail ? oEvent.detail > 0 : oEvent.wheelDelta < 0;
		callback && callback.call(oEvent, delta);
		return false;
	}
};

/*拖拽功能*/
function drag(){
    addEvent(source, 'mousedown', function(ev) {
        var oEvent = prEvent(ev),
        oParent = source.parentNode,
        disX = oEvent.clientX - source.offsetLeft,
        disY = oEvent.clientY - source.offsetTop,
        startMove = function(ev) {
            if (oParent.setCapture) {
                oParent.setCapture();
            }
            var oEvent = ev || window.event,
            l = oEvent.clientX - disX,
            t = oEvent.clientY - disY;
            source.style.left = l +'px';
            source.style.top = t +'px';
            oParent.onselectstart = function() {
                return false;
            }
        }, endMove = function(ev) {
            if (oParent.releaseCapture) {
                oParent.releaseCapture();
            }
            oParent.onselectstart = null;
            removeEvent(oParent, 'mousemove', startMove);
            removeEvent(oParent, 'mouseup', endMove);
        };
        addEvent(oParent, 'mousemove', startMove);
        addEvent(oParent, 'mouseup', endMove);
        return false;
    });
}
/*以鼠标位置为中心的滑轮放大功能*/
function zoom(){
    addWheelEvent(source, function(delta) {
        var ratioL = (this.clientX - source.offsetLeft) / source.offsetWidth,
        ratioT = (this.clientY - source.offsetTop) / source.offsetHeight,
        ratioDelta = !delta ? 1 + 0.1 : 1 - 0.1,
        w = parseInt(source.offsetWidth * ratioDelta),
        h = parseInt(source.offsetHeight * ratioDelta),
        l = Math.round(this.clientX - (w * ratioL)),
        t = Math.round(this.clientY - (h * ratioT));
        console.log(w)
        // with(source.style) {
        // 	width = w +'px';
        // 	height = h +'px';
        // 	left = l +'px';
        // 	top = t +'px';
        // }
    });
}

