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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry &&
      originalRequest.url !== '/account/refresh'
    ) {
      originalRequest._retry = true
      await refreshToken()
      return api(originalRequest)
    }
    return Promise.reject(error)
  },
)

const refreshToken = async () => {
  return new Promise((resolve, reject) => {
    try {
      api
        .post('/account/refresh')
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    } catch (err) {
      return reject(err)
    }
  })
}
