const BinarySearchTree = require('../BinarySearchTree')

const tree = new BinarySearchTree()

tree.insert(10)
tree.insert(9)
tree.insert(6)
tree.insert(2)
tree.insert(11)
tree.insert(20)
tree.insert(41)

tree.inOrderTraverse(console.log)
