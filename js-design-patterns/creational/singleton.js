/**
 * 单例模式
 * 使用闭包返回唯一化实例
 */

function Person(age) {
  this.age = age
}

let createSingleton = (function () {
  let instance
  return function(age) {
    if (!instance) {
      instance = new Person(age)
    }
    return instance
  }
})()

// TEST
let person1 = new createSingleton(18)

let person2 = new createSingleton(19)

console.log(person1) // Person { age: 18 }
console.log(person2) // Person { age: 18 }
console.log(person1 == person2) // true
