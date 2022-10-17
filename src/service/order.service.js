import axios from 'axios'
import axiosInstance from '../libs/axios'

class OrderService {
  getOrders() {
    return axiosInstance.get(`/orders`)
  }

  getOrder(id) {
    return axiosInstance.get(`/orders/${id}`)
  }
  updateStatus(id, status) {
    return axiosInstance.put(`/orders/${id}/change-status`, {
      status,
      note: 'Edit Status',
      user_id: '0c9a05cb-407c-43c1-b855-88a034ad8f01',
    })
  }
}

export default new OrderService()
