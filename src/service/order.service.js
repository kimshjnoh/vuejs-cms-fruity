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
    return axios.put(`${API_URL}/orders/${id}/change-status`, { status, note: 'Edit Status', user_id: '0c9a05cb-407c-43c1-b855-88a034ad8f01' })
  }
}

export default new OrderService()
