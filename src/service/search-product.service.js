import axios from 'axios'

const API_URL = 'https://fruity.es.us-central1.gcp.cloud.es.io:9243'

class SearchProductService {
  // eslint-disable-next-line class-methods-use-this
  search(keyword) {
    return axios.post(
      `${API_URL}/products/_search`,
      {
        query: {
          multi_match: {
            query: keyword,
            fields: ['name', 'tags'],
          },
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Apikey QlpKYndvTUJ5bkEwLU1xSHpZYTU6bWRUZ3IzTlBTM0dpV21tUTBzdlRXUQ==',
          'Access-Control-Allow-Origin': '*',
        },
      },
    )
  }
}

export default new SearchProductService()
