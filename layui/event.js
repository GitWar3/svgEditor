var fileEL = document.querySelector("#file")
function shrink () {
  var src = "./state/icon/icon-down.svg"
  var imgEl = document.getElementById("shrinksvg")
  var headEl = document.getElementById("head")
  if (imgEl.src.indexOf("icon-down") != -1) {
    src = "./state/icon/icon-up.svg"
    headEl.setAttribute("style", "top: 0")
  } else {
    headEl.setAttribute("style", "top: -45px")
  }
  imgEl.src = src
}
fileEL.onchange = function () {
  if (this.files.length) {
    let file = this.files[0]
    let reader = new FileReader()
    //新建 FileReader 对象
    reader.onload = function () {
      // 当 FileReader 读取文件时候，读取的结果会放在 FileReader.result 属性中
      document.querySelector("#img").src = this.result
      document.querySelector("#img").onload = function () {
        svgEdit()
      }
    }
    // 设置以什么方式读取文件，这里以base64方式
    reader.readAsDataURL(file)
  }
}

/**
* 预览
*/
function preview () {
  localStorage.src = document.querySelector("#img").src
  localStorage.generate = `${methods.preview()};generate();`
  window.open("./generate.html")
}

/**
* 导入图片
*/
function fileImport () {
  fileEL.click()
}

/**
* 工具栏Event代理
*/
function toolbarMethods (event, key) {
  var childNodes = event.parentNode.childNodes
  for (var index = 0; index < childNodes.length; index++) {
    if (childNodes[index].tagName == "DIV") {
      childNodes[index].style.color = "var(--z4)"
    }
  }
  event.style.color = "var(--d7)"
  switch (key) {
    case "拖拽":
      methods.setState('drag')
      break
    case "直线":
      methods.Add('path')
      break
    case "矩形":
      methods.Add('rect')
      break
    case "圆形":
      methods.Add('circle')
      break
  }
}