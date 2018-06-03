class Cat {
  constructor(name) {
    console.log(`my name is ${name}`)
  }
}

class Bell {
  constructor(cat) {
    this.cat = cat
    console.log('ding ding ding')
  }
}

const cat = new Cat('kitty')
const kittyCat = new Bell(cat)
