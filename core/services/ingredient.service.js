import BaseService from './base.service'
import IngredientModel from '../models/ingredient.model'

class IngredientService extends BaseService {
	constructor() {
		super()
		this.tableName = 'ingredients'
		this.model = IngredientModel
	}

	findAll(){
		return this.model.find({}).populate({
			path: 'type'
		})
	}

	async getAvailable(option){
		let { page, per_page } = option

		if (page < 0 || per_page < 0) {
			throw createError(400, 'Invalid request params')
		}

		const data = await this.model.paginate({}, { page, limit: per_page, populate: {
			path: 'type'
		}})
		return {
			[option.declation]: data.docs,
			total_page: data.pages,
			total_record: data.total,
		}
	}
}

export default new IngredientService()
