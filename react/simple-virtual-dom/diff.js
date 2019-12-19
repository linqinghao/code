const _ = require('./utils')
const PatchType = require('./patchType')

// 比较新树旧树差异
function diff(oldTree, newTree) {
  // 索引
  let index = 0
  // 记录总树差异
  let patches = {}
  dfsWalk(oldTree, newTree, index, patches)
  return patches
}

// 深度遍历
function dfsWalk(oldNode, newNode, index, patches) {
  // 记录当前节点差异
  let currentPatch = []

  // 节点被删除
  if (newNode == null) {
    // 新旧文本节点对比
  } else if (_.isString(oldNode) && _.isString(newNode)) {
    if (oldNode !== newNode) {
      currentPatch.push({ type: PatchType.TEXT, content: newNode })
    }
  } else if (
    oldNode.tagName === newNode.tagName &&
    oldNode.key === newNode.key
  ) {
    // 比较props
    let propsPatches = diffProps(oldNode, newNode)

    if (propsPatches) {
      currentPatch.push({ type: PatchType.PROPS, props.propsPatches})

    }

    // 对比子节点
    diffChildren(oldNode.children, newNode.children, index, patches, currentPatch)

    // 新旧节点不同
  } else {
    currentPatch.push({ type: PatchType.REPLACE, node: newNode})
  }

  if (currentPatch.length) {
    patches[index] = currentPatch
  }
}

//  对比子节点
function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
  // 对比子节点顺序
  let diffs = listDiff(oldChildren, newChildren, 'key')
  newChildren = diffs.children

  if (diffs.moves.length) {
    let reorderPatch = { type: patch.REORDER, moves: diffs.moves }
    currentPatch.push(reorderPatch)
  }


  let leftNode = null
  let currentNodeIndex = index
  _.each(oldChildren, function(child, i) {
    let newChild = newChildren[i]
    currentNodeIndex = (leftNode && leftNode.count) 
      ? currentNodeIndex + leftNode.count + 1
      : currentNodeIndex + 1
    dfsWalk(child, newChild, currentNodeIndex, patches)
    leftNode = child
  })

}


function diffProps(oldNode, newNode) {
  let count = 0
  let oldProps = oldNode.props
  let newProps = newNode.props

  let propsPatches = {}

  // 对比新旧属性不同
  for (let key in oldProps) {
    let value = oldProps[key]

    if (newProps[key] !== value) {
      propsPatches[key] = newProps[key]
    }
  }

  // 找出新添加的props属性
  for (let key in newProps) {
    let value = newProps[key]
    if (!oldProps.hasOwnProperty(key)) {
      propsPatches[key] == newProps[key]
    }
  }

  return Object.keys(propsPatches).length ? propsPatches : null
}
