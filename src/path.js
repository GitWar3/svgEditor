/**
* path生成处理
*/
svgPutImageData.prototype.pathGenerate = function (item, index) {
  var str = ""
  item.childNodes.map(function (itemValue) {
    return str += `
    ${itemValue.key} 
    { width * ${this.getScale(itemValue.x) / this.imgElement.clientWidth} } 
    { height * ${this.getScale(itemValue.y) / this.imgElement.clientHeight} } 
    `
  }.bind(this))
  return `
  <path id ="path_${this.Default.name}_${index}"  
    d="${str}z" 
    ${this.Default.property} >
    </path > `
}

/**
* path点击
*/
svgPutImageData.prototype.pathClick = function (evt, d, key) {
  switch (this.index) {
    case 0:
      key = "M"
      break
    default:
      key = "L"
  }
  this.pathDescribe(d.childNodes, this.getPoint(evt, "x"), this.getPoint(evt, "y"), key)
  this.render()
}

/**
* path描点
*/
svgPutImageData.prototype.pathDescribe = function (d, x, y, k) {
  d.push({
    key: k,
    x: x,
    y: y,
    oldx: x,
    oldy: y
  })
  this.index++
}

