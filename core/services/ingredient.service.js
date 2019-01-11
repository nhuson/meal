import BaseService from './base.service'

class IngredientService extends BaseService {
    constructor() {
		super()
		this.tableName = 'ingredients'
    }
    

}

export default new IngredientService()
