/**
 * 建造者模式
 */

class Mobile {
  constructor(options) {
    this.price = options.price || 0
    this.camera = options.camera || 1
    this.screen = options.screen || 'normal'
    this.battry = options.battry || '3000mAh'
  }
  getDetail() {
    console.log(
      `price: ${this.price}, camera: ${this.camera}, screen: ${this.screen}, battery: ${this.battry}`
    )
  }
}

class Builder {
  addPrice(price) {
    this.price = price
    return this
  }

  addCamera(camera) {
    this.camera = camera
    return this
  }

  addScreen(screen) {
    this.screen = screen
    return this
  }

  addBattery(battry) {
    this.battry = battry
    return this
  }

  build() {
    return new Mobile(this)
  }
}

const apple = new Builder()
  .addCamera(4)
  .addBattery('4000mAh')
  .addScreen('fullScreen')
  .addPrice(10000)
  .build()

apple.getDetail() // price: 10000, camera: 4, screen: fullScreen, battery: 4000mAh