import BaseService from './base.service'

class ContactService extends BaseService {
    constructor() {
		super()
		this.tableName = 'contacts'
    }
    

}

export default new ContactService()
