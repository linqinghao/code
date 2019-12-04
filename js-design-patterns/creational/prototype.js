/**
 * 原型模式
 */

let animal = {
  say: function() {
    console.log('say')
  },
}

let person = Object.create(animal)

// TEST

person.say() // say
