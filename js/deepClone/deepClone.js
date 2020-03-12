const obj = {
  name: 'alin',
  age: 18,
  address: {
    city: 'shenzhen',
  },
}

// 1
const cloneObj1 = JSON.parse(JSON.stringify(obj))

console.log(cloneObj1 === obj) // false

// 2

function isObj(obj) {
  return typeof obj === 'object'
}

function deepClone(obj, hash = new WeakMap()) {
  if (!isObj(obj) || obj === null || obj === undefined) return obj
  let cloneObj
  const Constructor = obj.constructor
  switch (Constructor) {
    case RegExp:
      cloneObj = new Constructor(obj)
      break
    case Date:
      cloneObj = new Constructor(obj.getTime())
      break
    case Array:
      cloneObj = []
      break
    default:
      if (hash.has(obj)) return hash.get(obj)
      cloneObj = new Constructor()
      hash.set(obj, cloneObj)
  }

  for (let key in obj) {
    if (typeof obj[key] == 'function') {
      cloneObj[key] = obj[key].bind(cloneObj)
    } else {
      cloneObj[key] = isObj(obj[key]) ? deepClone(obj[key], hash) : obj[key]
    }
  }
  return cloneObj
}

let obj2 = {
  name: 'a',
  age: undefined,
  sex: null,
  regexp: /[0-9]/i,
  date: new Date(),
  func: function() {
    console.log('yeah')
  },
  arr: [1, 2, 3],
}

obj2.o = obj2

let cloneObj2 = deepClone(obj2)
console.log(cloneObj2)

console.log(cloneObj2.func === obj2.func)

cloneObj2.func()

console.log(cloneObj2.arr === obj2.arr)
