/* eslint-disable class-methods-use-this */
import axiosInstance from '../libs/axios'

class ProductService {
  getProducts() {
    return axiosInstance.get('/products')
  }

  deleteProduct(id) {
    return axiosInstance.delete(`/products/${id}`)
  }

  createProduct(product) {
    return axiosInstance.post('/products', product)
  }

  updateProduct(product) {
    return axiosInstance.put(`/products/${product.id}`, product)
  }
}

export default new ProductService()
