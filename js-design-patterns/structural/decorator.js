/**
 * 装饰器模式
 */

class HandCake {
  getPrice() {
    return 5
  }

  getType() {
    return 'egg'
  }
}

class HamHandCake {
  constructor(handCake) {
    this.handCake = handCake
  }
  getPrice() {
    return this.handCake.getPrice() + 5
  }

  getType() {
    return this.handCake.getType() + ', ham'
  }
}

class BaconHandCake {
  constructor(handCake) {
    this.handCake = handCake
  }
  getPrice() {
    return this.handCake.getPrice() + 6
  }

  getType() {
    return this.handCake.getType() + ', bacon'
  }
}

let handCake = new HandCake()
console.log(handCake.getPrice()) // 5
console.log(handCake.getType()) // egg

handCake = new HamHandCake(handCake)
handCake = new BaconHandCake(handCake)

console.log(handCake.getPrice()) // 16
console.log(handCake.getType()) // egg, ham, bacon
