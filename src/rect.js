/**
* rect生成处理
*/
svgPutImageData.prototype.rectGenerate = function (item, index) {
  if (item.childNodes.length < 2) {
    return ""
  }
  return `
  <rect id ="rect_${this.Default.name}_${index}"
    x="{ width * ${this.getScale(item.childNodes[0].x) / this.imgElement.clientWidth} }"  
    y="{ height * ${this.getScale(item.childNodes[0].y) / this.imgElement.clientHeight} }" 
    width="{ width * ${(this.getScale(item.childNodes[1].x) - this.getScale(item.childNodes[0].x)) / this.imgElement.clientWidth} }" 
    height="{ height * ${(this.getScale(item.childNodes[1].y) - this.getScale(item.childNodes[0].y)) / this.imgElement.clientHeight} }"
    ${this.Default.property} >
    </rect > `
}

/**
* rect点击
*/
svgPutImageData.prototype.rectClick = function (evt, d, key) {
  switch (this.index) {
    case 0:
      key = "M"
      break
    default:
      key = "L"
  }
  this.rectDescribe(d.childNodes, this.getPoint(evt, "x"), this.getPoint(evt, "y"), key)
  this.render()
}

/**
* rect描点
*/
svgPutImageData.prototype.rectDescribe = function (d, x, y, k) {
  d[this.index] = {
    key: k,
    x: x,
    y: y,
    oldx: x,
    oldy: y
  }
  this.index < 1 ? this.index++ : ""
}

