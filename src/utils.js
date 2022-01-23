
/**
* 复制粘贴
*/
svgPutImageData.prototype.copyContent = function (content) {
  // 由于input元素在页面上渲染后具有选中的功能，所以这里创建input的方式实现点击复制的功能
  let inputElement = document.createElement('input')
  inputElement.type = 'text'
  inputElement.value = content
  document.body.appendChild(inputElement)
  // 选择增加的input元素
  inputElement.select()
  if (document.execCommand('Copy', 'false', null)) {
    // 如果复制成功
    console.log('点击内容已复制')
  }
  // 复制成功之后删除增加的这个input元素
  document.body.removeChild(inputElement)
}

/**
* 防抖
*/
svgPutImageData.prototype.debounce = (function () {
  let timeid = null
  let result

  return function (func, wait) {
    let context = this
    let args = arguments

    if (timeid) {
      clearTimeout(timeid)
    }
    timeid = setTimeout(function () {
      result = func.apply(context, args)
    }, wait || 0)

    return result
  }
}())

/**
* 节流
*/
svgPutImageData.prototype.throttle = function (delay) {
  var timer = null
  var delay = delay
  return function (func) {
    var context = this
    var args = arguments
    if (!timer) {
      timer = setTimeout(function () {
        func.apply(context, args)
        timer = null
      }, delay)
    }
  }
}

/**
* 拖拽
*/
svgPutImageData.prototype.drag = function () {

  var originX = 0
  var originY = 0
  var target = null
  var throttle = this.throttle(10)
  var mouseMoveHandlerclose = false

  var targetList = ['path', 'rect', 'circle']

  function mouseDownHandler (evt) {
    if (targetList.indexOf(evt.target.nodeName) != -1) {
      target = evt.target
      var index = target.id.replace(/[^0-9]/g, "")
      originX = this.getScale(evt.clientX, "/") - (this.d[index].x || 0)
      originY = this.getScale(evt.clientY, "/") - (this.d[index].y || 0)
      mouseMoveHandlerclose = true
    } else if (evt.target.nodeName == 'svg') {
      target = evt.target.parentNode
      originX = evt.clientX - target.parentNode.offsetLeft - target.offsetLeft
      originY = evt.clientY - target.parentNode.offsetTop - target.offsetTop
      mouseMoveHandlerclose = true
    }
  }

  function mouseMoveHandler (evt) {
    if (mouseMoveHandlerclose && target && targetList.indexOf(target.nodeName) != -1) {
      var index = target.id.replace(/[^0-9]/g, "")
      this.d[index].x = this.getScale(evt.clientX, "/") - originX
      this.d[index].y = this.getScale(evt.clientY, "/") - originY
      this.d[index].childNodes = this.d[index].childNodes.map(item => {
        item.x = item.oldx + this.getScale(evt.clientX, "/") - originX
        item.y = item.oldy + this.getScale(evt.clientY, "/") - originY
        return item
      })
      this.render()
    } else if (mouseMoveHandlerclose && target) {
      target.style.left = evt.clientX - target.parentNode.offsetLeft - originX + 'px'
      target.style.top = evt.clientY - target.parentNode.offsetTop - originY + 'px'
    }
  }

  function mouseUpHandler () {
    mouseMoveHandlerclose = false
    target = null
  }

  function dragProxy (key) {
    if (this.state == this.DRAG_VALUE) {
      if (key == mouseMoveHandler) {
        return throttle(key.bind(this, arguments[1]))
      }
      return key.call(this, arguments[1])
    }
  }

  this.svgElement.addEventListener('mousedown', dragProxy.bind(this, mouseDownHandler))
  this.svgElement.addEventListener('mousemove', dragProxy.bind(this, mouseMoveHandler))
  this.svgElement.addEventListener('mouseup', dragProxy.bind(this, mouseUpHandler))
}