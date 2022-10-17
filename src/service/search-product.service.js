import axios from 'axios'

class SearchProductService {
  search(keyword) {
    return axios.post(
      API_URL + '/products/_search',
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
          Authorization: 'Apikey aGtTVWdZRUJNdmY4TlZyTkFmQ3U6cjd1NTFFaUVSbTJ1TW81WnZCT2FqQQ==',
          'Access-Control-Allow-Origin': '*',
        },
      },
    )
  }
}

export default new SearchProductService()
