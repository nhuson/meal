import BaseService from './base.service'

class TypeIngredientService extends BaseService {
	constructor() {
		super()
		this.tableName = 'type_ingredients'
	}
}

export default new TypeIngredientService()
