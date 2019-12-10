/**
 * 访客模式
 */

// class Monkey {
//   shout() {
//     console.log('Ooh oo aa aa!')
//   }

//   accept(operation) {
//     operation.visitMonkey(this)
//   }
// }

// class Lion {
//   roar() {
//     console.log('Roaaar!')
//   }

//   accept(operation) {
//     operation.visitLion(this)
//   }
// }

// class Dolphin {
//   speak() {
//     console.log('Tuut tuttu tuutt!')
//   }

//   accept(operation) {
//     operation.visitDolphin(this)
//   }
// }

// const speak = {
//   visitMonkey(monkey) {
//     monkey.shout()
//   },
//   visitLion(lion) {
//     lion.roar()
//   },
//   visitDolphin(dolphin) {
//     dolphin.speak()
//   },
// }

// const monkey = new Monkey()
// const lion = new Lion()
// const dolphin = new Dolphin()

// monkey.accept(speak) // Ooh oo aa aa!
// lion.accept(speak) // Roaaar!
// dolphin.accept(speak) // Tuut tutt tuutt!

// const jump = {
//   visitMonkey(monkey) {
//     console.log('Jumped 20 feet high! on to the tree!')
//   },
//   visitLion(lion) {
//     console.log('Jumped 7 feet! Back on the ground!')
//   },
//   visitDolphin(dolphin) {
//     console.log('Walked on water a little and disappeared')
//   },
// }

// monkey.accept(speak) // Ooh oo aa aa!
// monkey.accept(jump) // Jumped 20 feet high! on to the tree!

// lion.accept(speak) // Roaaar!
// lion.accept(jump) // Jumped 7 feet! Back on the ground!

// dolphin.accept(speak) // Tuut tutt tuutt!
// dolphin.accept(jump) // Walked on water a little and disappeared


function node(val) {
  this.value = val;
  this.left = this.right = null;
}

class Node {
  constructor(val) {
    this.val = val
    this.left = this.right = null
  }
  accept(vistor) {
    vistor.visit(this);
    if (this.left) this.left.accept(visitor)
    if (this.right) this.right.accept(visitor)
  }
}

let tree = new Node('A')
tree.left = new Node('B1')
tree.right = new Node('B2')
tree.left.left = new Node('C1');
tree.left.right = new Node('C2');

const visitor = {
  visit(node) {
    node.val = '*' + node.val;
  },
  hightlight(node) {
    node.accept(this);
  }
}

visitor.hightlight(tree.left);

function dfc(node) {
  if (node == null) return;
  console.log(node.val);
  dfc(node.left)
  dfc(node.right)
}

function bfc(node) {
  if (node == null) return
  bfc(node.left)
  console.log(node.val);
  bfc(node.right)
}


