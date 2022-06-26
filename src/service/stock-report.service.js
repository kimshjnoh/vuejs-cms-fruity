import axios from 'axios'

const API_URL = 'https://be.fruity.works/cms/v1'

class StockReportService {
  getStockReports() {
    return axios.get(`${API_URL}/stock-reports`)
  }
  editStockReport(id, data) {
    return axios.put(`${API_URL}/stock-reports/${id}`, data)
  }
  createStockReport(data) {
    return axios.post(`${API_URL}/stock-reports`, data)
  }
}

export default new StockReportService()
