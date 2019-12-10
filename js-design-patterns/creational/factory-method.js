/**
 * 工厂方法模式
 */

class Apple {
  constructor(label, price) {
    this.label = label
    this.price = price
  }
  installSystem() {
    this.system = 'iOS'
    console.log('Install iOS system')
  }
}

class Xiaomi {
  constructor(label, price) {
    this.label = label
    this.price = price
  }
  installSystem() {
    this.system = 'MIUI'
    console.log('Install MIUI system')
  }
}

class MobileFactory {
  create() {
    throw new Error(`Method create() must be implemented`)
  }

  installSystem(label, price) {
    const mobile = this.create(label, price)
    mobile.installSystem()
    return mobile
  }
}

class AppleFactory extends MobileFactory {
  create(label, price) {
    return new Apple(label, price)
  }
}

class XiaomiFactory extends MobileFactory {
  create(label, price) {
    return new Xiaomi(label, price)
  }
}

const appleFactory = new AppleFactory()
const apple = appleFactory.installSystem('apple', 8000) // Install iOS system
console.log(apple) // Apple { label: 'apple', price: 8000, system: 'iOS' }

const xiaomiFactory = new XiaomiFactory()
const xiaomi = xiaomiFactory.installSystem('xiaomi', 4000) // Install MIUI system
console.log(xiaomi) // Xiaomi { label: 'xiaomi', price: 4000, system: 'MIUI' }
