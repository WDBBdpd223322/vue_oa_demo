import axios from 'axios'
import Auth from '@/assets/js/auth.js'
import router from '@/router/index.js'

export const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1'
})

http.interceptors.request.use(function (config) {
  if (config.url !== '/login') {
    config.headers['Authorization'] = Auth.getToken()
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

http.interceptors.response.use(function (response) {
  const {meta} = response.data
  if (meta.status === 403) {
    window.alert('您没有权限执行该操作')
  } else if (meta.status === 401) {
    window.alert('您的登陆信息有误，请重新登陆！')
    router.push({
      name: 'login',
      query: {
        redirect: window.location.hash
      }
    })
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

const httpPlugin = {}

httpPlugin.install = function (Vue) {
  Vue.prototype.$http = http
}

export default httpPlugin
