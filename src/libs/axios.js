import axios from 'axios'

const API_URL = 'http://128.199.145.119:3000/cms/v1'
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export default axiosInstance
