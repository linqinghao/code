/**
 * 桥接模式
 */

class Color {
  constructor(color) {
    this.color = color
  }
  toString() {
    return this.color
  }
}

class Type {
  constructor(type) {
    this.type = type
  }
  toString() {
    return this.type
  }
}

class Ball {
  constructor(type, color) {
    this.type = new Type(type)
    this.color = new Color(color)
  }
  getDetail() {
    console.log(`type: ${this.type}, color: ${this.color}`)
  }
}

const basketball = new Ball('basketball', 'red')
basketball.getDetail()
