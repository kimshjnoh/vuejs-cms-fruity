import axiosInstance from '../libs/axios'

class StockReportService {
  getStockReports() {
    return axiosInstance.get(`/stock-reports`)
  }
  editStockReport(id, data) {
    return axiosInstance.put(`/stock-reports/${id}`, data)
  }
  createStockReport(data) {
    return axiosInstance.post(`/stock-reports`, data)
  }
}

export default new StockReportService()
