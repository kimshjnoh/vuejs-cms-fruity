import axiosInstance from '../libs/axios'

class StockService {
  getStocks() {
    return axiosInstance.get(`/stocks`)
  }
  editStock(id, data) {
    return axiosInstance.put(`/stocks/${id}`, data)
  }
}

export default new StockService()
