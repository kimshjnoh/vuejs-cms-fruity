import axios from 'axios'

const API_URL = 'https://be.fruity.works/cms/v1'

class CategoryService {
  getCategories() {
    return axios.get(`${API_URL}/categories`)
  }
  getChildCategory(id) {
    console.log(id)
    return axios.get(`${API_URL}/categories?parent_id=${id}`)
  }
  updateCategory(id, data) {
    return axios.put(`${API_URL}/categories/${id}`, data)
  }
  createCategory(data) {
    return axios.post(`${API_URL}/categories`, data)
  }
  delete(id) {
    return axios.delete(`${API_URL}/categories/${id}`)
  }
}

export default new CategoryService()
