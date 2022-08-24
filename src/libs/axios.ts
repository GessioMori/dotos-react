import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://172.18.0.1:3333',
})

api.interceptors.request.use(
  (config) => {
    config.withCredentials = true
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
