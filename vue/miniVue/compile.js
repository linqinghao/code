function Compile(el, vm) {
  this.vm = vm
  this.el = document.querySelector(el)
  this.fragment = null
  this.init()
}

Compile.prototype = {
  constructor: Compile,
  init: function() {
    if (this.el) {
      this.fragment = this.nodeToFragment(this.el)
      this.compileElement(this.fragment)
      this.el.appendChild(this.fragment)
    }
  },
  nodeToFragment: function(el) {
    let fragment = document.createDocumentFragment()
    let child = el.firstChild
    while (child) {
      fragment.appendChild(child)
      child = el.firstChild
    }
    return fragment
  },
  compileElement: function(el) {
    let childNodes = el.childNodes
    let that = this
    ;[].slice.call(childNodes).forEach(function(node) {
      let reg = /\{\{(.*)\}\}/
      let text = node.textContent

      if (that.isElementNode(node)) {
        that.compile(node)
      } else if (that.isTextNode(node) && reg.test(text)) {
        that.compileText(node, reg.exec(text)[1])
      }

      if (node.childNodes && node.childNodes.length) {
        // 继续递归遍历子节点
        that.compileElement(node)
      }
    })
  },
  compile: function(node) {
    let nodeAttrs = node.attributes
    let that = this
    Array.prototype.forEach.call(nodeAttrs, function(attr) {
      let attrName = attr.name
      if (that.isDirective(attrName)) {
        let exp = attr.value
        let dir = attrName.substring(2)
        if (that.isEventDirective(dir)) {
          // 事件指令
          that.compileEvent(node, that.vm, exp, dir)
        } else {
          // v-model 指令
          that.compileModel(node, that.vm, exp, dir)
        }
        node.removeAttribute(attrName)
      }
    })
  },
  compileText: function(node, exp) {
    let that = this
    let initText = this.vm[exp]
    this.updateText(node, initText) // 初始化视图
    new Watcher(this.vm, exp, function(value) {
      // 生成订阅器并绑定更新函数
      that.updateText(node, value)
    })
  },
  compileEvent: function(node, vm, exp, dir) {
    let eventType = dir.split(':')[1]
    let cb = vm.methods && vm.methods[exp]

    if (eventType && cb) {
      node.addEventListener(eventType, cb.bind(vm), false)
    }
  },
  compileModel: function(node, vm, exp, dir) {
    let that = this
    let val = this.vm[exp]
    this.modelUpdater(node, val)
    new Watcher(this.vm, exp, function(value) {
      that.modelUpdater(node, value)
    })

    node.addEventListener('input', function(e) {
      let newValue = e.target.value
      if (val === newValue) {
        return
      }
      that.vm[exp] = newValue
      val = newValue
    })
  },
  updateText: function(node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value
  },
  modelUpdater: function(node, value, oldValue) {
    node.value = typeof value == 'undefined' ? '' : value
  },
  isDirective: function(attr) {
    return attr.indexOf('v-') == 0
  },
  isEventDirective: function(dir) {
    return dir.indexOf('on:') === 0
  },
  isElementNode: function(node) {
    return node.nodeType == 1
  },

  isTextNode: function(node) {
    return node.nodeType == 3
  },
}
