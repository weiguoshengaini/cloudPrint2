import Vue from 'vue'

Vue.prototype.$maxValue = function (o) {
  // 对象中vulue的最大值
  return Math.max.apply({}, Object.values(o))
}
Vue.prototype.$minValue = function (o) {
  // 对象中vulue的最小值
  return Math.min.apply({}, Object.values(o))
}

// Object.prototype.hasOwnProperty()
// 返回一个布尔值，表示某个对象是否含有指定的属性，而且此属性非原型链继承的。
// Object.prototype.isPrototypeOf()
// 返回一个布尔值，表示指定的对象是否在本对象的原型中。
// Object.prototype.propertyIsEnumerable()()
// 返回一个布尔值，表示某个对象是否含有指定的属性，并且可以枚举。
Vue.prototype.$setTitle = function (t) {
  // 设置网页的标题
  const title = document.querySelector('title') || document.createElement('title')
  title.innerText = t
  document.getElementsByTagName('head')[0].appendChild(title)
}
Vue.prototype.$setIco = function (i) {
  // 设置网页的图标
  const link = document.querySelector('link[rel*=\'icon\']') || document.createElement('link')
  link.type = 'image/x-icon'
  link.rel = 'shortcut icon'
  link.href = i
  document.getElementsByTagName('head')[0].appendChild(link)
}
Vue.prototype.$avoid = function (j) {
  // 防止改变原数据
  return JSON.parse(JSON.stringify(j))
}
Vue.prototype.$type = function (j) {
  // 检验类型
  return Object.prototype.toString.call(j)
}
Vue.prototype.$log = function (l) {
  console.log(l)
}
Vue.prototype.$isFalse = function (o) {
  // 检验值完全没有
  if (!o || o === 'null' || o === 'undefined' || o === 'false' || o === 'NaN' || Object.keys(o).length < 1 || o.length < 1) return true
  return false
}
Vue.prototype.$isTrue = function (d) {
  // 检验值有但是为空
  switch (Vue.prototype.$type(d)) {
    case '[object String]':
      return d.length > 0
    case '[object Number]':
      return true
    case '[object Boolean]':
      return d
    case '[object Array]':
      if (d === undefined || d.length < 1) {
        return false
      } else {
        return true
      }
    case '[object Object]':
      if (d === undefined || Object.keys(d).length < 1) {
        return false
      } else {
        return true
      }
    default:
      return false
  }
}

