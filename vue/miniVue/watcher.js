/**
 * 订阅者
 * @param {object} vm VModel 
 * @param {string} exp key
 * @param {function} cb callback function
 */

function Watcher(vm, exp, cb) {
  this.vm = vm
  this.exp = exp
  this.cb = cb
  this.value = this.get()
}

Watcher.prototype = {
  constructor: Watcher,
  update: function() {
    this.run()
  },
  run: function() {
    let value = this.vm.data[this.exp]
    let oldVal = this.value
    if (oldVal != value) {
      this.value = value
      this.cb.call(this.vm, value, oldVal)
    }
  },
  get: function() {
    Dep.target = this
    let value = this.vm.data[this.exp]
    Dep.target = null
    return value
  },
}
