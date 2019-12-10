/**
 * 原型模式
 */

let animal = {
  say: function() {
    console.log('i am animal')
  },
}

let person1 = Object.create(animal)

person1.say() // i am animal

/**
 * class
 */

class Animal {
  say() {
    console.log('i am animal')
  }
}

class Person extends Animal {}

let person2 = new Person()

person2.say() // i am animal
