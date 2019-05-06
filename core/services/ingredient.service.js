import BaseService from './base.service'
import IngredientModel from '../models/ingredient'

class IngredientService extends BaseService {
	constructor() {
		super()
		this.model = IngredientModel
	}
}

export default new IngredientService()
