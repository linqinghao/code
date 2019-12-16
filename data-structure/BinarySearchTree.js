/**
 * 二叉搜索树
 *
 * insert(key)：向树中插入一个新的键。
 * search(key)：在树中查找一个键，如果节点存在，则返回true；如果不存在，则返回false。
 * inOrderTraverse：通过中序遍历方式遍历所有节点。
 * preOrderTraverse：通过先序遍历方式遍历所有节点。
 * postOrderTraverse：通过后序遍历方式遍历所有节点。
 * min：返回树中最小的值/键。
 * max：返回树中最大的值/键。
 * remove(key)：从树中移除某个键。
 */

class Node {
  constructor(key) {
    this.key = key
    this.left = null
    this.right = null
  }
}

class BinarySearchTree {
  constructor() {
    // 根节点
    this.root = null
  }

  insert(key) {
    let node = new Node(key)
    if (this.root === null) {
      this.root = node
    } else {
      this._insertNode(this.root, node)
    }
  }

  max(node) {
    node = node || this.root
    while (node && node.right !== null) {
      node = node.right
    }
    return node
  }

  min(node) {
    node = node || this.root
    while (node && node.left !== null) {
      node = node.left
    }
    return node
  }

  search(key, node) {
    node = node || this.root
    return this._searchNode(key, node)
  }

  remove(key, node) {
    node = node || this.root
    return this._removeNode(key, node)
  }

  preOrderTraverse(cb) {
    this._preOrderTraverseNode(this.root, cb)
  }

  inOrderTraverse(cb) {
    this._inOrderTraverseNode(this.root, cb)
  }

  postOrderTraverse(cb) {
    this._postOrderTraverseNode(this.root, cb)
  }

  _preOrderTraverseNode(node, cb) {
    if (node !== null) {
      cb(node.key)
      this._preOrderTraverseNode(node.left, cb)
      this._preOrderTraverseNode(node.right, cb)
    }
  }

  _inOrderTraverseNode(node, cb) {
    if (node !== null) {
      this._inOrderTraverseNode(node.left, cb)
      cb(node.key)
      this._inOrderTraverseNode(node.right, cb)
    }
  }

  _postOrderTraverseNode(node, cb) {
    if (node !== null) {
      this._postOrderTraverseNode(node.left, cb)
      this._postOrderTraverseNode(node.right, cb)
      cb(node.key)
    }
  }

  _removeNode(key, node) {
    if (node == null) {
      return false
    }

    node = this.search(key, node)

    if (node.left === null && node.right === null) {
      node = null
      return node
    }

    if (node.left == null) {
      node = node.right
      return node
    } else if (node.right == null) {
      node = node.left
      return node
    }

    let minNode = this.min(node.right)

    node.key = minNode.key

    node.right = this._removeNode(minNode.key, node.right)

    return node
  }

  _searchNode(key, node) {
    if (node == null) {
      return false
    }
    if (key < node.key) {
      return this._searchNode(node.left, key)
    } else if (key > node.key) {
      return this._searchNode(node.right, key)
    } else {
      return node
    }
  }

  _insertNode(node, newNode) {
    if (node.key > newNode.key) {
      // 左查找
      if (node.left === null) {
        node.left = newNode
      } else {
        this._insertNode(node.left, newNode)
      }
    } else {
      // 右查找
      if (node.right === null) {
        node.right = newNode
      } else {
        this._insertNode(node.right, newNode)
      }
    }
  }
}

module.exports = BinarySearchTree