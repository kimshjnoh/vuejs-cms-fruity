import axios from 'axios'

const API_URL = 'https://fruityy.ddns.net/cms/v1'

class StockService {
  getStocks() {
    return axios.get(`${API_URL}/stocks`)
  }
  editStock(id, data) {
    return axios.put(`${API_URL}/stocks/${id}`, data)
  }
}

export default new StockService()
