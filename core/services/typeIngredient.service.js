import BaseService from './base.service'
import IngredientTypeModel from '../models/ingredient_type.model'

class TypeIngredientService extends BaseService {
	constructor() {
		super()
		this.model = IngredientTypeModel
	}
}

export default new TypeIngredientService()
