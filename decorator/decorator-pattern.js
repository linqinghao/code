function cat() {
  console.log('my name is kitty')
}

function bell(wrapper) {
  return function() {
    const result = wrapper.apply(this, arguments)
    console.log('ding ding ding')
    return result
  }
}

const kittyCat = bell(cat)
kittyCat()
