function createEvents() {
  let handlers = []

  return {
    push(fn) {
      handlers.push(fn)
      return function () {
        handlers = handlers.filter(handler => handler != fn)
      }
    },
    call(arg) {
      handlers.forEach(fn => fn && fn(arg))
    },
  }
}

function createBrowserHistory() {
  const listeners = createEvents()

  // 路由变化时的回调
  const handlePop = function (event) {
    console.log('what????', event)
    listeners.call()
  }

  // 监听路由变化，BrowserHistory 监听 popstate 事件

  window.addEventListener('popstate', handlePop)

  const history = {
    listen(listener) {
      return listeners.push(listener)
    },
    push(url) {
      const history = window.history;
      console.log(url)
      history.pushState(null, '', url)
    },
    location: window.location
  }

  return history
}

export default createBrowserHistory
