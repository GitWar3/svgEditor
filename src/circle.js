/**
* circle生成处理
*/
svgPutImageData.prototype.circleGenerate = function (item, index) {
  if (item.childNodes.length < 2) {
    return ""
  }
  var cx = this.getScale((item.childNodes[1].x - item.childNodes[0].x) / 2)
  var cy = this.getScale((item.childNodes[1].y - item.childNodes[0].y) / 2)
  return `
  <circle id ="circle_${this.Default.name}_${index}"
    cx="{ width * ${(this.getScale(item.childNodes[1].x) - cx) / this.imgElement.clientWidth} }"  
    cy="{ height * ${(this.getScale(item.childNodes[1].y) - cy) / this.imgElement.clientHeight} }" 
    r="{ height * ${cx / this.imgElement.clientHeight} }" 
    ${this.Default.property} >
    </circle > `
}

/**
* circle点击
*/
svgPutImageData.prototype.circleClick = function (evt, d, key) {
  switch (this.index) {
    case 0:
      key = "M"
      break
    default:
      key = "L"
  }
  this.circleDescribe(d.childNodes, this.getPoint(evt, "x"), this.getPoint(evt, "y"), key)
  this.render()
}

/**
* circle描点
*/
svgPutImageData.prototype.circleDescribe = function (d, x, y, k) {
  d[this.index] = {
    key: k,
    x: x,
    y: y,
    oldx: x,
    oldy: y
  }
  this.index < 1 ? this.index++ : ""
}

