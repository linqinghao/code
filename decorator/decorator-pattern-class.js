class Cat {
  constructor(name) {
    console.log(`my name is ${name}`)
  }
}

class Bell {
  constructor(cat) {
    console.log('ding ding ding')
  }
}

const kittyCat = new Bell(new Cat('kitty'))
