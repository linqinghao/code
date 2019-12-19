const PatchType = require('./patchType')
const _ = require('./utils')

function patch(node, patches) {
  let walker = { index: 0 }
  dfsWalk(node, walker, patches)
}

function dfsWalk(node, walker, patches) {
  let currentPatches = patches[walker.index]

  let len = node.childNodes ? node.childNodes.length : 0
  for (let i = 0; i < len; i++) {
    let child = node.childNodes[i]
    walker.index++
    dfsWalk(child, walker, patches)
  }

  if (currentPatches) {
    applyPatches(node, currentPatches)
  }
}

function applyPatches(node, currentPatches) {
  _.each(currentPatches, function(currentPatch) {
    switch (currentPatch.type) {
      case PatchType.REPLACE:
        let newNode =
          typeof currentPatch.node === 'string'
            ? document.createTextNode(currentPatch.node)
            : currentPatch.node.render()
        node.parentNode.replaceChild(newNode, node)
        break
      case PatchType.REORDER:
        reorderChildren(node, currentPatch.moves)
        break
      case PatchType.PROPS:
        setProps(node, currentPatch.props)
        break
      case PatchType.TEXT:
        if (node.textContent) {
          node.textContent = currentPatch.content
        } else {
          node.nodeValue = currentPatch.content
        }
        break
      default:
        throw new Error('Unknown patch type ' + currentPatch.type)
    }
  })
}

function setProps(node, props) {
  for (var key in props) {
    if (props[key] === void 0) {
      node.removeAttribute(key)
    } else {
      var value = props[key]
      _.setAttr(node, key, value)
    }
  }
}

function reorderChildren(node, moves) {
  var staticNodeList = _.toArray(node.childNodes)
  var maps = {}

  _.each(staticNodeList, function(node) {
    if (node.nodeType === 1) {
      var key = node.getAttribute('key')
      if (key) {
        maps[key] = node
      }
    }
  })

  _.each(moves, function(move) {
    var index = move.index
    if (move.type === 0) {
      // remove item
      if (staticNodeList[index] === node.childNodes[index]) {
        // maybe have been removed for inserting
        node.removeChild(node.childNodes[index])
      }
      staticNodeList.splice(index, 1)
    } else if (move.type === 1) {
      // insert item
      var insertNode = maps[move.item.key]
        ? maps[move.item.key].cloneNode(true) // reuse old item
        : typeof move.item === 'object'
        ? move.item.render()
        : document.createTextNode(move.item)
      staticNodeList.splice(index, 0, insertNode)
      node.insertBefore(insertNode, node.childNodes[index] || null)
    }
  })
}
