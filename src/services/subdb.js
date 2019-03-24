const Service = require('../parents/service')

class SubDBService extends Service {
    constructor() {
        super()
        this.options = {
            headers:{
                'User-Agent': 'SubDB/1.0 (Sub-legends/1.0; https://github.com/viniciosanacleto/sub-legends)'
            }
        }
    }

    async search(hash) {
        return this.doRequest('GET', `http://api.thesubdb.com/?action=search&hash=${hash}`)
        .catch((res)=>{
            return ''
        })
    }

    download(hash, lang = 'en') {
        return this.doRequest('GET', `http://api.thesubdb.com/?action=download&hash=${hash}&language=${lang}`)
        .catch((res)=>{
            return ''
        })
    }
}

module.exports = new SubDBService