var size = 1
/**
 * pc端不可缩放
 */
function webZoom () {
  window.addEventListener(
    "mousewheel",
    function (event) {
      if (event.ctrlKey === true || event.metaKey) {
        event.wheelDelta > 0 ? size += 0.05 : size -= 0.05
        methods.layui(size)
        event.preventDefault()
      }
    },
    { passive: false }
  )

  //firefox
  window.addEventListener(
    "DOMMouseScroll",
    function (event) {
      if (event.ctrlKey === true || event.metaKey) {
        event.wheelDelta > 0 ? size += 0.05 : size -= 0.05
        methods.layui(size)
        event.preventDefault()
      }
    },
    { passive: false }
  )
}

/**
* 窗口发生变化
*/
window.onresize = function () {
  methods.layui(size)
}