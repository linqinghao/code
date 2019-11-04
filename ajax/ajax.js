class Ajax {
  constructor(options, xhr) {
    this.options = options
    this.timeout = this.options.timetout || 5000
    this.responseType = this.options.responseType
    this.method = this.options.method || 'GET'
    this.url = this.options.url
    this.headers = this.options.headers
    this.xhr = xhr
  }

  send() {
    const that = this
    this.xhr.timeout = this.timeout
    this.xhr.responseType = this.responseType
    this.xhr.open(this.method, this.url)
    return new Promise(function(resolve, reject) {
      that.xhr.onreadystatechange = function() {
        if (that.xhr.readyState == 4) {
          if (that.xhr.status == 200) {
            resolve(that.xhr.response)
          } else {
            reject(new Error(`request error: ${that.xhr.status}`))
          }
        }
      }
      that.xhr.onerror = function() {
        reject(new Error(`network error`))
      }
      that.xhr.send()
    })
  }
}

function ajax(options) {
  let request = new Ajax(options, new XMLHttpRequest())
  return request.send()
}

ajax.get = function(url, options) {
  return ajax(Object.assign({}, options, { method: 'GET', url }))
}

ajax.post = function(url, options) {
  return ajax(Object.assign({}, options, { method: 'POST', url }))
}
