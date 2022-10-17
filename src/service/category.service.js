import axiosInstance from '../libs/axios'

class CategoryService {
  getCategories() {
    return axiosInstance.get(`/categories`)
  }
  getChildCategory(id) {
    console.log(id)
    return axiosInstance.get(`/categories?parent_id=${id}`)
  }
  updateCategory(id, data) {
    return axiosInstance.put(`/categories/${id}`, data)
  }
  createCategory(data) {
    return axiosInstance.post(`/categories`, data)
  }
  delete(id) {
    return axiosInstance.delete(`/categories/${id}`)
  }
}

export default new CategoryService()
