import axios from 'axios'

const API_URL = 'https://fruity-978fba.es.us-central1.gcp.cloud.es.io:9243'

class SearchProductService {
    search(keyword) {
        return axios.post(API_URL + '/products/_search', {
            query: {
                multi_match: {
                    query: keyword,
                    fields: ['name', 'tags']
                }
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Apikey TDZXd21JQUI3RVk5b3BSWnlTTUQ6bHFTWEVGT3RTek9OWFl2RWpudTBWUQ==',
                'Access-Control-Allow-Origin': '*'
            }
        })
    }

}

export default new SearchProductService()
