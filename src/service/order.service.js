import axios from 'axios'

const API_URL = 'https://be.fruity.works/cms/v1'

class OrderService {
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

export default new OrderService()
