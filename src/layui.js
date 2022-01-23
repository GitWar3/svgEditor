/**
* 界面
* @param {string} key  可选参数[created]
*/
svgPutImageData.prototype.layui = function (size, key) {
  this.size = size || 1
  var zoom = this.imgElement.clientWidth < this.imgElement.clientHeight ? this.imgElement.clientWidth : this.imgElement.clientHeight

  this.imgElement.style.width = this.editElemnt.clientHeight / zoom * this.imgElement.clientWidth * this.size + 'px'
  this.imgElement.style.height = this.editElemnt.clientHeight / zoom * this.imgElement.clientHeight * this.size + 'px'
  if (key == 'created') {
    this.imgElement.parentNode.style.top = ((this.editElemnt.clientHeight - this.imgElement.clientHeight) / 2) + 'px'
    this.imgElement.parentNode.style.left = ((this.editElemnt.clientWidth - this.imgElement.clientWidth) / 2) + 'px'
  } else {
    this.imgElement.parentNode.style.top = this.imgElement.parentNode.offsetTop + 'px'
    this.imgElement.parentNode.style.left = this.imgElement.parentNode.offsetLeft + 'px'
  }
  this.svgElement.style.width = this.imgElement.clientWidth + 'px'
  this.svgElement.style.height = this.imgElement.clientHeight + 'px'
  this.render()
}

/**
* 获取鼠标点击位置
*/
svgPutImageData.prototype.getPoint = function (event, key) {
  var offsetLeft = this.imgElement.parentNode.offsetLeft + this.imgElement.parentNode.parentNode.offsetLeft
  var offsetTop = this.imgElement.parentNode.offsetTop + this.imgElement.parentNode.parentNode.offsetTop
  var client = key == "x" ? event.clientX : event.clientY
  var offset = key == "y" ? offsetTop : offsetLeft
  return (client - offset) / this.size
}

/**
* scale
*/
svgPutImageData.prototype.getScale = function (value, key) {
  /**
  * @param {string} key  可选参数[*，/]
  */
  return key == "/" ? value / this.size : value * this.size
}

/**
* click代理
*/
svgPutImageData.prototype.clickProxy = function (evt) {
  if (this.d.length > 0 && this.state == this.DEFAULT_VALUE) {
    var d = this.d[this.d.length - 1]
    this[`${d.name}Click`](evt, d)
  }
}