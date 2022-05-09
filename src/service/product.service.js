import axios from 'axios';

const API_URL = `http://localhost:3000/v1`;

class ProductService {
    getProducts(){
        return axios.get(API_URL + '/products/get-sale-shock?limit=100')
    }
    deleteProduct(id){
        return axios.delete(API_URL + '/products/' + id)
    }
    createProduct(product){
        return axios.post(API_URL + '/products', product)
    }
    updateProduct(product){
        return axios.put(API_URL + '/products/' + product.id, product)
    }
}

export default new ProductService();
