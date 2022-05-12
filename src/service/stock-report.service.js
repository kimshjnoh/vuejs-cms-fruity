import axios from 'axios'

const API_URL = 'http://localhost:3000/cms/v1'

class StockReportService {
  getStockReports() {
    return axios.get(`${API_URL}/stock-reports`)
  }
  editStockReport(id, data) {
    return axios.put(`${API_URL}/stock-reports/${id}`, data)
  }

}

export default new StockReportService()
