import BaseService from './base.service'

class CategoryService extends BaseService {
    constructor() {
		super()
		this.tableName = 'categories'
    }
    

}

export default new CategoryService()
