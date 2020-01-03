function MiniVue(options) {
  let that = this
  this.vm = this
  this.data = options.data
  Object.keys(this.data).forEach(function(key) {
    that.proxyKeys(key)
  })

  observe(this.data);
  new Compile(options.el, this);

  options.mounted && options.mounted.call(this);
}

MiniVue.prototype = {
  constructor: MiniVue,
  proxyKeys: function(key) {
    let that = this
    Object.defineProperty(this, key, {
      enumerable: false,
      configurable: false,
      get: function proxyGetter() {
        return this.data[key]
      },
      set: function proxySetter(newVal) {
        that.data[key] = newVal
      },
    })
  },
}
