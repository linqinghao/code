let _ = require('./utils')

/**
 * Element - 节点类
 *
 * @param {String} tagName
 * @param {Object} props - Element's properties,
 *                       - using object to store key-value pair
 * @param {Array<Element|String>} - This element's children elements.
 *                                - Can be Element instance or just a piece plain text.
 */
class Element {
  constructor(tagName, props, children) {
    this.tagName = tagName
    this.props = props || {}
    this.children = children || []

    this.key = props ? props.key : void 0

    let count = 0

    _.each(this.children, function(child, i) {
      if (child instanceof Element) {
        count += child.count
      } else {
        children[i] = '' + child
      }
      count++
    })

    this.count = count
  }

  render() {
    // 创建节点
    let node = document.createElement(this.tagName)
    let props = this.props
    // 设置属性
    for (let propName in props) {
      if (props.hasOwnProperty(propName)) {
        let propValue = props[propName]
        _.setAttr(node, propName, propValue)
      }
    }
    let children = this.children

    // 遍历子节点
    _.each(children, function(child) {
      let childNode
      if (child instanceof Element) {
        childNode = child.render()
      } else {
        childNode = document.createTextNode(child)
      }
      node.appendChild(childNode)
    })
    return node
  }
}

const createElement = function(tagName, props, children) {
  return new Element(tagName, props, children)
}

module.exports = { createElement }
