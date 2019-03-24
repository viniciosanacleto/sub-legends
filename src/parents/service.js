const axios = require('axios')

class Service {
  constructor () {
    this.options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
  }

  doRequest (type, url, payload = null) {
    return new Promise((resolve, reject) => {
      let request = null

      switch (type.toUpperCase()) {
        case 'GET':
          request = axios.get(url, this.options)
          break
        case 'POST':
          request = axios.post(url, payload, this.options)
          break
        case 'DELETE':
          request = axios.delete(url, this.options)
          break
        case 'PUT':
          request = axios.put(url, payload, this.options)
          break
        case 'PATCH':
          request = axios.patch(url, payload, this.options)
          break
      }

      request
        .then(res => {
          resolve(res.data)
        })
        .catch(e => {
          reject(e)
        })
    })
  }
}

module.exports = Service