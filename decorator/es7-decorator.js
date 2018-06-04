function meowDecorator(msg) {
  return function(target, key, descriptor) {
    const method = descriptor.value
    descriptor.value = function(args) {
      const ret = method.apply(this, args)
      console.log(msg)
      return ret
    }
    return descriptor
  }
}

class Cat {
  constructor(name) {
    this.name = name
  }

  @meowDecorator('ao uuu~~~')
  meow() {
    console.log(`my name is ${this.name}`)
  }
}
const kittyCat = new Cat('kitty')
kittyCat.meow()