Vue.directive('dialogDrag', {
  bind (el, binding, vnode, oldVnode) {
    // 弹框可拉伸最小宽高
    const minWidth = 400
    const minHeight = 300
    // 初始非全屏
    let isFullScreen = false
    // 当前宽高
    let nowWidth = 0
    let nowHight = 0
    // 当前顶部高度
    let nowMarginTop = 0
    // 获取弹框头部（这部分可双击全屏）
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    // 弹窗
    const dragDom = el.querySelector('.el-dialog')
    // 给弹窗加上overflow auto；不然缩小时框内的标签可能超出dialog；
    dragDom.style.overflow = 'auto'
    // 清除选择头部文字效果
    // dialogHeaderEl.onselectstart = new Function("return false");
    // 头部加上可拖动cursor
    dialogHeaderEl.style.cursor = 'move'
    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)
    const moveDown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop
      // 获取到的值带px 正则匹配替换
      let styL; let styT
      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/%/g, '') / 100)
        styT = +document.body.clientHeight * (+sty.top.replace(/%/g, '') / 100)
      } else {
        styL = +sty.left.replace(/\px/g, '')
        styT = +sty.top.replace(/\px/g, '')
      }
      ;
      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX
        const t = e.clientY - disY
        // 移动当前元素
        dragDom.style.left = `${l + styL}px`
        dragDom.style.top = `${t + styT}px`
        // 将此时的位置传出去
        // binding.value({x:e.pageX,y:e.pageY})
      }
      document.onmouseup = function (e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
    dialogHeaderEl.onmousedown = moveDown
    // 双击头部全屏效果
    dialogHeaderEl.ondblclick = (e) => {
      if (isFullScreen === false) {
        nowHight = dragDom.clientHeight
        nowWidth = dragDom.clientWidth
        nowMarginTop = dragDom.style.marginTop
        dragDom.style.left = 0
        dragDom.style.top = 0
        dragDom.style.height = '100VH'
        dragDom.style.width = '100VW'
        dragDom.style.marginTop = 0
        isFullScreen = true
        dialogHeaderEl.style.cursor = 'initial'
        dialogHeaderEl.onmousedown = null
      } else {
        dragDom.style.height = 'auto'
        dragDom.style.width = nowWidth + 'px'
        dragDom.style.marginTop = nowMarginTop
        isFullScreen = false
        dialogHeaderEl.style.cursor = 'move'
        dialogHeaderEl.onmousedown = moveDown
      }
    }
    dragDom.onmousemove = function (e) {
      const moveE = e
      if (e.clientX > dragDom.offsetLeft + dragDom.clientWidth - 10 || dragDom.offsetLeft + 10 > e.clientX) {
        dragDom.style.cursor = 'w-resize'
      } else if (el.scrollTop + e.clientY > dragDom.offsetTop + dragDom.clientHeight - 10) {
        dragDom.style.cursor = 's-resize'
      } else {
        dragDom.style.cursor = 'default'
        dragDom.onmousedown = null
      }
      dragDom.onmousedown = (e) => {
        const clientX = e.clientX
        const clientY = e.clientY
        const elW = dragDom.clientWidth
        const elH = dragDom.clientHeight
        const EloffsetLeft = dragDom.offsetLeft
        const EloffsetTop = dragDom.offsetTop
        dragDom.style.userSelect = 'none'
        const ELscrollTop = el.scrollTop
        // 判断点击的位置是不是为头部
        if (clientX > EloffsetLeft && clientX < EloffsetLeft + elW && clientY > EloffsetTop && clientY < EloffsetTop + 100) {
          // 如果是头部在此就不做任何动作，以上有绑定dialogHeaderEl.onmousedown = moveDown;
        } else {
          document.onmousemove = function (e) {
            e.preventDefault() // 移动时禁用默认事件
            // 左侧鼠标拖拽位置
            if (clientX > EloffsetLeft && clientX < EloffsetLeft + 10) {
              // 往左拖拽
              if (clientX > e.clientX) {
                dragDom.style.width = elW + (clientX - e.clientX) * 2 + 'px'
              }
              // 往右拖拽
              if (clientX < e.clientX) {
                if (dragDom.clientWidth < minWidth) {
                } else {
                  dragDom.style.width = elW - (e.clientX - clientX) * 2 + 'px'
                }
              }
            }
            // 右侧鼠标拖拽位置
            if (clientX > EloffsetLeft + elW - 10 && clientX < EloffsetLeft + elW) {
              // 往左拖拽
              if (clientX > e.clientX) {
                if (dragDom.clientWidth < minWidth) {
                } else {
                  dragDom.style.width = elW - (clientX - e.clientX) * 2 + 'px'
                }
              }
              // 往右拖拽
              if (clientX < e.clientX) {
                dragDom.style.width = elW + (e.clientX - clientX) * 2 + 'px'
              }
            }
            // 底部鼠标拖拽位置
            if (ELscrollTop + clientY > EloffsetTop + elH - 20 && ELscrollTop + clientY < EloffsetTop + elH) {
              // 往上拖拽
              if (clientY > e.clientY) {
                if (dragDom.clientHeight < minHeight) {
                } else {
                  dragDom.style.height = elH - (clientY - e.clientY) * 2 + 'px'
                }
              }
              // 往下拖拽
              if (clientY < e.clientY) {
                dragDom.style.height = elH + (e.clientY - clientY) * 2 + 'px'
              }
            }
          }
          // 拉伸结束
          document.onmouseup = function (e) {
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      }
    }
  }
})


// 自定义权限控制 代替v-show v-if
// Vue.directive('permission', {
//   inserted (el, binding, vnode) {
//     let value = binding.value
//     let role = store.getters.getUserInfo.userTestRole
//     let roles = [1]
//     if (role != undefined && !roles.includes(role)) {
//       roles.push(role)
//     }
//     if (Vue.prototype.$isTrue(value)) {
//       let hasPermission
//       if (Vue.prototype.$type(value) == "[object Array]") {
//         hasPermission = value.some(r => {
//           return roles.includes(r)
//         })
//       } else {
//         hasPermission = roles.includes(value)
//       }
//       if (!hasPermission) {
//         el.parentNode && el.parentNode.removeChild(el)
//       }
//     } else {
//       el.parentNode && el.parentNode.removeChild(el)
//       // throw new Error ( ` need roles ` )
//     }
//   }
// })

/*
 *  给elementUI的dialog上加上 v-dialogDrag 指令就可以实现弹窗的全屏和拉伸了。
 *  给dialog设置 :close-on-click-modal="false" , 禁止点击遮罩层关闭弹出层
 *  如果是form表单，不要将提交等按钮放置el-form-item，以免在上下拉伸时被隐藏
 */
// v-dialogDrag: 弹窗拖拽+水平方向伸缩
