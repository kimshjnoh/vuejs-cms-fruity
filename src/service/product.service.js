import axios from 'axios'
import axiosInstance from '../libs/axios'

class ProductService {
  getProducts() {
    return axiosInstance.get(API_URL + '/products')
  }
  deleteProduct(id) {
    return axiosInstance.delete(API_URL + '/products/' + id)
  }
  createProduct(product) {
    return axiosInstance.post(API_URL + '/products', product)
  }
  updateProduct(product) {
    return axiosInstance.put(API_URL + '/products/' + product.id, product)
  }
}

export default new ProductService()
