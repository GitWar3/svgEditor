
/**
 * 可传入参数
 * @param {string} svgElement    svg元素的id
 * @param {string} imgElement    img元素的id
 * @param {string} methods       内置方法 Add、repeal、generate
 * @param {string} name          path的id前缀
 * @param {string} stroke        边框线条颜色
 * @param {string} strokeOpacity 边框线条颜色透明度
 * @param {string} strokeWidth   边框线条宽度
 * @param {string} fill          填充颜色
 * @param {string} fillOpacity   填充颜色透明度
 * @param {string} opacity       整体颜色透明度
 */

var svgPutImageData = function (event) {

  this.DEFAULT_VALUE = "none" //默认状态
  this.DRAG_VALUE = "drag" //拖拽状态

  this.Default = {
    name: "svg",
    stroke: "black",
    strokeWidth: 1,
    fill: "white",
    fillOpacity: "1",
    strokeOpacity: "1",
    opacity: "1",
    property: `fill="{fill}" 
    fill-opacity="{fillOpacity}"
    stroke-opacity="{strokeOpacity}"
    opacity="{opacity}"
    stroke="{stroke}" 
    stroke-width="{strokeWidth}"`
  }

  /**
  * 节点数组
  */
  this.d = []
  /**
  * 当前状态
  */
  this.state = this.DEFAULT_VALUE
  /**
  * 当前编辑节点索引
  */
  this.index = 0
  /**
  * 缩放值
  */
  this.size = 1

  Object.keys(event).map(function (item) {
    if (this.Default[item] != undefined) {
      this.Default[item] = event[item]
    }
  }.bind(this))

  this.editElemnt = document.getElementById(event.editElemnt)
  this.svgElement = document.getElementById(event.svgElement)
  this.imgElement = document.getElementById(event.imgElement)

  this.created()
}

/**
* 初始化
*/
svgPutImageData.prototype.created = function () {
  this.layui(1, 'created')
  this.drag()

  this.svgElement.addEventListener('click', function (evt) {
    this.clickProxy(evt)
  }.bind(this))
}

/**
* 状态转换
*/
svgPutImageData.prototype.setState = function (val) {
  this.state = val || this.DEFAULT_VALUE
}

/**
* 新增
*/
svgPutImageData.prototype.Add = function (key) {
  this.setState(this.DEFAULT_VALUE)
  this.d.push({
    name: key,
    childNodes: [],
    x: 0,
    y: 0
  })
  this.index = 0
}

/**
* 撤销
*/
svgPutImageData.prototype.repeal = function () {
  if (this.index > 0) {
    this.index--
    this.d[this.d.length - 1].childNodes.pop()
    this.render()
  } else {
    this.d.pop()
    this.render()
  }
}

/**
* 生成
*/
svgPutImageData.prototype.generate = function () {
  this.copyContent(this.preview())
  alert("生成成功，已经复制内容")
}

/**
* 生成处理
*/
svgPutImageData.prototype.elementText = function () {
  var text = this.d.map(function (item, index) {
    return this[`${item.name}Generate`](item, index)
  }.bind(this)).join(" ").replace(/{(.*?)}/g, '${$1}')
  return text
}

/**
* 预览
*/
svgPutImageData.prototype.preview = function () {
  return `
  var generate = function () {
    var svgElement = document.getElementById("mysvg");
    var imgElement = document.getElementById("img");

    var stroke = "black";
    var strokeWidth = 1;
    var fill = "white";
    var fillOpacity = "1";
    var strokeOpacity = "1";
    var opacity = "1";
    var width = imgElement.clientWidth;
    var height = imgElement.clientHeight;
    svgElement.style.width = imgElement.clientWidth + "px";
    svgElement.style.height = imgElement.clientHeight + "px";
    svgElement.innerHTML = 1016996978
    };`.replace("1016996978", "`<svg>" + this.elementText() + "</svg>`")

}

/**
* 渲染
*/
svgPutImageData.prototype.render = function () {
  var elementText = this.elementText()
  if (elementText) {
    elementText.match(/\${.*?}/g).map(function (item) {
      switch (item.replace(/[^a-zA-Z]/g, "")) {
        case "width":
          elementText = elementText.replace(item, this.imgElement.clientWidth * item.replace(/[^\d\.]/g, ""))
          break
        case "height":
          elementText = elementText.replace(item, this.imgElement.clientHeight * item.replace(/[^\d\.]/g, ""))
          break
        default:
          elementText = elementText.replace(item, this.Default[item.replace(/[^a-zA-Z]/g, "")])
          break
      }
    }.bind(this))
  }
  this.svgElement.innerHTML = elementText
}