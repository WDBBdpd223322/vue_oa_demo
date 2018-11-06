export default {
  saveUser (obj) {
    window.sessionStorage.setItem('user', JSON.stringify(obj))
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem('user')) || {}
  },
  getToken () {
    return this.getUser().token
  }
}
