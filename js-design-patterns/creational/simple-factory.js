/**
 * 简单工厂模式
 * 根据手机产商类型生产不同品牌的手机
 * @param {string} type 类型
 */

function mobileFactory(type) {
  if (type == 'Xiaomi') {
    return new Mobile(type, 3000)
  }

  if (type == 'Meizu') {
    return new Mobile(type, 1000)
  }
}

function Mobile(type, price) {
  this.type = type
  this.price = price
}

// TEST

let xiaomi = new mobileFactory('Xiaomi')

console.log(xiaomi) // Mobile { type: 'Xiaomi', price: 3000 }

let meizu = new mobileFactory('Meizu')

console.log(meizu) // Mobile { type: 'Meizu', price: 1000 }
