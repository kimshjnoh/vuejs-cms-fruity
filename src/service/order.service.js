import axios from 'axios'

const API_URL = 'http://100.26.42.214:3000/cms/v1'

class ProductService {
  getOrders() {
    return axios.get(`${API_URL}/orders`)
  }

  getOrder(id) {
    return axios.get(`${API_URL}/orders/${id}`)
  }
  updateStatus(id, status) {
    return axios.put(`${API_URL}/orders/${id}/update-status`, { status })
  }
}

export default new ProductService()
