/**
 * 迭代器模式
 */

class Iterator {
  constructor(list) {
    this.list = list
    this.index = 0
  }

  next() {
    if (this.hasNext()) {
      return this.list[this.index++]
    }
    return null
  }

  hasNext() {
    if (this.index == this.list.length) {
      return false
    }
    return true
  }
}

const arr = [1, 2, 3, 4, 5, 6]
const ite = new Iterator(arr)

while (ite.hasNext()) {
  console.log(ite.next()) // 依次打印 1 2 3 4 5 6
}
