/**
 * 适配器模式
 */

class USBPort {
  chargeForUSB() {
    console.log('charge for USBPort')
  }
}

class Computer {
  chargeForThunder(port) {
    port.charge()
  }
}

class Adapter {
  constructor(port) {
    this.port = port
  }

  charge() {
    this.port.chargeForUSB()
  }
}

const usbPort = new USBPort()
const adapter = new Adapter(usbPort)

const computer = new Computer()
computer.chargeForThunder(adapter)
