/**
 * 抽象工厂模式
 */

class AbstractFactory {
  createMobile() {
    throw new Error('Method createMobile must be implemented')
  }

  salesChannel() {
    throw new Error('Method salesChannel must be implemented')
  }
}

class AppleFactory extends AbstractFactory {
  createMobile(label, price) {
    return new Apple(label, price)
  }

  salesChannel() {
    return new AppleStore()
  }
}

class XiaomiFactory extends AbstractFactory {
  createMobile(label, price) {
    return new Xiaomi(label, price)
  }

  salesChannel() {
    return new MiHome()
  }
}

class Apple {
  constructor(label, price) {
    this.label = label
    this.price = price
  }

  detail() {
    console.log(`${this.label} phone sales ${this.price}`)
  }
}

class Xiaomi {
  constructor(label, price) {
    this.label = label
    this.price = price
  }

  detail() {
    console.log(`${this.label} phone sales ${this.price}`)
  }
}

class AppleStore {
  detail() {
    console.log('Selling in Apple Store')
  }
}

class MiHome {
  detail() {
    console.log('Selling in Mi Home')
  }
}

const appleFactory = new AppleFactory();
const apple = appleFactory.createMobile('apple', 5000)
const appleChannel = appleFactory.salesChannel()
apple.detail() // apple phone sales 5000
appleChannel.detail() // Selling in Apple Store

const xiaomiFactory = new XiaomiFactory();
const xiaomi = xiaomiFactory.createMobile('xiaomi', 4000)
const xiaomiChannel = xiaomiFactory.salesChannel()
xiaomi.detail() // xiaomi phone sales 4000
xiaomiChannel.detail() // Selling in Mi Home
