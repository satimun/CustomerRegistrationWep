import axios from 'axios'
import app from '../main'

const instance = axios.create()

var count = 0

instance.interceptors.request.use(function (config) {
  count++
  app.$Progress.start()
  return config
}, function (error) {
  app.$Progress.fail()
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  count--
  if (count <= 0) {
    app.$Progress.finish()
  }
  return response
}, function (error) {
  count--
  if (count <= 0) {
    app.$Progress.fail()
  }
  return Promise.reject(error)
})

export default instance
