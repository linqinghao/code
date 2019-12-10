/**
 * 简单工厂模式
 */

class Apple {
  constructor(label, price) {
    this.label = label
    this.price = price
  }
}

class Xiaomi {
  constructor(label, price) {
    this.label = label
    this.price = price
  }
}

class MobileFactory {
  create(type) {
    if (type == 'Apple') {
      return new Apple(type, 3000)
    }

    if (type == 'Xiaomi') {
      return new Xiaomi(type, 1000)
    }
  }
}

let mobileFactory = new MobileFactory()

let apple = mobileFactory.create('Apple')

console.log(apple) // Apple { label: 'Apple', price: 3000 }

let xiaomi = mobileFactory.create('Xiaomi')

console.log(xiaomi) // Xiaomi { label: 'Xiaomi', price: 1000 }
