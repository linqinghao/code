/**
 * 代理模式
 */

class User {
  login() {
    console.log('login')
  }

  logOut() {
    console.log('logout')
  }
}

class ProxyUser {
  constructor(user) {
    this.user = user
  }

  login(username, password) {
    if (this.auth(username, password)) {
      this.user.login()
    } else {
      console.log('invalid')
    }
  }

  logOut() {
    this.user.logOut()
  }

  auth(username, password) {
    if (username && password && username == password) {
      return true
    }
    return false
  }
}

const user = new ProxyUser(new User())

user.login()

user.login('aaa', 'aaa')
