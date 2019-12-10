/**
 * 单例模式
 */

class Singleton {
  constructor(type) {
    if (Singleton.instance) {
      return Singleton.instance
    }
    this.type = type
    Singleton.instance = this
    return this
  }

  getType() {
    console.log(this.type)
  }
}

let s1 = new Singleton('apple')
s1.getType() // apple

let s2 = new Singleton('banana')
s2.getType() // apple
